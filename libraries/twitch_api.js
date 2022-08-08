async function get_twitch_live_channels_by_keyword ( SEARCH_KEYWORD, CLIENT_ID, SCROLLING=false, CURSOR=null ) 
{
	const TWITCH_API_URL = "https://gql.twitch.tv/gql";
	const BODY = 
	[
	    {
	        "operationName": "SearchResultsPage_SearchResults",
	        "variables": {
	            "query": SEARCH_KEYWORD,
	            "options": {
	                "targets": [
	                    {
	                        "index": "CHANNEL"
	                    }
	                ]
	            },
	            "requestID": "8134f698-3cdc-4a17-9505-3ea204667df4"
	        },
	        "extensions": {
	            "persistedQuery": {
	                "version": 1,
	                "sha256Hash": "ee977ac21b324669b4c109be49ed3032227e8850bea18503d0ced68e8156c2a5"
	            }
	        }
	    }
	];

	if ( SCROLLING == true )
		BODY[0].variables.options.targets[0]["cursor"] = CURSOR;

	const REQUEST = 
	{
		"url" : TWITCH_API_URL,
		"method" : "POST",
		"payload" : JSON.stringify(BODY),
		"headers_arr" : 
		[
			{ "key" : "Client-Id", "value" : CLIENT_ID }
		]
	};	
	const XHR = await make_xhr ( REQUEST );

	if ( XHR.status >= 200 && XHR.status < 399 ) 
	{
		if ( XHR.response ) 
		{
			const IS_JSON = XHR.response[0] == "{" && XHR.response[ XHR.response.length-1 ] == "}" || XHR.response[0] == "[" && XHR.response[ XHR.response.length-1 ] == "]";
			const DATA = {};

			DATA["xhr_status"] = XHR.status
			DATA["response_text"] = XHR.response;
			
			if ( IS_JSON == true ) 
			{
				const JSON_DATA = JSON.parse ( XHR.response );

				DATA["twitch_channels"] = JSON_DATA[0].data.searchFor.channels.edges;
				DATA["cursor"] = JSON_DATA[0].data.searchFor.channels.cursor;
			};

			return DATA;
		}
		else 
		{
			const DATA = {};

			DATA["xhr_status"] = XHR.status
			DATA["response_text"] = XHR.response;
			DATA["twitch_channels"] = null;
			DATA["cursor"] = null;

			return DATA;
		};
	}
	else 
	{
		if ( XHR.response ) 
		{
			const DATA = {};
			
			DATA["xhr_status"] = XHR.status
			DATA["response_text"] = XHR.response;
			DATA["twitch_channels"] = null;
			DATA["cursor"] = null;

			return DATA;
		}
		else 
		{
			const DATA = {};
			
			DATA["xhr_status"] = XHR.status
			DATA["response_text"] = XHR.response;
			DATA["twitch_channels"] = null;
			DATA["cursor"] = null;

			return DATA;
		};
	};
};

async function crawl_twitch_client_id () 
{
	const REQUEST = 
	{
		"method" : "GET",
		"url" : "https://www.twitch.tv/"
	};
	const XHR = await make_xhr ( REQUEST );

	try 
	{
		const RESULT = XHR.response.match ( /(("Client-ID":")([a-zA-Z0-9]+)("))/ )

		if ( RESULT != null ) 
		{
			return RESULT[3];
		}
		else 
		{
			return null;
		};
	} 
	catch ( ERROR ) 
	{
		// statements
		console.log ( ERROR );
	};
};

function get_twicth_channels_data ( TWICTH_CHANNELS ) 
{
	const DATA = {};
	const SORTED_BY_STREAM_TYPE = TWICTH_CHANNELS.sort ( t_channel => t_channel.item.stream != null );

	for ( let channel_item of SORTED_BY_STREAM_TYPE ) 
	{
		const UUID = channel_item.item.broadcastSettings.id;

		DATA[ UUID ] = 
		{
			"displayName" 		: channel_item.item.displayName,
			"broadcast_title" 	: channel_item.item.broadcastSettings.title,
			"bradcast_id" 		: channel_item.item.broadcastSettings.id,
			"viewersCount" 		: channel_item.item.stream != null ? channel_item.item.stream.viewersCount : null,
			"previewImageURL" 	: channel_item.item.stream != null ? channel_item.item.stream.previewImageURL : null,
			"stream_type" 		: channel_item.item.stream != null ? channel_item.item.stream.type : null,
			"is_live" 			: channel_item.item.stream != null ? true : false 
		};
	};

	return DATA;
};
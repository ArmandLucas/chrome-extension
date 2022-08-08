async function get_logged_user_infomation () 
{
	const REQUEST = 
	{
		"method" : "GET",
		"url" : "https://cryptocars.me/info",
		"include_credentials" : true
	};
	const XHR = await make_xhr ( REQUEST );

	if ( XHR.status >= 200 && XHR.status < 399 ) 
	{
		const DATA = {};
		const IS_JSON_RESPONSE = XHR.response[0] == "{" && XHR.response[ XHR.response.length - 1 ] == "}";

		DATA["xhr_status"] = XHR.status;

		if ( XHR.response ) 
		{
			DATA["has_response"] 	= true;
			DATA["response"] 		= XHR.response;
			DATA["data"] 			= IS_JSON_RESPONSE == true ? JSON.parse ( XHR.response ) : {};
		}
		else 
		{
			DATA["has_response"] 	= false;
			DATA["response"] 		= null;
			DATA["data"] 			= null;	
		};

		return DATA;
	}
	else 
	{
		const DATA = {};
		const IS_JSON_RESPONSE = XHR.response[0] == "{" && XHR.response[ XHR.response.length - 1 ] == "}";

		DATA["xhr_status"] = XHR.status;

		if ( XHR.response ) 
		{
			DATA["has_response"] 	= true;
			DATA["response"] 		= XHR.response;
			DATA["data"] 			= IS_JSON_RESPONSE == true ? JSON.parse ( XHR.response ) : {};
		}
		else 
		{
			DATA["has_response"] 	= false;
			DATA["response"] 		= null;
			DATA["data"] 			= null;	
		};

		return DATA;
	};
};
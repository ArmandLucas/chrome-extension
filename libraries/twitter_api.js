async function get_tw_profile_followers ( PROFILE_DATA, AUTHORIZATION_BEARER, CSRF_TOKEN, CURSOR=undefined, FIRST_QTY=20 ) 
{
	if ( PROFILE_DATA["user_id"] ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_variables 	= {};
		let query_string 		= "";

		query_variables = 
		{
		    "userId": PROFILE_DATA["user_id"],
		    "count": FIRST_QTY,
		    "withTweetQuoteCount": false,
		    "includePromotedContent": false,
		    "withSuperFollowsUserFields": false,
		    "withUserResults": true,
		    "withBirdwatchPivots": false,
		    "withReactionsMetadata": false,
		    "withReactionsPerspective": false,
		    "withSuperFollowsTweetFields": false
		};

		if ( CURSOR ) 
		{
			query_variables["cursor"] = CURSOR;
		};

		query_string = `?variables=${ encodeURIComponent( JSON.stringify( query_variables ) ) }`;

		REQUEST[ "url" ] 					= "https://twitter.com/i/api/graphql/OiQ-k9n4O7JXwzXRy17q8w/Followers" + query_string;
		REQUEST[ "method" ] 				= "GET";
		REQUEST[ "include_credentials" ] 	= true;
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "content-type", "value" : "application/json" },
			{ "key" : "authorization", "value" : "Bearer " + AUTHORIZATION_BEARER },
			{ "key" : "x-csrf-token", "value" : CSRF_TOKEN },
			{ "key" : "x-twitter-active-use", "value" : "yes" },
			{ "key" : "x-twitter-auth-type", "value" : "OAuth2Session" },
			{ "key" : "x-twitter-client-language", "value" : "en" }

		];

		XHR = await make_xhr ( REQUEST );

		if ( XHR.status >= 200 && XHR.status < 307 ) 
		{
			if ( XHR.response ) 
			{
				const is_json = XHR.response[0] = "{" && XHR.response[ XHR.response.length - 1 ] == "}";

				if ( is_json == true ) 
				{
					const JSON_PARSED = JSON.parse ( XHR.response );

					JSON_PARSED["xhr_status"] = XHR.status;

					return JSON_PARSED;
				};
			};
		}
		else 
		{
			if ( XHR.response ) 
			{
				const error = 
				{
					"status" : "fail",
					"xhr_status" : XHR.status,
					"response" : XHR.response
				};

				return error;
			}
			else 
			{
				const error = 
				{
					"status" : "fail",
					"xhr_status" : XHR.status
				};

				return error;
			};
		};
	};	
};

async function get_tw_profile_following ( PROFILE_DATA, AUTHORIZATION_BEARER, CSRF_TOKEN, CURSOR=undefined, FIRST_QTY=20 ) 
{
	if ( PROFILE_DATA["user_id"] ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_variables 	= {};
		let query_string 		= "";

		query_variables = 
		{
		    "userId": PROFILE_DATA["user_id"],
		    "count": FIRST_QTY,
		    "withTweetQuoteCount": false,
		    "includePromotedContent": false,
		    "withSuperFollowsUserFields": false,
		    "withUserResults": true,
		    "withBirdwatchPivots": false,
		    "withReactionsMetadata": false,
		    "withReactionsPerspective": false,
		    "withSuperFollowsTweetFields": false
		};

		if ( CURSOR ) 
		{
			query_variables["cursor"] = CURSOR;
		};

		query_string = `?variables=${ encodeURIComponent( JSON.stringify( query_variables ) ) }`;

		REQUEST[ "url" ] 					= "https://twitter.com/i/api/graphql/4kv8o836nxjFRIv0N6B9dA/Following" + query_string;
		REQUEST[ "method" ] 				= "GET";
		REQUEST[ "include_credentials" ] 	= true;
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "content-type", "value" : "application/json" },
			{ "key" : "authorization", "value" : "Bearer " + AUTHORIZATION_BEARER },
			{ "key" : "x-csrf-token", "value" : CSRF_TOKEN },
			{ "key" : "x-twitter-active-use", "value" : "yes" },
			{ "key" : "x-twitter-auth-type", "value" : "OAuth2Session" },
			{ "key" : "x-twitter-client-language", "value" : "en" }

		];

		XHR = await make_xhr ( REQUEST );

		if ( XHR.status >= 200 && XHR.status < 307 ) 
		{
			if ( XHR.response ) 
			{
				const is_json = XHR.response[0] = "{" && XHR.response[ XHR.response.length - 1 ] == "}";

				if ( is_json == true ) 
				{
					const JSON_PARSED = JSON.parse ( XHR.response );

					JSON_PARSED["xhr_status"] = XHR.status;

					return JSON_PARSED;
				};
			};
		}
		else 
		{
			if ( XHR.response ) 
			{
				const error = 
				{
					"status" : "fail",
					"xhr_status" : XHR.status,
					"response" : XHR.response
				};

				return error;
			}
			else 
			{
				const error = 
				{
					"status" : "fail",
					"xhr_status" : XHR.status
				};

				return error;
			};
		};
	};	
};

async function get_certain_tw_profile_followers ( FOLLOWERS_QTY, DELAY=1500, PROFILE_DATA, AUTHORIZATION_BEARER, CSRF_TOKEN, CURSOR=undefined, FIRST_QTY=10 ) 
{
	return new Promise 
	(
		async ( RESOLVE, REJECT ) => 
		{
			let bucket = [];
			let CURRENT_CURSOR 	= undefined;
			const TASK = new Interval ();

			TASK.set
			(
				async () => 
				{
					if ( bucket.length < FOLLOWERS_QTY ) 
					{
						const REQUEST_DATA 	= await get_tw_profile_followers ( PROFILE_DATA, AUTHORIZATION_BEARER, CSRF_TOKEN, CURRENT_CURSOR, FIRST_QTY );
						const HAS_DATA 		= REQUEST_DATA["data"]["user"]["result"]["timeline"]["timeline"]["instructions"][0] ? true : false;
					
						if ( REQUEST_DATA["xhr_status"] == "200" && HAS_DATA == true ) 
						{
							const FOLLOWERS = REQUEST_DATA["data"]["user"]["result"]["timeline"]["timeline"]["instructions"].filter(a=>a["entries"])[0]["entries"];

							CURRENT_CURSOR = REQUEST_DATA["data"]["user"]["result"]["timeline"]["timeline"]["instructions"].filter(a=>a["entries"])[0]["entries"].filter (a=>a["entryId"].split("cursor-bottom-").length>1)[0]["content"]["value"];

							//filter duplicated items:
							for ( let i = 0; i < bucket.length; i++ ) 
							{
								const item 				= bucket[i];
								const is_duplicated 	= bucket.filter(a=>a["content"]["itemContent"]["user_results"]["result"]["legacy"]["screen_name"]==item["content"]["itemContent"]["user_results"]["result"]["legacy"]["screen_name"]).length > 1 ? true : false;

								if ( is_duplicated == true ) 
								{
									bucket.splice ( i, 1 );
								};
							};

							if ( FOLLOWERS ) 
							{
								bucket = bucket.concat ( FOLLOWERS.filter (a=>a["entryId"].split("user-").length>1) );

								if ( FOLLOWERS && FOLLOWERS.length == 0 ) 
								{
									TASK.clear ();
									RESOLVE ( bucket );
								};
							}
							else 
							{
								TASK.clear ();
								RESOLVE ( bucket );
							};
						};
					}
					else if ( bucket.length >= FOLLOWERS_QTY ) 
					{
						TASK.clear ();

						if ( bucket.length > FOLLOWERS_QTY ) 
						{
							bucket.length = parseInt ( FOLLOWERS_QTY );
						};

						RESOLVE ( bucket );
					};

					console.log(bucket);
				},
				DELAY
			);
		}		
	);
};

async function get_certain_tw_profile_following ( FOLLOWING_QTY, DELAY=1500, PROFILE_DATA, AUTHORIZATION_BEARER, CSRF_TOKEN, CURSOR=undefined, FIRST_QTY=10 ) 
{
	return new Promise 
	(
		async ( RESOLVE, REJECT ) => 
		{
			let bucket = [];
			let CURRENT_CURSOR 	= undefined;
			const TASK = new Interval ();

			TASK.set
			(
				async () => 
				{
					if ( bucket.length < FOLLOWING_QTY ) 
					{
						const REQUEST_DATA 	= await get_tw_profile_following ( PROFILE_DATA, AUTHORIZATION_BEARER, CSRF_TOKEN, CURRENT_CURSOR, FIRST_QTY );
						const HAS_DATA 		= REQUEST_DATA["data"]["user"]["result"]["timeline"]["timeline"]["instructions"][0] ? true : false;
					
						if ( REQUEST_DATA["xhr_status"] == "200" && HAS_DATA == true ) 
						{
							const FOLLOWERS = REQUEST_DATA["data"]["user"]["result"]["timeline"]["timeline"]["instructions"].filter(a=>a["entries"])[0]["entries"];

							CURRENT_CURSOR = REQUEST_DATA["data"]["user"]["result"]["timeline"]["timeline"]["instructions"].filter(a=>a["entries"])[0]["entries"].filter (a=>a["entryId"].split("cursor-bottom-").length>1)[0]["content"]["value"];

							//filter duplicated items:
							for ( let i = 0; i < bucket.length; i++ ) 
							{
								const item 				= bucket[i];
								const is_duplicated 	= bucket.filter(a=>a["content"]["itemContent"]["user_results"]["result"]["legacy"]["screen_name"]==item["content"]["itemContent"]["user_results"]["result"]["legacy"]["screen_name"]).length > 1 ? true : false;

								if ( is_duplicated == true ) 
								{
									bucket.splice ( i, 1 );
								};
							};

							if ( FOLLOWERS ) 
							{
								bucket = bucket.concat ( FOLLOWERS.filter (a=>a["entryId"].split("user-").length>1) );

								if ( FOLLOWERS && FOLLOWERS.length == 0 ) 
								{
									TASK.clear ();
									RESOLVE ( bucket );
								};
							}
							else 
							{
								TASK.clear ();
								RESOLVE ( bucket );
							};
						};
					}
					else if ( bucket.length >= FOLLOWING_QTY ) 
					{
						TASK.clear ();

						if ( bucket.length > FOLLOWING_QTY ) 
						{
							bucket.length = parseInt ( FOLLOWING_QTY );
						};

						RESOLVE ( bucket );
					};

					console.log(bucket);
				},
				DELAY
			);
		}		
	);
};

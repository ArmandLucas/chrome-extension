async function get_users_liking_post ( POST_DATA, x_ig_www_claim, AFTER=undefined, FIRST_QTY=24, QUERY_HASH=/*GLOBALS["instagram_api_parameters"]["query_hash"]*/"d5d763b1e2acf209d62d22d184488e57", INCLUDE_REEL=true  ) 
{
	if ( POST_DATA["shortcode"] ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_variables 	= {};
		let query_string 		= "";

		query_variables[ "shortcode" ] 		= POST_DATA["shortcode"];
		query_variables[ "include_reel" ] 	= INCLUDE_REEL;
		query_variables[ "first" ] 			= FIRST_QTY;

		if ( AFTER ) 
		{
			query_variables["after"] = AFTER;
		};

		query_string = `?query_hash=${ QUERY_HASH }&variables=${ encodeURIComponent( JSON.stringify( query_variables ) ) }`;

		REQUEST[ "url" ] 					= "https://www.instagram.com/graphql/query/" /*GLOBALS["instagram_api_parameters"]["graphql_url"]*/ + query_string;
		REQUEST[ "method" ] 				= "GET";
		REQUEST[ "include_credentials" ] 	= true;
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "x-ig-www-claim", "value" : x_ig_www_claim }
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

async function get_users_commented_post ( POST_DATA, x_ig_www_claim ,AFTER=undefined, FIRST_QTY=24, QUERY_HASH=/*GLOBALS["instagram_api_parameters"]["query_hash"]*/"bc3296d1ce80a24b1b6e40b1e72903f5", INCLUDE_REEL=true ) 
{
	if ( POST_DATA["shortcode"] ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_variables 	= {};
		let query_string 		= "";

		query_variables[ "shortcode" ] 		= POST_DATA["shortcode"];
		query_variables[ "first" ] 			= FIRST_QTY;

		if ( AFTER ) 
		{
			query_variables["after"] = AFTER;
		};

		query_string = `?query_hash=${ QUERY_HASH }&variables=${ encodeURIComponent( JSON.stringify( query_variables ) ) }`;

		REQUEST[ "url" ] 					= "https://www.instagram.com/graphql/query/" /*GLOBALS["instagram_api_parameters"]["graphql_url"]*/ + query_string;
		REQUEST[ "method" ] 				= "GET";
		REQUEST[ "include_credentials" ] 	= true;
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "x-ig-www-claim", "value" : x_ig_www_claim }
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

async function get_post_data ( POST_DATA, x_ig_www_claim ,AFTER=undefined, FIRST_QTY=24, QUERY_HASH=/*GLOBALS["instagram_api_parameters"]["query_hash"]*/"3eb224d64759a46f7083d3322a2458bd", INCLUDE_REEL=true ) 
{
	if ( POST_DATA["shortcode"] ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_variables 	= {};
		let query_string 		= "";

		query_variables[ "shortcode" ] 									= POST_DATA["shortcode"];
		query_variables[ "child_comment_count" ] 						= FIRST_QTY;
		query_variables[ "fetch_commechild_comment_countnt_count" ] 	= FIRST_QTY;
		query_variables["parent_comment_count"] 						= FIRST_QTY;
		query_variables["has_threaded_comments"] 						= true;

		if ( AFTER ) 
		{
			query_variables["after"] = AFTER;
		};

		query_string = `?query_hash=${ QUERY_HASH }&variables=${ encodeURIComponent( JSON.stringify( query_variables ) ) }`;

		REQUEST[ "url" ] 					= "https://www.instagram.com/graphql/query/" /*GLOBALS["instagram_api_parameters"]["graphql_url"]*/ + query_string;
		REQUEST[ "method" ] 				= "GET";
		REQUEST[ "include_credentials" ] 	= true;
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "x-ig-www-claim", "value" : x_ig_www_claim }
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

async function get_profile_followers ( PROFILE_DATA, x_ig_www_claim, AFTER=undefined, FIRST_QTY=24, QUERY_HASH=/*GLOBALS["instagram_api_parameters"]["query_hash"]*/"5aefa9893005572d237da5068082d8d5", INCLUDE_REEL=true ) 
{
	if ( PROFILE_DATA["id"] ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_variables 	= {};
		let query_string 		= "";

		query_variables[ "id" ] 									= PROFILE_DATA["id"];
		query_variables["first"] 									= FIRST_QTY;
		query_variables["include_reel"] 							= true;
		query_variables["fetch_mutual"] 							= true;

		if ( AFTER ) 
		{
			query_variables["after"] = AFTER;
		};

		query_string = `?query_hash=${ QUERY_HASH }&variables=${ encodeURIComponent( JSON.stringify( query_variables ) ) }`;

		REQUEST[ "url" ] 					= "https://www.instagram.com/graphql/query/" /*GLOBALS["instagram_api_parameters"]["graphql_url"]*/ + query_string;
		REQUEST[ "method" ] 				= "GET";
		REQUEST[ "include_credentials" ] 	= true;
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "x-ig-www-claim", "value" : x_ig_www_claim }
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

async function get_profile_following ( PROFILE_DATA, x_ig_www_claim, AFTER=undefined, FIRST_QTY=24, QUERY_HASH=/*GLOBALS["instagram_api_parameters"]["query_hash"]*/"3dec7e2c57367ef3da3d987d89f9dbc8", INCLUDE_REEL=true ) 
{
	if ( PROFILE_DATA["id"] ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_variables 	= {};
		let query_string 		= "";

		query_variables[ "id" ] 									= PROFILE_DATA["id"];
		query_variables["first"] 									= FIRST_QTY;
		query_variables["include_reel"] 							= true;
		query_variables["fetch_mutual"] 							= true;

		if ( AFTER ) 
		{
			query_variables["after"] = AFTER;
		};

		query_string = `?query_hash=${ QUERY_HASH }&variables=${ encodeURIComponent( JSON.stringify( query_variables ) ) }`;

		REQUEST[ "url" ] 					= "https://www.instagram.com/graphql/query/" /*GLOBALS["instagram_api_parameters"]["graphql_url"]*/ + query_string;
		REQUEST[ "method" ] 				= "GET";
		REQUEST[ "include_credentials" ] 	= true;
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "x-ig-www-claim", "value" : x_ig_www_claim }
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

async function get_profile_data ( USERNAME, x_ig_www_claim ) 
{
	if ( USERNAME ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_variables 	= {};
		let query_string 		= "";

		query_string = `${ USERNAME }/?__a=1`;

		REQUEST[ "url" ] 					= "https://www.instagram.com/" /*GLOBALS["instagram_api_parameters"]["instagram_url"]*/ + query_string;
		REQUEST[ "method" ] 				= "GET";
		REQUEST[ "include_credentials" ] 	= true;
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "x-ig-www-claim", "value" : x_ig_www_claim }
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

async function get_profile_posts ( PROFILE_DATA, x_ig_www_claim, AFTER=undefined, FIRST_QTY=24, QUERY_HASH=/*GLOBALS["instagram_api_parameters"]["query_hash"]*/"02e14f6a7812a876f7d133c9555b1151", INCLUDE_REEL=true ) 
{
	if ( PROFILE_DATA["id"] ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_variables 	= {};
		let query_string 		= "";

		query_variables[ "id" ]		= PROFILE_DATA["id"];
		query_variables["first"] 	= FIRST_QTY;

		if ( AFTER ) 
		{
			query_variables["after"] = AFTER;
		};

		query_string = `?query_hash=${ QUERY_HASH }&variables=${ encodeURIComponent( JSON.stringify( query_variables ) ) }`;

		REQUEST[ "url" ] 					= "https://www.instagram.com/graphql/query/" /*GLOBALS["instagram_api_parameters"]["graphql_url"]*/ + query_string;
		REQUEST[ "method" ] 				= "GET";
		REQUEST[ "include_credentials" ] 	= true;
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "x-ig-www-claim", "value" : x_ig_www_claim }
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

async function like_post ( POST_DATA, USER_TOKEN, x_ig_www_claim, x_instagram_ajax ) 
{
	if ( POST_DATA["id"] ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_variables 	= {};
		let path 				= "";

		path = `web/likes/${ POST_DATA["id"] }/like/`;

		REQUEST[ "url" ] 					= "https://www.instagram.com/" /*GLOBALS["instagram_api_parameters"]["instagram_url"]*/ + path;
		REQUEST[ "method" ] 				= "POST";
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "content-type", "value" : "application/x-www-form-urlencoded" },
			{ "key" : "x-ig-www-claim", "value" : x_ig_www_claim },
			{ "key" : "x-instagram-ajax", "value" : x_instagram_ajax },
			{ "key" : "x-csrftoken", "value" : USER_TOKEN } 
		];
		REQUEST[ "include_credentials" ] 	= true;


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

async function comment_post ( TEXT, POST_DATA, USER_TOKEN, x_ig_www_claim, x_instagram_ajax ) 
{
	if ( POST_DATA["id"] ) 
	{
		let REQUEST 			= {};
		let BODY 				= `comment_text=${ TEXT }&replied_to_comment_id=`;
		let XHR 				= null;
		let query_variables 	= {};
		let path 				= "";

		path = `web/comments/${ POST_DATA["id"] }/add/`;

		REQUEST[ "url" ] 					= "https://www.instagram.com/" /*GLOBALS["instagram_api_parameters"]["instagram_url"]*/ + path;
		REQUEST[ "method" ] 				= "POST";
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "content-type", "value" 		: "application/x-www-form-urlencoded" },
			{ "key" : "x-ig-www-claim", "value" 	: x_ig_www_claim },
			{ "key" : "x-instagram-ajax", "value" 	: x_instagram_ajax },
			{ "key" : "x-csrftoken", "value" 		: USER_TOKEN } 
		];
		REQUEST[ "include_credentials" ] 	= true;
		REQUEST[ "payload" ]				= BODY;

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

async function unlike_post ( POST_DATA, USER_TOKEN, x_ig_www_claim, x_instagram_ajax ) 
{
	if ( POST_DATA["id"] ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_variables 	= {};
		let path 				= "";

		path = `web/likes/${ POST_DATA["id"] }/unlike/`;

		REQUEST[ "url" ] 					= "https://www.instagram.com/" /*GLOBALS["instagram_api_parameters"]["instagram_url"]*/ + path;
		REQUEST[ "method" ] 				= "POST";
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "content-type", "value" : "application/x-www-form-urlencoded" },
			{ "key" : "x-ig-www-claim", "value" : x_ig_www_claim },
			{ "key" : "x-instagram-ajax", "value" : x_instagram_ajax },
			{ "key" : "x-csrftoken", "value" : USER_TOKEN } 
		];
		REQUEST[ "include_credentials" ] 	= true;


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

async function search_keyword ( SEARCH_TEXT, x_ig_www_claim, RANK_TOKEN=null, CONTEXT="blended", INCLUDE_REEL=true ) 
{
	if ( SEARCH_TEXT ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_string 		= "";

		query_string = `?context=${ CONTEXT }&query=${ SEARCH_TEXT }&include_reel=${ INCLUDE_REEL }`;

		if ( RANK_TOKEN != null )
			query_string += `&rank_token=${ RANK_TOKEN }`; 

		REQUEST[ "url" ] 					= "https://www.instagram.com/web/search/topsearch/" /*GLOBALS["instagram_api_parameters"]["graphql_url"]*/ + query_string;
		REQUEST[ "method" ] 				= "GET";
		REQUEST[ "include_credentials" ] 	= true;
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "x-ig-www-claim", "value" : x_ig_www_claim }
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

async function follow_user ( USER_DATA, USER_TOKEN, x_ig_www_claim, x_instagram_ajax ) 
{
	if ( USER_DATA[ "id" ] ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_variables 	= {};
		let path 				= "";

		path = `web/friendships/${ USER_DATA[ "id" ] }/follow/`;

		REQUEST[ "url" ] 					= "https://www.instagram.com/" /*GLOBALS["instagram_api_parameters"]["instagram_url"]*/ + path;
		REQUEST[ "method" ] 				= "POST";
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "content-type", "value" : "application/x-www-form-urlencoded" },
			{ "key" : "x-ig-www-claim", "value" : x_ig_www_claim },
			{ "key" : "x-instagram-ajax", "value" : x_instagram_ajax },
			{ "key" : "x-csrftoken", "value" : USER_TOKEN } 
		];
		REQUEST[ "include_credentials" ] 	= true;


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

async function unfollow_user ( USER_DATA, USER_TOKEN, x_ig_www_claim, x_instagram_ajax ) 
{
	if ( USER_DATA[ "id" ] ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_variables 	= {};
		let path 				= "";

		path = `web/friendships/${ USER_DATA[ "id" ] }/unfollow/`;

		REQUEST[ "url" ] 					= "https://www.instagram.com/" /*GLOBALS["instagram_api_parameters"]["instagram_url"]*/ + path;
		REQUEST[ "method" ] 				= "POST";
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "content-type", "value" : "application/x-www-form-urlencoded" },
			{ "key" : "x-ig-www-claim", "value" : x_ig_www_claim },
			{ "key" : "x-instagram-ajax", "value" : x_instagram_ajax },
			{ "key" : "x-csrftoken", "value" : USER_TOKEN } 
		];
		REQUEST[ "include_credentials" ] 	= true;


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

//gets username, is live, has stories and profile pic by using ID:
async function get_username_by_id ( USER_DATA, USER_TOKEN, x_ig_www_claim, QUERY_HASH=/*GLOBALS["instagram_api_parameters"]["query_hash"]*/"d4d88dc1500312af6f937f7b804c68c3", INCLUDE_REEL=false ) 
{
	if ( USER_DATA["id"] ) 
	{
		let REQUEST 			= {};
		let BODY 				= {};
		let XHR 				= null;
		let query_variables 	= {};
		let query_string 		= "";

		query_variables[ "user_id" ] 					= USER_DATA["id"];
		query_variables[ "include_chaining" ] 			= true;
		query_variables[ "include_reel" ] 				= true;
		query_variables[ "include_suggested_users" ] 	= true;
		query_variables[ "include_logged_out_extras" ] 	= true;
		query_variables[ "include_highlight_reels" ] 	= true;
		query_variables[ "include_live_status" ] 		= true;

		query_string = `?query_hash=${ QUERY_HASH }&variables=${ encodeURIComponent( JSON.stringify( query_variables ) ) }`;

		REQUEST[ "url" ] 					= "https://www.instagram.com/graphql/query/" /*GLOBALS["instagram_api_parameters"]["instagram_url"]*/ + query_string;
		REQUEST[ "method" ] 				= "GET";
		REQUEST[ "include_credentials" ] 	= true;
		REQUEST[ "headers_arr" ] 			= 
		[ 
			{ "key" : "x-ig-www-claim", "value" : x_ig_www_claim },
			{ "key" : "x-csrftoken", "value" : USER_TOKEN } 
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
					const TARGET_DATA = {};

					if ( JSON_PARSED["data"]["user"] && JSON_PARSED["data"]["user"] != null ) 
					{
						TARGET_DATA[ "id" ] 				= JSON_PARSED["data"]["user"]["reel"]["user"]["id"];
						TARGET_DATA[ "username" ] 			= JSON_PARSED["data"]["user"]["reel"]["user"]["username"];
						TARGET_DATA[ "profile_pic_url" ] 	= JSON_PARSED["data"]["user"]["reel"]["user"]["profile_pic_url"];
						TARGET_DATA[ "has_public_story" ] 	= JSON_PARSED["data"]["user"]["has_public_story"];
						TARGET_DATA[ "is_live" ] 			= JSON_PARSED["data"]["user"]["is_live"];
					};

					return TARGET_DATA;
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
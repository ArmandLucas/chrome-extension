
function create_alarm_info ( DELAY_IN_MINUTES, PERIOD_IN_MINUTES, WHEN ) 
{
	const AlarmCreateInfo = 
	{
		delayInMinutes 	: DELAY_IN_MINUTES, 	//number
		periodInMinutes : PERIOD_IN_MINUTES, 	//number
		when 			: WHEN 					//number past the epoch (e.g. Date.now() + n).
	};

	return AlarmCreateInfo;
};

function create_alarm_timeout ( NAME, TIME_IN_MINUTES ) 
{
	const alarm_info = create_alarm_info ( TIME_IN_MINUTES, null, null );

	chrome.alarms.create ( NAME, alarm_info );
};

function create_alarm_interval ( NAME, TIME_IN_MINUTES ) 
{
	const alarm_info = create_alarm_info ( null, parseInt(TIME_IN_MINUTES), null );

	chrome.alarms.create ( NAME, alarm_info );
};

function create_alarm_scheduled ( NAME, TIMESTAMP_EPOCH ) //number past the epoch (e.g. Date.now() + n).
{
	const alarm_info = create_alarm_info ( null, null, TIMESTAMP_EPOCH );

	chrome.alarms.create ( NAME, alarm_info );
};

function clear_all_alarms () 
{
	const CLEAR_ALARMS = new Promise 
	(
		( RESOLVE, REJECT ) => 
		{
			chrome.alarms.clearAll 
			( 
				() => 
				{
					RESOLVE ( true );
				} 
			);
		}
	).catch 
	(
		( ERROR ) => 
		{
			console.log ( `\n\n\n ERROR WHILE CLEARING ALL ALARMS: \n ERROR: ${ ERROR.message } \n\n\n` );
		}
	);

	return CLEAR_ALARMS;
};

function clear_alarm ( ALARM_NAME ) 
{
	const CLEAR_ALARM = new Promise 
	(
		( RESOLVE, REJECT ) => 
		{
			chrome.alarms.clear 
			(
				ALARM_NAME,
				( WAS_CLEARED ) => 
				{
					RESOLVE ( WAS_CLEARED );
				}
			);
		}
	).catch 
	(
		( ERROR ) => 
		{
			console.log ( `\n\n\n ERROR WHILE CLEARING ALARM: \n ERROR: ${ ERROR.message } \n\n\n` );
		}
	);

	return CLEAR_ALARM;
};

function get_alarm_info ( ALARM_NAME )
{
	const ALARM_INFO = new promise 
	(
		( RESOLVE, REJECT ) => 
		{
			chrome.alarms.get 
			(
				ALARM_NAME, 
				( ALARM_INFO ) => 
				{
					console.log ( ALARM_INFO );

					RESOLVE ( ALARM_INFO );
				}
			);
		}
	).catch 
	(
		( ERROR ) => 
		{
			console.log ( `\n\n\n ERROR WHILE GETTING ALARM INFO: \n ERROR: ${ ERROR.message } \n\n\n` );
		}
	);

	return ALARM_INFO;
};

function get_all_alarms_info () 
{
	const ALL_ALARMS = new Promise 
	(
		( RESOLVE, REJECT ) => 
		{
			chrome.alarms.getAll
			(
				( ALARMS_INFOS ) => 
				{
					RESOLVE ( ALARMS_INFOS );	
				}
			);
		}
	).catch 
	(
		( ERROR ) => 
		{
			console.log ( `\n\n\n ERROR WHILE GETTING ALL ALARMS INFOS: \n ERROR: ${ ERROR.message } \n\n\n` );
		}
	);

	return ALL_ALARMS;
};

async function fired_alarms_handler ( ALARM_NAME ) 
{
	const STORAGE_INFO 								= await get_storage ();
	const SELECTED_TASKS 							= STORAGE_INFO["SELECTED_TASKS"];
	const IS_ACCOUNTS_TO_CRAWL_UPDATE_TASK 			= ALARM_NAME.name.split ( "ACCOUNTS_TO_CRAWL_updater" ).length > 1;
	const IS_ACCOUNTS_TO_INTERACT_UPDATE_TASK 		= ALARM_NAME.name.split ( "ACCOUNTS_TO_INTERACT_updater" ).length > 1;
	const IS_FOLLOWED_ACCOUNTS_UPDATE_TASK 			= ALARM_NAME.name.split ( "FOLLOWED_ACCOUNTS_updater" ).length > 1;
	const IS_UNFOLLOWED_ACCOUNTS_UPDATE_TASK 		= ALARM_NAME.name.split ( "UNFOLLOWED_ACCOUNTS_updater" ).length > 1;
	const IS_INSTAGRAM_LOGIN_CHECK_TASK 			= ALARM_NAME.name.split ( "Check_instagram_user_is_logged" ).length > 1; 
	const IS_HEROKU_AUTH_CHECK_TASK 				= ALARM_NAME.name.split ( "Check_license_system" ).length > 1; 
	const IS_COMMENT_TASK 							= ALARM_NAME.name.split ( "Comment" ).length > 1;
	const IS_LIKE_TASK 								= ALARM_NAME.name.split ( "Like" ).length > 1;
	const IS_FOLLOW_TASK 							= ALARM_NAME.name.split ( "Follow" ).length > 1;
	const IS_UNFOLLOW_TASK 							= ALARM_NAME.name.split ( "Unfollow" ).length > 1;
	const IS_ON_HOLD_TASK 							= ALARM_NAME.name.split ( "On Hold" ).length > 1;
	const IS_UPDATE_STATS_TASK 						= ALARM_NAME.name.split ( "UPDATE_STATS" ).length > 1;
	let IS_INSTAGRAM_LOGGED_IN 						= STORAGE_INFO[ "INSTAGRAM_INIT_DATA" ]["is_logged_in"];
	let IS_AUTHENTICATED 							= STORAGE_INFO["heroku_credentials"]["is_licenced"];

	if ( STORAGE_INFO[ "extension_state" ] == "on" ) 
	{
		if ( IS_HEROKU_AUTH_CHECK_TASK == true ) //check the license system auth.
		{
			IS_AUTHENTICATED = await check_license (); 
		}
		if ( IS_INSTAGRAM_LOGIN_CHECK_TASK == true ) //check if extension user is logged in to instagram.
		{
			IS_INSTAGRAM_LOGGED_IN = await is_user_logged_in ();	
		};

		if ( IS_AUTHENTICATED == true ) 
		{
			if ( IS_INSTAGRAM_LOGGED_IN == true ) 
			{
				if ( IS_ON_HOLD_TASK == false ) 
				{
					if ( IS_ACCOUNTS_TO_CRAWL_UPDATE_TASK == true ) 
					{
						const STORAGE_INFO 				= await get_storage ();
						const CURRENT_INSTAGRAM_ACC_ID 	= STORAGE_INFO["INSTAGRAM_INIT_DATA"]["ds_user_id"];
						const DELAY 					= 1500;

						for ( let [user, user_value] of Object.entries ( STORAGE_INFO[ "SAVED_ACCOUNTS_TO_CRAWL" ][ CURRENT_INSTAGRAM_ACC_ID ] ) ) 
						{
							await update_ACCOUNTS_TO_CRAWL_DATA ( user_value, DELAY );
						};
					};

					if ( IS_ACCOUNTS_TO_INTERACT_UPDATE_TASK == true ) 
					{
						update_SAVED_ACCOUNTS_TO_INTERACT ();
					};

					if ( IS_FOLLOWED_ACCOUNTS_UPDATE_TASK == true ) 
					{
						update_FOLLOWED_ACCOUNTS ();
					};

					if ( IS_UNFOLLOWED_ACCOUNTS_UPDATE_TASK == true ) 
					{
						update_UNFOLLOWED_ACCOUNTS ();
					};

					if ( IS_COMMENT_TASK == true && SELECTED_TASKS["Comment"]["active"] == true ) 
					{
						const STORAGE_INFO 				= await get_storage ();
						const CURRENT_INSTAGRAM_ACC_ID 	= STORAGE_INFO["INSTAGRAM_INIT_DATA"]["ds_user_id"];
						const COMMENTS_TEMPLATES 		= STORAGE_INFO["COMMENTS_TEMPLATES"][ CURRENT_INSTAGRAM_ACC_ID ];
						const DELAY 					= 1800; 
						const DELAY_IF_RATE_LIMITED 	= 1500;

						for ( let [user_id, user_data] of Object.entries ( STORAGE_INFO["SAVED_ACCOUNTS_TO_INTERACT"][ CURRENT_INSTAGRAM_ACC_ID ] ) ) 
						{
							const last_3_posts = await get_last_3_posts ( user_data );

							if ( last_3_posts ) 
							{
								for ( let [post_id, post_data] of Object.entries ( last_3_posts ) ) 
								{
									const already_commented = STORAGE_INFO["INTERACTED_POSTS"][ CURRENT_INSTAGRAM_ACC_ID ]["COMMENTED"][ post_id ] ? true : false;

									if ( already_commented == false && Object.values (COMMENTS_TEMPLATES).length > 0 ) 
									{
										const TEMPLATE = await get_random_obj_property ( COMMENTS_TEMPLATES );

										ig_action_comment_post ( TEMPLATE["text"].split ( "${username}" ).join ( "@" + user_data["username"] ), post_data );
										return true;
									}
									else 
									{
										continue;
									};
								};

								await delay ( DELAY );
							}
							else 
							{
								await delay ( DELAY_IF_RATE_LIMITED );
								break;
							};
						};
					};

					if ( IS_LIKE_TASK == true && SELECTED_TASKS["Like"]["active"] == true ) 
					{
						const STORAGE_INFO 				= await get_storage ();
						const CURRENT_INSTAGRAM_ACC_ID 	= STORAGE_INFO["INSTAGRAM_INIT_DATA"]["ds_user_id"];
						const DELAY 					= 1800;
						const DELAY_IF_RATE_LIMITED 	= 1500;

						for ( let [user_id, user_data] of Object.entries ( STORAGE_INFO["SAVED_ACCOUNTS_TO_INTERACT"][ CURRENT_INSTAGRAM_ACC_ID ] ) ) 
						{
							const last_3_posts = await get_last_3_posts ( user_data );

							if ( last_3_posts ) 
							{
								for ( let [post_id, post_data] of Object.entries ( last_3_posts ) ) 
								{
									const already_liked = STORAGE_INFO["INTERACTED_POSTS"][ CURRENT_INSTAGRAM_ACC_ID ]["LIKED"][ post_id ] ? true : false;

									if ( already_liked == false ) 
									{									
										ig_action_like_post ( post_data );
										return true
									}
									else 
									{
										continue;
									};
								};

								await delay ( DELAY );
							}
							else 
							{
								await delay ( DELAY_IF_RATE_LIMITED );
								break;
							};
						};
					};

					if ( IS_FOLLOW_TASK == true && SELECTED_TASKS["Follow"]["active"] == true ) 
					{
						const STORAGE_INFO 				= await get_storage ();
						const CURRENT_INSTAGRAM_ACC_ID 	= STORAGE_INFO["INSTAGRAM_INIT_DATA"]["ds_user_id"];

						for ( let [user_id, user_data] of Object.entries ( STORAGE_INFO[ "SAVED_ACCOUNTS_TO_INTERACT" ][ CURRENT_INSTAGRAM_ACC_ID ] ) ) 
						{
							if ( user_data["user_followed_by_me"] == false ) 
							{
								ig_action_follow_user ( user_data );
								return true;
							}
							else 
							{
								continue;
							};
						};
					};

					if ( IS_UNFOLLOW_TASK == true && SELECTED_TASKS["Unfollow"]["active"] == true ) 
					{
						const STORAGE_INFO 				= await get_storage ();
						const CURRENT_INSTAGRAM_ACC_ID 	= STORAGE_INFO["INSTAGRAM_INIT_DATA"]["ds_user_id"];

						for ( let [user_id, user_data] of Object.entries ( STORAGE_INFO[ "SAVED_ACCOUNTS_TO_INTERACT" ][ CURRENT_INSTAGRAM_ACC_ID ] ) ) 
						{
							if ( user_data["user_unfollowed_by_me"] == false ) 
							{
								ig_action_follow_user ( user_data );
								return true;
							}
							else 
							{
								continue;
							};
						};
					};

					if ( IS_ON_HOLD_TASK == true ) 
					{
						const STORAGE_INFO = await get_storage ();

						if ( STORAGE_INFO[ "On Hold" ] == "on" ) 
						{
							STORAGE_INFO[ "On Hold" ] = "off";	
						}
						else 
						{
							STORAGE_INFO[ "On Hold" ] = "on";	
						};

						await set_storage ( { "On Hold" : STORAGE_INFO[ "On Hold" ] } );

						await save_tasks_log ( `ON HOLD IS : ${ STORAGE_INFO[ "On Hold" ] }` );
					};

					if ( IS_UPDATE_STATS_TASK == true ) 
					{
						update_stats ();
					};
				};    
			};
		};
	};
};

async function set_alarms () 
{
	const STORAGE_INFO 	= await get_storage ();

	await clear_all_alarms ();

	for ( let [alarm, alarm_value] of Object.entries ( GLOBALS["alarms"] ) ) 
	{
		if ( alarm_value["storage_id"] ) 
		{
			STORAGE_INFO[ "OPTIONS" ][ alarm_value["storage_id"] ][ "alarm_id" ] = alarm_value["id"];
			
			await create_alarm_interval ( alarm_value["id"], STORAGE_INFO[ "OPTIONS" ][ alarm_value["storage_id"] ]["value"] );	
		}
		else 
		{
			await create_alarm_interval ( alarm_value["id"], alarm_value["time_in_minutes"] );	
		};
	};

	await set_storage ( { "OPTIONS" : STORAGE_INFO[ "OPTIONS" ] } )

	console.log('Alarms created');
};

// LISTENER :

// chrome.alarms.onAlarm.addListener(listener: function);

chrome.alarms.onAlarm.addListener ( fired_alarms_handler );

console.log ( "alarms.js loaded" );
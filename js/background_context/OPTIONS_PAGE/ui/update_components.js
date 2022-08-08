function create_state_info_item_component ( STATE ) 
{
	const COMPONENT = components.create 
	( 
		GLOBALS.background_context.ui.components.state_info_item["html"], 
		[ "fade-in" ], 
		{} 
	);	

	COMPONENT.getElementsByTagName ( "text" )[ 0 ].innerText = STATE["value"];

	return COMPONENT;
};

function create_settings_item_component ( STATE ) 
{
	if ( STATE["type"] ) 
	{
		const COMPONENT = components.create 
		( 
			GLOBALS.background_context.ui.components.OPTIONS_SETTINGS[ STATE["type"] ]["html"], 
			[ "fade-in" ], 
			{
				"option_id" : STATE["option_id"]
			} 
		);	

		COMPONENT.querySelectorAll ( '[id="option_title"]' )[0].innerText = STATE["title"];
		COMPONENT.querySelectorAll ( '[id="option_value"]' )[0].setAttribute ( "option_data", JSON.stringify ( STATE ) );

		if ( STATE["type"] == "input" ) 
		{
			COMPONENT.querySelectorAll ( '[id="option_value"]' )[0].setAttribute ( "option_id", STATE["option_id"] );
			COMPONENT.querySelectorAll ( '[id="option_value"]' )[0].value = STATE["value"];

			//FOR VALIDATE OPTION INPUT
			for ( const [listener_key, listener_value] of Object.entries (GLOBALS[ "listeners" ][ "DELAY_OPTION_VALIDATOR" ]) ) 
			{
				COMPONENT.addEventListener ( listener_key, listener_value );
			};
		}
		else if ( STATE["type"] == "toggle" )
		{
			COMPONENT.querySelectorAll ( '[id="option_value"]' )[0].checked = STATE["active"];
		};

		return COMPONENT;
	};
};

function create_welcome_screen_action_component ( ACTION ) 
{
	const COMPONENT = components.create 
	( 
		GLOBALS.background_context.ui.components.welcome_screen_action[ ACTION["type"] ]["html"], 
		[ "fade-in" ], 
		{ 
			"id" : `${ ACTION["id"] }`
		} 
	);	

	if ( ACTION["type"] == "button" ) 
	{
		COMPONENT.getElementsByTagName ( "button" )[ 0 ].innerHTML = ACTION["value"];
	};
	if ( ACTION["type"] == "input" ) 
	{
		COMPONENT.getElementsByTagName ( "input" )[ 0 ].setAttribute ( "placeholder", ACTION["value"] );
	};

	if ( GLOBALS[ "listeners" ][ ACTION["id"] ] ) 
	{
		//sets listeners for the component:
		for ( const [listener_key, listener_value] of Object.entries (GLOBALS[ "listeners" ][ ACTION["id"] ]) ) 
		{
			COMPONENT.addEventListener ( listener_key, listener_value );
		};
	};

	return COMPONENT;
};

function create_main_action_button_component ( ACTION ) 
{
	const COMPONENT = components.create 
	( 
		GLOBALS.background_context.ui.components.main_actions["html"], 
		[ "fade-in" ], 
		{ 
			"id" : `${ ACTION["id"] }`
		} 
	);	

	COMPONENT.getElementsByTagName ( "button" )[ 0 ].innerHTML = ACTION[ "value" ];

	//sets listeners for the component:
	for ( const [listener_key, listener_value] of Object.entries (GLOBALS[ "listeners" ][ ACTION["id"] ]) ) 
	{
		COMPONENT.addEventListener ( listener_key, listener_value );
	};

	return COMPONENT;
};

async function show_logged_tasks () 
{
	const STORAGE_INFO 		= await get_storage ( GLOBALS.storage_keys );
	const TASKS_LOG_BUCKET 	= document.querySelectorAll ( '[id="tasks_logs"]' )[0].getElementsByTagName("textarea")[0];

	TASKS_LOG_BUCKET.value = STORAGE_INFO["TASKS_LOG"];
	TASKS_LOG_BUCKET.scroll ( 0,TASKS_LOG_BUCKET.scrollHeight );
};


function update_main_action_component () 
{
	const inction_trgt = document.querySelectorAll('[id="main_actions"]')[0];

	inction_trgt.innerHTML = `<div
								style="
								display: flex;
								flex-direction: row;
								align-items: center;
								justify-content: space-between;
								width: 96%;
								">
							</div>`;

	//add main actions buttons components:
	for ( let [item, item_val] of Object.entries ( GLOBALS.background_context.ui.options_page.main_actions ) ) 
	{
		const cmpnt = create_main_action_button_component ( item_val );

		inject_component ( cmpnt, inction_trgt.children[0] );
	};
};

function update__welcome_screen_actions_component () 
{
	const inction_trgt = document.querySelectorAll('[id="welcome_screen_actions"]')[0];

	inction_trgt.innerHTML = `<div style="
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: space-evenly;
								align-self: center;
								background-color: #380a2100;
								width: 178px;
								height: 135px;
								">
							</div>`;

	//add welcome screen actions buttons components:
	for ( let [item, item_val] of Object.entries ( GLOBALS.background_context.ui.options_page.welcome_screen_actions ) ) 
	{
		const cmpnt = create_welcome_screen_action_component ( item_val );

		inject_component ( cmpnt, inction_trgt.children[0] );
	};
};

async function update_states_info_component () 
{
	const STORAGE_INFO 		= await get_storage ();
	const app_states 		= GLOBALS.background_context.ui.options_page.states_info;
	const inction_trgt 		= document.getElementsByTagName ( "a-states-info" )[0];

	inction_trgt.innerHTML = `<div style="
	                            display: flex;
	                            flex-direction: row;
	                            align-items: center;
	                            justify-content: space-between;
	                            height: 100%;
	                            ">
	                           </div>`;

	await delay ( 300 );

	//add states info components:
	for ( let [item,item_val] of Object.entries ( app_states ) ) 
	{
		const cmpont = create_state_info_item_component ( item_val );	
		const inction_trgt = document.getElementsByTagName ( "a-states-info" )[0];

		if ( STORAGE_INFO[ item ] == "on" ) 
		{
			set_state_info_dot_color ( cmpont, GLOBALS.status_colors["on"] );
		}
		else 
		{
			set_state_info_dot_color ( cmpont, GLOBALS.status_colors["off"] );	
		};

		inject_component ( cmpont, inction_trgt.children[0] );
	};
};

async function update_settings_item_component () 
{
	const STORAGE_INFO 		= await get_storage ();
	const inction_trgt 		= document.getElementsByTagName ( "settings-popup" )[0];
	const OPTIONS 			= STORAGE_INFO["OPTIONS"];

	inction_trgt.getElementsByTagName ( "content" )[ 0 ].outerHTML = `<content style="
												                        display: flex;
												                        width: 100%;
												                        height: 100%;
												                        flex-direction: column;
												                        overflow-y : scroll;
												                        ">
												                       	</content>`

	for ( let option_value of Object.values ( OPTIONS ).filter (a=>a["type"] == "toggle") ) 
	{
		const cmpont = create_settings_item_component ( option_value );

		inject_component ( cmpont, inction_trgt.getElementsByTagName ( "content" )[ 0 ] );
	};

	for ( let option_value of Object.values ( OPTIONS ).filter (a=>a["type"] == "input") ) 
	{
		const cmpont = create_settings_item_component ( option_value );

		inject_component ( cmpont, inction_trgt.getElementsByTagName ( "content" )[ 0 ] );
	};
};

function set_state_info_dot_color ( STATE_INFO_COMPONENT, COLOR ) 
{
	const status_dot = STATE_INFO_COMPONENT.getElementsByTagName ( "status-dot" )[ 0 ];

	change_element_background ( status_dot, COLOR );
};
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function set_app_logo_icons () 
{
	const app_logo_icons = document.getElementsByClassName ( "app_logo_icon" );

	for ( let icon of Object.values ( app_logo_icons ) ) 
	{
		icon.style.backgroundImage = `url("${GLOBALS.extension_icon}")`;
	};
};

function set_appnames ()
{
	const appnames = document.getElementsByClassName ( "app_name_brand" );

	for ( let appname of Object.values ( appnames ) ) 
	{
		appname.innerText = GLOBALS.extension_name;
	};
};

function show_splash_screen () 
{
	const SPLASH_SCREEN 	= document.querySelectorAll('[id="welcome-screen"]')[0];
	const MENU 				= document.getElementsByTagName ( "app-menu" )[0];

	show_element ( SPLASH_SCREEN );
	hide_element ( MENU );
};

function hide_splash_screen () 
{
	const SPLASH_SCREEN 	= document.querySelectorAll('[id="welcome-screen"]')[0];
	const MENU 				= document.getElementsByTagName ( "app-menu" )[0];

	show_element ( MENU );
	hide_element ( SPLASH_SCREEN );
};

function set_listeners () 
{
	const SETTINGS_POPUP = document.getElementsByTagName ( "settings-popup" )[0];
	
	//settings popup components listeners:
	for ( let listener in GLOBALS.listeners["close_settings_popup"] ) 
	{
		SETTINGS_POPUP.getElementsByTagName ( "quit" )[0].addEventListener ( listener, GLOBALS.listeners["close_settings_popup"][ listener ] );
	};
	//open settings btn listener:
	for ( let listener in GLOBALS.listeners["open_settings_popup"] ) 
	{
		document.getElementsByTagName ( "a-options-icon" )[0].addEventListener ( listener, GLOBALS.listeners["open_settings_popup"][ listener ] );
	};
	//clear tasks logs btn listener:
	for ( let listener in GLOBALS.listeners["clear_all_tasks_logs"] ) 
	{
		document.querySelectorAll ( '[id="clear_log"]' )[0].addEventListener ( listener, GLOBALS.listeners["clear_all_tasks_logs"][ listener ] );
	};
	//add comment template listener :
	if ( document.querySelectorAll ( '[id="add_comment"]' )[0] ) 
	{
		for ( let listener in GLOBALS.listeners["CREATE_COMMENT_TEMPLATE"] ) 
		{
			document.querySelectorAll ( '[id="add_comment"]' )[0].addEventListener ( listener, GLOBALS.listeners["CREATE_COMMENT_TEMPLATE"][ listener ] );
		};
	};
};
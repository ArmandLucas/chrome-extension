function load_scripts_in_popup () 
{
	return new Promise 
	(
		( RESOLVE, REJECT ) =>
		{
			const EXTENSION_MANIFEST 				= chrome.runtime.getManifest ();
			const SCRIPTS_FOR_POPUP_PAGE 			= EXTENSION_MANIFEST.background["scripts_for_popup_page"];
			const inction_trgt 						= document.body;

			for ( let i = 0; i < SCRIPTS_FOR_POPUP_PAGE.length; i++ ) 
			{
				setTimeout 
				(
					() => 
					{
						const script = SCRIPTS_FOR_POPUP_PAGE[i];

						const SCRIPT_ELEMENT = document.createElement ( "script" );

						SCRIPT_ELEMENT.type = "text/javascript";
						SCRIPT_ELEMENT.src = script;
						SCRIPT_ELEMENT.addEventListener
						(
							"load",
							() => 
							{
								console.log ( script );

								if ( i >= SCRIPTS_FOR_POPUP_PAGE.length - 1 ) 
								{
									RESOLVE ( true );
								};
							}
						);

						inction_trgt.append ( SCRIPT_ELEMENT );
					},
					50 * i
				);
			};
		}
	);
};

document.addEventListener 
(
	"readystatechange",
	async ( EVENT ) => 
	{
		if ( document.readyState == "complete" ) 
		{
			await load_scripts_in_popup ();

			new Promise 
			(
				async () => 
				{
					const STORAGE_INFO = await get_storage ();

					if ( STORAGE_INFO[ "start_app_confirmed" ] == false ) 
					{
						status_header.inject ();
						set_app_logo_icons ( { "heartbeat" : false } );
						set_appnames ();
						show_splash_screen ();
						update__welcome_screen_actions_component ();
						update_main_action_component ();
						await update_settings_item_component ();
						await set_listeners ( document.body );
					}
					else 
					{
						status_header.inject ();
						set_app_logo_icons ( { "heartbeat" : false } );
						set_appnames ();
						hide_splash_screen ();
						update_main_action_component ();
						await update_settings_item_component ();
						await set_listeners ( document.body );
					};
				}
			);
		};
	}
);
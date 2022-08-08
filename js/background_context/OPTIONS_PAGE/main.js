new Promise 
(
	async () => 
	{
		const STORAGE_INFO 	= await get_storage ( GLOBALS.storage_keys );

		status_header.inject ();

		//handle the welcome screen visibilty:
		if ( STORAGE_INFO[ "start_app_confirmed" ] == false ) 
		{
			show_splash_screen ();
			update__welcome_screen_actions_component ();
		}
		else 
		{
			const is_logged_in = await message_to_background ( "IS_USER_LOGGED_IN" );
			
			if ( is_logged_in == true ) 
			{
				hide_splash_screen ();
			}
			else 
			{
				show_splash_screen ();

				status_header.set_text ( "You need to be logged in Instagram, try again and reload" )
				change_element_background ( status_header.element, GLOBALS["status_colors"]["warning"] );
				show_element ( status_header.element );
			};
		};

		set_app_logo_icons ();
		set_appnames ();
		show_logged_tasks ();
		update_main_action_component ();
		update_states_info_component ();
		update_settings_item_component ();
		set_listeners ();
	}
);
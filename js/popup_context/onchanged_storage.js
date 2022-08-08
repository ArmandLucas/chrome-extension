//set scannner changes states changes listener:
chrome.storage.onChanged.addListener 
(
	async ( KEYS ) => 
	{
		if ( KEYS[ "start_app_confirmed" ] ) 
		{
			location.reload ();
		};
		if ( KEYS[ "TASKS_LOG" ] ) 
		{
			show_logged_tasks ();
		};
		if ( KEYS[ "clicked_elements_history" ] ) 
		{
			await show_clicked_elements_history ();
		};
		if ( KEYS[ "extension_state" ] ) 
		{
			update_states_info_component ();
			message_to_background ( "RELOAD_TABS", { "url_match" : [ "twitch.tv" ] } );
		};
		if ( KEYS[ "OPTIONS" ] ) 
		{
			if ( KEYS[ "OPTIONS" ]["newValue"] ) 
			{

			};
		};
	}
);
//storage keys:
new Promise 
(
	async ( RESOLVE, REJECT ) => 
	{
		const STORAGE_INFO = await get_storage ( GLOBALS.storage_keys );

		for ( let [storage_name, storage_value] of Object.entries ( GLOBALS.storage_keys ) ) 
		{
			if ( STORAGE_INFO[ storage_name ] == null || STORAGE_INFO[ storage_name ] == undefined ) 
			{
				STORAGE_INFO[ storage_name ] = storage_value;
			};
		};

		// extension app options :
		for ( let option_item in GLOBALS.app_options ) 
		{
			if ( STORAGE_INFO["OPTIONS"][ option_item ] == null || STORAGE_INFO["OPTIONS"][ option_item ] == undefined ) 
			{
				STORAGE_INFO["OPTIONS"][ option_item ] = GLOBALS.app_options[ option_item ];
			};
		};

		await set_storage ( STORAGE_INFO );

		//await set_alarms ();
	}
);

/*
chrome.browserAction.onClicked.addListener
(
	() => 
	{
		chrome.runtime.openOptionsPage ();
	}
);
*/
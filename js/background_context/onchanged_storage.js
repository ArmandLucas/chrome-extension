//set scannner changes states changes listener:
chrome.storage.onChanged.addListener 
(
	async ( KEYS ) => 
	{
		if ( KEYS[ "start_app_confirmed" ] ) 
		{
			if ( KEYS[ "start_app_confirmed" ]["newValue"] == true ) 
			{

			};
		};
		if ( KEYS[ "OPTIONS" ] ) 
		{
			for ( let [option_name, option_value] of Object.entries ( KEYS[ "OPTIONS" ]["newValue"] ) ) 
			{
				/*
				if ( option_value["alarm_id"] != null ) 
				{	
					await create_alarm_interval ( option_value["alarm_id"], option_value["value"] );
				};
				*/
			};
		};
	}
);
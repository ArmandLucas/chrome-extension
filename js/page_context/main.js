document.addEventListener
(
	"readystatechange",
	async () => 
	{
		if ( document.readyState == "complete" ) 
		{
			const STORAGE_INFO = await get_storage ();

			if ( STORAGE_INFO["start_app_confirmed"] == true && STORAGE_INFO["extension_state"]["active"] == true ) 
			{
				inject_search_channels_by_keyword_btn ();
			};
		};
	}
);
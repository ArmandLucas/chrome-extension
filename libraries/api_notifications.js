function create_notification ( TITLE, MESSAGE, ID=(GLOBALS.extension_name.split ( "  " ).join ( "_" ) + "_" + Date.now ()), BUTTONS ) 
{
	const NOTIFICATION_DATA = 
	{
		notificationId : ID,
		options : 
		{
			buttons : BUTTONS ||
			[
				//{ title : "Check Post" }
			],
			iconUrl : GLOBALS.extension_icon,
			eventTime : Date.now (),
			priority : 2, //Priority ranges from -2 to 2. -2 is lowest priority. 2 is highest. Zero is default
			requireInteraction : false,
			title : TITLE,
			message : MESSAGE,
			type : "basic" //"basic", "image", "list", or "progress
		}
	};	
	const NOTIFIED = new Promise 
	(
		( RESOLVE, REJECT ) => 
		{
			chrome.notifications.create 
			( 
				NOTIFICATION_DATA.notificationId, 
				NOTIFICATION_DATA.options, 
				() => 
				{
					RESOLVE ( true );
				} 
			);
		}
	)
	.catch 
	(
		( ERROR ) => 
		{
			console.log ( `\n\n\n ERROR WHILE create_notification : \n\n ${ ERROR.message } \n\n\n` );
		}
	);

	return NOTIFIED;
};

async function notification_buttons_clicked_handler ( NOTIFICATION_ID, BUTTON_INDEX ) 
{
	//set a mthod for when user click button inside notification.
	if ( NOTIFICATION_ID == "car_price_match_found" ) 
	{
		if ( BUTTON_INDEX == 0 ) 
		{
			const created_tab = await create_tab ( { "active":true, "url": "https://cryptocars.me/play/#/marketplace" } );
			await remove_tab ( [ REFRESHING_TAB_ID ] );
		};
	};
};

//set listener:
chrome.notifications.onButtonClicked.addListener ( notification_buttons_clicked_handler );
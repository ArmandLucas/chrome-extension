function set_badge ( text_, color, tab_id, callback ) 
{
	chrome.browserAction.setBadgeText 
	(
		{ text : text_, tabId : tab_id }, 
		() => 
		{
			if ( color ) 
			{
				set_badge_color ( color, tab_id, callback );
			}
			else if ( callback && callback != null ) 
			{
				callback ();
			};
		}
	);
};

function set_badge_color ( color, tab_id, callback ) 
{
	chrome.browserAction.setBadgeBackgroundColor
	(
		{ color : color, tabId : tab_id }, 
		callback
	);
};
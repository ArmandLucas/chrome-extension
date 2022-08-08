const target_tabs_url = 
[
	".apollo.io"
];

chrome.runtime.onInstalled.addListener
(
	async ( REASON_DETAILS ) => 
	{
		await delay ( 1300 );
		reload_all_target_tabs ( target_tabs_url );
	}
);
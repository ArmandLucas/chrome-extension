function print_response ( response ) 
{
    if ( response ) 
    {
        console.log( response );
    };
};

function message_to_background ( method, payload ) 
{
    const com = 
    {
        method  : method,
        payload : payload
    };
    const RESPONSE = new Promise 
    (
        ( RESOLVE, REJ ) => 
        {
            chrome.runtime.sendMessage 
            ( 
                com, 
                ( RESPONSE_GOTTEN ) => 
                {
                    RESOLVE ( RESPONSE_GOTTEN );
                    print_response ( RESPONSE_GOTTEN );
                } 
            );
        }
    );

    return RESPONSE;
};

function message_to_contentscript ( method, payload, callback ) 
{
    const com = 
    {
        method  : method,
        payload : payload
    };

    callback = !callback || callback == null
        ? print_response
        : callback;

    chrome.tabs.query 
    (
        {},
        ( TABS ) =>      
        {
            new Promise 
            (
                async ( RESOLVE, REJECT ) => 
                {
                    //applies message sending for all tabs:
                    const excluded_urls = [ "chrome://extensions" ]; // <- excluing tabs with this domain

                    for ( let tab_item of TABS ) 
                    {
                        if ( tab_item.url && tab_item.active == true ) 
                        {
                            for ( let exclude_key of excluded_urls ) 
                            {
                                const is_excluded_page = tab_item.url.split ( exclude_key ).length > 1;

                                if ( is_excluded_page == false ) 
                                {
                                    const tab_response = await sendMessage_to_tab ( tab_item.id, com, null );

                                    RESOLVE ( tab_response );

                                    if ( chrome.runtime.lastError ) 
                                    {
                                        console.log ( JSON.stringify(chrome.runtime.lastError) );
                                    };
                                };
                            };
                        };
                    };
                }
            );
        }
    );
};

function handle_request ( message, sender, sendResponse ) 
{
    const method    = message.method;
    const payload   = message.payload; 

    switch ( method ) 
    {
        case "UPDATE_GOTTEN_FOLLOWING_USERS_COUNT_IN_SPLASH_SCREEN" :
            set_app_logo_icons ( { "heartbeat" : true } );
            set_appnames ( `Following users gotten : ${ payload["count"] }` );
            sendResponse ( "ok" );
            break;
        case "HIDE_SPLASH_SCREEN" :
            hide_splash_screen ();
            set_app_logo_icons ( { "heartbeat" : false } );
            set_appnames ();
            sendResponse ( "ok" );
        case "SHOW_SPLASH_SCREEN" :
            show_splash_screen ();
            set_app_logo_icons ( { "heartbeat" : false } );
            set_appnames ();
            sendResponse ( "ok" );
            break;
        case "SHOW_TWITTER_USER_ITEM_ALERT" :
            show_twitter_user_item_alert ( JSON.parse( payload["user_data"] ), payload["text"] );
            sendResponse ( "ok" );
            break;
    };

    return true;
};

chrome.runtime.onMessage.addListener ( handle_request );
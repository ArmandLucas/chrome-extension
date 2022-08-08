function print_response ( response ) 
{
    if ( response ) 
    {
        console.log( response );
    };
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

function message_to_popup ( method, payload ) 
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
                    if ( chrome.runtime.lastError ) 
                    {
                        console.log ( chrome.runtime.lastError );
                    };

                    RESOLVE ( RESPONSE_GOTTEN );
                    print_response ( RESPONSE_GOTTEN );
                } 
            );
        }
    );

    return RESPONSE;
};

function handle_request ( message, sender, sendResponse ) 
{
    const method    = message.method;
    const payload   = message.payload; 

    switch ( method ) 
    {
        case "SHOW_ALERT":
            alert ( payload.alert_message );
            sendResponse ( "ok" );
            break;
        case "SET_BADGE" :
            set_badge ( payload.badge_icon, payload.badge_color );
            sendResponse ( "ok" );
            break;
        case "CLEAR_SAVED_TASKS_LOGS" :
            clear_saved_log ();
            sendResponse ("ok");
            break;
        case "CREATE_NEW_TAB" :     
            new Promise 
            (
                async ( RESOLVE, REJECT ) => 
                {
                    const TAB_PROPS = 
                    {
                        "url" : payload["url"],
                        "active" : payload["active"] ? payload["active"] : true
                    };
                    const CREATED_TAB = await create_tab ( TAB_PROPS );

                    //send the created tab details data stringified
                    sendResponse ( JSON.stringify ( CREATED_TAB ) );
                }
            );
            return true;
        case "CREATE_DESKTOP_NOTIFICATION" : 
            const NOTIFICATION_BODY = 
            {
                "title" : payload["title"],
                "message" : payload["message"],
                "id" : payload["id"],
                "buttons" : payload["buttons"]
            };

            create_notification ( NOTIFICATION_BODY["title"], NOTIFICATION_BODY["message"], NOTIFICATION_BODY["id"], NOTIFICATION_BODY["buttons"] );

            sendResponse ( "ok" );
            break;
        case "RELOAD_TABS" : 
            new Promise 
            (
                async ( RESOLVE, REJECT ) => 
                {
                    const TABS = await query_tabs ( {} );

                    for ( let tab_item of TABS ) 
                    {
                        if ( payload["url_match"] ) //if this option present will only reload matching certain tabs based on given keywords.
                        {
                            for ( let target_match of payload["url_match"] ) 
                            {
                                const IS_MATCHED_TAB_URL = tab_item["url"].split ( target_match ).length > 1;

                                if ( IS_MATCHED_TAB_URL == true ) 
                                {
                                    reload_tab ( tab_item["id"] );
                                }
                                else 
                                {
                                    continue;
                                };
                            };
                        }
                        else 
                        {
                            reload_tab ( tab_item["id"] );
                        };
                    };

                    sendResponse ( "ok" );
                }
            );
            return true;
    };

    return true;
};

chrome.runtime.onMessage.addListener ( handle_request );
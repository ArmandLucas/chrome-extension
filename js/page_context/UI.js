const components = 
{
	create : ( HTML, CLASSLIST=[], ATTRIBUTES={}, INNERTEXTS_DATA={} ) => 
	{
		const TAG_NAME 				= HTML.match ( /<([^\s>]+)(\s|>)+/ )[1];
		const COMPONENT_CONTAINER 	= document.createElement ( "CMPNT-CONTAINER" ); COMPONENT_CONTAINER.innerHTML = HTML;
		const COMPONENT 			= COMPONENT_CONTAINER.getElementsByTagName ( TAG_NAME )[ 0 ];

		for ( let class_item of CLASSLIST ) 
		{
			COMPONENT.classList.add ( class_item );	
		};
		for ( let [attr_key, attr_val] of Object.entries ( ATTRIBUTES ) ) 
		{
			COMPONENT.setAttribute ( attr_key, attr_val );
		};
		for ( let [target_selector, innertext_val] of Object.entries ( INNERTEXTS_DATA ) ) 
		{
			COMPONENT.querySelectorAll ( `[${ target_selector }]` )[0].innerText = innertext_val;
		};

		return COMPONENT;
	}	
};

function inject_component ( COMPONENT, INJECTION_TARGET, PREPEND=false ) 
{
  	if ( PREPEND == true ) 
  	{
  		INJECTION_TARGET.prepend ( COMPONENT );
  	}
  	else 
  	{
  		INJECTION_TARGET.append ( COMPONENT );
  	};
};

function set_listeners ( TARGET_COMPONENT, DATA_TO_INJECT={} ) 
{
	const TARGETS = TARGET_COMPONENT.querySelectorAll ( '[listener_id]' );

	if ( TARGET_COMPONENT.getAttribute ( "listener_id" ) ) 
	{
		const LISTENER_ID = TARGET_COMPONENT.getAttribute ( "listener_id" );
		
		//settings popup components listeners:
		if ( GLOBALS.listeners[ LISTENER_ID ] ) 
		{
			for ( let listener in GLOBALS.listeners[ LISTENER_ID ] ) 
			{
				TARGET_COMPONENT.addEventListener ( listener, GLOBALS.listeners[ LISTENER_ID ][ listener ] );
			};
		};
	};

	for ( let target_element of Object.values ( TARGETS ) ) 
	{
		const LISTENER_ID = target_element.getAttribute ( "listener_id" );

		//add JSON data stringified to the target element:
		if ( target_element.getAttribute ( "data" ) && Object.values ( JSON.parse( target_element.getAttribute ( "data" ) ) ).length > 0 ) 
		{
			continue;
		}
		else 
		{
			target_element.setAttribute ( "data", JSON.stringify( DATA_TO_INJECT ) );
		};

		//settings popup components listeners:
		if ( GLOBALS.listeners[ LISTENER_ID ] ) 
		{
			for ( let listener in GLOBALS.listeners[ LISTENER_ID ] ) 
			{
				target_element.addEventListener ( listener, GLOBALS.listeners[ LISTENER_ID ][ listener ] );
			};
		};

		console.log ( `\n\n LISTENERS ADDED FOR: ${ LISTENER_ID }` )
	};
};

function create_search_channels_by_keyword_btn () 
{
	const COMPONENT = components.create 
	( 
		GLOBALS.page_context.ui.components.search_channels_by_keyword["html"], 
		[ "fade-in" ], 
		{} 
	);	

	set_listeners ( COMPONENT );

	return COMPONENT;
};

function create_twitch_channels_searched_modal ( CHANNELS_DATA ) 
{
	const COMPONENT = components.create 
	( 
		GLOBALS.page_context.ui.components.twitch_channels_searched_modal["html"], 
		[ "fade-in" ], 
		{} 
	);	

	set_listeners ( COMPONENT, CHANNELS_DATA );

	return COMPONENT;	
};

function create_channel_list_item ( CHANNEL_DATA ) 
{
	const COMPONENT = components.create 
	( 
		GLOBALS.page_context.ui.components.channel_list_item["html"], 
		[ "fade-in" ], 
		{} 
	);	

	COMPONENT.querySelectorAll ( '[id="streaming_thumbnail"]' )[0].style.backgroundImage = `url(${ CHANNEL_DATA["previewImageURL"] })`;
	COMPONENT.querySelectorAll ( '[id="channel_name_text"]' )[0].innerText = CHANNEL_DATA["displayName"];
	COMPONENT.querySelectorAll ( '[id="streaming_description_text"]' )[0].innerText = CHANNEL_DATA["broadcast_title"];
	COMPONENT.querySelectorAll ( '[id="viewers_count_value"]' )[0].innerText = CHANNEL_DATA["viewersCount"];
	COMPONENT.querySelectorAll ( '[id="stream_type_text"]' )[0].innerText = CHANNEL_DATA["stream_type"];

	set_listeners ( COMPONENT, CHANNEL_DATA );

	return COMPONENT;
};

function show_load_more_btn () 
{
	const LOAD_MORE_TWITCH_CHANNELS_BTN = document.querySelectorAll ( '[load_more_channels]' )[0];

	show_element ( LOAD_MORE_TWITCH_CHANNELS_BTN );
};

function hide_load_more_btn () 
{
	const LOAD_MORE_TWITCH_CHANNELS_BTN = document.querySelectorAll ( '[load_more_channels]' )[0];

	hide_element ( LOAD_MORE_TWITCH_CHANNELS_BTN );
};

function close_twitch_channels_searched_modal () 
{
	const MODAL = document.querySelectorAll ( '[id="twitch_channels_search_extension"]' )[0];

	if ( MODAL ) 
	{
		MODAL.remove ();
	};
};

function inject_twitch_channels_searched_modal ( CHANNELS_DATA ) 
{
	const INJECT_TARGET = document.body;
	const TWITCH_CHANNELS_SEARCHED_MODAL = create_twitch_channels_searched_modal ( CHANNELS_DATA );
	const is_already_injected = document.querySelectorAll ( '[id="twitch_channels_search_extension"]' ).length > 0;

	if ( is_already_injected == false ) 
	{
		inject_component ( TWITCH_CHANNELS_SEARCHED_MODAL, INJECT_TARGET, true );
	}
	else 
	{
		const load_cmore_channels_btn = document.querySelectorAll ( '[id="load_more_channels"]' )[0];

		load_cmore_channels_btn.setAttribute ( "data", JSON.stringify( CHANNELS_DATA ) )
	};
};

function inject_search_channels_by_keyword_btn () 
{
	const ORIGINAL_TWITCH_SEARCH_BTN = document.querySelectorAll ( '[icon="NavSearch"]' )[0];

	if ( ORIGINAL_TWITCH_SEARCH_BTN ) 
	{
		const INJECT_TARGET = ORIGINAL_TWITCH_SEARCH_BTN.parentNode;
		const SEARCH_CHANNELS_BY_KEYWORD_BTN = create_search_channels_by_keyword_btn ();

		inject_component ( SEARCH_CHANNELS_BY_KEYWORD_BTN, INJECT_TARGET );
	};
};

async function update_channel_list_item ( CHANNELS_DATA ) 
{
	const STORAGE_INFO = await get_storage();
	let EXTENSION_CONTAINER;
	let FILTERED_USERS_QTY = 0;

	SEARCH_CURSOR =  CHANNELS_DATA["cursor"];

	//check if extension modal is already injected:
	if ( Object.values ( CHANNELS_DATA["twitch_channels"] ).length > 0 ) 
	{
		inject_twitch_channels_searched_modal ( CHANNELS_DATA );

		EXTENSION_CONTAINER = document.querySelectorAll ( '[id="twitch_channels_search_extension"]' )[0]
	}
	else 
	{
		alert ( "No channels 've found" );
	};

	//if there are more results show LOAD MORE button:
	if ( CHANNELS_DATA["cursor"] != null ) 
	{
		show_load_more_btn ();
	}
	else 
	{
		hide_load_more_btn ();
	};

	await delay ( 1200 );

	if ( EXTENSION_CONTAINER ) 
	{
		//add the loaded channels item to the list:
		const INJECT_TARGET = EXTENSION_CONTAINER.querySelectorAll ( '[id="channels_container_list"]' )[0].querySelectorAll ( '[id="list_bucket"]' )[0];

		for ( let [channel_data_item, channel_data_item_val] of Object.entries ( CHANNELS_DATA["twitch_channels"] ) ) 
		{
			const IS_CHANNEL_FILTERED = STORAGE_INFO["filtered_channels"].indexOf ( channel_data_item_val["displayName"] ) != -1;

			if ( IS_CHANNEL_FILTERED == false) //if channel is filtered extension will skipp it and not show it
			{
				if ( STORAGE_INFO["OPTIONS"]["show_only_live_channels"]["value"]["active"] == true ) 
				{
					if ( channel_data_item_val["is_live"] == true ) 
					{
						const is_already_injected = INJECT_TARGET.innerHTML.split ( channel_data_item_val["displayName"] ).length > 1;

						if ( is_already_injected == false ) 
						{
							const CHANNEL_LIST_ITEM = create_channel_list_item ( channel_data_item_val );

							inject_component ( CHANNEL_LIST_ITEM, INJECT_TARGET );
						};
					};
				}
				else 
				{
					const is_already_injected = INJECT_TARGET.innerHTML.split ( channel_data_item_val["displayName"] ).length > 1;

					if ( is_already_injected == false ) 
					{
						const CHANNEL_LIST_ITEM = create_channel_list_item ( channel_data_item_val );

						inject_component ( CHANNEL_LIST_ITEM, INJECT_TARGET );
					};
				};
			}
			else 
			{
				FILTERED_USERS_QTY += 1;
				continue;
			};
		};

		//update channels count display :
		const CHANNELS_COUNT = EXTENSION_CONTAINER.querySelectorAll ( '[id="channels_gotten_count_text"]' )[0];

		CHANNELS_COUNT.innerText = INJECT_TARGET.querySelectorAll ( '[id="list_item"]' ).length;
	};

	//if the the current search has like 10 users filtered of its payload, it will search more;
	if ( FILTERED_USERS_QTY >= 5 ) 
	{
		const TWITCH_SEARCH_INPUT_FIELD = document.querySelectorAll ( '[placeholder="Search"]' )[0];

		if ( TWITCH_SEARCH_INPUT_FIELD ) 
		{
			if ( SEARCH_CURSOR && SEARCH_CURSOR != null ) 
			{
				await execute_twitch_channels_search_by_keyword ( TWITCH_SEARCH_INPUT_FIELD.value, SEARCH_CURSOR );
			};	
		}; 	
	};
};
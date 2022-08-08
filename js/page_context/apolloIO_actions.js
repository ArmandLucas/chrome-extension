const dbg = 1;

function lg(msg){
    if(dbg)
        console.log(msg);
}

async function do_save_list(LIST_QTY=25, PAGES_QTY=5, LIST_NAME) 
{
    lg(LIST_NAME);
    lg(LIST_QTY);
    lg("started");
    
    while (true){
		for(let page = 0; page < PAGES_QTY; page++){
			await click_select_all_option();
			await click_save_btn();
			await set_input_target_list_to_save(LIST_NAME);
			await click_confirm_save_btn();

        if(page!=PAGES_QTY-1){
            await go_next_list_page();
            await delay(1000);
        }
	    if(page==4){
            await go_prev_list_page();
	        page--;
	        await go_prev_list_page();
	        page--;
            await go_prev_list_page();
	        page--;
	        await go_prev_list_page();
	        page--;
            await delay(1000);
        }
    }
	}
}

async function click_select_all_option(){
    const checkbox = document.getElementsByClassName("zp_3laQp")[0];
    const name = checkbox.className;

    lg("selecting all");
    
	// const SELECT_ALL_option_element = document.getElementsByClassName("zp-button zp_1X3NK zp_vFlhM zp_1Do_s zp_2NNaJ")[0];
	// const SELECT_ALL_option_element = document.getElementsByClassName("zp_3Upbb zp_oXppb zp_3jMI5")[0];
    
	// if(SELECT_ALL_option_element){
    //     lg("clicking select all");
    //     SELECT_ALL_option_element.click();
    // }
    if(checkbox){
        lg("clicking checkbox");
        checkbox.click();
    }

	const SELECT_ALL_apply = document.getElementsByClassName("zp_3Upbb zp_oXppb zp_3jMI5")[0];
    lg("clicking select all");
	if(SELECT_ALL_apply){
        lg("clicking apply");
        SELECT_ALL_apply.click();
    }
    else{
        // checkbox.click();
        // const select_again = document.getElementsByClassName("zp_3Upbb zp_oXppb zp_3jMI5")[0];
        // if(select_again){
        //     lg("clicking apply again");
        //     select_again.click();
        // }
        end_of_list();
    }
    
    while(true){
        if(checkbox.className != name){
            lg("selected all");
            break;
        }
        lg("waiting for select all");
        await delay(500);
    }
    
	return true;
}

async function click_save_btn(){
    // const SAVE_BTN = document.getElementsByClassName("zp-button zp_1X3NK zp_2NNaJ zp_2T3rz zp_awepE")[0];
    const SAVE_BTN = document.getElementsByClassName("zp-button zp_1TrB3 zp_Dxi_A zp_2T3rz zp_awepE")[0];
    
    if(SAVE_BTN){
        lg("clicking save");
        SAVE_BTN.click();
    };

    while(true){
        if(document.getElementsByClassName("apolloio-css-vars-reset zp zp-modal zp_1aV2y")!=null){
            lg("save clicked");
            break;
        }
        lg("waiting for save");
        await delay(500);
    }
}

async function set_input_target_list_to_save(LIST_NAME){
    //for setting values to reactjs inputs:
    function set_native_value(ELEMENT, value){
        let lastValue = ELEMENT.value;
        
        ELEMENT.value = value;
        
        let event = new Event("input", { target: ELEMENT, bubbles: true });
        
        // React 15
        event.simulated = true;
        
        // React 16
        let tracker = ELEMENT._valueTracker;
        
        if ( tracker ) 
        {
            tracker.setValue( lastValue );
        };
        lg("Input value", ELEMENT.value);
        ELEMENT.dispatchEvent( event );
    };

    lg("setting list name");
    const MODAL_CONTAINER = document.getElementsByClassName("zp_2gRpu")[0];
	if(MODAL_CONTAINER){
        const list_name_input = MODAL_CONTAINER.getElementsByClassName("Select-input")[1];

		if(list_name_input)
            set_native_value(list_name_input, LIST_NAME);
	};

    // const SELECT_MENU = document.getElementsByClassName("Select-menu")[0];
    
	// if(SELECT_MENU){
    //     const FIRST_OPTION = SELECT_MENU.children[0];
        
	// 	if(FIRST_OPTION)
    //         FIRST_OPTION.click();
	// };
    // document.getElementsByClassName("zp-badge zp_3VQL3 zp_j2v0H zp-select-badge")[0].children[0].children[0].textContent = LIST_NAME;

    while(true){
        if(document.getElementsByName("undefined-new-labelNames")[0]?.value!=null){
            lg("list name set");
            break;
        }
        lg("waiting for list name");
        await delay(500);
    }
}

async function click_confirm_save_btn(){
    const CONFIRM_BTN = document.querySelectorAll('[data-cy="confirm"]')[0];

	if(CONFIRM_BTN){
        lg("clicking confirm");
        CONFIRM_BTN.click();
    }

    while(true){
        if(document.getElementsByName("undefined-new-labelNames").length==0){
            lg("confirm clicked");
            break;
        }
        lg("waiting for confirm");
        await delay(500);
    }

    
    // zp-button zp_1TrB3 zp_31uFu zp_1wtuu
    // lg("clicking close");
    // document.getElementsByClassName("zp_2Njps")[0].children[2].click();
}

async function go_next_list_page(){
	// const NEXT_LIST_BTN = document.getElementsByClassName ("zp-button zp_1X3NK zp_2MfK3 zp_U8yMM")[1];
	const NEXT_LIST_BTN = document.getElementsByClassName ("zp-button zp_1TrB3 zp_31uFu zp_1wtuu")[2];

	if(NEXT_LIST_BTN){
        lg("clicking next page");
		NEXT_LIST_BTN.click();
    }

    while(true){
        if(document.getElementsByClassName("zp_32H5Z")[0].dataset.cyLoaded=="true"){
            lg("next page loaded");
            break;
        }
        lg("waiting for next page");
        await delay(100);
    }
}


async function go_prev_list_page(){
	const PREV_LIST_BTN = document.getElementsByClassName ("zp-button zp_1TrB3 zp_31uFu zp_1wtuu")[0];
	// const PREV_LIST_BTN = document.getElementsByClassName ("zp-button zp_1X3NK zp_2MfK3 zp_U8yMM")[0];

	if(PREV_LIST_BTN){
        lg("clicking next page");
		PREV_LIST_BTN.click();
    }

    while(true){
        if(document.getElementsByClassName("zp_32H5Z")[0].dataset.cyLoaded=="true"){
            lg("next page loaded");
            break;
        }
        lg("waiting for next page");
        await delay(100);
    }
}
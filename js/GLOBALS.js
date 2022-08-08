const local_storage 	= chrome.storage.local;
const storage_onchange 	= chrome.storage.onChanged;
const extension_info 	= chrome.runtime.getManifest ();
const GLOBALS 			= 
{
	context_menus 			: chrome.contextMenus,
	identity 				: chrome.identity,
	tabs 					: chrome.tabs,
	extension_icon 			: "data:image/png;base64,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",
	extension_name 			: extension_info.name,
	extension_description 	: extension_info.description,
	extension_version		: extension_info.version,

	status_colors : 
	{
		off : "#ff1515",
		on 	: "#00ff00",
		warning : "#ffb400"
	},
	icons : 
	{
		quit_icon 	: `data:image/png;base64,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`,
		add_icon 	: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAgAElEQVR4Xu3Ywa212VGFYfcQiRQQmSAycRwYLCYYR+GRE0HkgkiD24w8W1ur9LW2aj+/1LOqc89+6kh+5V9+5x8BAgQIECDwnMAvz73YgwkQIECAAIHfCQA/AgIECBAg8KCAAHjw6J5MgAABAgQEgN8AAQIECBB4UEAAPHh0TyZAgAABAgLAb4AAAQIECDwoIAAePLonEyBAgAABAeA3QIAAAQIEHhQQAA8e3ZMJECBAgIAA8BsgQIAAAQIPCgiAB4/uyQQIECBAQAD4DRAgQIAAgQcFBMCDR/dkAgQIECAgAPwGCBAgQIDAgwIC4MGjezIBAgQIEBAAfgMECBAgQOBBAQHw4NE9mQABAgQICAC/AQIECBAg8KCAAHjw6J5MgAABAgQEgN8AAQIECBB4UEAAPHh0TyZAgAABAgLAb4AAAQIECDwoIAAePLonEyBAgAABAeA3QIAAAQIEHhQQAA8e3ZMJECBAgIAA8BsgQIAAAQIPCgiAB4/uyQQIECBAQAD4DRAgQIAAgQcFBMCDR/dkAgQIECAgAPwGCBAgQIDAgwIC4MGjezIBAgQIEBAAfgMECBAgQOBBAQHw4NE9mQABAgQICAC/AQIECBAg8KCAAHjw6J5MgAABAgQEgN8AAQIECBB4UEAAPHh0TyZAgAABAgLAb4AAAQIECDwoIAAePLonEyBAgAABAeA3QIAAAQIEHhQQAA8e3ZMJECBAgIAA8BsgQIAAAQIPCgiAB4/uyQQIECBAQAD4DRAgQIAAgQcFBMCDR/dkAgQIECAgAPwGCBAgQIDAgwIC4MGjezIBAgQIEBAAfgMECBAgQOBBAQHw4NE9mQABAgQICAC/AQIECBAg8KCAAHjw6J5MgAABAgQEgN8AAQIECBB4UEAAPHh0TyZAgAABAgLAb4AAAQIECDwoIAAePLonEyBAgAABAeA3QIAAAQIEHhQQAA8e3ZMJECBAgIAA8BsgQIAAAQIPCgiAB4/uyQQIECBAQAD4DRAgQIAAgQcFBMCDR/dkAgQIECAgAPwGCHwr8Iefj//7b//E6k//1c8/AgQ+EBAAH6D6SAJ/I/Dr/4D9iUgl8OefLQFQ0VkikAUEQDYyQWAiIAB6PQHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAUEQCQyQGAkIAB6PgHQ29kkEAVe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k0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyACBkYAA6PkEQG9nk0AUEACRyOsv2esAAAN6SURBVACBkYAA6PkEQG9nk0AUEACRyACBkcCvAfB3o094e/mPbz/f6wl8JyAAvrP1yQQIECBA4FoBAXDtaXwxAgQIECDwnYAA+M7WJxMgQIAAgWsFBMC1p/HFCBAgQIDAdwIC4Dtbn0yAAAECBK4VEADXnsYXI0CAAAEC3wkIgO9sfTIBAgQIELhWQABcexpfjAABAgQIfCcgAL6z9ckECBAgQOBaAQFw7Wl8MQIECBAg8J2AAPjO1icTIECAAIFrBQTAtafxxQgQIECAwHcCAuA7W59MgAABAgSuFRAA157GFyNAgAABAt8JCIDvbH0yAQIECBC4VkAAXHsaX4wAAQIECHwnIAC+s/XJBAgQIEDgWgEBcO1pfDECBAgQIPCdgAD4ztYnEyBAgACBawUEwLWn8cUIECBAgMB3AgLgO1ufTIAAAQIErhUQANeexhcjQIAAAQLfCQiA72x9MgECBAgQuFZAAFx7Gl+MAAECBAh8JyAAvrP1yQQIECBA4FoBAXDtaXwxAgQIECDwnYAA+M7WJxMgQIAAgWsFBMC1p/HFCBAgQIDAdwIC4Dtbn0yAAAECBK4VEADXnsYXI0CAAAEC3wkIgO9sfTIBAgQIELhWQABcexpfjAABAgQIfCcgAL6z9ckECBAgQOBaAQFw7Wl8MQIECBAg8J2AAPjO1icTIECAAIFrBQTAtafxxQgQIECAwHcCAuA7W59MgAABAgSuFRAA157GFyNAgAABAt8JCIDvbH0yAQIECBC4VkAAXHsaX4wAAQIECHwnIAC+s/XJBAgQIEDgWgEBcO1pfDECBAgQIPCdgAD4ztYnEyBAgACBawUEwLWn8cUIECBAgMB3AgLgO1ufTIAAAQIErhUQANeexhcjQIAAAQLfCQiA72x9MgECBAgQuFZAAFx7Gl+MAAECBAh8JyAAvrP1yQQIECBA4FoBAXDtaXwxAgQIECDwnYAA+M7WJxMgQIAAgWsFBMC1p/HFCBAgQIDAdwIC4Dtbn0yAAAECBK4VEADXnsYXI0CAAAEC3wkIgO9sfTIBAgQIELhWQABcexpfjAABAgQIfCcgAL6z9ckECBAgQOBaAQFw7Wl8MQIECBAg8J2AAPjO1icTIECAAIFrBQTAtafxxQgQIECAwHcCAuA7W59MgAABAgSuFRAA157GFyNAgAABAt8J/B9M/6YubDJ3WgAAAABJRU5ErkJggg==`
	},
	task_actions : 
	{

	},
	storage_keys : 
	{
		"extension_state" 		: { "active" : true },
		"start_app_confirmed" 	: false,
		"filtered_channels" 	: [],
		"OPTIONS" 				: {},
		"ig_users" 				: {}
	},

	background_context : 
	{
		ui : 
		{
			components : 
			{
				state_info_item : 
				{
					"id" : "state_info_item",
					"html" : 
					`
					<state-item style="
					   display: flex;
					   background-color: black;
					   padding: 7px;
					   border-radius: 6px;
					   margin: 0px 12px 0px 0px;
					   " id="">
					   <div style="
					      display: flex;
					      flex-direction: row;
					      align-items: center;
					      justify-content: space-between;
					      ">
					      <text style="
					         font-family: helvetica, arial, roboto;
					         font-size: 9px;
					         font-weight: 700;
					         color: white;
					         margin-right: 8px;
					         "></text>
					      <status-dot style="
					         width: 7px;
					         height: 7px;
					         display: flex;
					         background-color: #ff1515;
					         border-radius: 3px;
					         "></status-dot>
					   </div>
					</state-item>
					`
				},
				main_actions :
				{
					"id" : "main_action_btn",
					"html" : 
					`
					<list-item id="" class="fade-in">
					    <div style="
					        background: linear-gradient(90deg, rgba(49,255,132,1) 0%, rgba(29,247,253,1) 35%, #b44dff 80%);
					        padding: 1px;
					        border-radius: 6px;
					        ">
					        <button style="
					            display: flex;
					            height: 23px;
					            align-items: center;
					            justify-content: center;
					            color: white;
					            background-color: #120b0e;
					            border: none;
					            border-radius: 5px;
					            font-family: helvetica, arial, roboto;
					            font-weight: 500;
					            cursor: pointer;
					            font-size: 10px;
					            padding: 0px 32px 0px 32px;
					            "></button>
					    </div>
					</list-item>
					`
				},
				welcome_screen_action :
				{
					"button" : 
					{
						"id" : "welcome_screen_action",
						"html" : 
						`
						<div style="
						    background: linear-gradient(90deg, rgba(49,255,132,1) 0%, rgba(29,247,253,1) 35%, rgba(252,69,243,1) 80%);
						    padding: 2px;
						    border-radius: 9px;
						    display: flex;
						    width: 100%;
						    " id="">
						    <button style="
						        display: flex;
						        width: 100%;
						        height: 29px;
						        align-items: center;
						        justify-content: center;
						        color: white;
						        background-color: #000000;
						        border: none;
						        border-radius: 5px;
						        font-family: helvetica, arial, roboto;
						        font-weight: 600;
						        cursor: pointer;
						        font-size: 10px;
						        "></button>
						</div>
						`
					},
					"input" : 
					{
						"id" : "welcome_screen_action",
						"html" : 
						`
						<div style="
						    background: linear-gradient(90deg, rgb(1 227 255) 0%, rgba(29,247,253,1) 35%, rgb(128 33 235) 80%);
						    padding: 1px;
						    border-radius: 3px;
						    display: flex;
						    width: 100%;
						    " class="">
						    <input type="text" placeholder="user" id="" style="
						        border: 1px solid #000000;
						        background-color: #000000;
						        padding: 9px;
						        color: #8edbe6;
						        border-radius: 5px;
						        display: flex;
						        width: 100%;
						        ">
						</div>
						`
					}
				},
				OPTIONS_SETTINGS : 
				{
					"input" : 
					{
						"type" : "input",
						"id" : "OPTIONS_SETTINGS_input",
						"html" : 
						`
						<div style="
						    display: flex;
						    flex-direction: column;
						    align-items: center;
						    justify-content: space-between;
						    width: 100%;
						    height: fit-content;
						    max-height: 440px;
						    margin-bottom: 38px;
						    ">
						    <s-item style="
						        border: 1px solid black;
						        border-radius: 8px;
						        display: flex;
						        width: 93%;
						        background-color: #000000;
						        box-shadow: 0px 0px 56px -23px #a201f6;
						        " id="">
						        <div style="
						            display: flex;
						            flex-direction: row;
						            align-items: center;
						            justify-content: space-between;
						            width: 100%;
						            padding: 18px;
						            ">
						            <text style="
						                display: flex;
						                font-size: 16px;
						                font-weight: 700;
						                font-family: helvetica, arial, roboto;
						                color: white;
						                " id="option_title"></text>
						            <div style="
						                display: flex;
						                background: linear-gradient(
						                90deg
						                , rgba(49,255,132,1) 0%, rgba(29,247,253,1) 35%, #b44dff 80%);
						                padding: 1px;
						                border-radius: 7px;
						                ">
						                <input type="text
						                    " style="
						                    display: flex;
						                    border-radius: 7px;
						                    border: none;
						                    background-color: black;
						                    color: #ffffff;
						                    padding: 7px;
						                    font-family: helvetica, arial, roboto;
						                    font-weight: 500;
						                    font-size: 16px;
						                    " id="option_value">
						            </div>
						        </div>
						    </s-item>
						</div>
						`
					},
					"toggle" : 
					{
						"type" : "toggle",
						"id" : "OPTIONS_SETTINGS_toggle",
						"html" : 
						`
						<div style="
						    display: flex;
						    flex-direction: column;
						    align-items: center;
						    justify-content: space-between;
						    width: 100%;
						    height: fit-content;
						    max-height: 440px;
						    margin-bottom : 38px;
						    ">
						    <s-item style="
						        border: 1px solid black;
						        border-radius: 8px;
						        display: flex;
						        width: 93%;
						        background-color: #000000;
						        box-shadow: 0px 0px 56px -23px #a201f6;
						        " id="">
						        <div style="
						            display: flex;
						            flex-direction: row;
						            align-items: center;
						            justify-content: space-between;
						            width: 100%;
						            padding: 18px;
						            ">
						            <text style="
						                display: flex;
						                font-size: 16px;
						                font-weight: 700;
						                font-family: helvetica, arial, roboto;
						                color: white;
						                " id="option_title"></text>
						            <div style="
						                display: flex;
						                background: linear-gradient(
						                90deg
						                , rgba(49,255,132,1) 0%, rgba(29,247,253,1) 35%, #b44dff 80%);
						                padding: 1px;
						                border-radius: 23px;
						                ">
						                <label class="switch" style="
						                    "> <input id="option_value" type="checkbox"><span class="slider round"></span> </label>
						            </div>
						        </div>
						    </s-item>
						</div>
						` 
					}
				}
			},
			options_page : 
			{
				states_info : 
				{
					"extension_state" :
					{ 
						"value" : "Turned On" 
					}
				},		
				main_actions : 
				{

				},
				welcome_screen_actions : 
				{

				},
				actions : 
				{

				}
			}
		}
	},
	popup_context : 
	{
		ui : 
		{
			components : 
			{
				state_info_item : 
				{
					"id" : "state_info_item",
					"html" : 
					`
					<state-item style="
					   display: flex;
					   background-color: black;
					   padding: 7px;
					   border-radius: 6px;
					   margin: 0px 12px 0px 0px;
					   " id="">
					   <div style="
					      display: flex;
					      flex-direction: row;
					      align-items: center;
					      justify-content: space-between;
					      ">
					      <text style="
					         font-family: helvetica, arial, roboto;
					         font-size: 9px;
					         font-weight: 700;
					         color: white;
					         margin-right: 8px;
					         "></text>
					      <status-dot style="
					         width: 7px;
					         height: 7px;
					         display: flex;
					         background-color: #ff1515;
					         border-radius: 3px;
					         "></status-dot>
					   </div>
					</state-item>
					`
				},
				selected_tasks : 
				{
					"id" : "selected_tasks",
					"html" : 
					`
					<list-item style="
					    display: flex;
					    ">
					    <div style="
					        display: flex;
					        flex-direction: row;
					        align-items: center;
					        justify-content: space-between;
					        background-color: #581134;
					        height: 34px;
					        ">
					        <input type="checkbox" id="checkbox_Comment_task">
					        <text id="task_name" 
					        	style="
					            font-family: helvetica, arial, robotop;
					            font-size: 10px;
					            color: white;
					            font-weight: 700;
					            padding: 15px;
					            "></text>
					    </div>
					</list-item>
					`
				},
				main_actions :
				{
					"id" : "main_action_btn",
					"html" : 
					`
                    <list-item id="" class="fade-in">
                        <div style="
                            background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);
                            padding: 1px;
                            border-radius: 6px;
                            " class="">
                            <button class=""></button>
                        </div>
                    </list-item>
					`
				},
				welcome_screen_action :
				{
					"button" : 
					{
						"id" : "welcome_screen_action",
						"html" : 
						`
						<div style="
						    background: linear-gradient(90deg, rgba(49,255,132,1) 0%, rgba(29,247,253,1) 35%, rgba(252,69,243,1) 80%);
						    padding: 2px;
						    border-radius: 9px;
						    display: flex;
						    width: 100%;
						    " id="">
						    <button style="
						        display: flex;
						        width: 100%;
						        height: 29px;
						        align-items: center;
						        justify-content: center;
						        color: white;
						        background-color: #000000;
						        border: none;
						        border-radius: 5px;
						        font-family: helvetica, arial, roboto;
						        font-weight: 600;
						        cursor: pointer;
						        font-size: 10px;
						        "></button>
						</div>
						`
					},
					"input" : 
					{
						"id" : "welcome_screen_action",
						"html" : 
						`
						<div style="
						    background: linear-gradient(90deg, rgb(1 227 255) 0%, rgba(29,247,253,1) 35%, rgb(128 33 235) 80%);
						    padding: 1px;
						    border-radius: 3px;
						    display: flex;
						    width: 100%;
						    " class="">
						    <input type="text" placeholder="user" id="" style="
						        border: 1px solid #000000;
						        background-color: #000000;
						        padding: 9px;
						        color: #8edbe6;
						        border-radius: 5px;
						        display: flex;
						        width: 100%;
						        ">
						</div>
						`
					}
				},
				OPTIONS_SETTINGS : 
				{
					"input" : 
					{
						"type" : "input",
						"id" : "OPTIONS_SETTINGS_input",
						"html" : 
						`
			            <div style="
			                display: flex;
			                flex-direction: column;
			                align-items: center;
			                justify-content: space-between;
			                width: 100%;
			                height: fit-content;
			                max-height: 440px;
			                margin-bottom: 14px;
			                " class="fade-in" option_id="">
			                <s-item style="
			                    border: 1px solid black;
			                    display: flex;
			                    width: 93%;
			                    background-color: #000000;
			                    box-shadow: 0px 0px 11px -5px #a201f6;
			                    " id="" class="">
			                    <div style="
			                        display: flex;
			                        flex-direction: row;
			                        align-items: center;
			                        justify-content: space-between;
			                        width: 100%;
			                        padding: 18px;
			                        " class="">
			                        <text style="
			                            display: flex;
			                            font-size: 13px;
			                            font-weight: 500;
			                            font-family: helvetica, arial, roboto;
			                            color: white;
			                            " id="option_title" class=""></text>
			                        <div style="
			                            display: flex;
			                            background: linear-gradient(
			                            90deg
			                            , rgba(49,255,132,1) 0%, rgba(29,247,253,1) 35%, #b44dff 80%);
			                            padding: 1px;
			                            border-radius: 4px;
			                            ">
			                            <input type="text
			                                " style="
			                                display: flex;
			                                border-radius: 4px;
			                                border: none;
			                                background-color: black;
			                                color: #ffffff;
			                                padding: 4px;
			                                font-family: helvetica, arial, roboto;
			                                font-weight: 500;
			                                font-size: 13px;
			                                width: 19vw;
			                                " id="option_value" option_data="" option_id="" class="">
			                        </div>
			                    </div>
			                </s-item>
			            </div>
						`
					},
					"toggle" : 
					{
						"type" : "toggle",
						"id" : "OPTIONS_SETTINGS_toggle",
						"html" : 
						`
			            <div style="
			                display: flex;
			                flex-direction: column;
			                align-items: center;
			                justify-content: space-between;
			                width: 100%;
			                height: fit-content;
			                max-height: 440px;
			                margin-bottom: 14px;
			                ">
			                <s-item style="
			                    border: 1px solid black;
			                    border-radius: 8px;
			                    display: flex;
			                    width: 93%;
			                    background-color: #000000;
			                    box-shadow: 0px 0px 11px -5px #a201f6;
			                    " id="">
			                    <div style="
			                        display: flex;
			                        flex-direction: row;
			                        align-items: center;
			                        justify-content: space-between;
			                        width: 100%;
			                        padding: 18px;
			                        ">
			                        <text style="
			                            display: flex;
			                            font-size: 13px;
			                            font-weight: 500;
			                            font-family: helvetica, arial, roboto;
			                            color: white;
			                            " id="option_title"></text>
			                        <div style="
			                            display: flex;
			                            background: linear-gradient(
			                            90deg
			                            , rgba(49,255,132,1) 0%, rgba(29,247,253,1) 35%, #b44dff 80%);
			                            padding: 1px;
			                            border-radius: 23px;
			                            ">
			                            <label class="switch" style="
			                                "> <input  id="option_value" type="checkbox"><span class="slider round"></span> </label>
			                        </div>
			                    </div>
			                </s-item>
			            </div>
						` 
					}
				}
			},
			options_page : 
			{
				states_info : 
				{
					"extension_state" :
					{ 
						"value" : "Turned On" 
					}
				},		
				main_actions : 
				{
					"go_to_apolloIO_website" :
					{ 
						"id" : "go_to_apolloIO_website",
						"value" : "Go to apollo IO" 
					},
					"run_save_list_automater" :
					{ 
						"id" : "run_save_list_automater",
						"value" : "Run save list automater" 
					},
					"stop_extension_tasks" :
					{ 
						"id" : "stop_extension_tasks",
						"value" : "Stop tasks" 
					}
				},
				welcome_screen_actions : 
				{
					/*
					"auth_user_input" : 
					{
						"type" : "input",
						"id" : "auth_user_input",
						"value" : "User" 
					},
					"auth_key_input" : 
					{
						"type" : "input",
						"id" : "auth_key_input",
						"value" : "Key" 
					},
					*/
					"start_app" :
					{ 
						"type" : "button",
						"id" : "START_APP",
						"value" : "START APP" 
					}
				}
			}
		}
	},
	page_context : 
	{
		ui :
		{
			components : 
			{
				search_channels_by_keyword : 
				{
					"id" : "search_channels_by_keyword",
					"html" : 
					`
					<button listener_id="search_channels_by_keyword" class="fade-in ScCoreButton-sc-1qn4ixc-0 ScCoreButtonSecondary-sc-1qn4ixc-2 cbncPl fSetzA tw-combo-input__button-icon tw-combo-input__button-icon--large" icon="NavSearch" type="secondary" aria-label="Search Button" style="
					    background-color: #ff00d4;
					    width: 63px;
					    ">
					    <div class="ScButtonIconWrapper-sc-1702yzj-1 iSsCBH">
					        <div class="ScCoreButtonIcon-sc-khv8ri-0 dfuEgK tw-core-button-icon">
					            <div class="ScIconLayout-sc-1bgeryd-0 cOOGTE tw-icon" data-a-selector="tw-core-button-icon">
					                <div class="ScAspectRatio-sc-1sw3lwy-1 bneAWp tw-aspect">
					                    <div class="ScAspectSpacer-sc-1sw3lwy-0 gMCXS"></div>
					                    <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1bgeryd-1 eOJUoR">
					                        <g>
					                            <path fill-rule="evenodd" d="M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z" clip-rule="evenodd"></path>
					                        </g>
					                    </svg>
					                </div>
					            </div>
					        </div>
					    </div>
					</button>
					`
				},
				twitch_channels_searched_modal : 
				{
					"id" : "twitch_channels_searched_modal",
					"html" : 
					`
					<div class="fade-in" id="twitch_channels_search_extension">
					    <div>
					        <div listener_id="close_channels_list" id="close_channels_list"></div>
					        <text> CHANNELS </text>
					        <div id="channels_container_list">
								<div id="channels_gotten_count">
								    <div>
								        <text id="channels_gotten_count_text"> 0 </text>
								    </div>
								</div>
					            <div id="list_bucket">

					            </div>
					        </div>
					        <div id="actions">
					            <div>
					                <button listener_id="load_more_channels" id="load_more_channels"> Load more </button>
					            </div>
					        </div>
					    </div>
					</div>
					`
				},
				channel_list_item : 
				{
					"id" : "channel_list_item",
					"html" : 
					`
					 <div class="fade-in" id="list_item">
					    <div>
					        <div id="left_side">
					            <div listener_id="go_to_twitch_channel" id="streaming_thumbnail"></div>
					        </div>
					        <div id="right_side">
								<div id="filter_channel_btn">
								    <div listener_id="filter_this_channel" id="filter_this_channel"></div>
								</div>
					            <div id="channel_name">
					                <text  listener_id="go_to_twitch_channel" id="channel_name_text"> </text>
					            </div>
					            <div id="streaming_description">
					                <text id="streaming_description_text"> </text>
					            </div>
					            <div id="viewers_count">
					                <div id="views_icon"></div>
					                <text id="viewers_count_value"> </text>
					            </div>
					            <div id="stream_type">
					                <text id="stream_type_text"> </text>
					            </div>
					        </div>
					    </div>
					</div>
					`
				}
			}
		}
	}
};

GLOBALS[ "app_options" ] = 
{
	"list_selection_qty" : 
	{
		"option_id" 		: "list_selection_qty", //option key to be setted in the storage.
		"alarm_id" 			: null,
		"title" 			: "Qty list checkboxes to select",
		"type" 				: "input",
		"RECOMENDED_VALUE" 	: 25,
		"value" 			: 25,
		"time_type" 		: null,
		"index" 			: 1
	},
	"pages_qty" : 
	{
		"option_id" 		: "pages_qty", //option key to be setted in the storage.
		"alarm_id" 			: null,
		"title" 			: "Qty pages to select",
		"type" 				: "input",
		"RECOMENDED_VALUE" 	: 10,
		"value" 			: 10,
		"time_type" 		: null,
		"index" 			: 2
	},
	"list_name_to_save" : 
	{
		"option_id" 		: "list_name_to_save", //option key to be setted in the storage.
		"alarm_id" 			: null,
		"title" 			: "Save in list:",
		"type" 				: "input",
		"RECOMENDED_VALUE" 	: null,
		"value" 			: "ListName",
		"time_type" 		: null,
		"index" 			: 3
	}
};

GLOBALS[ "alarms" ] = 
{
	/*
	Check_license_system : 
	{
		"id" 				: "Check_license_system",
		"storage_id" 		: "",
		"time_in_minutes" 	: 17
	}
	*/
};

GLOBALS[ "listeners" ] = //must match with the listeners key. 
{
	"START_APP" : 
	{
		click : async (EVENT)=>
		{
			disable_element ( EVENT.target.parentNode );

			/*
			
			const USER 			= document.querySelectorAll ( '[id="auth_user_input"]' )[0].getElementsByTagName("input")[0].value;
			const KEY 			= document.querySelectorAll ( '[id="auth_key_input"]' )[0].getElementsByTagName("input")[0].value;
			const STORAGE_INFO 	= await get_storage ( GLOBALS.storage_keys );
			const IS_LICENCED 	= await make_auth ( USER, KEY );

			await delay ( 1000 );

			if ( IS_LICENCED["success"] == true && USER.length > 3 && KEY.length > 3 ) 
			{
				if ( IS_LICENCED == false ) 
				{
					revoke_auth_credentials ();
					auth_failed_handler ();
					enable_element ( EVENT.target.parentNode );
				}
				else 
				{
					save_auth_credentials ( { "user":USER, "key":KEY, "is_licenced":IS_LICENCED["success"] } );
					auth_success_handler ();
					enable_element ( EVENT.target.parentNode );
				};
			}
			else 
			{
				status_header.set_text ( "You need to write the correct credentials in each field." )
				change_element_background ( status_header.element, GLOBALS["status_colors"]["warning"] );
				show_element ( status_header.element );
				enable_element ( EVENT.target.parentNode );
			};
			*/

			save_auth_credentials ( { "user":"none", "key":"none", "is_licenced":true } );
			auth_success_handler ();
			enable_element ( EVENT.target.parentNode );

			EVENT.stopPropagation();
		},
		mouseover : async ( EVENT ) => 
		{
			EVENT.target.classList.add ( "color-change-2x" );

			await delay (250);
			EVENT.target.classList.remove ( "color-change-2x" );

			EVENT.stopPropagation();
		}
	},
	"open_app" : 
	{
		click : (EVENT) => 
		{
			chrome.runtime.openOptionsPage ();

			EVENT.stopPropagation();
		},	
		mouseover : async ( EVENT ) => 
		{
			EVENT.target.classList.add ( "color-change-2x" );

			await delay (250);
			EVENT.target.classList.remove ( "color-change-2x" );

			EVENT.stopPropagation();
		}
	},
	"open_settings_popup" : 
	{
		click : ( EVENT )=>
		{ 
			const SETTINGS_POPUP = document.getElementsByTagName ( "settings-popup" )[0];

			show_element ( SETTINGS_POPUP );
			EVENT.stopPropagation();
		}
	},
	"close_settings_popup" : //close ettings popup and saves settings.
	{
		click : async ( EVENT )=>
		{ 
			hide_element ( EVENT.target.parentNode.offsetParent );
			EVENT.stopPropagation();
		},
		mouseover : async ( EVENT ) => 
		{
			EVENT.target.classList.add ( "color-change-2x" );

			await delay (250);
			EVENT.target.classList.remove ( "color-change-2x" );

			EVENT.stopPropagation();
		}
	},
	"show_tasks_logs_container" : 
	{
		click : ( EVENT ) => 
		{
			show_logs_container ();

			EVENT.stopPropagation();
		},
		mouseover : async ( EVENT ) => 
		{
			EVENT.target.classList.add ( "color-change-2x" );

			await delay (250);
			EVENT.target.classList.remove ( "color-change-2x" );

			EVENT.stopPropagation();
		}
	},
	"clear_all_tasks_logs" : 
	{
		click : ( EVENT ) => 
		{
			clear_saved_log ();

			EVENT.stopPropagation();
		},
		mouseover : async ( EVENT ) => 
		{
			EVENT.target.classList.add ( "color-change-2x" );

			await delay (250);
			EVENT.target.classList.remove ( "color-change-2x" );

			EVENT.stopPropagation();
		}	
	},
	"show_more_items_rows" : 
	{
		click : ( EVENT ) => 
		{
			show_ten_items_more ();

			disable_element_by_time ( EVENT.target, 1800 );

			EVENT.stopPropagation();
		},
		mouseover : async ( EVENT ) => 
		{
			EVENT.target.classList.add ( "color-change-2x" );

			await delay (250);
			EVENT.target.classList.remove ( "color-change-2x" );

			EVENT.stopPropagation();
		}	
	},
	"extension_state" : 
	{
		change : async ( EVENT ) => 
		{
			if ( EVENT.target.checked == true ) 
			{
				await set_storage ( { "extension_state" : {"active" : true} } );
			} 
			else 
			{
				await set_storage ( { "extension_state" : {"active" : false} } );
			};
			
			EVENT.stopPropagation();
		},
		mouseover : async ( EVENT ) => 
		{
			EVENT.target.classList.add ( "color-change-2x" );

			await delay (250);
			EVENT.target.classList.remove ( "color-change-2x" );

			EVENT.stopPropagation();
		}
	},

	"list_selection_qty" : 
	{
		input : async ( EVENT ) => 
		{
			const STORAGE_INFO = await get_storage ();

			if ( isNaN( EVENT.target.value ) == true ) 
			{
				STORAGE_INFO["OPTIONS"][ "list_selection_qty" ]["value"] = 24; 
			}
			else 
			{
				STORAGE_INFO["OPTIONS"][ "list_selection_qty" ]["value"] = parseInt(EVENT.target.value);
			};

			await set_storage ( { "OPTIONS" : STORAGE_INFO["OPTIONS"] } );

			EVENT.stopPropagation();
		},
		mouseover : async ( EVENT ) => 
		{
			EVENT.target.classList.add ( "color-change-2x" );

			await delay (250);
			EVENT.target.classList.remove ( "color-change-2x" );

			EVENT.stopPropagation();
		}
	},
	"go_to_apolloIO_website" : 
	{
		click : async ( EVENT ) => 
		{
			message_to_background ( "CREATE_NEW_TAB", { "url" : "https://app.apollo.io/#/people", "active" : true } )
			
			EVENT.stopPropagation();
		},
		mouseover : async ( EVENT ) => 
		{
			EVENT.target.classList.add ( "color-change-2x" );

			await delay (250);
			EVENT.target.classList.remove ( "color-change-2x" );

			EVENT.stopPropagation();
		}
	},
	"pages_qty" : 
	{
		input : async ( EVENT ) => 
		{
			const STORAGE_INFO = await get_storage ();

			if ( isNaN( EVENT.target.value ) == true ) 
			{
				STORAGE_INFO["OPTIONS"][ "pages_qty" ]["value"] = 5; 
			}
			else 
			{
				STORAGE_INFO["OPTIONS"][ "pages_qty" ]["value"] = parseInt(EVENT.target.value);
			};

			await set_storage ( { "OPTIONS" : STORAGE_INFO["OPTIONS"] } );

			EVENT.stopPropagation();
		},
		mouseover : async ( EVENT ) => 
		{
			EVENT.target.classList.add ( "color-change-2x" );

			await delay (250);
			EVENT.target.classList.remove ( "color-change-2x" );

			EVENT.stopPropagation();
		}
	},
	"run_save_list_automater" : 
	{
		click : async ( EVENT ) => 
		{
			const STORAGE_INFO = await get_storage ();

			if ( STORAGE_INFO[ "extension_state" ]["active"] == true ) 
			{
				message_to_contentscript ( "do_save_list" );
			};

			EVENT.stopPropagation();
		},
		mouseover : async ( EVENT ) => 
		{
			EVENT.target.classList.add ( "color-change-2x" );

			await delay (250);
			EVENT.target.classList.remove ( "color-change-2x" );

			EVENT.stopPropagation();
		}	
	},
	"list_name_to_save" : 
	{
		input : async ( EVENT ) => 
		{
			const STORAGE_INFO = await get_storage ();

			if ( EVENT.target.value.length == 0 ) 
			{
				STORAGE_INFO["OPTIONS"][ "list_name_to_save" ]["value"] = "list_" + Date.now().toString(); 
			}
			else 
			{
				STORAGE_INFO["OPTIONS"][ "list_name_to_save" ]["value"] = EVENT.target.value;
			};

			await set_storage ( { "OPTIONS" : STORAGE_INFO["OPTIONS"] } );

			EVENT.stopPropagation();
		},
		mouseover : async ( EVENT ) => 
		{
			EVENT.target.classList.add ( "color-change-2x" );

			await delay (250);
			EVENT.target.classList.remove ( "color-change-2x" );

			EVENT.stopPropagation();
		}	
	},
	"stop_extension_tasks" : 
	{
		click : async ( EVENT ) => 
		{
			const ACTIVE_TAB = await query_tabs ( { "active" : true } );

			await reload_tab ( ACTIVE_TAB["id"], {} );

			EVENT.stopPropagation();
		},
		mouseover : async ( EVENT ) => 
		{
			EVENT.target.classList.add ( "color-change-2x" );

			await delay (250);
			EVENT.target.classList.remove ( "color-change-2x" );

			EVENT.stopPropagation();
		}	
	}
};	 
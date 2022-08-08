const status_header = 
{
	create : () => 
	{
		const html =  
		`
		<!--<fixed-status-header>-->
				<text> </text>
				<button> Ok </button>
		<!--</fixed-status-header>-->
		`;
		const _status_header 	= document.createElement ( "fixed-status-header" ); _status_header.innerHTML = html;
		const close_btn 		= _status_header.getElementsByTagName ( "button" )[ 0 ];

		_status_header.classList.add ( "fade-in" );
		close_btn.addEventListener ( "click", status_header.hide );

		return _status_header;
	},
	inject : () => 
	{
		const _status_header 		= status_header.create ();
		const target 				= document.body;
		const is_already_injected 	= document.getElementsByTagName ( "fixed-status-header" ).length > 0;

		if ( is_already_injected == false ) 
		{
			status_header.element = _status_header;
			target.prepend ( _status_header );
		};
	},
	set_text : ( text ) => 
	{
		const _status_header = document.getElementsByTagName ( "fixed-status-header" )[ 0 ].getElementsByTagName ( "text" )[ 0 ];

		_status_header.innerHTML = text;
	},
	show : () => 
	{
		const _status_header = document.getElementsByTagName ( "fixed-status-header" )[ 0 ];

		_status_header.setAttribute( "style", "display: flex;" );
	},
	hide : () => 
	{
		const _status_header = document.getElementsByTagName ( "fixed-status-header" )[ 0 ];

		_status_header.setAttribute( "style", "display: none;" );
	}
};
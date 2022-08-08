class Interval
{
	constructor ()
	{
		this.time_delay 	= 1000;
		this.active 		= null;

		var test = this;

		this.set = ( FUNCTION, TIME_DELAY ) => 
		{
			this.active 	= true;
			test.time_delay = TIME_DELAY;

			async function F () 
			{
				if ( test.active == true ) 
				{
					(FUNCTION)();

					await delay ( test.time_delay );

					F();
				};
			}

			F();
		};
		this.clear = () => 
		{
			test.active = false;
		};
	};
};
function delay ( TIME ) 
{
	return new Promise 
	(
		( RES, REJ ) => 
		{
			setTimeout ( RES, TIME );
		}
	);
};
async function add_data_to_clipboard ( TEXT_DATA ) 
{
	let copied = null;

	await navigator.clipboard.writeText ( TEXT_DATA )
	.then
	(
		async () =>
		{
			copied = true;
		}, 
		async () => 
		{
			copied = false;
		}
	);

	return copied;
};
function readclipboard_data () 
{
	return new Promise 
	(
		async ( RESOLVE, REJECT ) => 
		{
			const TEXT = await navigator.clipboard.readText ()

			RESOLVE ( TEXT );
		}
	)
	.catch 
	(
		( ERR ) => 
		{
			console.error ( 'Failed to read clipboard contents: ', ERR );
		}
	);
};
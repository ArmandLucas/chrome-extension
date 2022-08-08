function read_file ( STREAM ) 
{
    return new Promise 
    (
        ( RESOLVE, REJECT ) => 
        {
            const reader = new FileReader();

            reader.onloadend = () =>
            {
                const content = 
                {
                    base64      : reader.result,
                    binaryBlob  : atob ( reader.result.split ( ',' )[ 1 ] )
                };

                RESOLVE ( content );
            };

            reader.readAsDataURL ( STREAM );
        }
    );
};
async function image_as_base64 ( URL ) 
{
    const BLOB_CONTENT = await make_xhr (
        {
            "method"            : "GET",
            "url"               : URL,
            "response_type"     : "blob"
        }
    );
    
    if ( BLOB_CONTENT.status >= 200 && BLOB_CONTENT.status < 399 ) 
    {
        const NEW_CONTENT = await read_file ( BLOB_CONTENT.response );

        return NEW_CONTENT;
    };
};
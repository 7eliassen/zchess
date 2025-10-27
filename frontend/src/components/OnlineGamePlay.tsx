const UrlParam = () => {
    const params = new URLSearchParams(window.location.search);
    const room_id = params.get('room_id');



    return (
        <div>
            {room_id ? (
                <p>The value of the parameter is: {room_id}</p>
            ) : (
                <p>No parameter found</p>
            )}
        </div>
    );
};

export default UrlParam;

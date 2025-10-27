import OnlineChessBoard from "./OnlineChessBoard";
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

function OnlineGame() {
    // 1. Initialize the ref to null.
    const websocket = useRef<WebSocket>(null);
    const [room, setRoom] = useState<String | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        // 2. Create the WebSocket *inside* the effect.
        // This ensures it only runs once after the component mounts.
        if (!room && !websocket.current)
        {
            websocket.current = new WebSocket("ws://localhost:8000/ws/startgame/");
            const ws = websocket.current; // Create a local variable for the cleanup function

            // Connection established
            ws.addEventListener('open', (event) => {
                console.log('WebSocket connection opened!');
                ws.send('Hello Server!'); // Send a message
                console.log(room)
            });

            // Message received from server
            ws.addEventListener('message', (event) => {
                const jsonData = JSON.parse(event.data)
                console.log('Data from server:', event.data);
                if (jsonData.status == "ready") {
                    setRoom(jsonData.room)
                    ws.close()
                    websocket.current = null
                }
            });

            // Connection closed
            ws.addEventListener('close', (event) => {
                console.log('WebSocket connection closed.', event);
            });

            // Error handling
            ws.addEventListener('error', (error) => {
                console.error('WebSocket Error:', error);
            });

            // 3. Return a cleanup function.
            // This will run when the component unmounts.
            return () => {
                console.log('Cleaning up WebSocket.');
                // Check if the socket is still open before closing
                if (ws.readyState === WebSocket.OPEN) {
                    ws.close();
                    websocket.current = null
                }
            };
        }

    }, []); // The empty array ensures this effect runs only once on mount.

    useEffect(() => {
        if (room)
            navigate(`/playgame?room_id=${room}`)
    }, [room])

    return (
        <>{!room ? <div>Searching for opponent...</div> : <div>Game in room: {room}</div>}</>
    );
}

export default OnlineGame;
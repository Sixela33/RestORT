import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Sockets() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [connectedClients, setConnectedClients] = useState([]);

  useEffect(() => {
    
    const socketInstance = io('http://localhost:8080');
    setSocket(socketInstance)

    console.log(socketInstance)
    socketInstance.on('connect', () => {
        console.log('Connected to server');
    });

    socketInstance.on('message', (data) => {
        console.log(`Received message: ${data}`);
    });

    socketInstance.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

    return(() => {
        if (socketInstance) {
            socketInstance.disconnect();
        }
    })

  }, [])


  return (
    <div>
        ptooo
    </div>
  );
}
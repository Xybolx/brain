import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';

let socket;

const Title = () => {

const [endpoint, setEndpoint] = useState('http://localhost:3001/');

  socket = socketIOClient(endpoint);

  socket.on('connect', () => {
    let id = socket.io.engine.id;
    console.log('A user connected on: ' + id);
  });

  socket.on('disconnect', () => {
    let id = socket.io.engine.id;
    console.log('A user disconnected from: ' + id);
  });
    return (
        <h2>Brain</h2>
    );
}

export { Title, socket };
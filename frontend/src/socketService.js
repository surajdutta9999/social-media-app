import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId) => {
    socket = io(process.env.URL, {
        query: {
            userId
        },
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 5,
    });
    
    socket.on('connect', () => {
        console.log('Connected to WebSocket');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket');
      });

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

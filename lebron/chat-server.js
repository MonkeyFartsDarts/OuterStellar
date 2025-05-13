const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3001 });

const clients = new Set();

server.on('connection', (socket) => {
    clients.add(socket);

    // Broadcast messages to all connected clients
    socket.on('message', (message) => {
        for (const client of clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }
    });

    // Remove the client when they disconnect
    socket.on('close', () => {
        clients.delete(socket);
    });
});

console.log('Chat server is running on ws://localhost:3001')
const express = require('express');
const app = express();
const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(80, () => console.log('listening on 80'));
server.listen(8080);




const wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);
    connection.on('message', (message) => {
        console.log('Received Message:', message.utf8Data);
        connection.sendUTF('Hi this is WebSocket server!');
    });
    connection.on('close', (reasonCode, description) => {
        console.log('Client has disconnected.');
    });
});
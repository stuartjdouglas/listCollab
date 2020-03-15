const express = require('express');
const app = express();
const { Server } = require('ws');
const path = require('path');
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

const server = express()
    .use(express.static(path.join(__dirname, 'public')))
    .listen(port, () => console.log(`Listening on ${port}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
    console.log('Connection started');
    ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
    wss.clients.forEach((client) => {
        client.send(new Date().toTimeString());
    });
}, 1000);

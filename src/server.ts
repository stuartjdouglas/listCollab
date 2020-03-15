import express from 'express';
import path from 'path';
import { Server as wsServer } from 'ws';

export default class Server {

    app: express.Express;

    wss: wsServer;

    clients = new Array();

    port = process.env.PORT || 8080;

    constructor() {
        this.app = express()
        this.init();
    }

    init() {
        const server = express()
            .use(express.static(path.join(__dirname, 'public')))
            .listen(this.port, () => console.log(`Listening on ${this.port}`));
        this.wss = new wsServer({ server });

        this.wss.on('connection', () => this.onConnection);

        // TODO remove this
        setInterval(() => {
            this.wss.clients.forEach((client) => {
                client.send(new Date().toTimeString());
            });
        }, 1000);
    }

    /**
     * Handles on connection socket events.
     *
     * @param ws the socket
     */
    onConnection(ws: wsServer) {
        console.log('Client has connected');
        ws.on('close', () => this.onClose);
    }

    /**
     * Handles on close socket events.
     */
    onClose() {
        console.log('Client has disconnected');
    }



}
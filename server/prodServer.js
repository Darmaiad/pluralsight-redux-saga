import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import path from 'path';
import compression from 'compression';

import * as Router from './routes';
import { configPort } from './../config';

/* eslint-disable no-console */

// Either Heroku will assign a random port, or we will get the default port from .env
const port = process.env.PORT || configPort;

const app = express();
app.use(compression());
app.use(express.static('dist'));

// Simulate a small amount of delay to demonstrate app's async features
const serverDelayConstant = 100;
app.use((req, res, next) => {
    const delay = (Math.random() * 15 + 5) * serverDelayConstant;
    setTimeout(next, delay);
});

// Routes
app.use("/", Router.misc);
app.use("/cart", Router.cart);
app.use("/card", Router.card);

const server = http.createServer(app);

// Websocket
const io = socketIO(server);
io.on('connection', (connection) => {
    let supportAvailable = false;
    setInterval(() => {
        supportAvailable = !supportAvailable;
        connection.emit(supportAvailable ? 'SUPPORT_AVAILABLE' : 'SUPPORT_NOT_AVAILABLE');
    }, 10000);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './../dist/index.html'));
});

server.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.info(`Redux Cart App Production Build is listening on port ${port}.`);
    }
});

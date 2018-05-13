import express from 'express';
import http from 'http';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from "webpack-hot-middleware";
import socketIO from 'socket.io';
import path from 'path';
import open from 'open';

import { port, host } from './../config';
import webpackConfig from './../webpack.config.dev';
import * as Router from './routes';

/* eslint-disable no-console */

const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: compiler.options.output.publicPath,
  inline: true,
}));

app.use(webpackHotMiddleware(compiler, {
  'log': false,
  'path': '/__webpack_hmr',
  'heartbeat': 10 * 1000,
}));

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
  res.sendFile(path.join(__dirname, './../public/index.html'));
});

server.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info(`Redux Cart App is listening on port ${port}.`);
    open(`http://${host}:${port}`);
  }
});

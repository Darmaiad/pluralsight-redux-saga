import express from 'express';
import http from 'http';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from "webpack-hot-middleware";
import socketIO from 'socket.io';
import path from 'path';
import open from 'open';

import config from './../webpack.config.dev';
import cartRouter from './routes/cartRoute';
import cardRouter from './routes/cardRoute';
import miscRouter from './routes/miscRoute';

/* eslint-disable no-console */

const port = process.env.PORT || 9000;
const app = express();
const compiler = webpack(config);

// Simulate a small amount of delay to demonstrate app's async features
const serverDelayConstant = 100;
app.use((req, res, next) => {
  const delay = (Math.random() * 15 + 5) * serverDelayConstant;
  setTimeout(next, delay);
});

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

// Server is (probably) used to enable Websockets
const server = http.createServer(app);
const io = socketIO(server);

app.use("/", miscRouter);
app.use("/cart", cartRouter);
app.use("/card", cardRouter);

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
    open(`http://localhost:${port}`);
  }
});

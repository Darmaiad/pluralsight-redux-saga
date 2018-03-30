import http from 'http';
import express from 'express';
import webpack from 'webpack';
import cors from 'cors';
import config from './../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from "webpack-hot-middleware";
import socketIO from 'socket.io';
import path from 'path';
import open from 'open';

/* eslint-disable no-console */

const port = process.env.PORT || 9000;
const app = express();
const compiler = webpack(config);

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

app.use(cors());
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (connection) => {
  let supportAvailable = false;
  setInterval(() => {
    supportAvailable = !supportAvailable;
    connection.emit(supportAvailable ? 'SUPPORT_AVAILABLE' : 'SUPPORT_NOT_AVAILABLE');
  }, 10000);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info(`Redux Cart App is listening on port ${port}.`);
    open(`http://localhost:${port}`);
  }
});

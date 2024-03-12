const path = require("path");
const cors = require("cors");
const express = require("express");
const { ObjectId } = require('mongodb');
const session = require("cookie-session");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
require("dotenv").config();
require("./utils/db");
const app = express();
const errorHandler = require("./controllers/errorController");
const routes = require("./routes/userRouter");
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('sniperBot:server');
var http = require('http');
const port = normalizePort(process.env.PORT || 3004);
app.use(cors({ origin: '*'}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());
//data sanitization against xss
// const Price = require('./models/Price')
app.use(xss());
app.use(compression());
routes(app);
app.all("*", (req, res, next) => next(new AppError(`can't find ${req.originalUrl} on this server`, 404)));
app.use(errorHandler);
app.set('port', port);
var server = http.createServer(app);
// const io = require('socket.io')(server,{
//   cors:{origin : '*'}
// });

server.listen(port);
server.on('listening', onListening);
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
  ? 'pipe ' + addr
  : 'port ' + addr.port;
  console.log(`Server is running on port ${port}`)
  debug('Listening on ' + bind);
}

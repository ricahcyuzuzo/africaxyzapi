"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _momo = _interopRequireDefault(require("./routes/momo.routes"));

var _cardpay = _interopRequireDefault(require("./routes/cardpay.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 5000;
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  return next();
});
app.use('/api', _momo["default"]);
app.use('/api', _cardpay["default"]);
app.get('/', function (req, res) {
  res.status(200).json({
    status: 200,
    message: 'Welcome on Africa XYZ payment integration'
  });
});
app.use(function (req, res) {
  res.type('json').status(404).json({
    status: 404,
    errorMessage: '404 Endpoint not found'
  });
});
app.listen(port, console.log("App is on port ".concat(port)));
var _default = app;
exports["default"] = _default;
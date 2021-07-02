"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _momo = _interopRequireDefault(require("../controllers/momo.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = (0, _express["default"])();
routes.post('/paymomo', _momo["default"].InitiatePayment);
var _default = routes;
exports["default"] = _default;
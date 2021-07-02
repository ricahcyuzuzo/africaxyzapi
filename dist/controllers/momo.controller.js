"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _flutterwaveNodeV = _interopRequireDefault(require("flutterwave-node-v3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MomoPayController = /*#__PURE__*/function () {
  function MomoPayController() {
    _classCallCheck(this, MomoPayController);
  }

  _createClass(MomoPayController, null, [{
    key: "InitiatePayment",
    value: function InitiatePayment(req, res) {
      var _req$body = req.body,
          amount = _req$body.amount,
          email = _req$body.email,
          phoneNumber = _req$body.phoneNumber,
          fullName = _req$body.fullName;
      var flw = new _flutterwaveNodeV["default"]('FLWPUBK-a6a1690036797707c7df7b1eb382e497-X', 'FLWSECK-a50592699fb6d93a80e69ac31b659dae-X');

      var rw_mobile_money = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var randomNumber, randomNumber1, txRef, orderId, payload, response;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;

                  randomNumber = function randomNumber(min, max) {
                    return Math.floor(Math.random() * (max - min) + min);
                  };

                  randomNumber1 = function randomNumber1(min, max) {
                    return Math.floor(Math.random() * (max - min) + min);
                  };

                  txRef = randomNumber(111111, 999999);
                  orderId = randomNumber1(111111, 999999);
                  payload = {
                    "tx_ref": "MC-".concat(txRef),
                    //This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.
                    "order_id": "USS_URG_".concat(orderId),
                    //Unique ref for the mobilemoney transaction to be provided by the merchant
                    "amount": amount,
                    "currency": "RWF",
                    "email": email,
                    "phone_number": phoneNumber,
                    "fullname": fullName
                  };
                  _context.next = 8;
                  return flw.MobileMoney.rwanda(payload);

                case 8:
                  response = _context.sent;
                  console.log(response);
                  res.status(201).json({
                    status: 201,
                    data: response
                  });
                  _context.next = 16;
                  break;

                case 13:
                  _context.prev = 13;
                  _context.t0 = _context["catch"](0);
                  res.status(500).json({
                    error: _context.t0
                  });

                case 16:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 13]]);
        }));

        return function rw_mobile_money() {
          return _ref.apply(this, arguments);
        };
      }();

      rw_mobile_money();
    }
  }]);

  return MomoPayController;
}();

var _default = MomoPayController;
exports["default"] = _default;
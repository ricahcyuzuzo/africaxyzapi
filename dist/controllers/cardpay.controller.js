"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _open = _interopRequireDefault(require("open"));

var _flutterwaveNodeV = _interopRequireDefault(require("flutterwave-node-v3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CardController = /*#__PURE__*/function () {
  function CardController() {
    _classCallCheck(this, CardController);
  }

  _createClass(CardController, null, [{
    key: "chargeTheCard",
    value: function chargeTheCard(req, res) {
      var _req$body = req.body,
          cardNumber = _req$body.cardNumber,
          cvv = _req$body.cvv,
          expiryMonth = _req$body.expiryMonth,
          expiryYear = _req$body.expiryYear,
          currency = _req$body.currency,
          amount = _req$body.amount,
          fullName = _req$body.fullName,
          email = _req$body.email,
          phoneNumber = _req$body.phoneNumber,
          pin = _req$body.pin,
          otp = _req$body.otp;
      var flw = new _flutterwaveNodeV["default"]("FLWPUBK_TEST-SANDBOXDEMOKEY-X", "FLWSECK_TEST-SANDBOXDEMOKEY-X");

      var randomNumber1 = function randomNumber1(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      };

      var txRef = randomNumber1(111111, 999999);
      var payload = {
        "card_number": cardNumber,
        "cvv": cvv,
        "expiry_month": expiryMonth,
        "expiry_year": expiryYear,
        "currency": currency,
        "amount": amount,
        "redirect_url": "https://www.google.com",
        "fullname": fullName,
        "email": email,
        "phone_number": phoneNumber,
        "enckey": "FLWSECK_TEST74e0b6c7db0e",
        "tx_ref": "MC-".concat(txRef) // This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.

      };

      var chargeCard = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var response, payload2, reCallCharge, callValidate, url;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return flw.Charge.card(payload);

                case 3:
                  response = _context.sent;
                  console.log(response);

                  if (!(response.meta.authorization.mode === 'pin')) {
                    _context.next = 15;
                    break;
                  }

                  payload2 = payload;
                  payload2.authorization = {
                    "mode": "pin",
                    "fields": ["pin"],
                    "pin": pin
                  };
                  _context.next = 10;
                  return flw.Charge.card(payload2);

                case 10:
                  reCallCharge = _context.sent;
                  _context.next = 13;
                  return flw.Charge.validate({
                    "otp": otp,
                    "flw_ref": reCallCharge.data.flw_ref
                  });

                case 13:
                  callValidate = _context.sent;
                  console.log(callValidate);

                case 15:
                  if (response.meta.authorization.mode === 'redirect') {
                    url = response.meta.authorization.redirect;
                    (0, _open["default"])(url);
                  }

                  console.log(response);
                  res.status(201).json({
                    message: 'Payment initiated',
                    data: response
                  });
                  _context.next = 23;
                  break;

                case 20:
                  _context.prev = 20;
                  _context.t0 = _context["catch"](0);
                  res.status(500).json({
                    error: _context.t0
                  });

                case 23:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 20]]);
        }));

        return function chargeCard() {
          return _ref.apply(this, arguments);
        };
      }();

      chargeCard();
    }
  }]);

  return CardController;
}();

var _default = CardController;
exports["default"] = _default;
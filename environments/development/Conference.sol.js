"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Pudding) {
  // Inherit from Pudding. The dependency on Babel sucks, but it's
  // the easiest way to extend a Babel-based class. Note that the
  // resulting .js file does not have a dependency on Babel.

  var Conference = (function (_Pudding) {
    _inherits(Conference, _Pudding);

    function Conference() {
      _classCallCheck(this, Conference);

      _get(Object.getPrototypeOf(Conference.prototype), "constructor", this).apply(this, arguments);
    }

    return Conference;
  })(Pudding);

  ;

  // Set up specific data for this class.
  Conference.abi = [{ "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "registrantsPaid", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [], "name": "organizer", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "recipient", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "refundTicket", "outputs": [{ "name": "success", "type": "bool" }], "type": "function" }, { "constant": false, "inputs": [], "name": "destroy", "outputs": [], "type": "function" }, { "constant": false, "inputs": [{ "name": "newquota", "type": "uint256" }], "name": "changeQuota", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "quota", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [], "name": "numRegistrants", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": false, "inputs": [], "name": "buyTicket", "outputs": [{ "name": "success", "type": "bool" }], "type": "function" }, { "inputs": [], "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_to", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "Refund", "type": "event" }];
  Conference.binary = "606060405260008054600160a060020a0319163317815560646003556002556102898061002c6000396000f36060604052361561006c5760e060020a600035046313381fbf811461006e5780636120326514610086578063705099b91461009857806383197ef0146100c4578063a977c71e146100ee578063cebe09c914610111578063ec3a6f731461011a578063edca914c14610123575b005b61013a60043560016020526000908152604090205481565b61014c600054600160a060020a031681565b61013a600435602435600080548190600160a060020a039081163391909116146101bc575b5092915050565b61006c600054600160a060020a039081163391909116141561028757600054600160a060020a0316ff5b61006c600435600054600160a060020a039081163391909116146101b3576101b9565b61013a60035481565b61013a60025481565b61013a6003546002546000919010610156576101b0565b60408051918252519081900360200190f35b6060908152602090f35b600160a060020a03331680825260016020819052604080842034908190556002805490930190925560609283526080919091527fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c91a15060015b90565b60038190555b50565b600160a060020a0384168152600160205260408120548314156100bd575030600160a060020a038116318390106100bd57600160a060020a0384168284606082818181858883f1505060408051938452602084019190915280517fbb28353e4598c3b9199101a66e0989549b659a59a54d2c27fbb183f1932c8e6d938190039091019150a160006001600050600086600160a060020a0316815260200190815260200160002060005081905550600260008181505480929190600190039190505550600191506100bd565b56";

  if ("0x9d289ca1d396de493563c6c966cac6cbc3441eeb" != "") {
    Conference.address = "0x9d289ca1d396de493563c6c966cac6cbc3441eeb";

    // Backward compatibility; Deprecated.
    Conference.deployed_address = "0x9d289ca1d396de493563c6c966cac6cbc3441eeb";
  }

  Conference.generated_with = "1.0.2";
  Conference.contract_name = "Conference";

  return Conference;
};

// Nicety for Node.
factory.load = factory;

if (typeof module != "undefined") {
  module.exports = factory;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.Conference = factory;
}
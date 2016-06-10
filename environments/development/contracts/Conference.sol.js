// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"registrantsPaid","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"organizer","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"refundTicket","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"newquota","type":"uint256"}],"name":"changeQuota","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"quota","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"numRegistrants","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"buyTicket","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Refund","type":"event"}],
    binary: "606060405260008054600160a060020a0319163317815560646003556002556102898061002c6000396000f36060604052361561006c5760e060020a600035046313381fbf811461006e5780636120326514610086578063705099b91461009857806383197ef0146100c4578063a977c71e146100ee578063cebe09c914610111578063ec3a6f731461011a578063edca914c14610123575b005b61013a60043560016020526000908152604090205481565b61014c600054600160a060020a031681565b61013a600435602435600080548190600160a060020a039081163391909116146101bc575b5092915050565b61006c600054600160a060020a039081163391909116141561028757600054600160a060020a0316ff5b61006c600435600054600160a060020a039081163391909116146101b3576101b9565b61013a60035481565b61013a60025481565b61013a6003546002546000919010610156576101b0565b60408051918252519081900360200190f35b6060908152602090f35b600160a060020a03331680825260016020819052604080842034908190556002805490930190925560609283526080919091527fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c91a15060015b90565b60038190555b50565b600160a060020a0384168152600160205260408120548314156100bd575030600160a060020a038116318390106100bd57600160a060020a0384168284606082818181858883f1505060408051938452602084019190915280517fbb28353e4598c3b9199101a66e0989549b659a59a54d2c27fbb183f1932c8e6d938190039091019150a160006001600050600086600160a060020a0316815260200190815260200160002060005081905550600260008181505480929190600190039190505550600191506100bd565b56",
    unlinked_binary: "606060405260008054600160a060020a0319163317815560646003556002556102898061002c6000396000f36060604052361561006c5760e060020a600035046313381fbf811461006e5780636120326514610086578063705099b91461009857806383197ef0146100c4578063a977c71e146100ee578063cebe09c914610111578063ec3a6f731461011a578063edca914c14610123575b005b61013a60043560016020526000908152604090205481565b61014c600054600160a060020a031681565b61013a600435602435600080548190600160a060020a039081163391909116146101bc575b5092915050565b61006c600054600160a060020a039081163391909116141561028757600054600160a060020a0316ff5b61006c600435600054600160a060020a039081163391909116146101b3576101b9565b61013a60035481565b61013a60025481565b61013a6003546002546000919010610156576101b0565b60408051918252519081900360200190f35b6060908152602090f35b600160a060020a03331680825260016020819052604080842034908190556002805490930190925560609283526080919091527fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c91a15060015b90565b60038190555b50565b600160a060020a0384168152600160205260408120548314156100bd575030600160a060020a038116318390106100bd57600160a060020a0384168284606082818181858883f1505060408051938452602084019190915280517fbb28353e4598c3b9199101a66e0989549b659a59a54d2c27fbb183f1932c8e6d938190039091019150a160006001600050600086600160a060020a0316815260200190815260200160002060005081905550600260008181505480929190600190039190505550600191506100bd565b56",
    address: "0xd8869cf1de9a3d46beb8ee42d3de08d635adf275",
    generated_with: "2.0.8",
    contract_name: "Conference"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Conference error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Conference error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Conference error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Conference error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Conference = Contract;
  }

})();

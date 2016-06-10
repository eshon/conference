// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"registrantsPaid","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"organizer","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"refundTicket","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"newquota","type":"uint256"}],"name":"changeQuota","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"quota","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"numRegistrants","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"buyTicket","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Refund","type":"event"}],
    binary: "606060405260008054600160a060020a0319163317815560646003556002556102668061002c6000396000f36060604052361561006c5760e060020a600035046313381fbf811461006e5780636120326514610086578063705099b91461009857806383197ef0146100bf578063a977c71e146100e9578063cebe09c91461010c578063ec3a6f7314610115578063edca914c1461011e575b005b61013160043560016020526000908152604090205481565b610131600054600160a060020a031681565b61006c60043560243560008054600160a060020a0390811633919091161461019d57610261565b61006c600054600160a060020a039081163391909116141561019257600054600160a060020a0316ff5b61006c600435600054600160a060020a039081163391909116146101945761019a565b61013160035481565b61013160025481565b61006c6003546002541061013b57610002565b6060908152602090f35b600160a060020a03331660008181526001602081905260409182902034908190556002805490920190915560609283526080527fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c91a15b565b60038190555b50565b600160a060020a038316815260016020526040812054821415610261575030600160a060020a0381163182901061026157600160a060020a038316600083606082818181858883f1505060408051938452602084019190915280517fbb28353e4598c3b9199101a66e0989549b659a59a54d2c27fbb183f1932c8e6d938190039091019150a160006001600050600085600160a060020a03168152602001908152602001600020600050819055506002600081815054809291906001900391905055505b50505056",
    unlinked_binary: "606060405260008054600160a060020a0319163317815560646003556002556102668061002c6000396000f36060604052361561006c5760e060020a600035046313381fbf811461006e5780636120326514610086578063705099b91461009857806383197ef0146100bf578063a977c71e146100e9578063cebe09c91461010c578063ec3a6f7314610115578063edca914c1461011e575b005b61013160043560016020526000908152604090205481565b610131600054600160a060020a031681565b61006c60043560243560008054600160a060020a0390811633919091161461019d57610261565b61006c600054600160a060020a039081163391909116141561019257600054600160a060020a0316ff5b61006c600435600054600160a060020a039081163391909116146101945761019a565b61013160035481565b61013160025481565b61006c6003546002541061013b57610002565b6060908152602090f35b600160a060020a03331660008181526001602081905260409182902034908190556002805490920190915560609283526080527fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c91a15b565b60038190555b50565b600160a060020a038316815260016020526040812054821415610261575030600160a060020a0381163182901061026157600160a060020a038316600083606082818181858883f1505060408051938452602084019190915280517fbb28353e4598c3b9199101a66e0989549b659a59a54d2c27fbb183f1932c8e6d938190039091019150a160006001600050600085600160a060020a03168152602001908152602001600020600050819055506002600081815054809291906001900391905055505b50505056",
    address: "0x69c50aae1f3026ec931ab0dee0046e132a8fd9eb",
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

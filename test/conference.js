// NOTE: This function can be removed once this bug is merged and released:
// https://github.com/ethereum/web3.js/pull/307
var cleanString = function(str) {
  var newString = "";
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    if (code == 0) break;
    newString += String.fromCharCode(code);
  }
  return newString;
}

contract('Conference', function(accounts) {
	console.log(accounts);
	var owner_account = accounts[0];
  var sender_account = accounts[1];

  it("Initial conference settings should match", function(done) {
    var c = Conference.at(Conference.deployed_address);
  	
  	Conference.new({from: owner_account}).then(
  		function(conference) {
  			conference.quota.call()
  			.then(
  				function(quota) { 
  					assert.equal(quota, 350, "Quota doesn't match!"); 
  			}).then(
  				function() { 
  					return conference.numRegistrants.call(); 
  			}).then(
  				function(num) { 
  					assert.equal(num, 0, "Registrants doesn't match!");
  					return conference.owner.call();
  			}).then(
  				function(owner) { 
  					assert.equal(owner, owner_account, "Owner doesn't match!");
  					done();
  			}).catch(done);
  	}).catch(done);
  });

  it("Should update quota", function(done) {
    var c = Conference.at(Conference.deployed_address);
  	
  	Conference.new({from: owner_account}).then(
  		function(conference) {
  			conference.quota.call()
  			.then(
  				function(quota) { 
  					assert.equal(quota, 350, "Quota doesn't match!"); 
  			}).then(
  				function() { 
  					return conference.changeQuota(300);
  			}).then(
  				function(result) { 
  					console.log("Quota change result: " + result);
  					return conference.quota.call()
  			}).then(
  				function(quota) { 
  					assert.equal(quota, 300, "New quota is not correct!");
  					done();
  			}).catch(done);
  	}).catch(done);
  });


  it("Should let you buy a ticket", function(done) {
    var c = Conference.at(Conference.deployed_address);

  	Conference.new({from: owner_account}).then(

  		function(conference) {
        var ticketPrice = web3.toWei(.05, 'ether');
  			console.log("sending value " + ticketPrice);
        var initialBalance = web3.eth.getBalance(conference.address).toNumber();  
        console.log("Initial Balance", initialBalance);

  			conference.buyTicket(
  				{ from: sender_account, value: ticketPrice })
        .then(
          function() {
  					var newBalance = web3.eth.getBalance(conference.address).toNumber();
  					console.log("New Balance", newBalance);
            var difference = newBalance - initialBalance;
  					assert.equal(difference, ticketPrice, "Difference should be what was sent");
  					return conference.numRegistrants.call(); 
  			}).then(
  				function(num) { 
  					assert.equal(num, 1, "there should be 1 registrants");
  					console.log("getRegistrantsPaid for " + sender_account);
  					return conference.getRegPaid.call(sender_account);
  			}).then(
  				function(amount) {
  					assert.equal(amount.toNumber(), ticketPrice, "Sender's paid but is not listed as paying");	
  					return conference.getRegEmail.call(sender_account);
  			}).then(
  				function(email) {
  					assert.equal(cleanString(email.toString()), "email", "Sender's email does not match");
  					return web3.fromWei(web3.eth.getBalance(conference.address));
  			}).then(
  				function(bal) {
  					console.log("Final balance contract ", bal.toNumber());
  					done();
  			}).catch(done);
  	}).catch(done);
  });

  it("Should issue a refund by owner only", function(done) {
    var c = Conference.at(Conference.deployed_address);

    var initialBalance = web3.fromWei(web3.eth.getBalance(contractAddr).toNumber()); 
    console.log("Initial Balance", initialBalance);
    
    Conference.new({from: owner_account}).then(
      function(conference) {
        var ticketPrice = web3.toWei(5, 'ether');
        console.log("sending value " + ticketPrice);
        var newBalance;

        conference.buyTicket(
          { from: sender_account, value: ticketPrice })
        .then(
          function(result) {
            newBalance = web3.fromWei(web3.eth.getBalance(contractAddr).toNumber());
            console.log("New Balance", newBalance);
            assert.isAbove(newBalance, initialBalance, "New balance should be greater than initial");
            var difference = Number(newBalance - initialBalance);
            console.log("Difference is .... " + difference);
            // FIX
            assert.closeTo(difference, Number(web3.fromWei(ticketPrice)), Number(web3.toWei(.1, 'ether')), "Difference should be close to ticket price");
            return conference.getRegPaid.call(sender_account);
        }).then(
          function(amount) {
            assert.equal(amount.toNumber(), ticketPrice, "Sender's paid but is not listed as paying");
            console.log("Now issue refund of amount ...." + ticketPrice);
            return conference.refundTicket.call(sender_account, ticketPrice);
        }).then(
          function(result) {
            assert.equal(true, result, "Refund result should be true");
            var postRefundBalance = web3.fromWei(web3.eth.getBalance(contractAddr).toNumber()); 
            assert.closeTo(Number(initialBalance), Number(postRefundBalance), 30, "Post refund balance should be close to initial");
            assert.isBelow(Number(postRefundBalance), newBalance, "After refund balance should be less");
            done();
        }).catch(done);
      }).catch(done);
    });
});


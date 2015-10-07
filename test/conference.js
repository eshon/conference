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

    var initialBalance = web3.fromWei(web3.eth.getBalance(owner_account).toNumber());	
    console.log("Initial Balance", initialBalance);
  	
  	Conference.new({from: owner_account}).then(
  		function(conference) {
  			console.log("sending value " + web3.toWei(1, 'ether'));
  			conference.buyTicketWithEmail(
  				{ from: sender_account, value: web3.toWei(1, 'ether') }, "email")
  			.then(
  				function(result) {
  					console.log("Is there any result? " +  result);
  					var newBalance = web3.fromWei(web3.eth.getBalance(owner_account).toNumber());
  					console.log("New Balance", newBalance);
  					assert.isAbove(newBalance, initialBalance, "new balance should be greater than initial");
  					return conference.numRegistrants.call(); 
  			}).then(
  				function(num) { 
  					assert.equal(num, 1, "there should be 1 registrants");
  					return conference.registrantsPaid.call(sender_account);
  			}).then(
  				function(amount) {
  					console.log("paid " + amount.toNumber());
  					assert.isAbove(amount.toNumber(), 0, "Sender's paid but is not listed as paying");	
  					return conference.registrantsEmail.call(sender_account);
  			}).then(
  				function(email) {
  					assert.equal(email.toString(), "email", "Sender's email does not match");
  					return web3.fromWei(web3.eth.getBalance(sender_account));
  			}).then(
  				function(bal) {
  					console.log("bal sender", bal.toNumber());
  					done();
  			}).catch(done);
  	}).catch(done);
  });
});


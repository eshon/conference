
window.onload = function() {
	var accounts = web3.eth.accounts;
	var conference = Conference.at(Conference.deployed_address);

	$("#confAddress").html(Conference.deployed_address);

	var myConferenceInstance;
	Conference.new({from: accounts[0]}).then(
		function(conf) {
			myConferenceInstance = conf;
			checkValues();
 	});

	// Check Values
	function checkValues() {
		myConferenceInstance.quota.call().then(
			function(quota) { 
				$("input#confQuota").val(quota);
				return myConferenceInstance.organizer.call();
		}).then(
			function(organizer) { 
				$("input#confOrganizer").val(organizer);
				return myConferenceInstance.numRegistrants.call(); 
		}).then(
			function(num) { 
				$("#numRegistrants").html(num.toNumber());
				return myConferenceInstance.organizer.call();
		});
	}

	// Change Quota
	function changeQuota(val) {
		myConferenceInstance.changeQuota(val, {from: accounts[0]}).then(
			function() {
				return myConferenceInstance.quota.call();
			}).then(
			function(quota) {
				if (quota == val) {
					var msgResult;
					msgResult = "Change successful";
				} else {
					msgResult = "Change failed";
				}
				$("#changeQuotaResult").html(msgResult);
			});
	}

	// buyTicket
	function buyTicket(buyerAddress, ticketPrice) {

		myConferenceInstance.buyTicket({ from: buyerAddress, value: ticketPrice }).then(
			function() {
				return myConferenceInstance.numRegistrants.call();
			}).then(
			function(num) {
				$("#numRegistrants").html(num.toNumber());
				return myConferenceInstance.registrantsPaid.call(buyerAddress);
			}).then(
			function(valuePaid) {
				var msgResult;
				if (valuePaid.toNumber() == ticketPrice) {
					msgResult = "Purchase successful";
				} else {
					msgResult = "Purchase failed";
				}
				$("#buyTicketResult").html(msgResult);
			});
	}

	// refundTicket
	function refundTicket(buyerAddress, ticketPrice) {

			var msgResult;

			myConferenceInstance.registrantsPaid.call(buyerAddress).then(
			function(result) {
				if (result.toNumber() == 0) {
					$("#refundTicketResult").html("Buyer is not registered - no refund!");
				} else {		
					myConferenceInstance.refundTicket(buyerAddress, 
						ticketPrice, {from: accounts[0]}).then(
						function() {
							return myConferenceInstance.numRegistrants.call();
						}).then(
						function(num) {
							$("#numRegistrants").html(num.toNumber());
							return myConferenceInstance.registrantsPaid.call(buyerAddress);
						}).then(
						function(valuePaid) {
							if (valuePaid.toNumber() == 0) {
								msgResult = "Refund successful";
							} else {
								msgResult = "Refund failed";
							}
							$("#refundTicketResult").html(msgResult);
						});	
				}
			});
	}

	// Wire up the UI elements
	$("#changeQuota").click(function() {
		var val = $("#confQuota").val();
		changeQuota(val);
	});

	$("#buyTicket").click(function() {
		var val = $("#ticketPrice").val();
		var buyerAddress = $("#buyerAddress").val();
		buyTicket(buyerAddress, web3.toWei(val));
	});

	$("#refundTicket").click(function() {
		var val = $("#ticketPrice").val();
		var buyerAddress = $("#refBuyerAddress").val();
		refundTicket(buyerAddress, web3.toWei(val));
	});

	// Set value of wallet to accounts[1]
	$("#buyerAddress").val(accounts[1]);
	$("#refBuyerAddress").val(accounts[1]);

};
contract ConferenceSimple {

	struct Registrant {
		address addr;
		uint amount;
		bool registered;
		string email;
	}

	address owner;
	mapping (uint => Registrant) registrants;
	uint numRegistrants;
	uint quota;


	function Conference() {
		owner = msg.sender;		
		quota = 350; // confirm quota amount
		numRegistrants = 0;
	}

	// Default buy a ticket
	function () {
		if (numRegistrants >= quota) { return; }
		registrants[numRegistrants++] = 
			Registrant({ 
				addr: msg.sender,
				amount: msg.value,
				registered: true,
				email: ''
			});
	}
	
	// Buy a ticket with email - should this be done at all?
	function buyTicketAddEmail(string _email) {
		if (numRegistrants >= quota) { return; }
		registrants[numRegistrants++] =
			Registrant({ 
				addr: msg.sender,
				amount: msg.value,
				registered: true,
				email: _email
			});
		numRegistrants++;
	}

	function changeQuota(uint newquota) returns(bool success) {
		if (msg.sender != owner) { return false; }
		quota = newquota;
		return true;
	}

	function refundTicket(address recipient, uint amount) returns(bool success) {
		if (msg.sender != owner) { return false; }
		if (removeRegistrant(recipient)) {
			if (owner.balance > amount) { 
				recipient.send(amount);
				return true;
			}
		}
		return false;
	}

	function removeRegistrant(address regAddress) returns(bool success) {
		for (uint i = 0; i < numRegistrants; i++) {
			if (registrants[i].addr == regAddress) {
				registrants[i].registered = false;
				numRegistrants--;
				return true;
			}
		}
		return false;
	}

	function destroy() {
		if (msg.sender == owner){
			suicide(owner);
		}
	}
}

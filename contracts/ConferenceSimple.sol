contract ConferenceSimple {

	struct Registrant {
		address addr;
		uint amount;
	}

	address owner;
	Registrant[] registrants; // for refunds
	uint quota;


	function Conference() {
		owner = msg.sender;		
		quota = 350; // confirm quota amount
	}

	// Default buy a ticket
	function () {
		if (registrants.length >= quota) { return; }
		registrants[registrants.length++] =
			Registrant({ addr: msg.sender, amount: msg.value });
	}

	function changeQuota(uint newquota) returns(bool success) {
		if (msg.sender != owner) { return false; }
		quota = newquota;
		return true;
	}

	// GET LIST OF REGISTRANTS
	/*
	function getRegistrants() returns(Registrant[]) {
		return registrants;
	}
	*/

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
		for (uint i = 0; i < registrants.length; i++) {
			if (registrants[i].addr == regAddress) {
				delete registrants[i];
				for (uint m = i; m < registrants.length - 1; m++) {
					registrants[m] = registrants[m+1];
				}
				registrants.length--;
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

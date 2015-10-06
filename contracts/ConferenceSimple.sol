contract ConferenceSimple {

	address owner;
	mapping (address => uint) registrantsPaid;
	mapping (address => string) registrantsEmail;
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
		registrantsPaid[msg.sender] = msg.value;
		numRegistrants++;
	}
	
	// Buy a ticket with email - should this be done at all?
	function buyTicketWithEmail(string _email) {
		if (numRegistrants >= quota) { return; }
		registrantsPaid[msg.sender] = msg.value;
		registrantsEmail[msg.sender] = _email;
		numRegistrants++;
	}

	function changeQuota(uint newquota) returns(bool success) {
		if (msg.sender != owner) { return false; }
		quota = newquota;
		return true;
	}

	function refundTicket(address recipient, uint amount) returns(bool success) {
		if (msg.sender != owner) { return false; }
		if (registrantsPaid[recipient] == amount) { // this may need to be more within a close enough range?
			if (owner.balance > amount) { 
				recipient.send(amount);
				registrantsPaid[recipient] = 0;
				registrantsEmail[msg.sender] = '';
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

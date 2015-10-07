contract Conference {

	address public owner;
	mapping (address => uint) public registrantsPaid;
	mapping (address => string) public registrantsEmail;
	uint public numRegistrants;
	uint public quota;

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
	function buyTicketWithEmail(string _email) public returns(uint val) {
		if (numRegistrants >= quota) { return 0; }
		registrantsPaid[msg.sender] = msg.value;
		registrantsEmail[msg.sender] = _email;
		numRegistrants++;
		return msg.value;
	}

	function changeQuota(uint newquota) public {
		if (msg.sender != owner) { return; }
		quota = newquota;
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

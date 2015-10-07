contract Conference {

	address public owner;
	mapping (address => uint) registrantsPaid;
	mapping (address => string) registrantsEmail;
	uint public numRegistrants;
	uint public quota;

	event Send(address from, address to, uint value);

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
	
	function buyTicket() public returns (bool success) {
		if (numRegistrants >= quota) { return false; }
		registrantsPaid[msg.sender] = msg.value;
		numRegistrants++;
		Send(msg.sender, owner, msg.value);
		return true;
	}

	// Buy a ticket with email - should this be done at all?
	function buyTicketWithEmail(string _email) public returns (bool success) {
		if (numRegistrants >= quota) { return false; }
		registrantsPaid[msg.sender] = msg.value;
		registrantsEmail[msg.sender] = _email;
		numRegistrants++;
		Send(msg.sender, owner, msg.value);
		return true;
	}

	function getRegPaid(address _address) public returns(uint amtPaid) {
		return registrantsPaid[_address];
	}

	function getRegEmail(address _address) public returns(string email) {
		return registrantsEmail[_address];
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

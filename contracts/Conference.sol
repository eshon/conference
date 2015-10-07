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
		Send(msg.sender, owner, msg.value);
	}
	
	function buyTicket() public returns (bool success) {
		if (numRegistrants >= quota) { return false; }
		registrantsPaid[msg.sender] = msg.value;
		numRegistrants++;
		Send(msg.sender, owner, msg.value);
		return true;
	}

	// Buy a ticket and record email
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

	function refundTicket(address recipient, uint amount) public returns(bool success) {
		if (msg.sender != owner) { return false; }
		if (registrantsPaid[recipient] == amount) { 
			if (owner.balance > amount) { 
				//Send(owner, recipient, amount);
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

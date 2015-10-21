contract Conference {  // can be killed, so the owner gets sent the money in the end

	address public organizer;
	mapping (address => uint) public registrantsPaid;
	uint public numRegistrants;
	uint public quota;

	event Deposit(address _from, uint _amount); // so you can log the event
	event Refund(address _to, uint _amount); // so you can log the event

	function Conference() {
		organizer = msg.sender;		
		quota = 350;
		numRegistrants = 0;
	}

	function buyTicket() public returns (bool success) {
		if (numRegistrants >= quota) { return false; }
		registrantsPaid[msg.sender] = msg.value;
		numRegistrants++;
		Deposit(msg.sender, msg.value);
		return true;
	}

	function changeQuota(uint newquota) public {
		if (msg.sender != organizer) { return; }
		quota = newquota;
	}

	function refundTicket(address recipient, uint amount) public returns (bool success) {
		if (msg.sender != organizer) { return false; }
		if (registrantsPaid[recipient] == amount) { 
			address myAddress = this;
			if (myAddress.balance >= amount) { 
				recipient.send(amount);
				Refund(recipient, amount);
				registrantsPaid[recipient] = 0;
				numRegistrants--;
				
				return true;
			}
		}
		return false;
	}

	function destroy() {
		if (msg.sender == organizer) { // without this funds could be locked in the contract forever!
			suicide(organizer);
		}
	}
}

contract Conference {

	// enum mappings not working so use:
	
	uint constant Full = 0;
	uint constant Developer = 1;
	uint constant Student = 2;
	uint constant Mon = 3;
	uint constant Tue = 4;
	uint constant Wed = 5;
	uint constant Thu = 6;
	uint constant Fri = 7;

	struct Registrant {
		address addr;
		uint amount;
		uint ticketType;
	}
	
	struct TicketDetails {
		uint price;
		uint quota;
		uint count;
	}

	address owner;
	Registrant[] registrants; // for refunds
	mapping (uint => TicketDetails) tickets; // for refunds


	function Conference() {
		owner = msg.sender;
		
		// PRICE - Do we need use price feed for £ to ETH? Assume prices below in £

		tickets[Full] = TicketDetails({ price: 750, quota: 200, count: 0 });

		// Day Passes
		tickets[Mon] = TicketDetails({ price: 250, quota: 100, count: 0 });
		tickets[Tue] = TicketDetails({ price: 250, quota: 100, count: 0 });
		tickets[Wed] = TicketDetails({ price: 250, quota: 100, count: 0 });
		tickets[Thu] = TicketDetails({ price: 250, quota: 100, count: 0 });
		tickets[Fri] = TicketDetails({ price: 250, quota: 100, count: 0 });

		// Discounted Passes
		tickets[Developer] = TicketDetails({ price: 200, quota: 50, count: 0 });
		tickets[Student] = TicketDetails({ price: 100, quota: 50, count: 0 });
	}

	// Default buy a ticket
	function () {
		buyChoice(Full);
	}

	function buyChoice(uint choice) returns(bool success) {
		if (msg.value < tickets[choice].price) return false;
		if (tickets[choice].count >= tickets[choice].quota) return false;

		registrants[registrants.length++] = 
		Registrant({ addr: msg.sender, amount: msg.value, ticketType: choice });
		tickets[choice].count++;
		return true;
	}

	function buyDeveloper() { buyChoice(1); }
	function buyStudent() { buyChoice(2); }
	function buyMonday() { buyChoice(3); }
	function buyTuesday() { buyChoice(4); }
	function buyWednesday() { buyChoice(5); }
	function buyThursday() { buyChoice(6); }
	function buyFriday() { buyChoice(7); }

	function changeQuota(uint ticketType, uint newquota) returns(bool success) {
		if (msg.sender != owner) return false;
		tickets[ticketType].quota = newquota;
		return true;
	}

	// GET LIST OF REGISTRANTS
	/*
	function getRegistrants() returns(Registrant[]) {
		return registrants;
	}
	*/

	function refundTicket(address recipient, uint amount) returns(bool success) {
		if (msg.sender != owner) return false;
		if (removeRegistrant(recipient)) {
			if (owner.balance > amount) recipient.send(amount);
			return true;
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

// License: GNU General Public License v2. See license.txt


/* Set Account Selection filter to show only Ledgers with group_or_ledger is "Ledger" */
cur_frm.set_query("payment_account", function(doc) {
	return {
		"filters": {
			"group_or_ledger": "Ledger"
		}
	};
});
cur_frm.set_query("wages_account", function(doc) {
	return {
		"filters": {
			"group_or_ledger": "Ledger"
		}
	};
});
cur_frm.set_query("os_wages_account", function(doc) {
	return {
		"filters": {
			"group_or_ledger": "Ledger"
		}
	};
});
cur_frm.set_query("other_wexp_account", function(doc) {
	return {
		"filters": {
			"group_or_ledger": "Ledger"
		}
	};
});

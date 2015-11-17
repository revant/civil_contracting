// License: GNU General Public License v2. See license.txt

/* Set Account Selection filter to show only Ledgers with group_or_ledger is "Ledger" */

cur_frm.set_query("account", "wages_account", function(doc, cdt, cdn) {
	return{
		filters: [
			['Account', 'is_group', '=', 0],
		]
	}
});

cur_frm.set_query("account", "os_wages_account", function(doc, cdt, cdn) {
	return{
		filters: [
			['Account', 'is_group', '=', 0],
		]
	}
});

cur_frm.set_query("account", "other_wexp_account", function(doc, cdt, cdn) {
	return{
		filters: [
			['Account', 'is_group', '=', 0],
		]
	}
});


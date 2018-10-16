// Copyright (c) 2015, Revant Nandgaonkar and contributors
// For license information, please see license.txt

cur_frm.add_fetch("worker", "employee_name", "worker_name");
cur_frm.add_fetch("worker", "workstation", "workstation");
cur_frm.add_fetch("worker", "outstanding_wages", "t_os_wage");


var os_wages_account = "";

frappe.ui.form.on("Wage Slip", {
	onload: function(frm) {
		frappe.call({
        	method: "civil_contracting.civil_contracting.doctype.worker_sheet_settings.worker_sheet_settings.get_account",
        	args: {
        		company: frm.doc.company
        	},
        	callback: function (data) {
        		os_wages_account = data.message[1].account;
        		if(!os_wages_account){
	        		msgprint (__("Set Outstanding Wages account in Worker Sheet Settings"));
        		}
        	}
    	})
	}
});

frappe.ui.form.on("Wage Slip", "get_outstanding_wages", function(frm) {

	frm.set_value("payment_allocation", []);
	return frappe.call({
		method: 'civil_contracting.civil_contracting.doctype.wage_slip.wage_slip.get_os_wg',
		args: {
			"supplier": frm.doc.supplier,
			"project": frm.doc.project
		},
		callback: function(r, rt) {
			if(r.message) {
					frm.clear_table("payment_allocation");
					$.each(r.message, function(i, d) {
					var c = frm.add_child("payment_allocation");
					c.worker = d.name;
					c.worker_name = d.employee_name;
					c.workstation = d.workstation;
					c.t_os_wage = d.outstanding_wages;
					c.t_payment = d.outstanding_wages;
				});
			}
			refresh_field("payment_allocation");
			frm.layout.refresh_sections();
		}
	});
});

calculate_totals = function(doc) {
	var allocation = doc.payment_allocation || [];
	doc.total_os_wages = 0.0;
	doc.total_payment = 0.0;
	for(var i=0;i<allocation.length;i++) {
		doc.total_os_wages += flt(allocation[i].t_os_wage);
		doc.total_payment += flt(allocation[i].t_payment);
	}
	refresh_field('total_os_wages');
	refresh_field('total_payment');
}

cur_frm.cscript.refresh = function(doc, dt, dn) {
	if(!doc.__islocal) {
		if(doc.docstatus==1 && frappe.model.can_create("Journal Entry")){
    		cur_frm.add_custom_button(__("Make Journal Entry"), make_journal_entry);
    	}
    }
    calculate_totals(doc);
}

make_journal_entry = function() {

	var me = this;

	if(cur_frm.doc.mode_of_payment === "Cash") {
		voucher_type = "Cash Entry";
	}
	else if(cur_frm.doc.mode_of_payment === "Cheque") {
		voucher_type = "Bank Entry";
	}
	return frappe.call({
		method: "erpnext.accounts.doctype.journal_entry.journal_entry.get_default_bank_cash_account",
		args: {
			"company": cur_frm.doc.company,
			"voucher_type": voucher_type
		},
		callback: function(r) {
			var jv = frappe.model.make_new_doc_and_get_name('Journal Entry');
			jv = locals['Journal Entry'][jv];
			jv.voucher_type = voucher_type;
			jv.company = cur_frm.doc.company;
			jv.remark = 'Payment against Worker Sheet: ' + cur_frm.doc.name;
			jv.fiscal_year = cur_frm.doc.fiscal_year;

			var d1 = frappe.model.add_child(jv, 'Journal Entry Account', 'accounts');
			d1.debit_in_account_currency = flt(cur_frm.doc.total_payment);
			d1.account = os_wages_account;

			// credit to cash_bank_account
			var d2 = frappe.model.add_child(jv, 'Journal Entry Account', 'accounts');
			d2.credit_in_account_currency = flt(cur_frm.doc.total_payment);
			if(r.message) {
				d2.account = r.message.account;
				d2.balance = r.message.balance;
			}
			loaddoc('Journal Entry', jv.name);
		}
	});
}

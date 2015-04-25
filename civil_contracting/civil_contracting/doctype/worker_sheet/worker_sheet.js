// Copyright (c) 2013, Revant Nandgaonkar and contributors
// For license information, please see license.txt

frappe.ui.form.on("Worker Sheet", "onload", function(frm) {
	//Setting "working_hours" value from Singles - Worker Sheet Settings
    frappe.call({
        method: "frappe.client.get",
        args: {
        	doctype: "Worker Sheet Settings"
        },
        callback: function (data) {
        	frappe.model.set_value(frm.doctype, frm.docname, "working_hours", data.message.working_hours)
        }
    })
});

cur_frm.add_fetch("workstation", "hour_rate", "rate");

calculate_totals = function(doc) {
	var attendance = doc.worker_attendance || [];
	doc.total_wages = 0.0;
	doc.outstanding_wages = 0.0;
	doc.daily_wages = 0.0;
	for(var i=0;i<attendance.length;i++) {
		if (attendance[i].is_daily_paid === 1){
			if (!attendance[i].hours){
				attendance[i].hours = doc.working_hours;
			}
			daily_wages = flt(flt(attendance[i].rate) * flt(attendance[i].hours), 2);
			doc.daily_wages += daily_wages;
		}
		total_wages = flt(flt(attendance[i].rate) * flt(attendance[i].hours), 2);
		doc.total_wages += total_wages;
	}
	doc.outstanding_wages = flt(flt(doc.total_wages) - flt(doc.daily_wages));
	refresh_field('total_wages');
	refresh_field('daily_wages');
	refresh_field('outstanding_wages');
}

// if "hours" are not entered in Attendance Row, "working_hours" will be copied
add_working_hours = function(doc) {
	var attendance = doc.worker_attendance || [];
	for(var i=0;i<attendance.length;i++) {
		if (!attendance[i].hours){
			attendance[i].hours = doc.working_hours;
		}
	}
	refresh_field('hours');
}

make_journal_entry = function() {
	if (frappe.model.can_create("Journal Entry")) {
		/* var me = this;
		var voucher_type = "Journal Entry";
		
		if(cur_frm.doc.mode_of_payment == "Cash") {
			voucher_type = "Cash Entry";
		}
		if(cur_frm.doc.mode_of_payment == "Bank") {
			voucher_type = "Bank Entry";
		}
		else {
			voucher_type = "Journal Entry";
		}

		return frappe.call({
			method: "erpnext.accounts.doctype.journal_entry.journal_entry.get_default_bank_cash_account",
			args: {
				//"company": cur_frm.doc.company,
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
				d1.debit = cur_frm.doc.total_sanctioned_amount;
				d1.against_expense_claim = cur_frm.doc.name;

				// credit to bank
				var d1 = frappe.model.add_child(jv, 'Journal Entry Account', 'accounts');
				d1.credit = cur_frm.doc.total_sanctioned_amount;
				d1.against_expense_claim = cur_frm.doc.name;
				if(r.message) {
					d1.account = r.message.account;
					d1.balance = r.message.balance;
				}
				loaddoc('Journal Entry', jv.name);
			}
		});
	*/
	}
	else {
		msgprint(__("No permission to create Journal Voucher Entry"));
	}

}

cur_frm.cscript.validate = function(doc, dt, dn) {
	calculate_totals(doc);
}

cur_frm.cscript.refresh = function(doc, dt, dn) {
	if(!doc.__islocal) {
		if(doc.docstatus==1){
    		cur_frm.add_custom_button(__("Make Journal Entry"), make_journal_entry, frappe.boot.doctype_icons["Journal Entry"]);
    	}
    }
    add_working_hours(doc);
}

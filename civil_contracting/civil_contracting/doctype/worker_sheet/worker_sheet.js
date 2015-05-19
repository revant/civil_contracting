// Copyright (c) 2013, Revant Nandgaonkar and contributors
// For license information, please see license.txt
var voucher_type = "Bank Voucher";
var wages_account = "";
var os_wages_account = "";
var other_wexp_account = "";
var working_hours = 0.0;

frappe.ui.form.on("Worker Sheet", "onload", function(frm) {
	//Setting "working_hours" value from Singles - Worker Sheet Settings
    frappe.call({
        method: "frappe.client.get",
        args: {
        	doctype: "Worker Sheet Settings"
        },
        callback: function (data) {
        	wages_account = data.message.wages_account;;
			os_wages_account = data.message.os_wages_account;
			other_wexp_account = data.message.other_wexp_account;
			working_hours = data.message.working_hours;
        	frappe.model.set_value(frm.doctype, frm.docname, "working_hours", working_hours);
        	if(!wages_account){
        		msgprint (__("Set Wages account in Worker Sheet Settings"));
        	}
        	if(!os_wages_account){
        		msgprint (__("Set Outstanding Wages account in Worker Sheet Settings"));
        	}
        	if(!other_wexp_account){
        		msgprint (__("Set Other Worker Expenses account in Worker Sheet Settings"));
        	}
        	if(!working_hours){
        		msgprint (__("Set Working Hours in Worker Sheet Settings"));
        	}
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

	var me = this;

	/*if(cur_frm.doc.mode_of_payment === "Cash") {
		voucher_type = "Cash Entry";
	}
	else if(cur_frm.doc.mode_of_payment === "Bank") {
		voucher_type = "Bank Entry";
	}*/
	return frappe.call({
		method: "erpnext.accounts.doctype.journal_voucher.journal_voucher.get_default_bank_cash_account",
		args: {
			"company": cur_frm.doc.company,
			"voucher_type": voucher_type
		},
		callback: function(r) {
			var jv = frappe.model.make_new_doc_and_get_name('Journal Voucher');
			jv = locals['Journal Voucher'][jv];
			jv.voucher_type = voucher_type;
			jv.company = cur_frm.doc.company;
			jv.remark = 'Payment against Worker Sheet: ' + cur_frm.doc.name;
			jv.fiscal_year = cur_frm.doc.fiscal_year;

			var d1 = frappe.model.add_child(jv, 'Journal Voucher Detail', 'entries');
			d1.debit = cur_frm.doc.total_wages;
			d1.account = wages_account;
			if(cur_frm.doc.cost_center){
				d1.cost_center = cur_frm.doc.cost_center;
			}

			if(cur_frm.doc.other_worker_expense){
				var d2 = frappe.model.add_child(jv, 'Journal Voucher Detail', 'entries');
				d2.debit = cur_frm.doc.other_worker_expense;
				d2.account = other_wexp_account;
				if(cur_frm.doc.cost_center){
					d2.cost_center = cur_frm.doc.cost_center;
				}
			}

			// credit to cash_bank_account
			var d3 = frappe.model.add_child(jv, 'Journal Voucher Detail', 'entries');
			d3.credit = flt(flt(cur_frm.doc.daily_wages) + flt(cur_frm.doc.other_worker_expense));
			if(r.message) {
				d3.account = r.message.cash_bank_account;
				d3.balance = r.message.balance;
			}

			// credit outstanding wages
			if(cur_frm.doc.outstanding_wages){
				var d4 = frappe.model.add_child(jv, 'Journal Voucher Detail', 'entries');
				d4.credit = cur_frm.doc.outstanding_wages;
				d4.account = os_wages_account;
			}
			loaddoc('Journal Voucher', jv.name);
		}
	});
}

cur_frm.cscript.validate = function(doc, dt, dn) {
	//calculate_totals(doc);
}

cur_frm.cscript.refresh = function(doc, dt, dn) {
	if(!doc.__islocal) {
		if(doc.docstatus==1 && frappe.model.can_create("Journal Voucher")){
    		cur_frm.add_custom_button(__("Make Journal Voucher"), make_journal_entry, frappe.boot.doctype_icons["Journal Voucher"]);
    	}
    }
    calculate_totals(doc);
    add_working_hours(doc);
}

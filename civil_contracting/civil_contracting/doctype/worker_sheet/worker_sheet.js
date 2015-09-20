// Copyright (c) 2013, Revant Nandgaonkar and contributors
// For license information, please see license.txt
<<<<<<< HEAD
var voucher_type = "Bank Voucher";
=======
var voucher_type = "Cash Entry";
>>>>>>> v5
var wages_account = "";
var os_wages_account = "";
var other_wexp_account = "";
var working_hours = 0.0;

<<<<<<< HEAD
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
=======
frappe.ui.form.on("Worker Sheet", {
	onload: function(frm) {
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
	},
	onload_post_render: function() {
		cur_frm.get_field("worker_attendance").grid.set_multiple_add("workstation", "rate");
	},
>>>>>>> v5
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

<<<<<<< HEAD
	/*if(cur_frm.doc.mode_of_payment === "Cash") {
		voucher_type = "Cash Entry";
	}
	else if(cur_frm.doc.mode_of_payment === "Bank") {
		voucher_type = "Bank Entry";
	}*/
	return frappe.call({
		method: "erpnext.accounts.doctype.journal_voucher.journal_voucher.get_default_bank_cash_account",
=======
	if(cur_frm.doc.mode_of_payment === "Cash") {
		voucher_type = "Cash Entry";
	}
	else if(cur_frm.doc.mode_of_payment === "Cheque") {
		voucher_type = "Bank Entry";
	}
	return frappe.call({
		method: "erpnext.accounts.doctype.journal_entry.journal_entry.get_default_bank_cash_account",
>>>>>>> v5
		args: {
			"company": cur_frm.doc.company,
			"voucher_type": voucher_type
		},
		callback: function(r) {
<<<<<<< HEAD
			var jv = frappe.model.make_new_doc_and_get_name('Journal Voucher');
			jv = locals['Journal Voucher'][jv];
=======
			var jv = frappe.model.make_new_doc_and_get_name('Journal Entry');
			jv = locals['Journal Entry'][jv];
>>>>>>> v5
			jv.voucher_type = voucher_type;
			jv.company = cur_frm.doc.company;
			jv.remark = 'Payment against Worker Sheet: ' + cur_frm.doc.name;
			jv.fiscal_year = cur_frm.doc.fiscal_year;

<<<<<<< HEAD
			var d1 = frappe.model.add_child(jv, 'Journal Voucher Detail', 'entries');
			d1.debit = cur_frm.doc.total_wages;
=======
			var d1 = frappe.model.add_child(jv, 'Journal Entry Account', 'accounts');
			d1.debit_in_account_currency = cur_frm.doc.total_wages;
>>>>>>> v5
			d1.account = wages_account;
			if(cur_frm.doc.cost_center){
				d1.cost_center = cur_frm.doc.cost_center;
			}

			if(cur_frm.doc.other_worker_expense){
<<<<<<< HEAD
				var d2 = frappe.model.add_child(jv, 'Journal Voucher Detail', 'entries');
				d2.debit = cur_frm.doc.other_worker_expense;
=======
				var d2 = frappe.model.add_child(jv, 'Journal Entry Account', 'accounts');
				d2.debit_in_account_currency = cur_frm.doc.other_worker_expense;
>>>>>>> v5
				d2.account = other_wexp_account;
				if(cur_frm.doc.cost_center){
					d2.cost_center = cur_frm.doc.cost_center;
				}
			}

			// credit to cash_bank_account
<<<<<<< HEAD
			var d3 = frappe.model.add_child(jv, 'Journal Voucher Detail', 'entries');
			d3.credit = flt(flt(cur_frm.doc.daily_wages) + flt(cur_frm.doc.other_worker_expense));
			if(r.message) {
				d3.account = r.message.cash_bank_account;
=======
			var d3 = frappe.model.add_child(jv, 'Journal Entry Account', 'accounts');
			d3.credit_in_account_currency = flt(flt(cur_frm.doc.daily_wages) + flt(cur_frm.doc.other_worker_expense));
			if(r.message) {
				d3.account = r.message.account;
>>>>>>> v5
				d3.balance = r.message.balance;
			}

			// credit outstanding wages
			if(cur_frm.doc.outstanding_wages){
<<<<<<< HEAD
				var d4 = frappe.model.add_child(jv, 'Journal Voucher Detail', 'entries');
				d4.credit = cur_frm.doc.outstanding_wages;
				d4.account = os_wages_account;
			}
			loaddoc('Journal Voucher', jv.name);
=======
				var d4 = frappe.model.add_child(jv, 'Journal Entry Account', 'accounts');
				d4.credit_in_account_currency = cur_frm.doc.outstanding_wages;
				d4.account = os_wages_account;
			}
			loaddoc('Journal Entry', jv.name);
>>>>>>> v5
		}
	});
}

cur_frm.cscript.validate = function(doc, dt, dn) {
	//calculate_totals(doc);
}

cur_frm.cscript.refresh = function(doc, dt, dn) {
	if(!doc.__islocal) {
<<<<<<< HEAD
		if(doc.docstatus==1 && frappe.model.can_create("Journal Voucher")){
    		cur_frm.add_custom_button(__("Make Journal Voucher"), make_journal_entry, frappe.boot.doctype_icons["Journal Voucher"]);
=======
		if(doc.docstatus==1 && frappe.model.can_create("Journal Entry")){
    		cur_frm.add_custom_button(__("Make Journal Entry"), make_journal_entry, frappe.boot.doctype_icons["Journal Entry"]);
>>>>>>> v5
    	}
    }
    calculate_totals(doc);
    add_working_hours(doc);
}

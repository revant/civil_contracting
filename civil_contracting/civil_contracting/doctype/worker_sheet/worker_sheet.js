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

cur_frm.cscript.validate = function(doc, dt, dn) {
	calculate_totals(doc);
}

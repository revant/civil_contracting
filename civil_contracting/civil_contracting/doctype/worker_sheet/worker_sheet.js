// Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

cur_frm.add_fetch("workstation", "hour_rate", "rate");

/*
frappe.ui.form.on("Worker Sheet", "onload", function(frm) {
	frappe.call({
		"method": "frappe.database.get_values_from_single",
		args: {
			doctype: "Working Hour Setting",
			fieldname: "working_hours"
		},
		callback: function (data) {
			frappe.model.set_value(frm.doctype, frm.docname, "working_hours", data.message.working_hours)
		}
	})
})
*/
calculate_totals = function(doc) {
	var attendance = doc.worker_attendance || [];
	doc.total_wages = 0.0;
	doc.outstanding_wages = 0.0;
	for(var i=0;i<attendance.length;i++) {
		total_wages = flt(flt(attendance[i].rate) * flt(attendance[i].hours), 2);
		doc.total_wages += total_wages;
	}
	refresh_field('total_wages');
	doc.outstanding_wages = flt(flt(doc.total_wages) - flt(doc.daily_wages));
}

cur_frm.cscript.validate = function(doc, dt, dn) {
	calculate_totals(doc);
}

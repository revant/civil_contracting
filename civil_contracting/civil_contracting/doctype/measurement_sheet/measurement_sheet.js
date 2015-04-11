// Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

/*
cur_frm.set_query("bom_no", function(doc) {
	if (doc.measurement_item) {
		return{
			query: "erpnext.controllers.queries.bom",
			filters: {item: cstr(doc.measurement_item), docstatus: cstr(0)}
		}
	} else msgprint(__("Please enter Measurement Item first"));
});
*/

calculate_total_qty = function(doc) {
	var measurements = doc.measurement_table || [];
	doc.total_qty = 0.0;
	for(var i=0;i<measurements.length;i++) {
		total_qty = flt(flt(measurements[i].number) * flt(measurements[i].qty), 2);
		// frappe.model.set_value('BOM Operation',measurements[i].name, "total_qty", total_qty);
		doc.total_qty += total_qty;
	}
	refresh_field('total_qty');
}

cur_frm.cscript.validate = function(doc, dt, dn) {
	calculate_total_qty(doc);
}

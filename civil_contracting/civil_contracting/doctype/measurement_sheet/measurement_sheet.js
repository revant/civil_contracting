// Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

/* TODO: Set BOM selection filter to show only Draft BOM, BOM with docstatus 0 */

calculate_total_qty = function(doc) {
	var measurements = doc.measurement_table || [];
	doc.total_qty = 0.0;
	for(var i=0;i<measurements.length;i++) {
		total_qty = flt(flt(measurements[i].number) * flt(measurements[i].qty), 2);
		doc.total_qty += total_qty;
	}
	refresh_field('total_qty');
}

cur_frm.cscript.validate = function(doc, dt, dn) {
	calculate_total_qty(doc);
}

/*
// TODO: Add comment "Previous Quantity: Quantity in BOM before updating, update and Current Quantity

// TODO: Set total_qty as quantity of selected BOM on Submit
cur_frm.cscript.on_submit = function(doc, dt, dn) {
	bom_no = doc.bom_no;
	frappe.model.set_value('BOM', bom_no.name, "quantity", total_qty);
}
*/

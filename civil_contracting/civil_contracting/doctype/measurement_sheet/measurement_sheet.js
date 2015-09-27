// See license.txt

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

frappe.ui.form.on("Measurement Sheet", {
	onload: function(frm) { 
		frm.set_query("delivery_note", function() { 
			return {
				filters: {docstatus:0}
			}
		});
	}
});
cur_frm.add_fetch("item", "stock_uom", "uom");


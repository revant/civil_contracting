// See license.txt

cur_frm.add_fetch("delivery_note", "customer", "customer");

frappe.ui.form.on("Measurement Book", {
	onload: function(frm) { 
		frm.set_query("delivery_note", function() { 
			return {
				filters: {docstatus:1}
			}
		});
	}
});

frappe.ui.form.on("Measurement Book", "get_items", function(frm) {
	// erpnext.payment_tool.check_mandatory_to_fetch(frm.doc);

	frm.set_value("records", []);
	if(frm.doc.delivery_note) {
		return  frappe.call({
			method: 'civil_contracting.civil_contracting.doctype.measurement_book.measurement_book.get_measure_sheets',
			args: {
				"dn": frm.doc.delivery_note
			},
			callback: function(r, rt) {
				if(r.message) {
					
					frm.clear_table("records");

					$.each(r.message, function(i, d) {
						var c = frm.add_child("records");
						c.sheet_no = d.name;
						c.item_name = d.item;
						c.total_qty = d.total_qty;
						c.uom = d.uom;
					});
				}
				refresh_field("records");
				frm.layout.refresh_sections();
			}
		});
	}
});

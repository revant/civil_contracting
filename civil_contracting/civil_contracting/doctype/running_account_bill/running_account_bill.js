// see license.txt
frappe.ui.form.on("Running Account Bill", "project", function(frm) {
	frm.set_query("project", function() {
		return {
			filters: {
				customer: cur_frm.doc.customer
			}
		}
	});
});

frappe.ui.form.on("Running Account Bill", "prev_ra_bill", function(frm) {
	frm.set_query("prev_ra_bill", function() {
		return {
			filters: {
				docstatus:1,
				customer: cur_frm.doc.customer
			}
		}
	});
});

frappe.ui.form.on("Running Account Bill", "get_invoices", function(frm) {
	frm.set_value("sales_invoice_list", []);
	if(frm.doc.customer) {
		return frappe.call({
			method: 'civil_contracting.civil_contracting.doctype.running_account_bill.running_account_bill.get_sales_invoices',
			args: {
				"customer": frm.doc.customer,
				"project": frm.doc.project
			},
			callback: function(r, rt) {
				if(r.message) {
					
					frm.clear_table("sales_invoice_list");

					$.each(r.message, function(i, d) {
						var c = frm.add_child("sales_invoice_list");
						c.sales_invoice = d.name;
						c.net_total = d.total;
						c.tax = d.total_taxes_and_charges;
						c.grand_total = d.grand_total;
					});
				}
				refresh_field("sales_invoice_list");
				frm.layout.refresh_sections();
			}
		});
	}
});
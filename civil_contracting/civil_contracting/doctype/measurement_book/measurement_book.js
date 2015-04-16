// See license.txt

// cur_frm.cscript.onload = function(doc, cdt, cdn) {
//  	cur_frm.set_value("company", frappe.defaults.get_user_default("company"))
// }
cur_frm.add_fetch("sheet_no", "measurement_item", "item_name");
cur_frm.add_fetch("sheet_no", "total_qty", "total_qty");
cur_frm.add_fetch("sheet_no", "uom", "uom");
cur_frm.add_fetch("project", "customer", "customer");

// Copyright (c) 2013, Revant Nandgaonkar and contributors
// For license information, please see license.txt

frappe.query_reports["Material Consumption Report"] = {
	"filters": [
		{
			"fieldname":"from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.add_months(frappe.datetime.get_today(), -1),
			"reqd": 1
		},
		{
			"fieldname":"to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.get_today(),
			"reqd": 1
		},
		{
			"fieldname":"output_item",
			"label": __("Output Item"),
			"fieldtype": "Link",
			"options": "Item",
			"reqd": 1
		},
		{
			"fieldname":"project",
			"label": __("Project"),
			"fieldtype": "Link",
			"options": "Project",
			"reqd": 1
		}
	]
}

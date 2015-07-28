// Copyright (c) 2013, Revant Nandgaonkar and contributors
// For license information, please see license.txt

frappe.query_reports["Material Consumption Report"] = {
	"filters": [
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

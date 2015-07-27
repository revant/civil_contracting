# Copyright (c) 2013, Revant Nandgaonkar and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _

def execute(filters=None):
	columns = get_columns()
	material_entries = get_material_entries(filters)
	
	data = []
	for mat_ent in material_entries:
		data.append([mat_ent.date, mat_ent.project, mat_ent.output_item, mat_ent.op_uom, mat_ent.op_qty])
	return columns, data

def get_columns():
	return [_("Date") + ":Datetime:95", _("Project") + ":Link/Project:130", _("Output Item") + ":Link/Item:100"
	]

def get_material_entries(filters):
	return frappe.db.sql("""select date, project, output_item, op_uom, op_qty
		from `tabMaterial Sheet`
		where project = %(project)s and
		date between %(from_date)s and %(to_date)s
			order by date desc"""\
		.format(), filters, as_dict=1)
	
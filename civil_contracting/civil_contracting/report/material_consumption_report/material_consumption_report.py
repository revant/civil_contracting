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
		mat_item = get_mat_item(mat_ent.name)
		for i in mat_item:
			data.append([mat_ent.date, mat_ent.name, mat_ent.op_qty, i.item_consumed, i.item_description, i.qty_consumed, i.item_uom])
		#data.append([mat_ent.date, mat_ent.name, mat_ent.project, mat_ent.output_item])
	return columns, data

def get_columns():
	return [_("Date") + ":Date:95", _("Sheet No.") + ":Link/Material Sheet:95", _("O/P Qty") + ":Float:", _("Item") + ":Data:95", _("Description") + ":Data:145", _("Qty Consumed") + ":Data:95", _("UOM") + ":Data:95"
	]

def get_material_entries(filters):
	return frappe.db.sql("""select date, name, project, output_item, op_qty
		from `tabMaterial Sheet`
		where output_item = %(output_item)s and
		project = %(project)s and
		date between %(from_date)s and %(to_date)s
			order by date desc"""\
		.format(), filters, as_dict=1)

def get_mat_item(dname):
	return frappe.db.sql("""select item_consumed, qty_consumed, item_uom, item_description
		from `tabMaterial Sheet Item`
		where parent = %(name)s
			order by item_consumed desc"""\
		, {"name": dname}, as_dict=1)
# Copyright (c) 2013, Revant Nandgaonkar and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
# from frappe.desk.reportview import get_match_cond
from frappe.model.db_query import DatabaseQuery
from frappe.utils import nowdate
from frappe.model.document import Document

class MeasurementSheet(Document):
	def validate(self):
		delivery_note = frappe.get_list("Delivery Note",
			fields=["name", "docstatus"],
			filters = {
				"name": self.delivery_note
			})
		if delivery_note[0].docstatus != 0:
			frappe.throw(_("Only Draft Delivery Note Allowed"))
		delivery_note_items = frappe.get_list("Delivery Note Item",
			fields=["parent", "item_code"],
			filters = {
				"parent": self.delivery_note
			})
		cl = []
		for itm in delivery_note_items:
			if self.item == itm.item_code:
				cl.append(1)
			else:
				cl.append(0)
		if sum(cl) == 0:
			frappe.throw(_("Only Items from Delivery Note Allowed"))

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


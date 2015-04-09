# Copyright (c) 2013, Revant Nandgaonkar and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from erpnext.controllers.print_settings import print_settings_for_item_table

class MeasurementBookRecord(Document):
	def __setup__(self):
		print_settings_for_item_table(self)
		
	def calculate_item_values(self):
		item.qty = flt(item.length * item.breadth * (item.depth or 1), self.precision("amount", item))

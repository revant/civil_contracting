# Copyright (c) 2013, Revant Nandgaonkar and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class WorkerSheetAttendance(Document):
	def onload(self):
		self.hours = frappe.database.get_values_from_single("working_hours", "Working Hour Setting")

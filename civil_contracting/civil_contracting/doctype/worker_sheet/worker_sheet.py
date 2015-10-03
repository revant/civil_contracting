# Copyright (c) 2013, Revant Nandgaonkar and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import msgprint
from frappe import _
from frappe.model.document import Document
from frappe.database import *

class WorkerSheet(Document):
	def on_submit(self):
		for worker in self.worker_attendance:
			if worker.worker_name:
				old_os_wages = frappe.db.get_value("Worker", {"name":worker.worker_name}, "outstanding_wages")
				os_wages = old_os_wages + (worker.rate * worker.hours)
				frappe.set_value("Worker", worker.worker_name, "outstanding_wages", os_wages)
	def on_cancel(self):
		for worker in self.worker_attendance:
			if worker.worker_name:
				old_os_wages = frappe.db.get_value("Worker", {"name":worker.worker_name}, "outstanding_wages")
				os_wages = old_os_wages - (worker.rate * worker.hours)
				frappe.set_value("Worker", worker.worker_name, "outstanding_wages", os_wages)

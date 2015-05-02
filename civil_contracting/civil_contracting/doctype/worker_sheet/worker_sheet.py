# Copyright (c) 2013, Revant Nandgaonkar and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import msgprint
from frappe import _
from frappe.model.document import Document
from frappe.database import *

class WorkerSheet(Document):
	def validate(self):
		# validate repeating employees in attendance
		self.validate_for_employee()

	def validate_for_employee(self):
		check_list = []
		for d in self.get('worker_attendance'):
			if d.worker_name:
				check_list.append(cstr(d.worker_name))
		
		unique_chk_list = set(check_list)
		if len(unique_chk_list) != len(check_list):
			frappe.throw(_("Warning: Same Employee has been entered multiple times."))

# Copyright (c) 2015, Revant Nandgaonkar and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.utils import cstr, flt, cint, nowdate, now, add_days, getdate, comma_and

from frappe import msgprint, _, db

from frappe.model.document import Document

import json
from frappe.model.mapper import get_mapped_doc

class WageSlip(Document):
	def on_submit(self):
		for payment in self.payment_allocation:
			if payment.worker:
				if not payment.t_payment:
					frappe.throw(_("Payment must be entered"))
				elif payment.t_payment < 0:
					frappe.throw(_("Payment cannot be negative"))

				os_wages = payment.t_os_wage - payment.t_payment
				frappe.set_value("Worker", payment.worker, "outstanding_wages", os_wages)

	def on_cancel(self):
		for payment in self.payment_allocation:
			if payment.worker:
				get_worker = frappe.db.sql("""select name, outstanding_wages
		from `tabWorker` where name = %s """, payment.worker, as_dict=1)
				current_os_wage = get_worker[0].outstanding_wages
				os_wages = current_os_wage + payment.t_payment
				frappe.set_value("Worker", payment.worker, "outstanding_wages", os_wages)

@frappe.whitelist()
def get_os_wg(supplier, project=""):
	if supplier and project:
		return frappe.db.sql("""select name, employee_name, outstanding_wages, workstation, project, supplier
			from `tabWorker` where project = %(project)s or supplier = %(supplier)s""", {"project":frappe.db.escape(project),"supplier":frappe.db.escape(supplier)}, as_dict=1)
	elif supplier:
		return frappe.db.sql("""select name, employee_name, outstanding_wages, workstation, project, supplier
			from `tabWorker` where supplier = %(supplier)s""", {"supplier":frappe.db.escape(supplier)}, as_dict=1)
	elif project:
		return frappe.db.sql("""select name, employee_name, outstanding_wages, workstation, project, supplier
			from `tabWorker` where project = %(project)s""", {"project":frappe.db.escape(project)}, as_dict=1)

# -*- coding: utf-8 -*-
# Copyright (c) 2015, Revant Nandgaonkar and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document

class RunningAccountBill(Document):
	def validate(self):
		self.validate_previous_ra_bill()
		self.validate_project()
		self.set_ra_bill_no()

	def validate_previous_ra_bill(self):
		if self.prev_ra_bill and frappe.db.get_value("Running Account Bill", self.prev_ra_bill, "customer") != self.customer:
			frappe.throw(_("Previous Running Account Bill Customer does not match with current"))

	def validate_project(self):
		if self.project and frappe.db.get_value("Project", self.project, "customer") != self.customer:
			frappe.throw(_("Project's Customer does not match with current"))

	def set_ra_bill_no(self):
		if self.prev_ra_bill:
			prev_ra_bill_no = frappe.db.get_value("Running Account Bill", self.prev_ra_bill, "ra_bill_no") or 0
			self.ra_bill_no = int(prev_ra_bill_no) + 1
		else:
			self.ra_bill_no = 1

@frappe.whitelist()
def get_sales_invoices(customer, project):
	if customer and project:
		return frappe.db.sql("""select name, total, total_taxes_and_charges, grand_total
			from `tabSales Invoice`
			where customer = %(customer)s and
			project_name = %(project)s and
			docstatus = 1 """\
			, {"customer":frappe.db.escape(customer),"project":frappe.db.escape(project) or "%"}, as_dict=1)

	if customer:
			return frappe.db.sql("""select name, total, total_taxes_and_charges, grand_total
			from `tabSales Invoice`
			where customer = %(customer)s and
			docstatus = 1 """\
			, {"customer":frappe.db.escape(customer),"project":frappe.db.escape(project) or "%"}, as_dict=1)
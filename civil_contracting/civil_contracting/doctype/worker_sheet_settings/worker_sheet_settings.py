# Copyright (c) 2013, Revant Nandgaonkar and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document

class WorkerSheetSettings(Document):
	def validate(self):
		self.validate_accounts()
		self.validate_repeating_companies()

	def validate_repeating_companies(self):
		wages_account_companies = []
		for entry in self.wages_account:
			wages_account_companies.append(entry.company)

		if len(wages_account_companies)!= len(set(wages_account_companies)):
			frappe.throw(_("Same Company is entered more than once in Default Wages Account"))

		outstanding_wages_account_companies = []
		for entry in self.os_wages_account:
			outstanding_wages_account_companies.append(entry.company)

		if len(outstanding_wages_account_companies)!= len(set(outstanding_wages_account_companies)):
			frappe.throw(_("Same Company is entered more than once in Default Outstanding Wages Account"))

		other_wexp_account_companies = []
		for entry in self.other_wexp_account:
			other_wexp_account_companies.append(entry.company)

		if len(other_wexp_account_companies)!= len(set(other_wexp_account_companies)):
			frappe.throw(_("Same Company is entered more than once in Default Other Worker Expenses Account"))

	def validate_accounts(self):
		for entry in self.wages_account:
			"""Error when Company of Ledger account doesn't match with Company Selected"""
			if frappe.db.get_value("Account", entry.account, "company") != entry.company:
				frappe.throw(_("Account does not match with Company for Default Wages Account"))

		for entry in self.os_wages_account:
			if frappe.db.get_value("Account", entry.account, "company") != entry.company:
				frappe.throw(_("Account does not match with Company for Default Outstanding Wages Account"))

		for entry in self.other_wexp_account:
			if frappe.db.get_value("Account", entry.account, "company") != entry.company:
				frappe.throw(_("Account does not match with Company for Default Other Worker Expenses Account"))

@frappe.whitelist()
def get_account(company):
	
	account_list = []
	
	wages_account = frappe.db.sql("""select account from `tabWorker Sheet Settings Wages`
		where company = %s"""\
		,company , as_dict=1)

	if not wages_account:
		wages_account = {"account":"none"}

	os_wages_account = frappe.db.sql("""select account from `tabWorker Sheet Settings Outstanding`
		where company = %s"""\
		,company , as_dict=1)

	if not os_wages_account:
		os_wages_account = {"account":"none"}
	
	other_wexp_account = frappe.db.sql("""select account from `tabWorker Sheet Settings Other`
		where company = %s"""\
		,company , as_dict=1)

	if not other_wexp_account:
		other_wexp_account = {"account":"none"}
	
	for item in wages_account:
		account_list.append(item or "none")

	for item in os_wages_account:
		account_list.append(item or "none")

	for item in other_wexp_account:
		account_list.append(item or "none")

	return account_list
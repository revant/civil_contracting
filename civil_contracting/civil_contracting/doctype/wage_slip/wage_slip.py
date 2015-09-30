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
	pass

@frappe.whitelist()
def get_os_wg(project):
	return frappe.db.sql("""select name, employee_name, outstanding_wages, workstation, project 
		from `tabWorker` where project = %s """, project, as_dict=1)


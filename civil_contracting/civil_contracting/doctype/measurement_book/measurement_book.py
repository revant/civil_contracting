# Copyright (c) 2013, Revant Nandgaonkar and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.utils import cstr, flt, cint, nowdate, now, add_days, getdate, comma_and

from frappe import msgprint, _

from frappe.model.document import Document

import json
import frappe.utils
from frappe import _
from frappe.model.mapper import get_mapped_doc


class MeasurementBook(Document):
	
	pass

@frappe.whitelist()
def get_measure_sheets(dn):
	return frappe.db.sql("""select delivery_note, name, item, uom, total_qty
		from `tabMeasurement Sheet`
		where delivery_note = %s """\
		, dn, as_dict=1)


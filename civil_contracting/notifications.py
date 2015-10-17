# Copyright (c) 2015, Revant Nandgaonkar and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe

def get_notification_config():
	return {
		"for_doctype": {
			"Worker Sheet": {"docstatus": 0},
			"Material Sheet": {"docstatus": 0},
			"Measurement Sheet": {"docstatus": 0},
			"Wage Slip": {"docstatus": 0},
			"Measurement Book": {"docstatus": 0},
			"Worker": {
				"outstanding_wages": (">", 0.0)
			}
		}
	}

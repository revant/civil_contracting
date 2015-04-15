# Copyright (c) 2013, Revant Nandgaonkar and Contributors
# See license.txt
from __future__ import unicode_literals

import frappe
import unittest

test_records = frappe.get_test_records('Worker Sheet')

class TestWorkerSheet(unittest.TestCase):
	pass

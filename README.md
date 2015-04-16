# Civil Contracting App
Frappe App for use in Civil Contracting Business

# Install

First install frappe-bench, erpnext and setup a site [http://frappe.io]

```
$ bench get-app civil_contracting https://bitbucket.org/revant_nandgaonkar/civil_contracting
$ bench frappe --install_app civil_contracting [sitename]
```

# Business:
  1. Measurements: Measurements are taken by multiple parties for multiple purposes. Measurements are taken before quoting, along with bill/sales invoice, Third Party measurements, Customer Measures, before paying sub-contractor etc.
  2. Workers: There are two type of construction workers, 
    1. Daily Wage labour (called *rokda* in Hindi) they charge cash daily and 
    2. Monthly Wage Labour (called *hajeri* in Hindi) they are paid monthly.

# Doctypes

  1. **Measurement Sheet**: Keep Measurement Records related to BOM.
  2. **Measurement Book**: Set of Measurement Sheets to be submitted together.
  3. **Worker Sheet**: Sheet for Addendence in hours of Workstations on Project. Calculates Total Wages and Outstanding Wages as per Daily Wages Paid.
    1. Total Wages = hourly rate multiplied by hours of work
    3. Other Worker Expense = Currency, as incurred.
    4. Daily Wages = Currency, Payments to Daily wage worker
    5. Outstanding Wages = Total Wages - Daily Wages

# To Do
  1. Validate Draft BOM Status before submit. Comment Qty of submitted Measurement Sheet in Linked BOM.
  2. Auto generate a Measurement Book based on Project Selected, i.e. only Measurement Sheets with selected project will be added to Measurement Book
  3. Working Hours Settings need to be copied in Worker Sheet, copied Working Hours to be added to each row in Worker Sheet Attendance Table
  4. Enable Add multiple Rows option for Worker Sheet Attendance Table
  5. Worker Sheet Accounts Settings - Select Ledger for Payment (cash / bank), Wages, Outstanding Wages, other wage expenses, and travel expense.
  6. Pass Journal Entry for Wages, Wage related Expense paid from cash / bank and record outstanding wages.


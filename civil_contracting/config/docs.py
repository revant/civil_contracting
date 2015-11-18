# from __future__ import unicode_literals

source_link = "https://github.com/revant/civil_contracting"
docs_base_url = "https://revant.github.io/civil_contracting"
headline = "Frappe App for use in Civil Contracting Business"
sub_heading = "Helps manage wages, workers and measurements"
long_description = """Contracting businesses bring together men and material on site to create value. Material Entries are handled by ERPNext.  

1. Purchase Receipts are made when material is purchased and Warehouse selected to store the material.
2. Warehouse (contract sites) are Logical Warehouse created as per material stored on site.
3. Linked Stock and Accounting entries are managed.
4. Workstations are types of Workers, eg. Male Coolie Helper, Mason Civil, Carpenter, Plumber.
5. HR Modules helps in Expense claim, Payroll, etc.
6. Cost Centers and Projects help in identifying expenses and costs

ERPNext manages Employee master document which requires in-depth information about individual to be maintained. Sometimes Employee master becomes to much information to be gathered when the individual in question is only going to work for half a day.  

Employee Attendance and Payroll is managed on monthly basis. Where as Workers come and go on daily basis, some remain up to the period of site allowing us to pay them later as our outstanding wages. Taking Worker attendance and making wage payment becomes a as-required affair not a monthly affair. Wages must be recorded as direct costs.  

Civil Contracting manages these challenges by Creating Worker Database, Worker Attendence and Expense Tracking Document and a Document to manage Outstanding Wage payments. These documents are integrated into ERPNext accounts. On submitting these documents appropriate Journal Entries can be made from the information in the Documents. This app also adds Measurement Book and Measurement Sheets to record site measurements.

"""

def get_context(context):
    # optional settings

    # context.brand_html = 'Brand info on the top left'
    # context.favicon = 'path to favicon'
    #
    # context.top_bar_items = [
    #   {"label": "About", "url": context.docs_base_url + "/about"},
    # ]

    pass

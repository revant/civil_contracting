# from __future__ import unicode_literals

source_link = "https://github.com/revant/civil_contracting"
docs_base_url = "https://revant.github.io/civil_contracting"
headline = "Frappe App for use in Civil Contracting Business"
sub_heading = "Helps manage wages, workers and measurements"
long_description = """# Civil Contracting App  
Frappe App for use in Civil Contracting Business  
  
# Install  
  
First install frappe-bench, erpnext and setup a site [http://frappe.io]  
  
```
$ bench get-app civil_contracting https://github.com/revant/civil_contracting
$ bench frappe --install_app civil_contracting [sitename]
```
  
# Business  
  1. Measurements: Measurements are taken by multiple parties for multiple purposes. Measurements are taken before quoting, along with bill/sales invoice, Third Party measurements, Customer Measures, before paying sub-contractor etc. Measurement Books are compiled and submitted to parties.
  2. Workers: There are two type of construction workers, 
    1. Daily Wage labour (called *rokda* in Hindi) they charge cash daily and 
    2. Monthly Wage Labour (called *hajeri* in Hindi) they are paid monthly."""

def get_context(context):
    # optional settings

    # context.brand_html = 'Brand info on the top left'
    # context.favicon = 'path to favicon'
    #
    # context.top_bar_items = [
    #   {"label": "About", "url": context.docs_base_url + "/about"},
    # ]

    pass

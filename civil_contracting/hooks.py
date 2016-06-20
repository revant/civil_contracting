from . import __version__ as app_version

app_name = "civil_contracting"
app_title = "Civil Contracting"
app_publisher = "Revant Nandgaonkar"
app_description = "App for Civil Contracting Enterprises"
app_icon = "octicon octicon-zap"
app_color = "grey"
app_email = "revant.one@gmail.com"
app_license = "GPL v2"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/civil_contracting/css/civil_contracting.css"
# app_include_js = "/assets/civil_contracting/js/civil_contracting.js"

# include js, css files in header of web template
# web_include_css = "/assets/civil_contracting/css/civil_contracting.css"
# web_include_js = "/assets/civil_contracting/js/civil_contracting.js"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "civil_contracting.install.before_install"
# after_install = "civil_contracting.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

notification_config = "civil_contracting.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.core.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.core.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"civil_contracting.tasks.all"
# 	],
# 	"daily": [
# 		"civil_contracting.tasks.daily"
# 	],
# 	"hourly": [
# 		"civil_contracting.tasks.hourly"
# 	],
# 	"weekly": [
# 		"civil_contracting.tasks.weekly"
# 	]
# 	"monthly": [
# 		"civil_contracting.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "civil_contracting.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.core.doctype.event.event.get_events": "civil_contracting.event.get_events"
# }


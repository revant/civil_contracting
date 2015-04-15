# Civil Contracting App
Frappe App for use in Civil Contracting Business

# Install

```
$ bench get-app civil_contracting https://bitbucket.org/revant_nandgaonkar/civil_contracting
$ bench frappe --install_app civil_contracting [sitename]
```

# Doctypes

  1. **Measurement Sheet**: Keep Measurement Records related to BOM.
  2. **Measurement Book**: Set of Measurement Sheets to be submitted together.

# To Do
  1. Only permit Draft BOM to be selected in Measurement Sheet
  2. Auto generate a Measurement Book based on Project Selected, i.e. only Measurement Sheets with selected project will be added to Measurement Book
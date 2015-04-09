cur_frm.cscript.qty = function(doc, cdt, cdn) {

   qty_calc = (doc.length * doc.breadth * doc.depth);
   doc.qty = qty_calc;
   refresh_field("qty");
}

cur_frm.cscript.custom_refresh = cur_frm.cscript.qty;


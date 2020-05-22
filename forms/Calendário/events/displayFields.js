function displayFields(form,customHTML) {	
	
	if (form.getFormMode() == "VIEW") {
		customHTML.append("<script>");
	    customHTML.append("$(function() {");
	    customHTML.append("$('.form-control').hide();");
	    customHTML.append("});");
	    customHTML.append("</script>");
	}
	
}
//other js files scripts on the page.
init(true);
$('#showtab').click(function(){
	var tabNumber = $('input[name="tabnumber"]').val();
    if(showTab('tab'+tabNumber)) {
    	alert('success');
    } else {
    	alert('invalid tab number');
    }
});
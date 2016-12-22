//other js files scripts on the page.
tabs.init(true);

$('#showtab').click(function(){
	var tabNumber = $('input[name="tabnumber"]').val();
    if(tabs.showTab('tab'+tabNumber)) {
    	alert('success');
    } else {
    	alert('invalid tab number');
    }
});
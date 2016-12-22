$('.tab-item').click(function(event) {
	var tab_id;
	event.preventDefault();
	if($(this).hasClass('active')) {
		return;
	}
    tab_id = $(this).find('a.tab-link').attr('href');
    //deactivate existing tab item
    $('.tab-item.active').removeClass('active');
    $('.tab-pane.active').removeClass('active');
    //activate current tab item.
    $(this).addClass('active');
    $(tab_id).addClass('active');
});
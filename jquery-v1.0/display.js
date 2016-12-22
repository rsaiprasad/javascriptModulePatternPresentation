(function(){
	var color = { 'ul.tabs':'red',  'li.tab-item':'green', 'li.tab-item.active':'black','a.tab-link':'blue', 'div.tab-data':'yellow', 'div.tab-pane':'orange', 'div.tab-pane.active':'pink'};
	var html = '';
	$('body').append('<div class="legend" style="position:fixed; top:0px; right:0px; padding:20px;"></div>');
	$.each(color,function(key,value){
		console.log(key, value);
		$(key).css('outline', value+' dotted thick');
		$(key).css('padding','10px');
		$(key).css('margin','2px');
		$('.legend').append('<div><div style="display:inline-block;margin-right:10px;height:10px;width:10px;background-color:'+value+'"></div><div style="display:inline-block;">'+key+'</div><div>');
	});
})();
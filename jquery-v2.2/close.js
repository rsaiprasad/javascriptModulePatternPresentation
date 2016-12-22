var Close = (function(){
	var settings = {
		$parent : null,
		handleClose: true
	}
	closeTemplate = '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

    function render() {
        settings.$parent.append(closeTemplate);
    }

    function bindEvents() {
    	settings.$parent.find('.close').click(function(){
    		close();
    	});
    }

    function close() {
    	if(settings.handleClose) {
    		settings.$parent.remove();
    	}
    	settings.$parent.trigger('close-me');
    }

	function init(options) {
		settings = $.extend(settings, options);
		if(settings.$parent === null) {
			throw "$parent not setting while calling close init";
		}
		render();
		bindEvents();
	}

	return {
		init:init,
		close:close
	}
});
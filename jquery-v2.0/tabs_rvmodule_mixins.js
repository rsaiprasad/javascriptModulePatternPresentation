var tabs = (function($){
    function bindEvents() {
        $('.tab-item').click(handleTabClick);
    }
    function handleTabClick(event) {
        var tab_id;
        event.preventDefault();
        if ($(this).hasClass('active')) {
            return;
        }
        tab_id = $(this).find('a.tab-link').attr('href').substr(1);
        showTab(tab_id);
    }
    function showTab(tab_id) {
        var contentTab = $('#' + tab_id);
        if (contentTab.length === 0) {
            return false;
        }
        $('.tab-item.active').removeClass('active');
        $('.tab-pane.active').removeClass('active');
        $('.tab-item a.tab-link[href="#' + tab_id + '"]').closest('.tab-item').addClass('active');
        $('#' + tab_id).addClass('active');
        return true;
    }
    function init() {
    	bindEvents();
    }
    return {
        init:init,
        showTab:showTab
    }
})(jQuery);
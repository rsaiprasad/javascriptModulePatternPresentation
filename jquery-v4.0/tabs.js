
//TODO: clean up the selectors. 
//cache dom.
var tabs = {
    _hasCloseTabs: false,
    handleTabClick: function(event) {
        var tab_id;
        event.preventDefault();
        if ($(this).hasClass('active')) {
            return;
        }
        tab_id = $(this).find('a.tab-link').attr('href').substr(1);
        tabs.showTab(tab_id);
    },
    showTab: function(tab_id) {
        var contentTab = $('#' + tab_id);
        if (contentTab.length === 0) {
            return false;
        }
        $('.tab-item.active').removeClass('active');
        $('.tab-pane.active').removeClass('active');
        $('.tab-item a.tab-link[href="#' + tab_id + '"]').closest('.tab-item').addClass('active');
        $('#' + tab_id).addClass('active');
        return true;
    },
    hasSiblings: function(tab_id) {
        var totalElements = $('.tab-pane').length;
        var currentElementNumber = $('.tab-pane').index($('#' + tab_id)) + 1;
        var response = {
            hasPrev: false,
            hasNext: false
        };
        if (currentElementNumber <= (totalElements - 1)) {
            response.hasNext = true;
        }
        if (currentElementNumber > 1) {
            response.hasPrev = true;
        }
        return response;
    },
    addCloseTab: function(tab_id) {
        var closeButton = '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        $('.tab-item a.tab-link[href="#' + tab_id + '"]').closest('.tab-item').append(closeButton);
    },
    closeTab: function(tab_id) {
        if ($('#' + tab_id).hasClass('active')) {
            var siblings = hasSiblings(tab_id);
            if (siblings.hasPrev) {
                showTab($('#' + tab_id).prev('.tab-pane').attr('id'));
            } else if (siblings.hasNext) {
                showTab($('#' + tab_id).next('.tab-pane').attr('id'));
            }
        }
        $('.tab-item a.tab-link[href="#' + tab_id + '"]').closest('.tab-item').remove();
        $('#' + tab_id).remove();
        return false;
    },
    render: function() {
        if (tabs._hasCloseTabs) {
            $('.tab-item').each(function() {
                tabs.addCloseTab($(this).find('a.tab-link').attr('href').substr(1));
            });
        }
    },
    bindEvents: function() {
        $('.tab-item').click(tabs.handleTabClick);
        if (tabs._hasCloseTabs) {
            $('.tab-item .close').click(function(event) {
                tabs.closeTab($(this).closest('.tab-item').find('a.tab-link').attr('href').substr(1));
            });
        }
    },
    init: function(hasCloseTabs) {
        tabs._hasCloseTabs = hasCloseTabs;
        tabs.render();
        tabs.bindEvents();
    }
};
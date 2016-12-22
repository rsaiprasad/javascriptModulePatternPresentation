var tabs = (function() {
    var hasCloseTabs = false;

    function handleTabClick(event) {
        var tab_id;
        event.preventDefault();
        if ($(this).hasClass('active')) {
            return;
        }
        tab_id = $(this).find('a.tab-link').attr('href').substr(1);
        tabs.showTab(tab_id);
    }

    function render() {
        if (hasCloseTabs) {
            $('.tab-item').each(function() {
                addCloseTab($(this).find('a.tab-link').attr('href').substr(1));
            });
        }
    }

    function bindEvents() {
        $('.tab-item').click(handleTabClick);
        if (hasCloseTabs) {
            $('.tab-item .close').click(function(event) {
                tabs.closeTab($(this).closest('.tab-item').find('a.tab-link').attr('href').substr(1));
            });
        }
    }

    function addCloseTab(tab_id) {
        if (hasCloseTabs) {
            var closeButton = '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            $('.tab-item a.tab-link[href="#' + tab_id + '"]').closest('.tab-item').append(closeButton);
        }
    }

    function hasSiblings(tab_id) {
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
    }
    return {
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
        closeTab: function(tab_id) {
            if (hasCloseTabs) {
                if ($('#' + tab_id).hasClass('active')) {
                    var siblings = hasSiblings(tab_id);
                    if (siblings.hasPrev) {
                        this.showTab($('#' + tab_id).prev('.tab-pane').attr('id'));
                    } else if (siblings.hasNext) {
                        this.showTab($('#' + tab_id).next('.tab-pane').attr('id'));
                    }
                }
                $('.tab-item a.tab-link[href="#' + tab_id + '"]').closest('.tab-item').remove();
                $('#' + tab_id).remove();
            }
        },
        init: function(allowCloseTabs) {
            hasCloseTabs = allowCloseTabs;
            render();
            bindEvents();
        }
    };
})();
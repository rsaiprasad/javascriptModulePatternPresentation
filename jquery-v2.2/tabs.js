var tabs = (function($, nav, Close) {
    var hasCloseTabs = false;
    var hasNavButtons = true;

    function handleTabClick($tabItem) {
        var tab_id;
        if ($tabItem.hasClass('active')) {
            return;
        }
        tab_id = $tabItem.find('a.tab-link').attr('href').substr(1);
        showTab(tab_id);
    }

    function render() {
        if (hasNavButtons) {
            nav.init({
                $parent: $('.tab-data'),
                state: {
                    previous: false,
                    next: true
                }
            });
        }
        if (hasCloseTabs) {
            $('.tab-item').each(function() {
                var options = {
                        $parent: $(this),
                        handleClose: false
                    },
                    close = new Close();
                close.init(options);
            });
        }
    }

    function bindEvents() {
        $('.tab-item').click(function(event) {
            handleTabClick($(this));
            event.preventDefault();
        });
        if (hasCloseTabs) {
            $('.tab-item').on('close-me', function(event) {
                closeTab($(this).closest('.tab-item').find('a.tab-link').attr('href').substr(1));
            });
        }
        if (hasNavButtons) {
            $('.tab-data').on('navigation-clicked', function(event, type) {
                handleNavigation(type);
            });
        }
    }

    function handleNavigation(type) {
        var tab_id;
        if (type === 'prev') {
            tab_id = $('.tab-pane.active').prev('.tab-pane').attr('id');
        } else {
            tab_id = $('.tab-pane.active').next('.tab-pane').attr('id');
        }
        showTab(tab_id)
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

    function showTab(tab_id) {
        var contentTab = $('#' + tab_id);
        if (contentTab.length === 0) {
            return false;
        }
        var siblings = hasSiblings(tab_id);
        $('.tab-item.active').removeClass('active');
        $('.tab-pane.active').removeClass('active');
        $('.tab-item a.tab-link[href="#' + tab_id + '"]').closest('.tab-item').addClass('active');
        $('#' + tab_id).addClass('active');
        if (hasNavButtons) {
            nav.setState({
                previous: siblings.hasPrev,
                next: siblings.hasNext
            });
        }
        return true;
    }

    function closeTab(tab_id) {
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
    }

    function init(allowNavButtons, allowCloseTabs) {
        hasCloseTabs = allowCloseTabs;
        hasNavButtons = allowNavButtons;
        render();
        bindEvents();
    }
    return {
        init: init,
        showTab: showTab,
        closeTab: closeTab
    }
})(jQuery, navButtons, Close);
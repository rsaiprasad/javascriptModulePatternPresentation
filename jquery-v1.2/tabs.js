var _hasCloseTabs = false;
var _hasNavButtons = true;
$('.tab-item').click(function(event) {
    var tab_id;
    event.preventDefault();
    if ($(this).hasClass('active')) {
        return;
    }
    tab_id = $(this).find('a.tab-link').attr('href').substr(1);
    showTab(tab_id);
});

function showTab(tab_id) {
    $('.tab-item.active').removeClass('active');
    $('.tab-pane.active').removeClass('active');
    $('.tab-item a.tab-link[href="#' + tab_id + '"]').closest('.tab-item').addClass('active');
    $('#' + tab_id).addClass('active');
    if (_hasNavButtons) {
        activateNavButtons();
    }
}

function addCloseTab(tab_id) {
    if (_hasCloseTabs) {
        var closeButton = '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        $('.tab-item a.tab-link[href="#' + tab_id + '"]').closest('.tab-item').append(closeButton);
    }
}

function addNavButtons() {
    if (_hasNavButtons) {
        var navButtons = '<div class="nav-actions"><button class="btn btn-inactive btn-prev" type="button">Previous</button><button class="btn btn-inactive btn-next" type="button">Next</button></div>';
        $('.tab-data').append(navButtons);
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

function activateNavButtons() {
    if (_hasNavButtons) {
        $('.nav-actions .btn').addClass('btn-inactive');
        var sibling = hasSiblings($('.tab-pane.active').attr('id'));
        if (sibling.hasNext) {
            $('.nav-actions').find('.btn-next').removeClass('btn-inactive');
        }
        if (sibling.hasPrev) {
            $('.nav-actions').find('.btn-prev').removeClass('btn-inactive');
        }
    }
}

function closeTab(tab_id) {
    if (_hasCloseTabs) {
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
    }
}

function initCloseTabs() {
    if (_hasCloseTabs) {
        $('.tab-item').each(function() {
            addCloseTab($(this).find('a.tab-link').attr('href').substr(1));
        });
        $('.tab-item .close').click(function(event) {
            closeTab($(this).closest('.tab-item').find('a.tab-link').attr('href').substr(1));
        });
    }
}

function initNavButtons() {
    if (_hasNavButtons) {
        // add nav buttons.
        addNavButtons();
        // activate previous or next as per the need
        activateNavButtons();
        // handle the click event.
        $('.nav-actions .btn').click(function(event) {
            var tab_id;
            if ($(this).hasClass('btn-prev')) {
                tab_id = $('.tab-pane.active').prev('.tab-pane').attr('id');
            } else {
                tab_id = $('.tab-pane.active').next('.tab-pane').attr('id');
            }
            showTab(tab_id)
        });
    }
}

function init(hasNavButtons, hasCloseTabs) {
    _hasNavButtons = hasNavButtons;
    _hasCloseTabs = hasCloseTabs;
    initCloseTabs();
    initNavButtons();
}
var _hasCloseTabs = false;
$('.tab-item').click(function(event) {
    var tab_id;
    event.preventDefault();
    if ($(this).hasClass('active')) {
        return;
    }
    tab_id = $(this).find('a.tab-link').attr('href').substr(1);
    showTab(tab_id);
});

function initCloseTabs() {
    if (_hasCloseTabs) {
        //for each tab item we would add close tab html.
        $('.tab-item').each(function() {
            addCloseTab($(this).find('a.tab-link').attr('href').substr(1));
        });
        //bind the click event on close.
        $('.tab-item .close').click(function(event) {
            closeTab($(this).closest('.tab-item').find('a.tab-link').attr('href').substr(1));
        });
        }
}

function addCloseTab(tab_id) {
    if (_hasCloseTabs) {
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

function init(hasCloseTabs) {
    _hasCloseTabs = hasCloseTabs;
initCloseTabs();
}
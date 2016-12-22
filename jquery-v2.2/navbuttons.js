var navButtons = (function($) {
    var settings = {
            state: {
                previous: true,
                next: true
            },
            $parent: $('body'),
        },
        navTemplate = '<div class="nav-actions"><button class="btn btn-inactive btn-prev" type="button">Previous</button><button class="btn btn-inactive btn-next" type="button">Next</button></div>',
        $previousBtn,
        $nextBtn,
        $navContainer;

    function cacheDom() {
        var $parent = settings.$parent;
        $navContainer = $parent.find('.nav-actions');
        $nextBtn = $navContainer.find('.btn-next');
        $previousBtn = $navContainer.find('.btn-prev');
    }

    function setState(state) {
        settings.state = $.extend(settings.state, state);
        render();
    }

    function bindEvents() {
        $navContainer.on('click', '.btn', function() {
            if (!$(this).hasClass('btn-inactive')) {
                var type = ($(this).hasClass('btn-prev')) ? 'prev' : 'next';
                settings.$parent.trigger('navigation-clicked', type);
            }
        });
    }

    function addNavigation() {
        var $parent = settings.$parent;
        $parent.append(navTemplate);
    }

    function isInitialized() {
        return ($navContainer && $navContainer.length > 0);
    }

    function render() {
        var state = settings.state;
        if (!isInitialized()) {
            addNavigation();
            cacheDom();
        }
        updateButton(state.previous, $previousBtn);
        updateButton(state.next, $nextBtn);
    }

    function updateButton(state, $button) {
        (state) ? $button.removeClass('btn-inactive'): $button.addClass('btn-inactive');
    }

    function init(options) {
        settings = $.extend(settings, options);
        render();
        bindEvents();
    }

    return {
        init: init,
        setState: setState
    }
})(jQuery);
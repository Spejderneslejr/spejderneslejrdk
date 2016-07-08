(function ($, Drupal) {

  /**
   * Implementation of the countdown.
   */
  Drupal.behaviors.top_menu = {
    attach: function (context, settings) {

      // Initialize the behavior.
      init();

      /**
       * Init method.
       */
      function init() {

        // Trigger click outside.
        clickOutside(menuElements);

        // Make header sticky.
        stickyHeader();

        var menuElements = $('.menu-level--0 .not-clickable > a');

        // Make menu toggleable.
        $(menuElements).click(function(event) {
          // Only if not a phone.
          if ($(window).width() > 768 && $(this).parent().index() <= 1) {
            toggleSubMenu(event, $(this));
          }
        });

        // Trigger click outside.
        clickOutside(menuElements);

        // ****************** //
        // Menu toggle (mobile).
        // ****************** //
        $('.menu-toggle').click(function() {

          // Make sure the burger does its animation.
          $(this).toggleClass('active');

          // Open main menu.
          $('.menu--site-menu-danish').toggleClass('js-mobile-active');
        });
      }

      /**
       * Click outside.
       * @param {object} element Dom element.
       * @return {object} the modified element.
       */
      function clickOutside(element) {
        $(element).each(function() {
          $(document).mouseup(function(event) {
            if (!$(element).is(event.target)) {
              handleToggle(event, $(this));
            }
          });
        });
        return element;

        /**
         * Toggle the main menu.
         * @param {object} event Event object.
         * @param {object} element Dom object.
         */
        function handleToggle(event, element) {
          $('.menu-level--0 .not-clickable > a')
            .each(function() {
              if (element.hasClass('open')) {
                toggleSubMenu(event, element);
              }
            });
        }
      }

      /**
       * Toggle the main menu.
       * @param {object} event Event object.
       * @param {object} element Dom object.
       */
      function toggleSubMenu(event, element) {
        event.preventDefault();
        toggleMenu(element);

          $('.menu-level--0 .not-clickable > a')
            .each(function() {
                if (!$(element).is($(this))) {
                  if ($(this).hasClass('open')) {
                    toggleMenu($(this));
                  }
                }
            });
        function toggleMenu(element) {
          $(element)
            .toggleClass('open')
            .next('.menu-level--1')
            .toggleClass("js-inactive js-active");
        }
      }

      /**
       * Make the header sticky to top when not visible in window.
       */
      function stickyHeader() {

        var applied = false;

        // Inititalize sticky header dom element
        var stickyHeader = $('<div class="sticky-header" />', context);

        // First find header and clone it.
        var originalHeader = $('.page-header');
        var clonedHeader = originalHeader
          .clone()
          .addClass('main-nav-scrolled');

        // Add classes to original menu so we can identify it.
        originalHeader
          .find('.menu--site-menu')
          .addClass('original-menu');

        // Apply the clountdown. We do it here to be sure it is not done
        // to the sticky menu, now that we have it multiple times in the DOM.
        var deadline = new Date("July 22, 2017 08:00:00");
        originalHeader
          .find('#clock')
          .first()
          .countdown(deadline);

        // Append the sticky header. Make sure we only do it once.
        if (!applied) {
          stickyHeader
            .append(clonedHeader);
          applied = true;
        }

        // Append sticky header to DOM.
        $('.page')
          .first()
          .before(stickyHeader);

        // Find the breakpoint when the menu is out of sight.
        var menuTop = $('.original-menu').offset().top;

        // React when user scrolls and apply classes.
        $(window).scroll(function() {
          if( $(this).scrollTop() > menuTop && $(window).width() > 768) {
            clonedHeader.addClass('js-active');
          } else {
            console.log('shoudl be here');
            clonedHeader.removeClass('js-active');
          }
        });
      }
    }
  };

  Drupal.behaviors.cardGallery = {
    attach: function (context, settings) {
      $('.photo-holder').each(function(key, item) {
        $(this).hover(function() {
          $('.card-gallery-captions.__' + key).fadeToggle();
        });
      });
    }
  };
})(jQuery, Drupal);

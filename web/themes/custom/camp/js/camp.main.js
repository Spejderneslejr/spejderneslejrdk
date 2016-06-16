(function ($, Drupal) {

  /**
   * Implementation of the countdown.
   */
  Drupal.behaviors.to_menu = {
    attach: function (context, settings) {

      // Initialize the behavior.
      init();

      function init() {

        var menuElements = $('.menu-level--0 .not-clickable > a');

        // Make menu toggleable.
        $(menuElements).click(function(event) {
          // Only if not a phone.
          if ($(window).width() > 768) {
            toggleSubMenu(event, $(this));
          }
        });

        // Trigger click outside.
        clickOutside(menuElements);

        // Make header sticky.
        stickyHeader($("#block-sitemenudanish"), $('.page-header'));

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
       * CLick outside.
       *
       * @param element
       * @return element
       */
      function clickOutside(element) {
        $(element).each(function() {
          $(document).mouseup(function(event) {
            if (!$(element).is(event.target)) {
              $('.menu-level--0 .not-clickable > a')
                .each(function() {
                  if ($(this).hasClass('open')) {
                    toggleSubMenu(event, $(this));
                  }
                });
            }
          });
        });
        return element;
      }

      /**
       * Toggle the main menu.
       *
       * @param event
       * @param element
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
       * Make an element sticky to when it reaches the top of the browser.
       *
       * @param wrapper
       * @param target
       */
      function stickyHeader(wrapper, target) {
        var mn = $(".page-header");
        var mns = "main-nav-scrolled";
        var hdr = $('.page-header').height();

        $(window).scroll(function() {
          if( $(this).scrollTop() > hdr && $(window).width() > 768) {
            mn.addClass(mns);
          } else {
            mn.removeClass(mns);
          }
        });
      }
    }
  };
})(jQuery, Drupal);


(function ($, Drupal) {
  /**
   * Implementation of the countdown.
   */
  Drupal.behaviors.to_menu = {
    attach: function (context, settings) {

      // Initialize the behavior.
      init();

      function init() {
        // Make menu toggleable.
        $('.menu-level--0 .not-clickable > a')
          .click(function(event) {

            // Only if not a phone.
            if ($(window).width() > 768) {
              toggleSubMenu(event, $(this));
            }
          });

        // Make header sticky.
        stickyHeader($("#block-sitemenudanish"), $('.page-header'));

        // Menu toggle (mobile).
        $('.menu-toggle').click(function() {

          // Make sure the burger does its animation.
          $(this).toggleClass('active');

          // Open main menu.
          // js-mobile-active
          $('.menu--site-menu-danish').toggleClass('js-mobile-active');
        });
      }


      /**
       * Toggle the main menu.
       *
       * @param event
       * @param element
       */
      function toggleSubMenu(event, element) {
        event.preventDefault();
        $(element)
          .toggleClass('open')
          .next('.menu-level--1')
          .toggleClass("js-inactive js-active");
      }

      /**
       * Make an element sticky to when it reaches the top of the browser.
       *
       * @param wrapper
       * @param target
       */
      function stickyHeader(wrapper, target) {
        var  mn = $(".page-header");
        mns = "main-nav-scrolled";
        hdr = $('.page-header').height();

        $(window).scroll(function() {
          if( $(this).scrollTop() > hdr && $(window).width() > 768) {

            mn
              .addClass(mns);

          } else {
            mn.removeClass(mns);
          }
        });
      }
    }
  };
})(jQuery, Drupal);


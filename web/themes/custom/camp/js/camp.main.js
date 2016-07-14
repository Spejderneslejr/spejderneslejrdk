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
            clonedHeader.removeClass('js-active');
          }
        });
      }
    }
  };

  /**
   * Show captions on hover on Card Gallery.
   */
  Drupal.behaviors.cardGallery = {
    attach: function (context, settings) {
      $('.photo-holder').each(function(key, item) {
        $(this).hover(function() {
          $('.card-gallery-captions.__' + key).fadeToggle();
        });
      });
    }
  };

  /**
   * Make the search menu item as a dropwdown.
   */
  Drupal.behaviors.searchDropDown = {
    attach: function (context, settings) {
      var placeholderTxt = Drupal.t('Search on keywords, places, people, events, etc.', {}, {context: "search form"});
      var submitTxt = Drupal.t('Search', {}, {context: "search form"});
      var searchUrl = '/search';
      // Find the search menu item for later use.
      var searchMenuItem = $('.menu--site-menu.original-menu', context)
        .find('> li:nth-child(4)')
        .first();

      // Detect language.
      var language = settings.path.currentLanguage;

      // Get the right search based on the user language.
      var searchHtml = getSearchHtml(language);

      // Append the form into the DOM.
      searchMenuItem.append(searchHtml);

      // Sanitize search form. We want to make sure that all search forms
      // across the site uses the same translations.
      $('.site-search').each(function() {
        $(this).find('.search-input').attr("placeholder", placeholderTxt);

        // Populate the search-field from the url if we have a q-parameter.
        if (settings.path && settings.path.currentQuery && settings.path.currentQuery.q) {
          console.log("setting");
          $(this).find('.search-input').val(settings.path.currentQuery.q);
        }
        $(this).find('.search-submit').attr("value", submitTxt);
        $(this).attr('action', searchUrl);
      });

      // Click event handler.
      // $(searchMenuItem).find('a').first().css('border', '1px solid red');
      $(searchMenuItem).find('a').first().click(function() {
        event.preventDefault();
        searchHtml
          // .find('.nav-search')
          .toggleClass('js-active');
      });

      /**
       * Generate a Google search form depending on language.
       *
       * @param {string} language Language name.
       * @return {object} Jqeury DOM element.
       */
      function getSearchHtml(language) {

        switch(language) {
          case 'de':
            searchUrl = '/suche';
            break;
          case 'da':
            searchUrl = '/soeg';
            break;
        }

        var languageHtml = '<div class="nav-search"><div class="form-search"><form method="get" action ="';
        languageHtml += searchUrl + '" class="site-search"><input class="search-input" name="q" placeholder="';
        languageHtml += placeholderTxt + '" type="text"><input class="search-submit" type="submit" value="' + submitTxt + '"></form></div></div>';
        return $(languageHtml);
      }
    }
  };
})(jQuery, Drupal);

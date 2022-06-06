(function ($, Drupal) {

  /**
   * Accordion paragraph js.
   */
  Drupal.behaviors.accordion = {
    attach: function (context, settings) {

      // Enable toggle of the accordion content of each type of
      // accordion.
      $('.accordion').each(function() {
        var element = $(this);
        var header = element.find('.anchor', context);

        // Attempt to open accordion if a deeplink is detected.
        if (header) {
          var id = header.attr('name');
          if (id && window.location.hash == "#" + id) {
            $(this).toggleClass('active');
            element.find('.accordion__content').slideToggle();
          }
        }

        element.find('.accordion__header', context).click(function() {
          $(this).toggleClass('active');
          element.find('.accordion__content').slideToggle();
        });
      });
    }
  };
})(jQuery, Drupal);


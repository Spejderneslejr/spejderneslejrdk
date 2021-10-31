(function ($, Drupal) {

  /**
   * Inserts a countdown inside an element.
   *
   * @param <Date> deadline
   */
  jQuery.fn.extend({
    countdown: function (deadline) {

      var clock = $(this);

      initializeClock(deadline);

      function getTimeRemaining(endtime) {
        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        var days = 0;
        var t = Date.parse(endtime) - Date.parse(new Date());

        // Only set time-parts if we haven't hit the endtime.
        if (t > 0) {
          seconds = Math.floor((t / 1000) % 60);
          minutes = Math.floor((t / 1000 / 60) % 60);
          hours = Math.floor((t / (1000 * 60 * 60)) % 24);
          days = Math.floor(t / (1000 * 60 * 60 * 24));
        }

        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
        };
      }

      function initializeClock(endtime) {
        var lang_hours = drupalSettings.path.currentLanguage == 'en' ? 'H' : 'T';
        var html = '<span class="days clock__number"></span>' +
        '<span class="clock__unit">D</span>' +
        '<span class="hours clock__number"></span>' +
        '<span class="clock__unit">'+ lang_hours +'</span>' +
        '<span class="minutes clock__number"></span>' +
        '<span class="clock__unit">M</span>' +
        '<span class="seconds clock__number"></span>' +
        '<span class="clock__unit">S</span>';

        clock.append($(html));

        var daysSpan = clock.find('.days');
        var hoursSpan = clock.find('.hours');
        var minutesSpan = clock.find('.minutes');
        var secondsSpan = clock.find('.seconds');

        function updateClock() {
          var t = getTimeRemaining(endtime);
          if (t.total <= 0) {
            // We're past the deadline, de-register our callback and clear out
            // the element.
            clearInterval(timeinterval);
            clock.empty();
          } else {
            // Update the countdown.
            daysSpan.html(t.days);
            hoursSpan.html(('0' + t.hours).slice(-2));
            minutesSpan.html(('0' + t.minutes).slice(-2));
            secondsSpan.html(('0' + t.seconds).slice(-2));
          }
        }

        // First execution to have the element populated.
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
      }

    }
  });
})(jQuery, Drupal);

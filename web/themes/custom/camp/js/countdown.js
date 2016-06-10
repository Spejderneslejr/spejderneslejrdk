(function ($, Drupal) {

  /**
   * Inserts a dountdown inside an element.
   *
   * @param <Date> deadline
   */
  jQuery.fn.extend({
    countdown: function (deadline) {

      var clock = $(this);

      initializeClock(deadline);

      function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));

        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
        };
      }

      function initializeClock(endtime) {

        var html = '<span class="days clock__number"></span>' +
        '<span class="clock__unit">D</span>' +
        '<span class="hours clock__number"></span>' +
        '<span class="clock__unit">T</span>' +
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

          daysSpan.html(t.days);
          hoursSpan.html(('0' + t.hours).slice(-2));
          minutesSpan.html(('0' + t.minutes).slice(-2));
          secondsSpan.html(('0' + t.seconds).slice(-2));

          if (t.total <= 0) {
            clearInterval(timeinterval);
          }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
      }

    }
  });

  /**
   * Implementation of the countdown.
   */
  Drupal.behaviors.countdown = {
    attach: function (context, settings) {

      var deadline = new Date("July 22, 2017 08:00:00");

      $('#clock').countdown(deadline);
    }
  };
})(jQuery, Drupal);

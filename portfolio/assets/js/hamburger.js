var Arrow = (function () {
  // - скролл вниз по стрелке
  return {
    init: function () {
      var Height = $('.js-section').offset().top;

      $('#arrow').on('click', function () {
        $('body,html').animate({
          scrollTop: Height + 65
        }, 1000);
      });
    }
  }
}());


var Hamburger = (function () {
var
    hamburger = $('.js-hamburger'),
    navContainer = $('.js-navigation'),
    navContent = $('.hamburger-navigation-nav');
    body = $('body');

return {
    init: function () {
    hamburger.on('click', function (e) {
        e.preventDefault();

        var _this = $(this);
        console.log(_this);

        _this.toggleClass('active');
        setTimeout(function () {
        navContent.toggleClass('active');
        }, 500);
        navContainer.toggleClass('active')
        body.toggleClass('active')
    });
    }
}
}());


$(function () {
if ($('#hamburger').length) {
    Hamburger.init();
}
if ($('#arrow').length) {
    Arrow.init();
}
});
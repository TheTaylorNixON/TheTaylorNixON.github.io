//Блог на странице "блог"
var blogMenu = (function () {
  var $news = $('.blog__content__item'),
      $item = $('.blog__titles__list__item'),
      $scrollMenu = $('.blog__titles__list'),
      PositionValue = [],
      marginTop = 75,
      // вычисляет начало и конец статьи по оси Y
      position = function (element) {
        var len = element.length;
        for (var i = 0; i < len; i++) {
          PositionValue[i] = {};
          PositionValue[i].top = element.eq(i).offset().top - marginTop;
          PositionValue[i].bottom = PositionValue[i].top + element.eq(i).innerHeight() + marginTop;
        }
      },
      // фиксирует меню на месте в при скроллинге
      scrollPageFixMenu = function () {   
        var scroll = window.pageYOffset;
        if (scroll < $news.offset().top - marginTop) {
          $scrollMenu.removeClass('active');
          $item.removeClass('active');
        } else {
          $scrollMenu.addClass('active');
        }
      },

      scrollPage = function () {
        var scroll = window.pageYOffset;
        for (var i = 0; i < PositionValue.length; i++) {
          if (scroll >= PositionValue[i].top && scroll <= PositionValue[i].bottom) {
            $item.eq(i).addClass('active').siblings().removeClass('active');
          }
        }
      },
      // скролл-анимация после клика
      onClickScroll = function (e) {
        var index = $(e.target).index();
        var section = $($news).eq(index).offset().top - marginTop + 0.99;

        $('html,body').animate({scrollTop: section}, 1000);
      },

      addListener = function () {
        $(window).on('load', position($news));
        $(window).on('resize', position($news));

        $item.on('click', onClickScroll);

        $(document).on('scroll', scrollPage);
        $(document).on('scroll', scrollPageFixMenu);
      };

  return {
    init: addListener
  }
}());

$(function () {
  if ($('#blog').length) {
    blogMenu.init();
  }
});
// логика
function checkDistance(el) {
  var viewTop = $(window).height() + $(window).scrollTop(),
      windowHeight = $(window).height(),
      offset = el.offset().top,
      height = el.height();

  return (viewTop >= offset  && viewTop <= (offset + height + windowHeight));
}

// обработчик
$(window).on('scroll', function () {
  var el = $('.skills-group'),
      item = $('.skills-list__item');

  if (checkDistance(el)) {
    item.addClass('active');
  } else {
    item.removeClass('active');  
  }
});
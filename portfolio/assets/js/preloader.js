var preloader = (function () {
  var percentsTotal = 0,
      preloader = $('.preloader');

  var imgPath = $('*').map(function (index, element) {
    var background = $(element).css('background-image'),
        img = $(element).is('img'),
        path = '';

    if (background != 'none') {
      path = background.replace('url("', '').replace('")', '');
    }

    if (img) {
      path = $(element).attr('src');
    }

    if (path) {      
      return path
    }
  });

  var setPercents = function (total, current) {
    var persents = Math.ceil(current / total * 100);

    $('.preloader__percents').text(persents + '%');

    if (persents >= 100) {
      preloader.fadeOut();
    }
  }

  var loadImages = function (images) {

    if (!images.length) preloader.fadeOut();

    images.forEach(function (img, i, images) {
      var fakeImage = $('<img>', {attr: {src: img}});      
      fakeImage.on('load error', function () {
        percentsTotal++;
        setPercents(images.length, percentsTotal);
      });
    });
  }

  return {
    init: function () {
      var imgs = imgPath.toArray();
      loadImages(imgs);
    }
  }
}());


$(function() {
  preloader.init();
});
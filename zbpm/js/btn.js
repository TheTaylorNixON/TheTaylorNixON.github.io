$('.section__btn__list__item').on('click', function(e) {
    e.preventDefault();
    var target = e.target;
    while (target.tagName != 'A') {
        target = target.firstChild;
    }

    $('.btn-href').removeClass('active');
    $(target).addClass('active');

    var url = target.href;

    $('#btn-js-catalog__content').remove();
    $('#btn-js-content').load(url + ' #btn-js-catalog__content').hide().fadeIn('slow');
  });
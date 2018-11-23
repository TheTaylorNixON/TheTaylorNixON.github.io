$(document).ready(function() {

	$('.step-slide__title').each(function(index, el) {
		$(el).prepend('<div class="step-slide__title-counter">' + (index + 1) + '</div>');
	});

	for (var i = 0; i < $('.step-slide').length - 1; i++) {
		$('.step__extender').append('<div class="step__extender-item"></div>');
	};

	var progress = {
		current: ( 100 / ($('.step-slide').length - 1) ),
		total: $('.step-slide').length,
		width: ( 100 / ($('.step-slide').length - 1) ),
		process: doProgress
	};

	// console.log(progress);

	function doProgress () {}

	var testSlider = $('.test-slider').bxSlider({
		mode: 'fade',
		infiniteLoop: false,
		speed: 0,
		adaptiveHeight: true,
		adaptiveHeightSpeed: 0,
		touchEnabled: false,
		pager: false,
		nextSelector: '.btn-next-container',
		nextText: '<div class="btn-next"><span>на следующий шаг</span></div>',
		onSliderLoad: function (currentIndex) {
			// первоначальные стили
			$('.main-progress__text').eq(currentIndex).addClass('main-progress__text_active');
			$('.step__extender-item').eq(currentIndex).addClass('step__extender-item_active');
			$('.main-progress__extender').css('width', progress.width + '%');
		},
		onSlideAfter: function (slideElement, oldIndex, newIndex) {
			// активация кнопок
			$('.btn-next-container').removeClass('btn-next-container_active');
			$('.btn-next').removeClass('btn-next_active btn-shine');

			// изменение полосы загрузки
			progress.current += progress.width;
			$('.main-progress__extender').css('width', progress.current + '%');

			// изменение шага
			$('.step__extender-item').eq(newIndex).addClass('step__extender-item_active');
			$('.step__text span').html(newIndex + 1);

			// изменение заголовка в полосе загрузки
			if ( $('.main-progress__text').eq(newIndex).length != 0 ) {
				$('.main-progress__text').eq(oldIndex).removeClass('main-progress__text_active');
				$('.main-progress__text').eq(newIndex).addClass('main-progress__text_active');
			};


			var toTopDoc = window.parent.document.querySelector('.fancybox-slide--iframe');

			// console.log(toTopDoc);

			$(toTopDoc).animate({scrollTop: 0}, 0);

		}
	});

	// testSlider.goToSlide(4);

	$('.pick-item__input').on('change', function(event) {
		event.preventDefault();
		$('.btn-next-container').addClass('btn-next-container_active');
		$('.btn-next').addClass('btn-next_active btn-shine');
	});

$('.pick-item__input').bind('keyup keypress keydown change', function() {
    var check = $(this).val();

    if (check.length != 0) {
      $('.btn-next-container').addClass('btn-next-container_active');
      $('.btn-next').addClass('btn-next_active btn-shine');
    } else {
      $('.btn-next-container').removeClass('btn-next-container_active');
      $('.btn-next').removeClass('btn-next_active btn-shine');
    };
  });



	$('form').each(function(index, el) {
		$(el).validate({
			rules:{
				"phone":{ required:true }
			},
			submitHandler: function(form){
				$(form).ajaxSubmit({
					type: 'POST',
					url: 'send.php',
					success: function() {
						testSlider.goToSlide( $('.step-slide').length - 1 );
						$('.header-line').slideUp(300);
						$('.progress-line').slideUp(300);
					}
				});
			}
		});
	});


	var viewportHeight = $('.bx-viewport').height();
	$('.show-hide-accordion').on('click', function(event) {
		event.preventDefault();
		// console.log($(this).closest($('.one-accordion')).find($(".one-accordion-container")));
		$(this).closest($(".one-accordion")).find($(".one-accordion-container")).toggleClass('show');
		$(this).find('i').toggleClass('active');

		if ($('.one-accordion-container').hasClass('show')) {
			$('.bx-viewport').css('overflow', 'visible');
			$('.bx-viewport').css('height', 'auto');
		}else {
			$('.bx-viewport').css('overflow', 'hidden');
			$('.bx-viewport').css('height', viewportHeight);
		};
	});

});
"use strict";

var SliderFactory = {
    slider: function () {
        var container = $('.works__content__right'),
            mainSlide = container.find('.js-slider-display-img'),
            rightBtn = container.find('.js-slider-bth--right'),
            leftBtn = container.find('.js-slider-bth--left');
        
        var mainSlideChange = function (btn, slidefnc) {
            mainSlide.removeClass('active');
            mainSlide.attr('src', slidefnc(btn));
            mainSlide.addClass('active');
        };
        
        var slideToNext = function(btn, slide) {
            var items = btn.find('.js-slider-item'),   
                current = items.filter('.active'),
                imageSrc = current.children().attr('src'),
                index = current.index(),
                nextSlide;
        
            if (slide == 'prev') {
                nextSlide = current.prev();
                if (index <= 0) {
                    nextSlide = items.eq(items.length - 1);
                }
            } else {
                nextSlide = current.next();
                if (index >= items.length - 1) {        
                    nextSlide = items.eq(0);
                }
                (function () {  // - вывод описания в левой колонке
                    var title = current.data('title'),
                        skills = current.data('skills'),
                        link = current.data('link');
                    changeText(title, skills, link);
                })();
            }
        
            current.siblings().css('top', '100%');
            current.stop(true, true).animate({'top': '-100%'}, 700).removeClass('active');
            nextSlide.stop(true, true).animate({'top':'0%'}, 700).addClass('active');

            return imageSrc;
        };
        
        var slideToPrev = function (btn, slide) {
            var items = btn.find('.js-slider-item'),
                current = items.filter('.active'),
                imageSrc = current.children().attr('src'),
                index = current.index(),
                nextSlide;
        
            if (slide == 'next'){
                nextSlide = current.next();
                if (index >= items.length - 1) {        
                    nextSlide = items.eq(0);
                }
            } else {
                nextSlide = current.prev();
                if (index <= 0) {
                    nextSlide = items.eq(items.length - 1);
                }
                (function () {  // - вывод описания в левой колонке
                    var title = current.data('title'),
                        skills = current.data('skills'),
                        link = current.data('link');
                    changeText(title, skills, link);
                })();
            }
                
            current.siblings().css('top', '-100%');
            current.stop(true, true).animate({'top': '100%'}, 700).removeClass('active');
            nextSlide.stop(true, true).animate({'top':'0%'}, 700).addClass('active');            

            return imageSrc;
        };
        
        // - функция меняет текс и ссылку в левом окне (в описании)
        var changeText = function (title, skills, link) {

            var blockTitle = $('.js-slider-subtitle'),
                blockSkills = $('.js-slider-tehnologes'),
                blockLink = $('.js-slider-site');

            // - делит текст на буквы для анимации
            function generate(block, element ) {
                block.empty();
                var splitted = element.split(' ');
                for (let i = 0; i < splitted.length; i++) {
                    var word = splitted[i].split(''),
                        newSpan = '<span class="word"> </span>';
                    block.append(newSpan);
                    for (let j = 0; j < word.length; j++) {
                        var letter = '<span class="letter">' + word[j] + '</span>';
                        block.children().eq(i).append(letter);                        
                    }
                }
            }

            function AnimeteLettersWrapper(block) {
                var list = block.find('.letter'),
                    i = 0;                    
                
                function animateLetters() {                    
                    var letter = list.eq(i),
                        duration = 500 / list.length;
    
                    letter.addClass('active');
                    i++;

                    if(i >= list.length){
                        clearTimeout(timer);
                        return true;
                    }
                    var timer = setTimeout(animateLetters, duration);
                }
                animateLetters();
            }            
            
            generate(blockTitle, title);
            generate(blockSkills, skills);
            blockLink.attr('href', link);

            AnimeteLettersWrapper(blockTitle);
            AnimeteLettersWrapper(blockSkills);
        };

        // - обработчики клика
        $(rightBtn).on('click', function () {
            mainSlideChange(rightBtn, slideToNext);
            slideToPrev(leftBtn, 'next');
        });
        
        $(leftBtn).on('click', function () {
            mainSlideChange(leftBtn, slideToPrev);
            slideToNext(rightBtn, 'prev');
        });
    }
}

$(function () {
    if ($('#slider').length) {
      SliderFactory.slider();
    }
});
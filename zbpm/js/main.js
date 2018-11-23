$(document).ready(function(){
    $('.input-phone').each(function(){
        var that = $(this);

        that.inputmask("+7 (999) 999-99-99", {
            "onincomplete": function() {
                that.addClass('incomplete');
            },
            "oncomplete": function() {
                that.removeClass('incomplete');
            }
        });
    });


    var offsetVal = $('#header').outerHeight();
    $(window).resize(function(){
        offsetVal = $('#header').outerHeight();
    });

    // scrollspy
    $('body').scrollspy({
        target: '#nav',
        offset: function () {
            return offsetVal;
        }()
    });

    // affix
    /*$('#header').affix({
        offset: {
            top: 5
        }
    });*/

    $('.accordions-header').on('click', function(){
        var that = $(this);
        var container = that.parents('.accordions-container');
        container.toggleClass('open');
        container.find('.accordions-content').stop().slideToggle(300);
    });

    $('.accordions-container.open').each(function(){
        var that = $(this);
        that.find('.accordions-header').trigger('click');
    });

    // scroll to anchor
    function anchor(e) {
        e.preventDefault();

        var ank = $(this).attr('href');
        var section = $('body').find(ank);

        if(section.length > 0){
            var topToScroll = section.offset().top;

            if($('body').is('.mm-menu')){
                setTimeout(function(){
                    $('html, body').animate({
                        scrollTop: topToScroll
                    }, 300, function(){
                        $("#mobile-menu").data("mmenu").close();
                        $(".b-menu-icon").removeClass("active");
                    });
                }, 100);
            } else {
                $('html, body').animate({
                    scrollTop: topToScroll
                }, 300);
            }
        } else {
            var siteUrl = document.location.origin;
            window.location.href = siteUrl + ank;
        }
    }
    $('body').on('click touchstart', '.anchor', anchor);


    // menu
    var mobile;
    var	menuCreated = false;

    $(window).on("load resize", function(){
        mobile = ( $(window).width() < 992 ) ? true : false;
        buildMenu();
    });


    function buildMenu(){
        if( mobile && !menuCreated ){
            var $nav = $(".b-menu__content"),
                $navClone = $nav.clone(),
                $btnMenu = $(".b-menu-icon");

            $navClone.appendTo("#mobile-menu");

            var search = $('.b-search').clone();

            $('#mobile-menu ').mmenu({
                extensions : ['theme-white', 'effect-menu-slide', 'pagedim-black' ],
                navbar: {
                    title: 'Меню'
                },
                offCanvas: {
                    position: 'right',
                    /*zposition: "front",*/
                }
            },{
                offCanvas: {
                    pageSelector: "#container"
                }
            });

            $btnMenu.click(function(e) {
                e.preventDefault();
                $(this).addClass("active");
            });

            var api = $("#mobile-menu").data("mmenu");
            api.bind("open:start", function(){
                $btnMenu.addClass("active");
            });
            api.bind("close:before", function(){
                $btnMenu.removeClass("active");
            });

            api.bind("close:after", function(){
                $('html, body').stop();
            });


            $('body').on('click', '.b-menu-icon', function(){
                if($(this).is('.active')){
                    api.close();
                }
            });

            menuCreated = true;

        }

        if( !mobile && menuCreated ){
            $("#mobile-menu").data("mmenu").close();
            $(".b-menu-icon").removeClass("active");
        }
    }

    // getScrollbarWidth
    function getScrollbarWidth() {
        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    }
    var currentScrollWidth = getScrollbarWidth();

    $(document).on('beforeShow.fb', function( e, instance, slide ) {
        if($('html').not('.fancybox-enabled')){
            $('#header').css('padding-right', currentScrollWidth + 'px');
        }
    }).on('afterClose.fb', function( e, instance, slide ) {
        if($('.fancybox-container').length == 0){
            $('#header').css('padding-right', $('body').css('padding-right'));
        }
    });


    $('body').on('click', '.btn-submit', function (e) {
        e.preventDefault();
        var that = $(this);
        var form = that.parents('form');
        var proceed = true;
        var section = that.parents('.landing-section');
        var pageHref = window.location.href;

        form.find('[name="pageUrl"]').val(pageHref);

        //simple input validation
        form.find("input[required], textarea[required]").each(function(){
            var el = $(this);
            var inputContainer = el.parents('.input-container');

            if(el.is('[type="checkbox"]') ) {
                if (el.is(':checked')) {
                    inputContainer.removeClass('error');
                    el.parents('.b-form__content-section').removeClass('error');
                } else {
                    inputContainer.addClass('error');
                    el.parents('.b-form__content-section').addClass('error');

                    proceed = false;
                }
            } else if(el.is('[type="radio"]') ){
                var name = el.attr('name');
                var allInputs = form.find('input[name="' + name + '"]');
                var groupStatus = false;

                allInputs.each(function(){
                    if($(this).is(':checked')){
                        groupStatus = true;
                    }
                });

                if (groupStatus){
                    el.parents('.b-form__content-section').removeClass('error');
                } else {
                    el.parents('.b-form__content-section').addClass('error');

                    proceed = false;
                }
            } else {
                if(el.is('.input-important')){
                    if(el.val()){
                        proceed = false;
                    }
                } else {
                    if(!$.trim(el.val())){ //if this field is empty
                        inputContainer.addClass('error');
                        if(el.is('[name="whatYouSell"]')){
                            el.parents('.b-form__content-section').addClass('error');
                        }
                        proceed = false; //set do not proceed flag
                    } else {
                        if(el.is('[name="whatYouSell"]')){
                            el.parents('.b-form__content-section').removeClass('error');
                        }
                        inputContainer.removeClass('error');
                    }
                }
            }
        });

        //if everything's ok, continue with Ajax form submit
        if (proceed) {
            var form_data = new FormData(form[0]); //Creates new FormData object

            $.ajax({ //ajax form submit
                url: form.attr('action'),
                type: form.attr('method'),
                data: form_data,
                dataType: "json",
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function(){

                },
                success: function (data) {
                    window.location.href = window.location.pathname + "thanks.html" + window.location.search;
                }
            });
        } else {
            $('html, body').animate({
                scrollTop: form.parents('.landing-section').offset().top - $('#header').outerHeight()
            }, 400);
        }
    });

    $('body').on('click', '.modal-btn', function (e) {
        e.preventDefault();
        var that = $(this);
        var href = that.attr('href');
        var block = $(href);
        var formTitle = that.attr('data-form-title');

        block.find('form').trigger('reset');
        $('input, textarea', block).val('');

        if (formTitle) {
            $('.b-modal input[name="subject"]').val(formTitle);
        }

        $.fancybox.open({
            src  : href,
            type : 'inline',
            opts : {
                margin : [44, 0],
                beforeShow : function(){

                },
                afterClose: function(){

                },
                baseClass : ''
            }
        });
    });

    $('.b-gallery').each(function(){
        var that = $(this);
        var view = that.find('.b-gallery__view .slider');
        var preview = that.find('.b-gallery__preview .slider');

        view.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            fade: true,
            asNavFor: preview
        });

        preview.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: view,
            arrows: false,
            dots: true,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                }, {
                    breakpoint: 380,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                        /*adaptiveHeight : true,*/
                    }
                }
            ]
        });
    });


    $('.b-reviews__list .slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        arrows: true,
        prevArrow: '<button type="button" class="icon-left-arrow slick-arrow_prev"><i class="icon-back"></i></button>',
        nextArrow: '<button type="button" class="icon-right-arrow slick-arrow_next"><i class="icon-next"></i></button>',
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 380,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    /*adaptiveHeight : true,*/
                }
            }
        ]
    });


    // Каталог
    $('body').on('click', '.b-catalog__list-item', function(e){
        e.preventDefault();

        var modal = $('#modal-cart');
        var that = $(this);
        var description = that.find('.b-catalog__list-item-description');
        var title = that.find('h3').text();


        modal.find('.form [name="subject"]').val(title);
        modal.find('.b-cart__title').text(title);
        modal.find('.b-cart__view').html(that.find('.b-catalog__list-item-img img').clone());


        modal.find('#order-description').html('').html(that.find('.b-catalog__list-item-description').html());
        modal.find('#order-application').html('').html(that.find('.b-catalog__list-item-application').html());
        modal.find('#order-precautionary-measures').html('').html(that.find('.b-catalog__list-item-precautionary-measures').html());



        $.fancybox.open({
            src  : modal,
            type : 'inline',
            opts : {
                margin : [44, 0],
                beforeShow : function(){
                    modal.find('.b-cart__nav ul li:first-child a').trigger('click');
                },
                afterClose: function(){

                },
                baseClass : ''
            }
        });
    });
    // конец каталога



    $('.dropdown-clicker').on('click', function(){
        var that = $(this);
        var container = that.parents('.dropdown-container');
        var content = container.find('.dropdown-content');

        container.toggleClass('dropdown-container_open');
        content.slideToggle(300);
    });

    $('body').on('click', '.product-info', function(e){
        e.preventDefault();

        var that = $(this);
        var modal = $('#modal-product-info');
        var imgSrc = that.attr('href');
        var description = that.attr('data-caption');

        modal.find('.b-product-info__img img').attr('src', imgSrc);
        modal.find('.b-product-info__description').html(description);

        $.fancybox.open({
            src  : modal,
            type : 'inline',
            opts : {
                margin : [44, 0],
                beforeShow : function(){

                },
                afterClose: function(){

                },
                baseClass : ''
            }
        });
    });

    // табы
    $('body').on('click', '.tab-btn', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });


    // maps
    function runMap(){
        if (typeof ymaps == 'undefined') {
            return false;
        }
        ymaps.ready(function () {
            var myMap = new ymaps.Map('map', {
                    center: [55.112411, 61.385935],
                    zoom: 10,
                    controls: []
                }, {
                    searchControlProvider: 'yandex#search'
                }),

                myPlacemark = new ymaps.Placemark([55.112411, 61.385935], {
                    hintContent: ''
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: 'images/mark.png',
                    // Размеры метки.
                    iconImageSize: [65, 90],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-5, -38]
                });
                myMap.controls.add('zoomControl');
                myMap.geoObjects
                    .add(myPlacemark);
        });
    }
    runMap();

    function mobilePromo(){
        var form;
        if($(window).width() < 992){
            form = $('.b-promo__content > .row-flex > .col > .b-form');
            if(form){
                $('.b-promo__content').append(form);
            }
        } else {
            form = $('.b-promo__content > .b-form');
            if(form){
                $('.b-promo__content > .row-flex > .col:nth-child(2)').append(form);
            }
        }
    }

    mobilePromo();

    $(window).resize(function(){
        mobilePromo();
    });
});
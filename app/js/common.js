function overflow(block) {
    var leftPosition = block.offset().left,
        boxWidth = block.width(),
        screenWidth = $(window).width(),
        newWidth;
    newWidth = screenWidth - leftPosition;
    block.width(newWidth);

};
$(function () {
    if ($(window).width() > 768 && $(".e-book-wrapper").length) {
        overflow($(".e-book-wrapper"));
        window.onresize = function () {
            overflow($(".e-book-wrapper"));
        };
    }
    // var spinner = $(".spinner").spinner({
    //     min: 0
    // });
    $(".e-review-slider").on('init', function (e) {
        var slider = $(e.currentTarget);
        var maxHeight = 1;
        var slides = slider.find('.slick-slide');
        if (window.innerWidth < 768) return;
        slides.each(function (index, elem) {
            var elemStyle = window.getComputedStyle(elem, null);
            var height = parseInt(elemStyle.getPropertyValue("height"));
            maxHeight = height > maxHeight ? height : maxHeight;
        });
        slides.find('.slide-wrapper').css('height', maxHeight + "px")
    });

    $(".e-review-slider").slick({
        slidesToShow: 2,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    adaptiveHeight: true
                }
            }
        ]
    });

    $(".set-slider").slick({
        slidesToShow: 1,
        arrows: true
    });

    if ($('.cart-package').length) {
        $('.cart-package select').styler({
            onSelectClosed: function () {
                var selectBlock = $(this).find('select option:selected');
                $('.package-cost span').html(selectBlock.val());
                $('.package-right img').attr('src', selectBlock.data('img'));
            }
        });
    }

    $('.btn-item-modal').fancybox({
        btnTpl: {
            smallBtn: '<button data-fancybox-close type="button" class="modal-close">\n' +
                '        <img src="img/close.png" alt="">\n' +
                '      </button>'
        },
        beforeShow: function (instance, current) {
            var modalContent = $(current.src);
            var itemInfo = $.fancybox.getInstance().current.opts.$orig;
            var imagesBigArray = itemInfo.data('img-big').split(',');
            var imagesSmallArray = itemInfo.data('img-small').split(',');
            var itemDesc = itemInfo.find('.book-info').html();
            var imagesBigSliderContent = getImageList(imagesBigArray);
            var imagesSmallSliderContent = getImageList(imagesSmallArray);
            var modalBigSlider = modalContent.find('.e-book-slider');
            var modalSmallSlider = modalContent.find('.e-book-prev');
            var modalItemInfo = modalContent.find('.e-shadow-box');
            modalContent.find('.modal-item-title').html(itemInfo.find('.item-title').html());
            modalBigSlider.html(imagesBigSliderContent);
            modalSmallSlider.html(imagesSmallSliderContent);
            modalItemInfo.html(itemDesc);
            modalBigSlider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                asNavFor: modalSmallSlider
            });
            modalSmallSlider.slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: false,
                asNavFor: modalBigSlider,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3
                        }
                    }
                ]
            });

            function getImageList(imagesArray) {
                var imagesList = '';
                for (var i = 0; i < imagesArray.length; i++) {
                    imagesList = imagesList + '<div class="e-book-slide"><img src="' + imagesArray[i] + '" alt=""></div>';
                }
                return imagesList;
            }
        },
        afterClose: function (instance, current) {
            var modalContent = $(current.src);
            var imagesBigSlider = modalContent.find('.e-book-slider');
            var imagesSmallSlider = modalContent.find('.e-book-prev');
            imagesBigSlider.slick('unslick');
            imagesSmallSlider.slick('unslick');
        }
    });

    $('.book-modal').on('beforeLoad   ', function (instance, current, e) {
        console.log(instance, current, e);
        if (!$(this).find(".e-book-slider").hasClass("slick-initialized")) {
            $(this).find(".e-book-slider").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                asNavFor: $(this).find(".e-book-prev")
            });
            $(this).find(".e-book-prev").slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: false,
                asNavFor: $(this).find(".e-book-slider"),
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3
                        }
                    }
                ]
            });
        }
    });

    $("a.go-to").click(function () {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        return false;
    });

    $('.spinner').each(function (i, element) {
        var spinnerInput = $(element);
        var inputMin = 0;
        spinnerInput.wrap("<div class='ui-spinner'></div>");
        var inputWrapper = spinnerInput.closest('.ui-spinner');
        spinnerInput.after(
            '<div class="ui-spinner-value">' + $(element).val() + ' шт.</div>' +
            '<button type="button" class="btn btn-minus">-</button>' +
            '<button type="button" class="btn btn-plus">+</button>');
        spinnerInput.after('');
        var inputBtn = inputWrapper.find('.btn');
        var inputText = inputWrapper.find('.ui-spinner-value');
        inputBtn.on('click', function (e) {
            var btn = $(this);
            var newValue = spinnerResult(btn, $(element).val(), inputMin)
            spinnerInput.val(newValue);
            inputText.text($(element).val() + ' шт.');
        });
    });

    function spinnerResult(btn, value, minValue) {
        value = btn.text() == '-' ?  parseInt(value) - 1 : parseInt(value) + 1;
        console.log(btn, value, minValue);
        if (value < minValue) return minValue;
        return value;
    }

    $('[role=tablist]').each(function (i, element) {
        var tabs = $(element);
        var tabsButtons = $('[data-toggle=collapse]');
        tabsButtons.on('click', function (e) {
            e.preventDefault();
            var btn = $(this);
            var target = $(btn.attr('href'));
            console.log(target, btn.prop('aria-expanded'));
            if (btn.attr('aria-expanded') == 'true') {
                return
            }
            tabs.find('.collapse.in').slideUp(300);
            tabs.find('.collapse.in').removeClass('in');
            tabs.find('[aria-expanded=true]').attr('aria-expanded', 'false');
            btn.attr('aria-expanded', 'true');
            target.slideDown(300);
            target.addClass('in');
        })
    })

});

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
        slides.each(function (index, elem) {
            var elemStyle = window.getComputedStyle(elem, null);
            var height = parseInt(elemStyle.getPropertyValue("height"));
            console.log(height);
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
                    slidesToShow: 1
                }
            }
        ]
    });

    $(".tab-pane.active .set-slider, .full-set-sect .set-slider").slick({
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
    $('.book-modal').on('shown.bs.modal', function () {
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
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var tab = $($(e.target).attr('href'));
        tab.find('.set-slider').slick({
            slidesToShow: 1,
            arrows: true
        });
    });
    $('a[data-toggle="tab"]').on('hidden.bs.tab', function (e) {
        var tab = $($(e.target).attr('href'));
        tab.find('.set-slider').slick('unslick');
    });
    $("a.go-to").click(function () {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        return false;
    });

});

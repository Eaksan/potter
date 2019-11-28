var itemsList = {
    0: {
        itemCost: '590',
        itemName: 'Гарри Поттер и Филосовский Камень'
    },
    1: {
        itemCost: '590',
        itemName: 'Гарри Поттер и\n' +
            'Тайная Комната'
    },
    2: {
        itemCost: '590',
        itemName: 'Гарри Поттер и\n' +
            'Узник Азкабана\n'
    },
    3: {
        itemCost: '590',
        itemName: 'Гарри Поттер и\n' +
            'Узник Азкабана\n'
    },
    4: {
        itemCost: '590',
        itemName: 'Гарри Поттер и\n' +
            'Узник Азкабана\n'
    },
    5: {
        itemCost: '590',
        itemName: 'Гарри Поттер и\n' +
            'Узник Азкабана\n'
    },
    6: {
        itemCost: '590',
        itemName: 'Гарри Поттер и\n' +
            'Дары Смерти'
    },
    7: {
        itemCost: '3390',
        itemName: 'Полный комплект'
    },
    8: {
        itemCost: '850',
        itemName: 'Сказки БАРДА БИДЛЯ'
    },
    9: {
        itemCost: '850',
        itemName: 'Фантастические звери и места их обитания'
    },
    10: {
        itemCost: '850',
        itemName: 'Фантастические звери и места их обитания'
    },
    11: {
        itemCost: '850',
        itemName: 'Квиддич с древности до наших дней\n'
    },
    12: {
        itemCost: '6890',
        itemName: 'Все книги'
    },
};

var observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();

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
        lazyLoad: 'ondemand',
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
        lazyLoad: 'ondemand',
        arrows: true
    });

    // if ($('.cart-package').length) {
    //     $('.cart-package select').styler({
    //         onSelectClosed: function () {
    //             var selectBlock = $(this).find('select option:selected');
    //             $('.package-cost span').html(selectBlock.val());
    //             $('.package-right img').attr('src', selectBlock.data('img'));
    //         }
    //     });
    // }

    $('.fancybox-change-close').fancybox({
        btnTpl: {
            smallBtn: '<button data-fancybox-close type="button" class="modal-close">\n' +
                '<img src="img/close.png" alt="">\n' +
                '</button>'
        }
    });

    $('.js_modal-order').fancybox({
        btnTpl: {
            smallBtn: '<button data-fancybox-close type="button" class="modal-close">\n' +
                '<img src="img/close.png" alt="">\n' +
                '</button>'
        },
        beforeShow: function (instance, current) {
            var modalContent = $(current.src);
            var itemInfo = $.fancybox.getInstance().current.opts.$orig;
            var itemIndex = itemInfo.data('item-index');
            var inputItemIndex = modalContent.find('.js_item-index');
            $(inputItemIndex).val(itemIndex);
        }
    });

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
            var itemDesc = itemInfo.find('.book-info').html();
            var imagesBigSliderContent = getImageList(imagesBigArray);
            var imagesSmallSliderContent = getImageList(imagesBigArray);
            var modalBigSlider = modalContent.find('.e-book-slider');
            var modalSmallSlider = modalContent.find('.e-book-prev');
            var modalItemInfo = modalContent.find('.e-shadow-box');
            var itemIndex = $(itemInfo.closest('.e-sect2-item')).data('index');
            var inputItemIndex = modalContent.find('.js_item-index');
            $(inputItemIndex).val(itemIndex);
            modalContent.find('.modal-item-title').html(itemInfo.find('.item-title').html());
            modalBigSlider.html(imagesBigSliderContent);
            modalSmallSlider.html(imagesSmallSliderContent);
            modalItemInfo.html(itemDesc);
            modalBigSlider.slick({
                slidesToShow: 1,
                lazyLoad: 'ondemand',
                slidesToScroll: 1,
                fade: true,
                asNavFor: modalSmallSlider
            });
            modalSmallSlider.slick({
                slidesToShow: 5,
                lazyLoad: 'ondemand',
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
        value = btn.text() == '-' ? parseInt(value) - 1 : parseInt(value) + 1;
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

$(function () {
    $('.js_to-cart').on('click', function (e) {
        e.preventDefault();
        var btn = $(this);
        var item = btn.closest('.e-sect2-item');
        var itemIndex = item.data('index');
        var cartItems = {};
        if (localStorage.cartItem !== undefined) {
            cartItems = JSON.parse(localStorage.cartItem);
            if (cartItems[itemIndex] !== undefined) {
                cartItems[itemIndex]++;
            } else {
                cartItems[itemIndex] = 1;
            }
            localStorage.setItem('cartItem', JSON.stringify(cartItems));
        } else {
            cartItems[itemIndex] = 1;
            localStorage.setItem('cartItem', JSON.stringify(cartItems));
        }
        // $('.to-cart').addClass('show');
    });

    // showToCartBtn();

    window.addEventListener('storage', function (e) {
        // showToCartBtn();
    });

    function showToCartBtn() {
        if (localStorage.cartItem !== undefined) {
            $('.to-cart').addClass('show');
        }
    }

    $('.js_phone-mask').mask('+7 (000) 000-0000');

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $('.js_form input:required').each(function (i, input) {
        var $input = $(input);
        var inputType = $input.attr('type');
        var $form = $input.closest('form');
        var $formButton = $form.find('[type=submit]');
        var valid;
        $input.on('input focusout', function (e) {
            var inputVal = $input.val();
            if (inputType == 'tel') {
                valid = inputVal.length < 17;
            } else if (inputType == 'email') {
                valid = !validateEmail(inputVal);
            } else if (inputType == 'text') {
                valid = inputVal.length < 3;
            } else if (inputType == 'checkbox') {
                valid = !$input.prop('checked');
            } else {
                return;
            }
            $input.toggleClass('invalid', valid);
            $formButton.prop('disabled', valid);
        });
        $input.on('focus', function () {
            $input.removeClass('invalid');
        })
    });

    $('.js_form').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var formData = new FormData(form[0]);
        var btnSubmit = form.find('[type=submit]');

        if (form.find('input.invalid:required').length > 0) {
            form.find('input.invalid:required').focus();
            return;
        }

        btnSubmit.prop('disabled', true);
        btnSubmit.addClass('ajax');

        if(formData.has('itemIndex') && formData.get('itemIndex') !== '') {
            formData.set('itemPrice', itemsList[formData.get('itemIndex')].itemCost);
            formData.set('itemName', itemsList[formData.get('itemIndex')].itemName);
            formData.set('form_subject', 'Покупка');
        } else {
            formData.set('form_subject', 'Заявка на звонок');
        }

        $.ajax({
            url: "mail.php",
            type: "POST",
            response: "HTML",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                $('.js_form').parent().addClass('form-success');
            },
            error: function () {
                console.error("Невозможно отправить");
            },
            complete: function () {
                btnSubmit.prop('disabled', false);
                btnSubmit.removeClass('ajax');
            }
        });
    })
});

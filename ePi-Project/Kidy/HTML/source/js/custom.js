/* ====================================
   Onload functions
   ==================================== */
$(function() {
    /*matchHeight*/
    // matchHeight for item index page
    $('.zone__content.l-grid .item').matchHeight();
    // matchHeight for col in filter result
    $('.filter-result__col').matchHeight();
    // matchHeight for utility
    $('.detail__utility').matchHeight();
    // matchHeight for early education
    $('#early-education .item').matchHeight();

    // tooltip for item horizontal
    $('[data-toggle="tooltip"]').tooltip();
    //markup item--horizontal toggle
    $('.item--horizontal').each(function() {
        $(this).find('.item__markup').click(function() {
            $(this).toggleClass('is-marked');
            $(this).children('.fa').toggleClass('fa-heart-o');
            $(this).children('.fa').toggleClass('fa-heart');
        });
    });
    $('.filter__content').draggable();

    // jquery ui slider range with fixed minimum 
    $("#filter-distance").slider({
        range: "min",
        value: 5,
        min: 1,
        max: 20,
        slide: function(event, ui) {
            $(".amount-distance").val(ui.value + ' km');
        }
    });
    $(".amount-distance").val($("#filter-distance").slider("value") + ' km');

    // jquery ui slider range for price
    $("#filter-price").slider({
        range: true,
        min: 0,
        max: 50,
        values: [5, 30],
        slide: function(event, ui) {
            $(".amount-price").val(ui.values[0] + " triệu - " + ui.values[1] + " triệu");
        }
    });
    $(".amount-price").val($("#filter-price").slider("values", 0) + " triệu - " + $("#filter-price").slider("values", 1) + " triệu");

    // jquery ui slider range for number
    $("#filter-number").slider({
        range: true,
        min: 0,
        max: 30,
        values: [10, 20],
        slide: function(event, ui) {
            $(".amount-number").val(ui.values[0] + " bé - " + ui.values[1] + " bé");
        }
    });
    $(".amount-number").val($("#filter-number").slider("values", 0) + " bé - " + $("#filter-number").slider("values", 1) + " bé");

    // jquery ui slider range with fixed minimum 
    $("#filter-score").slider({
        range: "min",
        value: 7.5,
        min: 1,
        max: 10,
        step: 0.5,
        slide: function(event, ui) {
            $(".amount-score").val(ui.value + ' điểm');
        }
    });
    $(".amount-score").val($("#filter-score").slider("value") + ' điểm');


    // jquery ui slider range with fixed minimum 
    $("#filter-age").slider({
        range: true,
        min: 0,
        max: 36,
        values: [1, 12],
        slide: function(event, ui) {
            $(".amount-age").val(ui.values[0] + " tháng - " + ui.values[1] + " tháng");
        }
    });
    $(".amount-age").val($("#filter-age").slider("values", 0) + " tháng - " + $("#filter-age").slider("values", 1) + " tháng");




    // create image shadow
    $('.item--img-shadow').each(function() {
        var imgshadow = $(this).find('.img-responsive').attr("src");
        $(this).append($('<div class="img-shadow"></div>'));
        $(this).find('.img-shadow').css("background-image", "url(" + imgshadow + ")");
    });

    //toggle quick search in site header
    $('.wrap-search .btn').click(function() {
        $(this).next('#quick-search').toggleClass('in');
    });

    // expand main__content in detail page
    $('.detail__main-content .view-more').click(function() {
        $(this).parent('.detail__main-content').addClass('show');
        $(this).hide();
    });

    // expand text in trainer info
    $('.trainer__box .text .view-more').click(function() {
        $(this).parent('.trainer__box .text').addClass('show');
        $(this).hide();
    });

    // show suggestion in search-box cover page
    $('.search-box__input-bar').click(function() {
        $(this).siblings('.search-box__suggestion').toggleClass('show');
    });

    // show suggestion in filter-change listing.html
    $('#filter-change__input-bar').click(function() {
        $(this).siblings('.search-box__suggestion').toggleClass('show');
    });

    // toggle filter change
    $('#filter-change-btn').click(function() {
        $('.filter-result').hide();
        $('.filter-change').fadeIn();
    });
    $('.filter-change .btn-cancel').click(function() {
        $('.filter-result').fadeIn();
        $('.filter-change').hide();
    });

    //show big map
    $('.filter__location .btn').click(function() {
        // show big map
        $('.big-map').show();
        // $('.big-map').animate({
        //     width: "100%",
        //     height: "100%",
        //     display: 'block'
        // },'slow');
        // hide box filter
        $('.filter__location').slideUp();
    });
    $('.big-map .btn-close').click(function() {
        // hide big map
        $('.big-map').slideUp('slow');
        $('.big-map').css({ "width": "0", "height": "0" });
        // show box filter
        $('.filter__location').slideDown();
    });

    // show full content in timeline event
    $('.timeline__event .event__content .text-muted').click(function() {
        $(this).hide();
        $(this).parent('.event__content').css('max-height', 'initial');
    });

    //toggle register box ( email or social network)
    $('#email-register .note .a-link').click(function() {
        $('#email-register').slideUp();
        $('#social-register').delay(500).slideDown();
    });
    $('#social-register .note .a-link').click(function() {
        $('#social-register').slideUp();
        $('#email-register').delay(500).slideDown();
    });

    //show edit tool school detail
    $('.trainer__box .school__title .name').click(function() {
        $(this).siblings('.edit-box').toggle();
    }); //show edit tool kid detail
    $('.trainer__box .kid__name .name').click(function() {
        $(this).siblings('.edit-box').toggle();
    });
    $('.trainer__skill .name').click(function() {
        $(this).siblings('.edit-box').toggle();
    });

    // show popup for lesson item 
    $(".lesson__item .lesson__content").click(function() {
        $(this).siblings('.lesson__popup').fadeIn('fast');
    });
    $(".lesson__popup .btn-default").click(function() {
        $(this).parents('.lesson__popup').fadeOut('fast');
    });

    // show full popup
    $('#demo-fullpopup').click(function() {
        $('#popup').fadeIn('fast');
    });
    $('#popup').click(function() {
        $(this).fadeOut('fast');
    });
    //show input for reply status of trainer
    $('.status__comment a').click(function() {
        $(this).parent('.status__comment').siblings('.status__reply-input').slideDown('fast');
    });
});

/*  ===
    slider for detail
    === */
$('.bxslider').bxSlider({
    buildPager: function(slideIndex) {
        switch (slideIndex) {
            case 0:
                return '<img src="fig-image/1x1.png">';
            case 1:
                return '<img src="fig-image/1x1.png">';
            case 2:
                return '<img src="fig-image/1x1.png">';
            case 3:
                return '<img src="fig-image/1x1.png">';
        }
    },
    adaptiveHeight: true,
    prevText: '',
    nextText: '',
    nextSelector: '#bxslider-next',
    prevSelector: '#bxslider-prev',
    onSliderLoad: function() {
        var positionTop = $('.bx-viewport').height();
        $('.bxslider-control .fa').css('top', positionTop / 2);
        $(window).resize(function() {
            var positionTop = $('.bx-viewport').height();
            $('.bxslider-control .fa').css('top', positionTop / 2);
        });
    }
});

/*  ===
    slider for gds detail
    === */
$('.l-slider .slider').bxSlider({
    minSlides: 1,
    maxSlides: 4,
    slideWidth: 270,
    slideMargin: 20,
    pager: false,
    adaptiveHeight: true,
    prevText: '',
    nextText: '',
    nextSelector: '#bxslider-next',
    prevSelector: '#bxslider-prev'
});

/*  ===
    slider for lesson
    === */
// $('#linkto-kidexam').click(function() {});
// $('#forkid-lesson').bxSlider({
//     minSlides: 1,
//     maxSlides: 5,
//     slideWidth: 143,
//     slideMargin: 20,
//     pager: false,
//     prevText: '',
//     nextText: '',
//     nextSelector: '#forkid-lesson-next',
//     prevSelector: '#forkid-lesson-prev'
// });

$('.forkid__navbar-item a[data-href').click(function() {
    event.preventDefault();
    var tabshow = "#" + $(this).attr("data-href");
    var tabcontent = $("div[data-tabcontent]");
    $(this).parent().addClass("active");
    $(this).parent().siblings().removeClass("active");
    $(tabcontent).hide();
    $(tabshow).fadeIn();
    if ($(this).attr("data-href") == "media") {
        $(".forkid__kid-listing").hide();
    } else {
        $(".forkid__kid-listing").fadeIn();
    }
});

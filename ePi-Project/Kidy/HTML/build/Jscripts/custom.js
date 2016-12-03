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
});
// 
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
    nextText: '',
    prevText: '',
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

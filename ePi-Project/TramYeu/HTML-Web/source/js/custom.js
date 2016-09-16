/* ====================================
   Onload functions
   ==================================== */
$('.top-header .fa-search').click(function() {
    $('.search-box').fadeToggle();
    $(this).toggleClass('active');
});

/*script for story mask*/
$(function() {
    $('.story-mask').each(function() {
        var headerheight = $(this).children('header').height();
        $(this).children('header').css("margin-top", -headerheight / 2);
        var storyheight = $(this).height();
        $(this).css("height", storyheight + (headerheight / 2));
    });
});

$(function() {
    /*home slider */
    $('.slider-zone .zone-content ul').bxSlider({
        slideMargin: 20,
        slideWidth: 154,
        maxSlides: 6,
        minSlides: 1,
        pager: false,
        nextText: '',
        prevText: '',
        nextSelector: '#home-slider-next',
        prevSelector: '#home-slider-prev'
    });
    /*album slider*/
    $('.album-zone .slider-album').bxSlider({
        pager: false,
        nextText: '',
        prevText: '',
        nextSelector: '#album-slider-next',
        prevSelector: '#album-slider-prev'
    });
    /*cetagory box slider*/
    $('#box-slider-1').bxSlider({
        nextText: '',
        prevText: ''
    });
    /*cetagory box slider*/
    $('#box-slider-2').bxSlider({
        nextText: '',
        prevText: ''
    });
});

/*quotes content position */
$(function() {
    var qch = $('.quote-content').height();
    $('.quote-content').css('margin-top', -qch / 2);
});

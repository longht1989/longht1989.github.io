/* ====================================
   Onload functions
   ==================================== */
/* show hide mobile search & menu open */

$('#m-site-header .fa-bars').click(function() {
    $(this).toggleClass('active');
    $('#site-header .menu-open').toggleClass('show');
    $('#site-header .search-open').removeClass('show');
    $('#site-header .fa-search').removeClass('active');
});
$('#m-site-header .fa-search').click(function() {
    $(this).toggleClass('active');
    $('#site-header .search-open').toggleClass('show');
    $('#site-header .fa-bars').removeClass('active');
    $('#site-header .menu-open').removeClass('show');
});


/* show hide desktop menu & search open */

$('#desktop-site-header .fa-search').click(function() {
    $(this).parent('.search-btn').toggleClass('active');
    $(this).next('.search-open').toggleClass('show');
    $('#desktop-site-header .menu-btn').removeClass('active');
    $('#desktop-site-header .menu-open').removeClass('show');
});

$('#desktop-site-header .fa-bars').click(function() {
    $(this).parent('.menu-btn').toggleClass('active');
    $(this).next('.menu-open').toggleClass('show');
    $('#desktop-site-header .search-btn').removeClass('active');
    $('#desktop-site-header .search-open').removeClass('show');
});


/*demo slider*/

$(function() {

    if (ismobile) {
        $('#slider-demo').bxSlider({
            maxSlides: 2,
            minSlides: 2,
            slideWidth: 383,
            slideMargin: 20,
            nextText: '',
            prevText: '',
            nextSelector: '#demo-slider-next',
            prevSelector: '#demo-slider-prev'
        });
    }
    // >> desktop
    else {
        $('#slider-demo').bxSlider({
            maxSlides: 4,
            minSlides: 4,
            slideWidth: 230,
            slideMargin: 20,
            nextText: '',
            prevText: '',
            nextSelector: '#demo-slider-next',
            prevSelector: '#demo-slider-prev'
        });
    }
    /*demo slider */
    $('#slider-demo-02').bxSlider({
        pager: false,
        nextText: '',
        prevText: '',
        nextSelector: '#demo-slider-02-next',
        prevSelector: '#demo-slider-02-prev',
        adaptiveHeight: true
    });
});

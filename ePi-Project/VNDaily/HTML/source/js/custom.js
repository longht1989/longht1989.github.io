/* ====================================
   Onload functions
   ==================================== */
$(".search > span").click(function() {
    $(".search-box").toggle();
    $(".search").toggleClass("active");
})

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
    /*demo slider */
    $('#slider-demo').bxSlider({
        maxSlides: 1,
        minSlides: 1,
        nextText: '',
        prevText: '',
        nextSelector: '#demo-slider-next',
        prevSelector: '#demo-slider-prev'
    });
    /*demo slider 02 */
    $('#slider-demo-02').bxSlider({
        maxSlides: 1,
        minSlides: 1,
        nextText: '',
        prevText: '',
        nextSelector: '#demo-slider-02-next',
        prevSelector: '#demo-slider-02-prev'
    });
});

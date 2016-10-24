/* ====================================
   Onload functions
   ==================================== */
$(".search > span").click(function() {
    $(".search-box").toggle();
    $(".search").toggleClass("active");
})

/* show hide mobile search & menu open */

$('#site-header .fa-bars').click(function() {
    $(this).toggleClass('active');
    $('#site-header .menu-open').toggleClass('show');
    $('#site-header .search-open').removeClass('show');
    $('#site-header .fa-search').removeClass('active');
});
$('#site-header .fa-search').click(function() {
    $(this).toggleClass('active');
    $('#site-header .search-open').toggleClass('show');
    $('#site-header .fa-bars').removeClass('active');
    $('#site-header .menu-open').removeClass('show');
});

/*demo slider*/
$(function() {
    /*demo slider */
    $('#slider-demo').bxSlider({
        maxSlides: 1,
        minSlides: 1,
        nextText: '',
        prevText: '',
        nextSelector: '#home-slider-next',
        prevSelector: '#home-slider-prev'
    });
});

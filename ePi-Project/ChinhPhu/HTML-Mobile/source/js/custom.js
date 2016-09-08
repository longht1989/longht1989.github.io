/* ====================================
   Onload functions
   ==================================== */
$(".search > span").click(function() {
    $(".search-box").toggle();
    $(".search").toggleClass("active");
})

$(document).ready(function() {
    $(".epaper-box .slider-listing").bxSlider({
    	auto: true,
        pager: false,
        slideWidth: 110,
        minSlides: 2,
        maxSlides: 2,
        moveSlides: 1,
        slideMargin: 10,
        nextText: '',
        prevText: '',
        nextSelector: '#epaper-next',
        prevSelector: '#epaper-prev'
    });
});

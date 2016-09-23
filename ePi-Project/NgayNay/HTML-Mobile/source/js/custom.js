/* ====================================
   Onload functions
   ==================================== */
$('#site-header .fa-bars').click(function() {
    $(this).toggleClass('active');
    $('#site-header .open-menu').toggleClass('show');
    $('#site-header .search-box').removeClass('show');
    $('#site-header .fa-search').removeClass('active');
});
$('#site-header .fa-search').click(function() {
    $(this).toggleClass('active');
    $('#site-header .search-box').toggleClass('show');
    $('#site-header .fa-bars').removeClass('active');
    $('#site-header .open-menu').removeClass('show');
});
$(function() {
    $('.slider-zone .slider').bxSlider({
        nextText: '>',
        prevText: '<',
        nextSelector: '#home-slider-next',
        prevSelector: '#home-slider-prev',
        adaptiveHeight: 'true'
    });
});

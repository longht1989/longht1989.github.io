/* ====================================
   Onload functions
   ==================================== */
$('.main-tab .story').click(function() {
    $(this).toggleClass('full-info');
});
$('#site-header .sprites-menu').click(function() {
    $(this).toggleClass('active');
    $('#site-header .cate-list').fadeToggle();
});

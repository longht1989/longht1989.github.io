// go to top 
$("#go-top, .go-to-top").click(function() {
    $('body,html').animate({ scrollTop: 0 }, 800);
    return false;
});

$(document).scroll(function() {
    var scrollTop = $(document).scrollTop();
    if (scrollTop > 0) $('#go-top').fadeIn();
    else $('#go-top').fadeOut();
});

/*customise js for component*/
$(document).ready(function() {
    var hgt = Math.max($(".index-bottom-zone .zone").height());
    $(".index-bottom-zone .zone").height(hgt);
});

/* ====================================
   Onload functions
   ==================================== */
/*toggle large nav-bar*/
$('#nav-bar-toggle').click(function() {
    $('.nav-bar').toggleClass('nav-sm');
    $('.content').toggleClass('content-lg');
});
/*show user action*/
$('.user').click(function() {
    $('.user-action').fadeToggle('fast');

});
/*tool tip show*/
$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

/* show & hide inline action */
$(".file-listing-zone > li").click(function(event) {
    // $(".file-listing-zone .inline-action").hide();
    $(this).children('.inline-action').css({ display: "block", position: "fixed", top: event.pageY, left: event.pageX });
});

$(document).mouseup(function(e) {
    var container = $(".inline-action");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
    }
});

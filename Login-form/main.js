var x = decodeURIComponent(document.URL);

// function myFunction() {
//     $('#check').html(y);
// }


$(function() {
    $('#btnsubmit').click(function() {
        var a = $(location).attr('search');
        alert(a);
    });
});

// var source = window.location.url;
// var link = decodeURIComponent(source);

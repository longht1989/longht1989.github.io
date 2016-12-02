/* ====================================
   Onload functions
   ==================================== */
$(function() {
    /*matchHeight*/
    // matchHeight for item index page
    $('.zone__content.l-grid .item').matchHeight();
    // matchHeight for col in filter result
    $('.filter-result__col').matchHeight();
    // matchHeight for utility
    $('.detail__utility').matchHeight();

    // tooltip for item horizontal
    $('[data-toggle="tooltip"]').tooltip();
    //markup item--horizontal toggle
    $('.item--horizontal').each(function() {
        $(this).find('.item__markup').click(function() {
            $(this).toggleClass('is-marked');
            $(this).children('.fa').toggleClass('fa-heart-o');
            $(this).children('.fa').toggleClass('fa-heart');
        });
    });
    // jquery ui slider range with fixed minimum 
    $("#filter-distance").slider({
        range: "min",
        value: 20,
        min: 1,
        max: 700,
        slide: function(event, ui) {
            $("#amount").val("$" + ui.value);
        },
        create: function(event, ui) {
            var v = $(this).slider('value');
            // $(this).find('.ui-slider-handle').text(v); //'<span class="under-value">'v'<s/pan>'
            $(this).find('.ui-slider-handle').append('<span class="under-value"></span>'); //'<span class="under-value">'v'<s/pan>'
            $(this).find('.ui-slider-handle .under-value').text(v); //'<span class="under-value">'v'<s/pan>'
        }
    });
    // jquery ui slider range 
    $("#filter-price").slider({
        range: true,
        min: 0,
        max: 500,
        values: [15, 200],
        slide: function(event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        },
        create: function(event, ui) {
            var v = $(this).slider('value');
            // $(this).find('.ui-slider-handle').text(v); //'<span class="under-value">'v'<s/pan>'
            $(this).find('.ui-slider-handle').append('<span class="under-value"></span>'); //'<span class="under-value">'v'<s/pan>'
            $(this).find('.ui-slider-handle .under-value').text(v); //'<span class="under-value">'v'<s/pan>'
        }
    });
    $("#filter-number").slider({
        range: true,
        min: 0,
        max: 500,
        values: [15, 200],
        slide: function(event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
});


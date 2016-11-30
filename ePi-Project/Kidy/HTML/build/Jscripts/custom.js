/* ====================================
   Onload functions
   ==================================== */
$(function() {
    // equal height for item index page
    $('.zone__content.l-grid .item').matchHeight();
    // tooltip for item horizontal
    $('[data-toggle="tooltip"]').tooltip();
    // jquery ui slider range with fixed minimum 
    $("#filter-distance").slider({
        range: "min",
        value: 20,
        min: 1,
        max: 700,
        slide: function(event, ui) {
            $("#amount").val("$" + ui.value);
        }
    });
    // jquery ui slider range 
    $( "#filter-price" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 15, 200 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#filter-number" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 15, 200 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
});

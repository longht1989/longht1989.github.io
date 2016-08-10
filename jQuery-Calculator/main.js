/*change theme*/
$('.change-theme').click(function() {
    $("body").toggleClass("dark-theme");
});
/*operation function*/
$(".number").click(function() {
    var number = $(this).text();
    $("#x").val(function(n, c) {
        return c + number;
    });
});

function reset() {
    $("#x").val("");
}

function result() {
    $("#x").val(eval($("#x").val()));
}

function percent() {
    var y = $("#x").val();
    $("#x").val(eval(y / 100));
}

function radic() {
    var y = $("#x").val();
    $("#x").val(Math.sqrt(y));
}

function Square() {
    var y = $("#x").val();
    $("#x").val(y * y);
}

function factorial(a) {
    var x = 1;
    var a = $("#x").val();
    for (var i = 1; i <= a; i = i + 1) {
        x = x * i;
    }
    $("#x").val(x);
}

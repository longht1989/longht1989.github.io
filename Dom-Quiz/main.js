function getValue(x) {
    document.getElementById("x").value += x.innerText;
}

function reset() {
    document.getElementById("x").value = "";

}

function result() {
    document.getElementById("x").value = eval(document.getElementById("x").value);
}

function percent() {
    var y = document.getElementById("x").value;
    document.getElementById("x").value = eval(y / 100);
}

function radic() {
    var y = document.getElementById("x").value;
    document.getElementById("x").value = Math.sqrt(y);
}

function Square() {
    var y = document.getElementById("x").value;
    document.getElementById("x").value = y * y;
}

function factorial(a) {
    var x = 1;
    var a = document.getElementById("x").value;
    for (var i = 1; i <= a; i = i + 1) {
        x = x * i;
    }
    document.getElementById("x").value = x;
}

function getValue(x) {
    document.getElementById("x").value += x.innerText;
}

function reset(a) {
    document.getElementById("x").value = "";

}
/*tính tổng*/
function sum() {
    var x1 = Number(document.getElementById("x").value);
    document.getElementById("x").value = "";

}

function result() {
    var x2 = Number(document.getElementById("x").value);
    // document.getElementById("x").value = x1 + x2;
    alert(x2);
    return x1 + x2;
}

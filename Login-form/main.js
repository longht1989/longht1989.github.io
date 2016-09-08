// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function fill() {
    getUrlVars();
    // name
    var name = getUrlVars()["name"];
    name = name.replace(/\+/g, ' ');
    name = decodeURIComponent(name);
    $('.result-page #name').val(name);
    // birthday
    var birthday = getUrlVars()["birthday"];
    $('.result-page #birthday').val(birthday);
    // gender
    var gender = getUrlVars()["gender"];
    gender = decodeURIComponent(gender);
    $('.result-page #gender').val(gender);
    // add
    var add = getUrlVars()["add"];
    add = add.replace(/\+/g, ' ');
    add = decodeURIComponent(add);
    $('.result-page #add').val(add);
    // tel
    var tel = getUrlVars()["tel"];
    tel = decodeURIComponent(tel);
    $('.result-page #tel').val(tel);
    // email
    var email = getUrlVars()["email"];
    email = decodeURIComponent(email);
    $('.result-page #email').val(email);
    // password
    var password = getUrlVars()["password"];
    password = password.replace('+', ' ');
    $('.result-page #password').val(password);
}
$(function() {
    $('.result-page').ready(function() {
        fill();
    });
});

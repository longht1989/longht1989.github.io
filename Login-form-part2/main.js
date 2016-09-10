/*check valid form */
var isValid = true;
// var validCount = 0;
$('#form-register').on('submit', function() {
    if ($('#name').val().trim() == '') {
        $('#name').next('span').text('Name is empty');
        isValid = false;
    } else {
        $('#name').next('span').text('');
        // validCount++;
    }
    if ($('#birthday').val().trim() == '') {
        $('#birthday').next('span').text('Year is invalid');
        isValid = false;
    } else {
        $('#birthday').next('span').text('');
        // validCount++;
    }
    if ($('#add').val().trim() == '') {
        $('#add').next('span').text('Address is empty');
        isValid = false;
    } else {
        $('#add').next('span').text('');
        // validCount++;
    }
    if ($('#tel').val().trim() == '') {
        $('#tel').next('span').text('Telephone number is empty');
        isValid = false;
    } else {
        $('#tel').next('span').text('');
        // validCount++;
    }
    if ($('#password').val().trim() == '') {
        $('#password').next('span').text('Password is empty');
        isValid = false;
    } else {
        $('#password').next('span').text('');
        // validCount++;
    }
    if ($('#email').val().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/) == null) {
        $('#email').next('span').text('Email is invalid');
        isValid = false;
    } else {
        $('#email').next('span').text('');
        // validCount++;
    }
    // if (validCount >= 6) isValid = true;
    return isValid;
});

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

// var cards = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18'];
var cards = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9'];
var current = null;

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function flip(card) {
    $(card).toggleClass('open');
    $(card).css('pointer-events', 'none');

    if (!current) {
        current = $(card);
    } else {
        if (current.attr('data-name') != $(card).attr('data-name')) {
            // Khác nhau
            setTimeout(function() {
                current.toggleClass('open');
                $(card).toggleClass('open');
                $(card).css('pointer-events', 'auto');
                current.css('pointer-events', 'auto');
                document.getElementById('sound-false').play();
                current = null;
            }, 500)
        } else {
            // giống nhau
            setTimeout(function() {
                current.css('opacity', 0);
                $(card).css('opacity', 0);
                document.getElementById('sound-true').play();
                current = null;
            }, 200)
        }
    }
}

$(function() {
    // Nhân đôi mảng để tạo các cặp bài
    cards = cards.concat(cards);

    // Đảo vị trí các quân bài
    cards = shuffle(cards);

    // Chèn nội dung các quân vào trong element class 'content'
    var html = '';
    for (var i = 0; i < cards.length; i++) {
        html += '<div class="card" data-name="' + cards[i] + '" onclick="flip(this)">' +
            '<div class="back"><img src="images/url.png"/></div>' +
            '<div class="front"><img src="images/' + cards[i] + '.jpg"/></div>' +
            '</div>';
    };
    $('.content .grid').html(html);
})

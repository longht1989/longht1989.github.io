// var cards = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18'];
var cards = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9'];
var current = null;
var count = 0;
var ischeck = false;
var remainingTime = 30;
var isclick = 0;

// Nhân đôi mảng để tạo các cặp bài
cards = cards.concat(cards);

// function shuffle
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

// function start game
function start() {
    $('#start').css('pointer-events', 'none');
    $('.countdown').fadeIn();
    $('.countdown span').html(remainingTime);
    $('.mask').fadeOut();
    document.getElementById('sound-game').load();
    document.getElementById('sound-game').play();
    document.getElementById('sound-game').volume = 0.2;

    $(function() {

        // Đảo vị trí các quân bài
        cards = shuffle(cards);

        // Chèn nội dung các quân vào trong element class 'content grid'
        var html = '';
        for (var i = 0; i < cards.length; i++) {
            html += '<div class="card" data-name="' + cards[i] + '" onclick="flip(this);">' +
                '<div class="back"><img src="images/url.png"/></div>' +
                '<div class="front"><img src="images/' + cards[i] + '.jpg"/></div>' +
                '</div>';
        };
        $('.content .grid').html(html);

    });

    // function countdown
    var run = setInterval(function() {
        if (ischeck) clearInterval(run);
        remainingTime--;
        console.log(remainingTime);
        $('.countdown span').html(remainingTime);
        // Time outerHeight
        if (remainingTime == 0) {
            // end game
            $('.countdown span').html('0');;
            clearInterval(run);
            $('.mask').fadeOut();
            $('.lose-mask').fadeIn();
            document.getElementById('sound-game').pause();
            document.getElementById('sound-lose').play();
        }
    }, 1000);

};

// function flip card
function flip(card) {

    $(card).toggleClass('open');
    $(card).css('pointer-events', 'none');

    if (!current) {
        current = $(card);
    } else {
        $('.card').css('pointer-events', 'none');
        if (current.attr('data-name') != $(card).attr('data-name')) {
            // Khác nhau
            setTimeout(function() {
                current.toggleClass('open');
                $(card).toggleClass('open');
                $(".card").css("pointer-events", "auto")
                current = null;
            }, 500)

            $(card).css('pointer-events', 'auto');
            current.css('pointer-events', 'auto');

            document.getElementById('sound-false').play();
        } else {
            // giống nhau
            setTimeout(function() {
                current.css('opacity', 0);
                $(card).css('opacity', 0);
                current.addClass('hidden');
                $(card).addClass('hidden');
                $(".card").css("pointer-events", "auto");
                document.getElementById('sound-true').play();
                current = null;
                count++;

                // win condition
                if (count == 9) {
                    ischeck = true;
                    $('.mask').fadeOut();
                    $('.win-mask').fadeIn();
                    document.getElementById('sound-game').pause();
                    document.getElementById('sound-win').play();
                    clearInterval();
                }
            }, 200)
        }
    }

}


// function clickcount() {
//     isclick++;

//     if (isclick < 3) {
//         $('.card').css('pointer-events', 'auto');
//     } else {
//         $('.card').css('pointer-events', 'none');
//         isclick = 1;
//     }
// }

// function reload
function reload() {
    $('.grid').html('');
    current = null;
    count = 0;
    ischeck = false;
    remainingTime = 30;
    start();
}

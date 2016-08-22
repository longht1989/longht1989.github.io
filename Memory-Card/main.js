$(".card").click(function() {
    $(this).addClass("open");
});

var array = ['p1.jpg', 'p2.jpg', 'p3.jpg', 'p4.jpg', 'p5.jpg', 'p6.jpg', 'p7.jpg', 'p8.jpg', 'p9.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'p15.jpg', 'p16.jpg', 'p17.jpg', 'p18.jpg', 'p19.jpg', 'p20.jpg'];

var card = $(".card .front");

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

shuffle(array);

for (var i = 0; i < card.length; i++) {
    for (var j = 0; j < array.length; j++) {
        if (i == j) {
            card[i].innerHTML = (' <img src="images/' + array[i] + '" height="92" width="100" alt="">');
        };
    };
};

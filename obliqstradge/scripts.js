function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var forepix = "https://raw.githubusercontent.com/seunghaekim/seunghaekim.github.io/master/obliqstradge/";

var decks = [
    forepix + "obliqstradge.ed1.json",
    forepix + "obliqstradge.ed2.json",
    forepix + "obliqstradge.ed3.json",
    forepix + "obliqstradge.ed4.json",
];

function rand_deck (input) {
    return input[rand(0, input.length)];
}

var deck = rand_deck(decks);

$(document).ready(function(){
    $.getJSON(deck, function(result) {
        console.log(result.deck);
    })
})

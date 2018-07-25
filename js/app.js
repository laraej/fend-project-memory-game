/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function shuffleDeck() {

    // All unique cards.
    var uniques = [
        'fa-anchor',
        'fa-bicycle',
        'fa-bolt',
        'fa-bomb',
        'fa-cube',
        'fa-diamond',
        'fa-leaf',
        'fa-paper-plane-o'
    ];

    // All cards, each unique card twice.
    var cards = uniques.concat(uniques);

    shuffle(cards);

    var ul = document.getElementById("deck");

    // Remove all content from the element.
    ul.innerHTML = '';

    for (var i = 0; i < cards.length; i++) {
        var li = createCard(cards[i]);

        ul.appendChild(li);
    }
}

function createCard(name) {
    var i = document.createElement("i");
    i.setAttribute("class", "fa " + name);

    var li = document.createElement("li");
    li.setAttribute("class", "card match");
    li.appendChild(i);

    return li;
}

// Shuffle deck at start.
window.onload = function() {
    shuffleDeck();

    // Shuffle deck on restart.
    document.getElementById("restart").onclick = function() {
        shuffleDeck();
    };
};

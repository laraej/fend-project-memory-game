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

    // All unique symbols.
    var symbols = [
        'fa-anchor',
        'fa-bicycle',
        'fa-bolt',
        'fa-bomb',
        'fa-cube',
        'fa-diamond',
        'fa-leaf',
        'fa-paper-plane-o'
    ];

    // All cards, each unique symbol twice.
    var cards = symbols.concat(symbols);

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
    li.setAttribute("class", "card");
    li.appendChild(i);

    li.onclick = clickCard;

    return li;
}



function clickCard() {
    hideOpenCards();

    showCard(this);

    openCard(this);

    checkOpenCards();
}

function showCard(card) {
    card.setAttribute("class", "card show open");
}

function hideCard(card) {
    card.setAttribute("class", "card");
}

function markMatchingCard(card) {
    card.setAttribute("class", "card show match");

    // Remove event handler so that the matching card will not handle clicks anymore.
    card.onclick = undefined;
}

function markIncorrectCard(card) {
    card.setAttribute("class", "card show incorrect");
}

var openCards = [];

function openCard(card) {
    openCards.push(card);
}

function clearOpenCards() {
    openCards = [];
}

function hideOpenCards() {
    if (openCards.length === 2) {
        hideCard(openCards[0]);
        hideCard(openCards[1]);

        clearOpenCards();
    }
}

function checkOpenCards() {
    if (openCards.length === 2) {
        if (getSymbol(openCards[0]) === getSymbol(openCards[1])) {

            // If the symbols match, mark both cards as matching.
            markMatchingCard(openCards[0]);
            markMatchingCard(openCards[1]);

            // Clear open cards so that the matching cards won't be hidden on next click.
            clearOpenCards();
        }
        else {
            // If the symbols don't match, mark both cards as incorrect.
            markIncorrectCard(openCards[0]);
            markIncorrectCard(openCards[1]);

            // Don't clear open cards yet so that the incorrect cards will be hidden on next click.
        }
    }
}

// Given a card ("li" element), get the symbol ("fa-" class in the inner "i" element).
function getSymbol(card) {
    var i = card.querySelector("i");

    var classes = i.getAttribute("class").split(" ");

    for (var c of classes)
        if (c.indexOf("fa-") === 0)
            return c;

    // Should never happen.
    return undefined;
}

// Shuffle deck at start.
window.onload = function() {
    shuffleDeck();

    // Shuffle deck and clear game state on restart.
    document.getElementById("restart").onclick = function() {
        shuffleDeck();

        clearOpenCards();
    };
};

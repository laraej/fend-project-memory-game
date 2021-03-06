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

var startedAt = Date.now();

var timerId = undefined;

function startTimer() {
    startedAt = Date.now();

    timerId = window.setInterval(updateTimer, 500);

    updateTimer();
}

function updateTimer() {
    // The times are in milliseconds, so divide by 1000.
    var time = (Date.now() - startedAt) / 1000.0;

    // Show only whole seconds in the result.
    document.getElementById("timer").innerHTML = time.toFixed(0);
}

function stopTimer() {
    if (timerId) {
        window.clearInterval(timerId);

        timerId = undefined;
    }
}

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

var moveCounter = 0;

function clickCard() {
    hideOpenCards();

    showCard(this);

    openCard(this);

    checkOpenCards();

    moveCounter++;

    updateMoveCounter();
}

function clearMoveCounter() {
    moveCounter = 0;

    updateMoveCounter();
}

function updateMoveCounter() {
    var span = document.getElementById("moves");

    span.innerHTML = moveCounter;

    updateStars();
}

function updateStars() {
    var ul = document.getElementById("stars");

    var children = ul.querySelectorAll("li");

    for (var li of children) {
        li.setAttribute("class", "");
    }

    if (moveCounter > 32)
        ul.children[2].setAttribute("class", "lost");

    if (moveCounter > 48)
        ul.children[1].setAttribute("class", "lost");
}

function showCard(card) {
    card.setAttribute("class", "card show open");

    // Remove event handler so that the card will not handle clicks anymore.
    card.onclick = undefined;
}

function hideCard(card) {
    card.setAttribute("class", "card");

    // Add event handler so that the card will again handle clicks.
    card.onclick = clickCard;
}

function markMatchingCard(card) {
    card.setAttribute("class", "card show match");

    matchingCardCount++;

    if (matchingCardCount === 16)
        win();
}

function markIncorrectCard(card) {
    card.setAttribute("class", "card show incorrect");

    // Add event handler so that the card will again handle clicks.
    card.onclick = clickCard;
}

var matchingCardCount = 0;

var openCards = [];

function openCard(card) {
    openCards.push(card);
}

function clearMatchingCardCount() {
    matchingCardCount = 0;
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

function win() {
    stopTimer();
    hideDeck();
    showWin();
}

function hideDeck() {
    document.getElementById("deck").style.display = "none";
}

function showDeck() {
    document.getElementById("deck").style.display = "flex";
}

function hideWin() {
    document.getElementById("win").style.display = "none";
}

function showWin() {
    document.getElementById("win").style.display = "flex";

    var timer = document.getElementById("timer");

    document.getElementById("time").innerHTML = timer.innerHTML;
}

// Shuffle deck at start.
window.onload = function() {
    shuffleDeck();

    clearMoveCounter();
    startTimer();

    // Shuffle deck and clear game state on restart.
    var elements = document.querySelectorAll(".restart");

    for (var element of elements) {
        element.onclick = function() {
            hideWin();
            showDeck();
            shuffleDeck();

            clearMatchingCardCount();
            clearMoveCounter();
            clearOpenCards();
            startTimer();
        }
    };
};

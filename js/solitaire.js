// ==============================
// Global Variables for Game State
// ==============================

let deck = [];
let foundations = { hearts: [], diamonds: [], clubs: [], spades: [] }; // Foundation piles for each suit
let tableau = [[], [], [], [], [], [], []]; // Seven tableau piles for the game

/**
 * Create a shuffled deck of cards with suits and ranks.
 */
function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = []; // Reset the deck array

    // Loop through suits and ranks to generate all the cards
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({ suit, rank, faceUp: false, id: `${rank}_${suit}` }); // Each card has a unique ID
        });
    });

    shuffleDeck(deck); // Shuffle the deck after creation
}

/**
 * Shuffle the deck using the Fisher-Yates algorithm.
 * @param {Array} deck - The deck of cards to shuffle.
 */
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap the cards
    }
}

/**
 * Deal cards into tableau piles, where the last card in each pile is face-up.
 */
function dealCards() {
    tableau = [[], [], [], [], [], [], []]; // Clear tableau piles

    // Deal cards to tableau piles, with increasing number of cards per pile
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j <= i; j++) {
            const card = deck.pop();
            tableau[i].push(card);
            if (j === i) {
                card.faceUp = true; // Only the last card in each pile is face-up
            }
        }
    }
}

/**
 * Render the game board, including tableau and foundation piles.
 */
function renderGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear any previous content on the game board

    // Render tableau piles
    tableau.forEach((pile, index) => {
        const stack = document.createElement('div');
        stack.classList.add('card-stack');
        stack.style.left = `${index * 120}px`; // Spread out tableau piles horizontally
        pile.forEach((card, cardIndex) => {
            const cardElement = createCardElement(card, cardIndex);
            stack.appendChild(cardElement); // Append card to stack
        });
        gameBoard.appendChild(stack); // Add stack to the game board
    });

    // Render foundation piles
    Object.keys(foundations).forEach(suit => {
        const foundationElement = createFoundationElement(suit);
        gameBoard.appendChild(foundationElement); // Add foundation piles
    });
}

/**
 * Create an HTML element for a card and position it.
 * @param {Object} card - The card object (suit, rank, faceUp).
 * @param {number} index - The index of the card within its tableau pile.
 * @returns {HTMLElement} - The card HTML element.
 */
function createCardElement(card, index) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card', card.suit);
    cardElement.setAttribute('id', card.id); // Set unique ID for drag-and-drop functionality

    // Position cards in tableau with slight vertical offset for stacking
    cardElement.style.position = 'absolute';
    cardElement.style.top = `${index * 20}px`;

    // Create and append card image
    const cardImg = document.createElement('img');
    if (card.faceUp) {
        cardImg.src = `images/cards/${card.rank}_${card.suit}.png`; // Path to the card's face image
        cardImg.alt = `${card.rank} of ${card.suit}`;
    } else {
        cardImg.src = 'images/cards/card_back.png'; // Path to the card back image
        cardImg.alt = 'Card back';
    }

    cardElement.appendChild(cardImg); // Append the card image to the card element
    cardElement.draggable = true; // Enable drag functionality for the card

    // Event listener for drag start
    cardElement.addEventListener('dragstart', (e) => dragStart(e, card));

    return cardElement;
}

/**
 * Create an HTML element for a foundation pile.
 * @param {string} suit - The suit of the foundation (hearts, diamonds, clubs, spades).
 * @returns {HTMLElement} - The foundation element.
 */
function createFoundationElement(suit) {
    const foundationElement = document.createElement('div');
    foundationElement.classList.add('foundation');
    foundationElement.setAttribute('data-suit', suit); // Store suit information in the element

    // Event listeners for drag-over and drop actions on the foundation pile
    foundationElement.addEventListener('dragover', allowDrop);
    foundationElement.addEventListener('drop', (e) => dropCard(e, suit));

    return foundationElement;
}

/**
 * Handle the start of dragging a card.
 * @param {Event} e - The drag event.
 * @param {Object} card - The card being dragged.
 */
function dragStart(e, card) {
    e.dataTransfer.setData('card', JSON.stringify(card)); // Store card data in drag event
    e.target.classList.add('dragging'); // Visual cue to show the card is being dragged
}

/**
 * Allow dropping of cards onto foundation piles.
 * @param {Event} e - The drag-over event.
 */
function allowDrop(e) {
    e.preventDefault(); // Prevent default action to allow dropping
}

/**
 * Drop a card onto a foundation pile if the move is valid.
 * @param {Event} e - The drop event.
 * @param {string} suit - The suit of the foundation.
 */
function dropCard(e, suit) {
    const cardData = e.dataTransfer.getData('card');
    const card = JSON.parse(cardData);

    // Check if the card can be placed in the foundation pile
    if (isValidMoveToFoundation(card, suit)) {
        foundations[suit].push(card); // Add the card to the foundation pile
        e.target.appendChild(createCardElement(card)); // Display card in the foundation
        updateTableauAfterMove(card); // Remove the card from tableau
        renderGame(); // Re-render the game to reflect the new state
    }
}

/**
 * Validate if the card can be moved to the foundation pile.
 * @param {Object} card - The card to check.
 * @param {string} suit - The foundation suit.
 * @returns {boolean} - True if the move is valid, false otherwise.
 */
function isValidMoveToFoundation(card, suit) {
    const foundation = foundations[suit];

    if (foundation.length === 0 && card.rank === 'A') {
        return true; // Ace can always be placed in an empty foundation pile
    }

    const topCard = foundation[foundation.length - 1];
    const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    if (topCard && topCard.suit === card.suit && rankOrder.indexOf(card.rank) === rankOrder.indexOf(topCard.rank) + 1) {
        return true; // The card follows the top card of the same suit in the correct order
    }

    return false; // Invalid move
}

/**
 * Update tableau piles after a card is moved to the foundation.
 * @param {Object} card - The card that was moved.
 */
function updateTableauAfterMove(card) {
    tableau.forEach(pile => {
        const index = pile.findIndex(c => c === card);
        if (index !== -1) {
            pile.splice(index, 1); // Remove the card from the tableau pile
        }
    });
}

// Initialize the game when the page loads
window.onload = () => {
    createDeck(); // Create the shuffled deck
    dealCards(); // Deal cards to the tableau
    renderGame(); // Render the game board
};

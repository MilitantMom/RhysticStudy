// Global variables for the game state
let deck = [];
let foundations = { hearts: [], diamonds: [], clubs: [], spades: [] };
let tableau = [[], [], [], [], [], [], []]; // Seven tableau piles

// Create a new deck of cards
function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = [];

    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({ suit, rank, faceUp: false });
        });
    });

    shuffleDeck(deck);
}

// Shuffle the deck using Fisher-Yates algorithm
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
    }
}

// Deal cards to tableau and setup foundations
function dealCards() {
    tableau = [[], [], [], [], [], [], []];
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

// Render the game on the page
function renderGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear previous content

    // Render tableau piles
    tableau.forEach((pile, index) => {
        const stack = document.createElement('div');
        stack.classList.add('card-stack');
        pile.forEach(card => {
            const cardElement = createCardElement(card);
            stack.appendChild(cardElement);
        });
        gameBoard.appendChild(stack);
    });

    // Render foundations (empty for now)
    Object.keys(foundations).forEach(suit => {
        const foundationElement = createFoundationElement(suit);
        gameBoard.appendChild(foundationElement);
    });
}

// Create individual card element
function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card', card.suit);
    if (card.faceUp) {
        cardElement.innerHTML = `${card.rank}<br>${card.suit.charAt(0).toUpperCase()}`;
    } else {
        cardElement.classList.add('card-back');
        cardElement.innerHTML = 'Back';
    }
    cardElement.draggable = true;

    // Allow cards to be dragged
    cardElement.addEventListener('dragstart', (e) => dragStart(e, card));
    return cardElement;
}

// Create foundation element
function createFoundationElement(suit) {
    const foundationElement = document.createElement('div');
    foundationElement.classList.add('foundation');
    foundationElement.setAttribute('data-suit', suit);
    foundationElement.addEventListener('dragover', (e) => allowDrop(e));
    foundationElement.addEventListener('drop', (e) => dropCard(e, suit));
    return foundationElement;
}

// Handle dragging the card
function dragStart(e, card) {
    e.dataTransfer.setData('card', JSON.stringify(card));
}

// Allow dropping a card on a foundation
function allowDrop(e) {
    e.preventDefault(); // Necessary to allow dropping
}

// Drop the card on a foundation
function dropCard(e, suit) {
    const cardData = e.dataTransfer.getData('card');
    const card = JSON.parse(cardData);
    if (isValidMoveToFoundation(card, suit)) {
        foundations[suit].push(card);
        e.target.appendChild(createCardElement(card));
        updateTableauAfterMove(card);
    }
}

// Check if a move to the foundation is valid
function isValidMoveToFoundation(card, suit) {
    const foundation = foundations[suit];
    if (foundation.length === 0 && card.rank === 'A') {
        return true; // Ace is always valid
    }
    const topCard = foundation[foundation.length - 1];
    const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    if (topCard && topCard.suit === card.suit && rankOrder.indexOf(card.rank) === rankOrder.indexOf(topCard.rank) + 1) {
        return true;
    }
    return false;
}

// Update tableau after a card is moved to the foundation
function updateTableauAfterMove(card) {
    tableau.forEach(pile => {
        const index = pile.findIndex(c => c === card);
        if (index !== -1) {
            pile.splice(index, 1); // Remove the card from the tableau
        }
    });
    renderGame();
}

// Initialize the game when the page loads
window.onload = () => {
    createDeck();
    dealCards();
    renderGame();
};

// Global variables for the game state
let deck = [];
let foundations = { hearts: [], diamonds: [], clubs: [], spades: [] };
let tableau = [[], [], [], [], [], [], []]; // Seven tableau piles

/**
 * Creates a new shuffled deck of cards.
 */
function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = [];

    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({ suit, rank, faceUp: false, id: `${rank}_${suit}` });
        });
    });

    shuffleDeck(deck);
}

/**
 * Shuffle the deck using Fisher-Yates algorithm.
 * @param {Array} deck - The deck of cards to shuffle.
 */
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
    }
}

/**
 * Deal cards to tableau and set up foundations.
 */
function dealCards() {
    tableau = [[], [], [], [], [], [], []]; // Clear tableau
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
 * Render the game on the page, including tableau and foundation piles.
 */
function renderGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear previous content

    // Render tableau piles
    tableau.forEach((pile, index) => {
        const stack = document.createElement('div');
        stack.classList.add('card-stack');
        pile.forEach((card, cardIndex) => {
            const cardElement = createCardElement(card, cardIndex);
            stack.appendChild(cardElement);
        });
        gameBoard.appendChild(stack);
    });

    // Render foundations
    Object.keys(foundations).forEach(suit => {
        const foundationElement = createFoundationElement(suit);
        gameBoard.appendChild(foundationElement);
    });
}

/**
 * Create and return an HTML element for a card.
 * @param {Object} card - The card data (suit, rank, faceUp).
 * @param {number} index - The index of the card within its tableau pile.
 * @returns {HTMLElement} - The card element.
 */
function createCardElement(card, index) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card', card.suit);
    cardElement.setAttribute('id', card.id); // Set unique ID for drag and drop

    // Position the cards in the tableau with slight offsets for stacking
    cardElement.style.position = 'absolute';
    cardElement.style.top = `${index * 20}px`;

    // Set the card image based on whether it's face-up or face-down
    const cardImg = document.createElement('img');
    if (card.faceUp) {
        cardImg.src = `images/cards/${card.rank}_${card.suit}.png`; // Path to the card face image
        cardImg.alt = `${card.rank} of ${card.suit}`;
    } else {
        cardImg.src = 'images/cards/card_back.png'; // Path to the card back image
        cardImg.alt = 'Card back';
    }

    cardElement.appendChild(cardImg);
    cardElement.draggable = true;

    // Allow cards to be dragged
    cardElement.addEventListener('dragstart', (e) => dragStart(e, card));
    return cardElement;
}

/**
 * Create and return an HTML element for a foundation pile.
 * @param {string} suit - The suit of the foundation.
 * @returns {HTMLElement} - The foundation element.
 */
function createFoundationElement(suit) {
    const foundationElement = document.createElement('div');
    foundationElement.classList.add('foundation');
    foundationElement.setAttribute('data-suit', suit);
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
    e.dataTransfer.setData('card', JSON.stringify(card)); // Store card data
    e.target.classList.add('dragging'); // Add visual cue for dragging
}

/**
 * Allow dropping of cards.
 * @param {Event} e - The dragover event.
 */
function allowDrop(e) {
    e.preventDefault(); // Necessary to allow dropping
}

/**
 * Drop the card onto a foundation pile and update game state.
 * @param {Event} e - The drop event.
 * @param {string} suit - The suit of the foundation pile.
 */
function dropCard(e, suit) {
    const cardData = e.dataTransfer.getData('card');
    const card = JSON.parse(cardData);
    if (isValidMoveToFoundation(card, suit)) {
        foundations[suit].push(card); // Add card to foundation pile
        e.target.appendChild(createCardElement(card)); // Add card to visual display
        updateTableauAfterMove(card); // Remove card from tableau
        renderGame(); // Re-render the game board
    }
}

/**
 * Check if a card move to the foundation is valid.
 * @param {Object} card - The card to be moved.
 * @param {string} suit - The suit of the foundation pile.
 * @returns {boolean} - True if the move is valid, otherwise false.
 */
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

/**
 * Update the tableau after a card has been moved to the foundation.
 * @param {Object} card - The card that was moved.
 */
function updateTableauAfterMove(card) {
    tableau.forEach(pile => {
        const index = pile.findIndex(c => c === card);
        if (index !== -1) {
            pile.splice(index, 1); // Remove the card from the tableau
        }
    });
}

/**
 * Initialize the game when the page loads.
 */
window.onload = () => {
    createDeck();
    dealCards();
    renderGame();
};

// Add event listeners for all card elements in tableau
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id); // Store the card ID for drag-and-drop
        e.target.classList.add('dragging'); // Add visual cue for dragging
    });

    card.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging'); // Remove the visual cue when drag ends
    });
});

// Allow dropping onto tableau stacks or foundation piles
const allowDrop = (e) => {
    e.preventDefault(); // Allow dropping on target
};

// Handle the drop event on tableau or foundation
const handleDrop = (e) => {
    e.preventDefault();
    const draggedCardId = e.dataTransfer.getData('text');
    const draggedCard = document.getElementById(draggedCardId);
    
    const targetStack = e.target.closest('.card-stack, .foundation');
    
    if (targetStack && draggedCard) {
        targetStack.appendChild(draggedCard); // Move the dragged card to the target stack or foundation
        updateCardState(draggedCard, targetStack); // Update card state if needed
    }
};

// Update card's visual state after being dropped (e.g., face-up/face-down)
function updateCardState(card, targetStack) {
    if (targetStack.classList.contains('foundation')) {
        card.style.backgroundImage = `url("images/cards/${card.id}.png")`; // Update card face image
    }
}

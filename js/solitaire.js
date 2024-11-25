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
            deck.push({ suit, rank, faceUp: false, id: `${rank}_${suit}` });
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
        pile.forEach((card, cardIndex) => {
            const cardElement = createCardElement(card, cardIndex);
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

// Create individual card element with face and back images
function createCardElement(card, index) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.classList.add(card.suit);

    // Position the cards in the tableau with slight offsets for stacking
    cardElement.style.position = 'absolute';
    cardElement.style.top = `${index * 20}px`; // Stack cards with slight vertical offsets

    // If face-up, show card face, otherwise show card back
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

// Check if a move to the foundation is valid (for simplicity)
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
// Get all the card elements and the tableau stacks
const cards = document.querySelectorAll('.card');
const cardStacks = document.querySelectorAll('.card-stack');
const foundationPiles = document.querySelectorAll('.foundation');

// Make the cards draggable
cards.forEach(card => {
    card.setAttribute('draggable', true);
    
    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id); // Store the id of the dragged card
        e.target.classList.add('dragging');  // Add visual cue for dragging
    });

    card.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');  // Remove visual cue when drag ends
    });
});

// Allow dropping onto the tableau stacks or foundation piles
const allowDrop = (e) => {
    e.preventDefault();
};

// Handle the drop event
const handleDrop = (e) => {
    e.preventDefault();
    const draggedCardId = e.dataTransfer.getData('text');
    const draggedCard = document.getElementById(draggedCardId);
    
    const targetStack = e.target.closest('.card-stack, .foundation');
    
    if (targetStack && draggedCard) {
        // Move the dragged card to the target stack or foundation
        targetStack.appendChild(draggedCard);

        // If needed, update the card's state (e.g., face-up/face-down, visibility, etc.)
        updateCardState(draggedCard, targetStack);
    }
};

// Add event listeners for each stack
cardStacks.forEach(stack => {
    stack.addEventListener('dragover', allowDrop);
    stack.addEventListener('drop', handleDrop);
});

foundationPiles.forEach(foundation => {
    foundation.addEventListener('dragover', allowDrop);
    foundation.addEventListener('drop', handleDrop);
});

// Function to update the card's state after being dropped (example)
function updateCardState(card, targetStack) {
    // Logic to update the card's face (e.g., face-up or face-down based on rules)
    // Example: If it's in a foundation pile, it becomes face-up
    if (targetStack.classList.contains('foundation')) {
        card.style.backgroundImage = 'url("images/cards/' + card.id + '.png")'; // Assuming the ID is set correctly
    }
}

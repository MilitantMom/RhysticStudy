document.addEventListener("DOMContentLoaded", () => {
    const solitaireContainer = document.getElementById("solitaire-game");

    // Initialize card deck (example with open-source images)
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const deck = [];

    suits.forEach((suit) => {
        ranks.forEach((rank) => {
            deck.push({
                suit,
                rank,
                image: `https://upload.wikimedia.org/wikipedia/commons/${suit}_${rank}.png`, // Replace with appropriate card images
            });
        });
    });

    // Shuffle function
    const shuffleDeck = (deck) => {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    };

    shuffleDeck(deck);

    // Render tableau (example with 7 piles)
    const renderTableau = () => {
        const tableau = document.createElement("div");
        tableau.classList.add("tableau");

        for (let i = 0; i < 7; i++) {
            const pile = document.createElement("div");
            pile.classList.add("card-placeholder");

            // Place cards in the pile
            const cardsInPile = deck.splice(0, i + 1);
            cardsInPile.forEach((cardData) => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.style.backgroundImage = `url(${cardData.image})`;
                pile.appendChild(card);
            });

            tableau.appendChild(pile);
        }

        solitaireContainer.appendChild(tableau);
    };

    // Initialize game
    const initGame = () => {
        solitaireContainer.innerHTML = ""; // Clear any previous game
        renderTableau();
    };

    initGame();
});

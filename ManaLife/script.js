// Updates the life total for a specific player
function updateLife(playerElement, change) {
    const lifeTotalElement = playerElement.querySelector(".life-total");
    let lifeTotal = parseInt(lifeTotalElement.textContent);
    lifeTotalElement.textContent = lifeTotal + change;
    saveData();  // Save the updated data to localStorage after each change
}

// Attach event listeners for player actions (life increments, life decrements, player removal, and name editing)
function attachEventListeners(player) {
    const incrementButton = player.querySelector(".increment");
    const decrementButton = player.querySelector(".decrement");

    // Increment the player's life by 1
    incrementButton.addEventListener("click", () => {
        updateLife(player, 1);
    });

    // Decrement the player's life by 1
    decrementButton.addEventListener("click", () => {
        updateLife(player, -1);
    });

    // Remove a player from the game when the remove button is clicked
    const removeButton = player.querySelector(".remove-player");
    removeButton.addEventListener("click", () => {
        player.remove();
        saveData();  // Save data after a player is removed
    });

    // Allow editing of a player's name by clicking on their name
    const playerName = player.querySelector("h2");
    playerName.addEventListener("click", () => {
        const newName = prompt("Enter a new name for this player:", playerName.textContent);
        if (newName && newName.trim() !== "") {
            // Ensure the new name does not exceed 12 characters
            if (newName.length <= 12) {
                playerName.textContent = newName;
                saveData();  // Save data after name change
            } else {
                alert("Name must be 12 characters or less.");
            }
        }
    });
}

// Save the current game state (players' names and life totals) to localStorage
function saveData() {
    const gameData = [];
    const players = document.querySelectorAll(".player");  // Get all player elements
    players.forEach(player => {
        const name = player.querySelector("h2").textContent;
        const lifeTotal = parseInt(player.querySelector(".life-total").textContent);
        gameData.push({ name, lifeTotal });
    });
    localStorage.setItem("gameData", JSON.stringify(gameData));  // Store game data as a JSON string
}

// Load game state from localStorage and populate the players' data
function loadData() {
    const gameData = JSON.parse(localStorage.getItem("gameData"));
    if (gameData) {
        gameData.forEach((data, index) => {
            // If a player exists, update their information; otherwise, add a new player
            const playerElements = document.querySelectorAll(".player");
            if (index < playerElements.length) {
                const player = playerElements[index];
                player.querySelector("h2").textContent = data.name;
                player.querySelector(".life-total").textContent = data.lifeTotal;
            } else {
                addNewPlayer(data.name, data.lifeTotal);
            }
        });
    }
}

// Add a new player dynamically to the game (up to a maximum of 6 players)
document.getElementById("add-player-btn").addEventListener("click", () => {
    const players = document.querySelectorAll(".player");  // Get all player elements
    if (players.length < 6) {  // Ensure no more than 6 players are added
        const newPlayerId = players.length + 1;
        addNewPlayer(`Player ${newPlayerId}`, 20);  // Add a new player with a default life total of 20
    }
});

// Function to create and add a new player to the game
function addNewPlayer(name, lifeTotal) {
    const newPlayerElement = document.createElement("div");
    newPlayerElement.classList.add("player");

    // Structure the player's HTML, including their name, life buttons, and remove button
    newPlayerElement.innerHTML = `
      <h2>${name}</h2>
      <div class="life-buttons">
        <button class="decrement">-</button>
        <span class="life-total">${lifeTotal}</span>
        <button class="increment">+</button>
      </div>
      <button class="remove-player">X</button>
    `;

    // Append the new player to the players container
    document.getElementById("players").appendChild(newPlayerElement);

    // Attach event listeners for the new player
    attachEventListeners(newPlayerElement);

    saveData();  // Save the updated data after adding the new player
}

// Reset all players' life totals back to 20
document.getElementById("reset-btn").addEventListener("click", () => {
    const players = document.querySelectorAll(".player");
    players.forEach(player => {
        const lifeTotalElement = player.querySelector(".life-total");
        lifeTotalElement.textContent = 20;  // Reset each player's life total to 20
    });
    saveData();  // Save the updated data after resetting life totals
});

// Load the game state and attach event listeners when the page is loaded
window.addEventListener("load", () => {
    loadData();  // Load saved game data from localStorage

    // Reattach event listeners for all existing players (including those loaded from localStorage)
    const players = document.querySelectorAll(".player");
    players.forEach(player => attachEventListeners(player));
});

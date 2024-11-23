// ball.js

// Ball-related logic
const canvas = document.getElementById('bouncing-ball');
const ctx = canvas.getContext('2d');

// Ball properties
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: 4,
    dy: -4,
    color: '#ff5733'
};

let ballSound = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Sound on click

// Function to draw the ball
function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); // Draw the ball
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Function to update the ball position
function updateBallPosition() {
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx; // Reverse horizontal direction on hit
    }
    if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy; // Reverse vertical direction on hit
    }

    ball.x += ball.dx; // Update x-coordinate
    ball.y += ball.dy; // Update y-coordinate
}

// Click event to bounce the ball
canvas.addEventListener('click', function() {
    ballSound.play(); // Play sound when ball is clicked
    ball.dy = -ball.dy; // Reverse the vertical direction of the ball
    document.querySelector('.hint-text').innerText = "Boom! The ball’s alive!";
});

// Animate the ball
function animateBall() {
    drawBall(); // Draw the ball
    updateBallPosition(); // Update its position
    requestAnimationFrame(animateBall); // Continue the animation
}

// Start the ball animation
animateBall();

// Easter Egg: Secret Message Clickable
let secretMessage = document.querySelector('#secret-text');
let clickCount = 0;

secretMessage.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        secretMessage.innerText = "Congratulations! You've unlocked... nothing. But hey, you clicked 5 times!";
    }
});

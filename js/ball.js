// Ball Bounce Interaction
const canvas = document.getElementById('bouncing-ball');
const ctx = canvas.getContext('2d');

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: 4,
    dy: -4,
    color: '#ff5733'
};

let ballSound = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Sound when the ball is clicked

// Draw ball
function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Update ball position
function updateBallPosition() {
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx; // Bounce horizontally
    }
    if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy; // Bounce vertically
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
}

// Click event to bounce the ball
canvas.addEventListener('click', function() {
    ballSound.play(); // Play sound
    ball.dy = -ball.dy; // Reverse vertical direction for a fun bounce effect
    document.querySelector('.hint-text').innerText = "Boom! The ball’s alive!";
});

// Animate the ball
function animate() {
    drawBall();
    updateBallPosition();
    requestAnimationFrame(animate);
}

animate();

// Easter Egg: Secret Message Clickable
let secretMessage = document.querySelector('#secret-text');
let clickCount = 0;

secretMessage.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        secretMessage.innerText = "Congratulations! You've unlocked... nothing. But hey, you clicked 5 times!";
    }
});

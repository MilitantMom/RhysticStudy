// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade In Animation on Scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);

// Add 'fade-in' class to elements in HTML you want to animate
// Example:
// <div class="fade-in">Content here</div>

// Sticky Navbar on Scroll
const navbar = document.querySelector('.nav-container');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Example: Sticky effect needs the following CSS
/*
.nav-container.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
*/

// Coming Soon Section Button Interaction
const comingSoonButton = document.querySelector('.coming-soon .button');

if (comingSoonButton) {
    comingSoonButton.addEventListener('click', () => {
        alert('This feature is coming soon! Stay tuned 😊');
    });
}

// Expandable Service Cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('expanded');
    });
});

// Example CSS for expanded card:
/*
.service-card.expanded {
    transform: scale(1.05);
    transition: transform 0.3s ease;
}
*/

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-In Animation on Scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && !element.classList.contains('visible')) {
            element.classList.add('visible');
        }
    });
};

// Trigger on scroll
window.addEventListener('scroll', fadeInOnScroll);

// Initial check on page load in case elements are already in view
fadeInOnScroll();

// Sticky Navbar on Scroll
const navbar = document.querySelector('.nav-container');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

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

// Header Section Animation on Scroll
document.addEventListener("DOMContentLoaded", function() {
    const headerSection = document.querySelector('.header-section');

    // Check if header section is in the viewport
    function checkIfInView() {
        const rect = headerSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            headerSection.classList.add('animate');
            // Once the animation is added, remove the scroll event listener
            window.removeEventListener('scroll', checkIfInView);
        }
    }

    // Only run when the page is scrolled
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Run on page load if it's already in view
});

// Ensure text animation starts after page load
window.addEventListener('load', () => {
    const animatedText = document.querySelectorAll('.animated-text');
    
    animatedText.forEach((text, index) => {
        // Delay fade-in and typing animation for each element
        setTimeout(() => {
            text.style.opacity = '1';
            // Trigger typing animation
            text.classList.add('typing');
        }, 2000 + index * 1000); // Add incremental delay for each element
    });

    // Optional: Reset the typing animation after it finishes
    animatedText.forEach(text => {
        text.addEventListener('animationiteration', () => {
            text.style.animation = 'none'; // Stop the current animation
            text.offsetHeight; // Trigger reflow to reset the element
            text.style.animation = ''; // Restart the animation
        });
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
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
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
}

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
        if (!headerSection) return; // Check if element exists
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
            text.style.opacity = '1'; // Make sure opacity is handled by CSS animation
            triggerTypingAnimation(text); // Trigger typing animation
        }, 2000 + index * 1000); // Add incremental delay for each element
    });

    // Typing animation function
    function triggerTypingAnimation(element) {
        const text = element.getAttribute('data-text'); // Store the full text in a data attribute
        if (!text) return; // Ensure there's text to type
        let index = 0;
        element.innerHTML = ''; // Clear any existing content

        // Function to type next character
        function typeNextCharacter() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index); // Add next character to the element
                index++;
                setTimeout(typeNextCharacter, 100); // Adjust typing speed here
            } else {
                element.classList.add('typing-complete'); // Add class when typing is complete
            }
        }

        typeNextCharacter(); // Start typing
    }
});

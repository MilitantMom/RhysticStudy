// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Find the target element using the href attribute of the clicked link.
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth' // Smooth scrolling behavior.
            });
        }
    });
});

// Fade-In Animation on Scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();

        // Check if the element is within the viewport.
        if (rect.top < window.innerHeight - 100 && !element.classList.contains('visible')) {
            element.classList.add('visible');
        }
    });
};

// Attach the fade-in logic to the scroll event.
window.addEventListener('scroll', fadeInOnScroll);

// Run the check immediately on page load to handle elements already in view.
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
document.addEventListener("DOMContentLoaded", function () {
    const headerSection = document.querySelector('.header-section');

    // Function to check if the header section is in the viewport.
    function checkIfInView() {
        if (!headerSection) return; // Exit if the header section is not present.

        const rect = headerSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            headerSection.classList.add('animate');

            // Remove the scroll listener after the animation is triggered.
            window.removeEventListener('scroll', checkIfInView);
        }
    }

    // Attach the scroll event and run the check on page load.
    window.addEventListener('scroll', checkIfInView);
    checkIfInView();
});

// Text Animation After Page Load
window.addEventListener('load', () => {
    const animatedText = document.querySelectorAll('.animated-text');

    animatedText.forEach((text, index) => {
        // Delay the animation for each text element.
        setTimeout(() => {
            text.classList.add('visible'); // Triggers the fade-in effect.
            triggerTypingAnimation(text); // Start the typing animation.
        }, 2000 + index * 1000); // Adjust delay incrementally for each element.
    });

    /**
     * Triggers a typing animation for the given text element.
     * @param {HTMLElement} element - The target element for the animation.
     */
    function triggerTypingAnimation(element) {
        const text = element.getAttribute('data-text'); // Retrieve the full text from the data-text attribute.
        if (!text) return; // Exit if no text is found.

        let index = 0;
        element.innerHTML = ''; // Clear any existing content.

        // Recursive function to type each character sequentially.
        function typeNextCharacter() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index); // Append the next character.
                index++;
                setTimeout(typeNextCharacter, 100); // Adjust typing speed as needed.
            } else {
                element.classList.add('typing-complete'); // Add class when typing completes.
            }
        }

        typeNextCharacter(); // Start the typing process.
    }
});

// Parallax Effect for Background Image
// Applies parallax effect to elements with the 'parallax' class.
const parallaxElements = document.querySelectorAll('.parallax');
if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(parallaxElement => {
            const speed = parallaxElement.dataset.speed || 0.5; // Customizable speed via data attribute.
            const offset = window.scrollY * speed;
            parallaxElement.style.transform = `translateY(${offset}px)`;
        });
    });
}

// Loading Spinner Logic
// Shows the loading spinner until the page content is fully loaded.
const loadingSpinner = document.getElementById('loading');
if (loadingSpinner) {
    window.addEventListener('load', () => {
        loadingSpinner.style.display = 'none'; // Hide spinner after page load.
        document.body.classList.add('loaded'); // Trigger fade-in for the body content.
    });
}

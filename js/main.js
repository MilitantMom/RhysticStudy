document.addEventListener('DOMContentLoaded', function() {
    // Hide the loading spinner once the page content is fully loaded
    const loadingSpinner = document.getElementById('loading');
    if (loadingSpinner) {
        // Add the 'hidden' class to hide the loading spinner after the page has loaded
        loadingSpinner.classList.add('hidden');
    }

    // Implement smooth scrolling for anchor links that reference IDs on the same page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default action of jumping to the anchor
            const target = document.querySelector(this.getAttribute('href')); // Find the target element
            if (target) {
                // Scroll smoothly to the target element
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Fade-In Animation Triggered by Scroll
    // This function will check when elements with the 'fade-in' class come into view and apply the 'visible' class
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect(); // Get element's position relative to the viewport
            // If the element is close enough to the viewport (100px from bottom), add the 'visible' class to trigger fade-in
            if (rect.top < window.innerHeight - 100 && !element.classList.contains('visible')) {
                element.classList.add('visible'); // Trigger the fade-in effect
            }
        });
    };

    // Bind the scroll event to trigger the fade-in effect
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Check immediately on page load for elements in view

    // Sticky Navigation Bar Implementation
    const navbar = document.querySelector('.nav-container');
    if (navbar) {
        // Add 'sticky' class when the page is scrolled more than 50px, and remove it when scrolling up
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('sticky'); // Make navbar stick to the top
            } else {
                navbar.classList.remove('sticky'); // Reset navbar to original position
            }
        });
    }

    // 'Coming Soon' Section Button Interaction (for features that aren't live yet)
    const comingSoonButton = document.querySelector('.coming-soon .button');
    if (comingSoonButton) {
        // Show a message when the "coming soon" button is clicked
        comingSoonButton.addEventListener('click', () => {
            alert('This feature is coming soon! Stay tuned 😊');
        });
    }

    // Header Section Animation on Scroll (when header becomes visible in the viewport)
    const headerSection = document.querySelector('.header-section');
    if (headerSection) {
        const checkIfInView = () => {
            const rect = headerSection.getBoundingClientRect(); // Get position of the header
            // If the header section is in view, apply animation
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                headerSection.classList.add('animate'); // Add the 'animate' class to trigger CSS animation
                window.removeEventListener('scroll', checkIfInView); // Remove event listener after animation is applied
            }
        };
        window.addEventListener('scroll', checkIfInView); // Bind scroll event to check if header is in view
        checkIfInView(); // Check immediately on page load
    }

    // Typewriter Effect for Text Elements (Simulated Typing Animation)
    const animatedText = document.querySelectorAll('.animated-text');
    animatedText.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('visible'); // Make the text element visible
            triggerTypingAnimation(text); // Start typing animation after the delay
        }, 2000 + index * 1000); // Stagger the animations for each text element
    });

    // Function to trigger the typewriter typing animation on the specified element
    function triggerTypingAnimation(element) {
        const text = element.getAttribute('data-text'); // Get the text to be typed from the 'data-text' attribute
        if (!text) return; // If no text is provided, exit the function

        let index = 0;
        element.innerHTML = ''; // Clear any existing content in the element

        function typeNextCharacter() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index); // Append the next character to the element
                index++;
                setTimeout(typeNextCharacter, 100); // Continue typing with a 100ms delay between characters
            } else {
                element.classList.add('typing-complete'); // Add 'typing-complete' class once typing is finished
            }
        }

        typeNextCharacter(); // Start the typing animation
    }

    // Parallax Effect for Background Images (creates a smooth scroll effect for elements with 'parallax' class)
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
        // Add scroll event listener to create the parallax effect
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(parallaxElement => {
                const speed = parallaxElement.dataset.speed || 0.5; // Get speed for parallax from 'data-speed' attribute, default to 0.5
                const offset = window.scrollY * speed; // Calculate the offset based on scroll position and speed
                parallaxElement.style.transform = `translateY(${offset}px)`; // Apply the translation to the background
            });
        });
    }

    // Back to Top Button (smooth scrolls to the top of the page when clicked)
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default anchor behavior
            console.log('Back to top button clicked'); // Debugging log
            // Scroll to the top of the page smoothly
            document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});

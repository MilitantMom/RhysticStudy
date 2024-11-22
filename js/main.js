document.addEventListener("DOMContentLoaded", function() {
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
            if (rect.top < window.innerHeight - 100 && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Run the check immediately on page load.

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
    const headerSection = document.querySelector('.header-section');
    if (headerSection) {
        const checkIfInView = () => {
            const rect = headerSection.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                headerSection.classList.add('animate');
                window.removeEventListener('scroll', checkIfInView); // Stop checking once the animation is triggered
            }
        };
        window.addEventListener('scroll', checkIfInView);
        checkIfInView(); // Check if it's in view immediately on page load.
    }

    // Text Animation After Page Load
    const animatedText = document.querySelectorAll('.animated-text');
    animatedText.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('visible'); // Triggers fade-in effect.
            triggerTypingAnimation(text);
        }, 2000 + index * 1000);
    });

    function triggerTypingAnimation(element) {
        const text = element.getAttribute('data-text');
        if (!text) return;

        let index = 0;
        element.innerHTML = ''; // Clear any existing content.
        function typeNextCharacter() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeNextCharacter, 100);
            } else {
                element.classList.add('typing-complete');
            }
        }
        typeNextCharacter(); // Start typing animation.
    }

    // Parallax Effect for Background Image
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
});

// Ensure the page is loaded and then hide loading spinner
window.addEventListener('load', () => {
    const loadingSpinner = document.getElementById('loading');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none'; // Hide the spinner after load.
        document.body.classList.add('loaded'); // Optionally trigger any other animations you may want.
    }
});

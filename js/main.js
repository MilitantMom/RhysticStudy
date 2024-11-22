document.addEventListener('DOMContentLoaded', function() {
    const loadingSpinner = document.getElementById('loading');
    if (loadingSpinner) {
        // Hide the spinner once the content is ready to display
        loadingSpinner.classList.add('hidden'); // Add 'hidden' class to hide spinner
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
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

    // Header Section Animation on Scroll
    const headerSection = document.querySelector('.header-section');
    if (headerSection) {
        const checkIfInView = () => {
            const rect = headerSection.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                headerSection.classList.add('animate');
                window.removeEventListener('scroll', checkIfInView);
            }
        };
        window.addEventListener('scroll', checkIfInView);
        checkIfInView();
    }

    // Text Animation After Page Load
    const animatedText = document.querySelectorAll('.animated-text');
    animatedText.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('visible');
            triggerTypingAnimation(text);
        }, 2000 + index * 1000);
    });

    function triggerTypingAnimation(element) {
        const text = element.getAttribute('data-text');
        if (!text) return;

        let index = 0;
        element.innerHTML = '';
        function typeNextCharacter() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeNextCharacter, 100);
            } else {
                element.classList.add('typing-complete');
            }
        }
        typeNextCharacter();
    }

    // Parallax Effect for Background Image
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(parallaxElement => {
                const speed = parallaxElement.dataset.speed || 0.5;
                const offset = window.scrollY * speed;
                parallaxElement.style.transform = `translateY(${offset}px)`;
            });
        });
    }
});

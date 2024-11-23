document.addEventListener('DOMContentLoaded', function() {
    // Hide the loading spinner once the page content is fully loaded
    const loadingSpinner = document.getElementById('loading');
    if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
    }

    // Dynamically load the header and footer from separate HTML files
    function loadHTML(url, containerId) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const container = document.getElementById(containerId);
                container.innerHTML = data;
                container.classList.add('loaded'); // Add 'loaded' class to trigger visibility

                // After the header is loaded, highlight the active navigation link
                if (containerId === 'header-container') {
                    highlightActiveNavLink();
                }
            })
            .catch(error => console.error('Error loading HTML:', error));
    }

    // Load header and footer dynamically
    loadHTML('/components/header.html', 'header-container');
    loadHTML('/components/footer.html', 'footer-container');

    // Function to highlight the active navigation link
    function highlightActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        let currentPage = window.location.pathname.split('/').pop(); // Get the current page file name (e.g., "index.html")

        // Treat root URL ("/") as equivalent to "index.html"
        if (!currentPage || currentPage === '/') {
            currentPage = 'index.html';
        }

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop(); // Get the file name from the link href

            // Compare the current page with the link's href (file name only)
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Implement smooth scrolling for anchor links that reference IDs on the same page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default action of jumping to the anchor
            const target = document.querySelector(this.getAttribute('href')); // Find the target element
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Fade-In Animation Triggered by Scroll
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
    fadeInOnScroll(); // Check immediately on page load for elements in view

    // 'Coming Soon' Section Button Interaction
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
        checkIfInView(); // Check immediately on page load
    }

    // Typewriter Effect for Text Elements
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

    // Parallax Effect for Background Images
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

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Sticky Navbar Logic
    const nav = document.querySelector('.nav-container');
    if (nav) {
        const stickyPosition = nav.offsetTop;

        // Function to handle sticky nav
        function handleStickyNav() {
            if (window.pageYOffset > stickyPosition) {
                nav.classList.add("sticky");
            } else {
                nav.classList.remove("sticky");
            }
        }

        window.addEventListener('scroll', handleStickyNav);
        handleStickyNav(); // Check if the navbar should be sticky on page load
    }
});

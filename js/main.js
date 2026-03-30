document.addEventListener('DOMContentLoaded', function() {
    // =============================
    // Hide loading spinner
    // =============================
    const loadingSpinner = document.getElementById('loading');
    if (loadingSpinner) loadingSpinner.classList.add('hidden');

    // =============================
    // Dynamic Header & Footer Loading
    // =============================
    function loadHTML(url, containerId) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const container = document.getElementById(containerId);
                container.innerHTML = data;
                container.classList.add('loaded');
                if (containerId === 'header-container') highlightActiveNavLink();
            })
            .catch(error => console.error('Error loading HTML:', error));
    }

    loadHTML('/components/header.html', 'header-container');
    loadHTML('/components/footer.html', 'footer-container');

    // =============================
    // Active Navigation Link Highlight
    // =============================
    function highlightActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        let currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            link.classList.toggle('active', linkPage === currentPage);
        });
    }

    // =============================
    // Smooth Scroll for Anchors
    // =============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // =============================
    // Fade-In Elements on Scroll
    // =============================
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeInOnScroll = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight - 100) el.classList.add('visible');
        });
    };
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll();

    // =============================
    // Coming Soon Button
    // =============================
    const comingSoonButton = document.querySelector('.coming-soon .button');
    if(comingSoonButton) comingSoonButton.addEventListener('click', () => {
        alert('This feature is coming soon! Stay tuned 😊');
    });

    // =============================
    // Header Animation on Scroll
    // =============================
    const headerSection = document.querySelector('.header-section');
    if(headerSection) {
        const checkIfInView = () => {
            const rect = headerSection.getBoundingClientRect();
            if(rect.top <= window.innerHeight && rect.bottom >= 0) {
                headerSection.classList.add('animate');
                window.removeEventListener('scroll', checkIfInView);
            }
        };
        window.addEventListener('scroll', checkIfInView);
        checkIfInView();
    }

    // =============================
    // Typewriter Animation
    // =============================
    const animatedText = document.querySelectorAll('.animated-text');
    animatedText.forEach((text, i) => {
        setTimeout(() => {
            text.classList.add('visible');
            triggerTypingAnimation(text);
        }, 2000 + i * 1000);
    });

    function triggerTypingAnimation(element) {
        const text = element.getAttribute('data-text');
        if(!text) return;
        let index = 0;
        element.innerHTML = '';
        function typeNextCharacter() {
            if(index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeNextCharacter, 100);
            } else element.classList.add('typing-complete');
        }
        typeNextCharacter();
    }

    // =============================
    // Parallax Background
    // =============================
    const parallaxElements = document.querySelectorAll('.parallax');
    if(parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                const offset = window.scrollY * speed;
                el.style.transform = `translateY(${offset}px)`;
            });
        });
    }

    // =============================
    // Back to Top Button
    // =============================
    const backToTopButton = document.querySelector('.back-to-top');
    if(backToTopButton) backToTopButton.addEventListener('click', e => {
        e.preventDefault();
        document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // =============================
    // Sticky Navbar
    // =============================
    const nav = document.querySelector('.nav-container');
    if(nav) {
        const stickyPosition = nav.offsetTop;
        function handleStickyNav() {
            nav.classList.toggle('sticky', window.pageYOffset > stickyPosition);
        }
        window.addEventListener('scroll', handleStickyNav);
        handleStickyNav();
    }

    // =============================
    // Hero Canvas Animation: Floating Books + Magical Dust
    // =============================
    const canvas = document.getElementById('hero-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        const books = [];
        const dust = [];
        const bookImages = [];
        const bookSources = ['images/book1.png','images/book2.png','images/book3.png'];

        // Load Images
        bookSources.forEach(src => {
            const img = new Image();
            img.src = src;
            bookImages.push(img);
        });

        function resizeCanvas() {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Book {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * -height;
                this.size = 40 + Math.random() * 60;
                this.speed = 0.5 + Math.random() * 1.5;
                this.angle = Math.random() * Math.PI * 2;
                this.angularSpeed = (Math.random() - 0.5) * 0.02;
                this.image = bookImages[Math.floor(Math.random() * bookImages.length)];
                this.depth = Math.random() * 1.5 + 0.5;
            }
            update() {
                this.y += this.speed * this.depth;
                this.angle += this.angularSpeed;
                if(this.y > height + this.size) this.reset();
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.shadowColor = 'rgba(255, 200, 255, 0.3)';
                ctx.shadowBlur = 15;
                ctx.drawImage(this.image, -this.size/2, -this.size/2, this.size, this.size);
                ctx.restore();
            }
        }

        class Dust {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = 1 + Math.random() * 3;
                this.speed = 0.1 + Math.random() * 0.3;
                this.opacity = 0.05 + Math.random() * 0.2;
            }
            update() { this.y -= this.speed; if(this.y < 0) this.reset(); }
            draw() { ctx.fillStyle = `rgba(255,255,255,${this.opacity})`; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); }
        }

        for(let i=0;i<20;i++) books.push(new Book());
        for(let i=0;i<150;i++) dust.push(new Dust());

        function animateHero() {
            ctx.clearRect(0,0,width,height);
            dust.forEach(d => { d.update(); d.draw(); });
            books.forEach(b => { b.update(); b.draw(); });
            requestAnimationFrame(animateHero);
        }

        let loadedImages = 0;
        bookImages.forEach(img => img.onload = () => {
            loadedImages++;
            if(loadedImages === bookImages.length) animateHero();
        });
    }
});

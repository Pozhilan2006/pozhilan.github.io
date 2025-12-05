// ===================================
// Smooth Scroll Navigation
// ===================================

document.addEventListener('DOMContentLoaded', function () {

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                navMenu.classList.remove('active');
            }
        });
    });

    // ===================================
    // Mobile Menu Toggle
    // ===================================

    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // ===================================
    // Navbar Scroll Effect
    // ===================================

    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===================================
    // Typing Effect for Hero Subtitle - DISABLED
    // ===================================

    /*
    const typingText = document.getElementById('typingText');
    const phrases = [
        'AI/ML Developer',
        'Full-Stack Engineer',
        'Blockchain Enthusiast',
        'Problem Solver',
        'Hackathon Finalist'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing effect
    typeEffect();
    */

    // ===================================
    // Scroll Reveal Animations
    // ===================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const revealElements = document.querySelectorAll('.glass-card, .section-header, .hero-content, .about-text, .info-card');

    revealElements.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });

    // ===================================
    // Stagger Animation for Timeline Items
    // ===================================

    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        item.classList.add('stagger-item');
        observer.observe(item);
    });

    // ===================================
    // Project Cards Hover Effect
    // ===================================

    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===================================
    // Contact Form Handling
    // ===================================

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (name && email && subject && message) {
                // Create mailto link
                const mailtoLink = `mailto:pozhilan46@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

                // Open email client
                window.location.href = mailtoLink;

                // Show success message
                alert('Thank you for your message! Your email client will open to send the message.');

                // Reset form
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // ===================================
    // Active Navigation Link
    // ===================================

    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===================================
    // Skill Tags Animation
    // ===================================

    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
        tag.classList.add('fade-in');
    });

    // ===================================
    // Stats Counter Animation
    // ===================================

    const statNumbers = document.querySelectorAll('.stat-content h4');

    const animateCounter = (element) => {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ===================================
    // Parallax Effect for Hero Background
    // ===================================

    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        window.addEventListener('scroll', function () {
            const scrolled = window.scrollY;
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // ===================================
    // Smooth Page Load Animation
    // ===================================

    window.addEventListener('load', function () {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // ===================================
    // Scroll to Top on Page Load
    // ===================================

    window.addEventListener('beforeunload', function () {
        window.scrollTo(0, 0);
    });

    // ===================================
    // Add Hover Effect to Social Links
    // ===================================

    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });

    // ===================================
    // Dynamic Year in Footer
    // ===================================

    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }

    // ===================================
    // Prevent Default for Empty Links
    // ===================================

    const emptyLinks = document.querySelectorAll('a[href="#"]');

    emptyLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
        });
    });

    // ===================================
    // Add Loading State to Buttons
    // ===================================

    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });

    // ===================================
    // Console Welcome Message
    // ===================================

    console.log('%c👋 Welcome to Pozhilan A\'s Portfolio!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'color: #9333ea; font-size: 14px;');
    console.log('%cInterested in collaboration? Reach out at pozhilan46@gmail.com', 'color: #b4b4b4; font-size: 12px;');

});

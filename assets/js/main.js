// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.documentElement.setAttribute('data-theme', 
            document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        
        this.innerHTML = document.documentElement.getAttribute('data-theme') === 'dark' ? 
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    
    // Initialize particles background
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6a3093" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#6a3093", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
    
    // Parallax effect for hero image
    const parallaxImage = document.querySelector('.parallax');
    if (parallaxImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            parallaxImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        });
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<div class="loading-spinner"></div>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Subscribed!';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    newsletterForm.reset();
                }, 2000);
            }, 1000);
        });
    }
});

// Mobile Menu Functionality
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileNav = document.querySelector('.mobile-nav');
const mobileCloseBtn = document.querySelector('.mobile-close-btn');

menuToggle.addEventListener('click', function() {
    mobileMenuOverlay.classList.add('active');
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
});

mobileCloseBtn.addEventListener('click', function() {
    closeMobileMenu();
});

mobileMenuOverlay.addEventListener('click', function() {
    closeMobileMenu();
});

function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', function() {
        closeMobileMenu();
    });
});

// Touch device detection
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
}

// Adjust animations for mobile
if (isTouchDevice()) {
    // Reduce particle count on mobile
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 40 }, // Reduced from 80
                // Rest of config remains same
            }
        });
    }
    
    // Disable parallax on mobile
    const parallaxImage = document.querySelector('.parallax');
    if (parallaxImage) {
        parallaxImage.style.transform = 'none';
    }
}

// Mobile-specific smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (window.innerWidth <= 767) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    });
});
// Collections Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.collections-carousel');
    if (!carousel) return;

    const track = document.querySelector('.collections-track');
    const cards = document.querySelectorAll('.collection-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let cardWidth = cards[0].offsetWidth + 30; // card width + gap
    let currentPosition = 0;
    let visibleCards = 3;
    let totalCards = cards.length;
    
    // Create dots
    function createDots() {
        const dotCount = Math.ceil(totalCards / visibleCards);
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Update dots
    function updateDots() {
        const dots = document.querySelectorAll('.carousel-dot');
        const activeDotIndex = Math.abs(currentPosition) / (cardWidth * visibleCards);
        
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === activeDotIndex) {
                dot.classList.add('active');
            }
        });
    }
    
    // Move carousel
    function moveCarousel() {
        track.style.transform = `translateX(${currentPosition}px)`;
        updateDots();
        
        // Disable/enable buttons based on position
        prevBtn.disabled = currentPosition === 0;
        nextBtn.disabled = currentPosition <= -(totalCards - visibleCards) * cardWidth;
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentPosition = -slideIndex * visibleCards * cardWidth;
        moveCarousel();
    }
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        if (currentPosition > -(totalCards - visibleCards) * cardWidth) {
            currentPosition -= cardWidth * visibleCards;
            moveCarousel();
        }
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        if (currentPosition < 0) {
            currentPosition += cardWidth * visibleCards;
            moveCarousel();
        }
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next
            if (currentPosition > -(totalCards - visibleCards) * cardWidth) {
                currentPosition -= cardWidth * visibleCards;
                moveCarousel();
            }
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous
            if (currentPosition < 0) {
                currentPosition += cardWidth * visibleCards;
                moveCarousel();
            }
        }
    }
    
    // Quick view button
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.collection-card').querySelector('h3').textContent;
            alert(`Quick view for ${productName} will be implemented later!`);
        });
    });
    
    // Wishlist button
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });
    
    // Initialize
    function initCarousel() {
        // Calculate visible cards based on screen size
        if (window.innerWidth <= 1024 && window.innerWidth > 768) {
            visibleCards = 2;
        } else if (window.innerWidth <= 768) {
            visibleCards = 1;
        } else {
            visibleCards = 3;
        }
        
        cardWidth = cards[0].offsetWidth + 30;
        createDots();
    }
    
    // Recalculate on resize
    window.addEventListener('resize', function() {
        initCarousel();
        moveCarousel();
    });
    
    // Initial setup
    initCarousel();
});

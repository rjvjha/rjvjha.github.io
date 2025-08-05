// Modern JavaScript for Personal Website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupNavigation();
    setupScrollAnimations();
    setupTypingEffect();
    setupContactForm();
    setupScrollIndicator();
    setupMobileMenu();
    setupSmoothScrolling();
}

// Navigation functionality
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
    
    // Active navigation link
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for different elements
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
                
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillCategory(entry.target);
                }
                
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
                
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .timeline-item,
        .skill-category,
        .project-card,
        .blog-card,
        .about-text,
        .about-image,
        .stat
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Timeline item animation
function animateTimelineItem(item) {
    const delay = Array.from(item.parentNode.children).indexOf(item) * 200;
    setTimeout(() => {
        item.style.transform = 'translateY(0)';
        item.style.opacity = '1';
    }, delay);
}

// Skill category animation
function animateSkillCategory(category) {
    const skills = category.querySelectorAll('.skill-item');
    skills.forEach((skill, index) => {
        setTimeout(() => {
            skill.style.transform = 'translateX(0)';
            skill.style.opacity = '1';
        }, index * 100);
    });
}

// Project card animation
function animateProjectCard(card) {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.opacity = '1';
}

// Counter animation
function animateCounter(stat) {
    const numberElement = stat.querySelector('.stat-number');
    const finalNumber = numberElement.textContent;
    const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
    const suffix = finalNumber.replace(/\d/g, '');
    
    let currentNumber = 0;
    const increment = numericValue / 50;
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= numericValue) {
            currentNumber = numericValue;
            clearInterval(timer);
        }
        numberElement.textContent = Math.floor(currentNumber) + suffix;
    }, 30);
}

// Typing effect for hero section
function setupTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let index = 0;
    const typeWriter = () => {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after page load
    setTimeout(typeWriter, 1000);
}

// Contact form functionality
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            form.reset();
            
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
    
    // Form validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidation);
    });
}

// Field validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing validation
    clearValidation(e);
    
    let isValid = true;
    let message = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        message = 'Please enter a valid email address';
    }
    
    if (!isValid) {
        showFieldError(field, message);
    }
}

// Clear field validation
function clearValidation(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ff5f57;
        font-size: 14px;
        margin-top: 5px;
        animation: slideInUp 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorElement);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const styles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    };
    
    const colors = {
        success: '#28ca42',
        error: '#ff5f57',
        info: '#00d4ff'
    };
    
    Object.assign(notification.style, styles);
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Scroll indicator
function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
    
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effect for hero section
function setupParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Cursor trail effect (optional enhancement)
function setupCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX, y = mouseY;
        
        trail.forEach((dot, index) => {
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            
            const nextDot = trail[index + 1] || trail[0];
            x += (nextDot.offsetLeft - x) * 0.3;
            y += (nextDot.offsetTop - y) * 0.3;
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Performance optimization
function optimizePerformance() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) originalScrollHandler();
        }, 16); // ~60fps
    };
}

// Initialize performance optimizations
optimizePerformance();

// Add CSS for mobile menu
const mobileMenuCSS = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 50px;
            transition: left 0.3s ease;
            border-top: 1px solid var(--border-color);
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 20px 0;
        }
        
        .nav-link {
            font-size: 18px;
            padding: 10px 20px;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        .field-error {
            animation: slideInUp 0.3s ease;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
`;

// Inject mobile menu CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuCSS;
document.head.appendChild(styleSheet);

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        showNotification('🎉 Easter egg found! You are awesome!', 'success');
        // Add some fun visual effect
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// Add rainbow animation CSS
const rainbowCSS = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;

const rainbowStyleSheet = document.createElement('style');
rainbowStyleSheet.textContent = rainbowCSS;
document.head.appendChild(rainbowStyleSheet);

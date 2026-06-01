// DOM Elements
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const yearElement = document.getElementById('year');

// Update copyright year
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Mobile Navigation Toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', { passive: true }, () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(13, 17, 23, 0.95)';
        nav.style.backdropFilter = 'blur(20px)';
    } else {
        nav.style.background = 'rgba(13, 17, 23, 0.9)';
    }
    
    lastScroll = currentScroll;
});

// Typing Animation
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const text = typingText.getAttribute('data-text');
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = text.substring(0, charIndex);
        typingText.textContent = currentText;
        
        if (!isDeleting && charIndex < text.length) {
            charIndex++;
            setTimeout(type, 50);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 30);
        } else if (!isDeleting && charIndex === text.length) {
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 3000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            setTimeout(type, 500);
        }
    }
    
    // Start typing after initial delay
    setTimeout(type, 1000);
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    document.querySelectorAll('.project-card, .service-card, .review-card, .about-card, .booking-step').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = nav.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link on scroll
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', { passive: true }, setActiveNavLink);

// Contact Form Handler
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        if (btnText) btnText.hidden = true;
        if (btnLoading) btnLoading.hidden = false;
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Form validation
        const errors = [];
        if (!data.name?.trim()) errors.push('Name is required');
        if (!data.email?.trim()) errors.push('Email is required');
        if (!data.message?.trim()) errors.push('Message is required');
        if (data.email && !isValidEmail(data.email)) errors.push('Please enter a valid email');
        
        if (errors.length > 0) {
            showFormMessage(errors.join(', '), 'error');
            resetSubmitButton(submitBtn, btnText, btnLoading);
            return;
        }
        
        try {
            // Create mailto link with form data
            const subject = encodeURIComponent(`Contact Form: ${data.subject || 'General Inquiry'}`);
            const body = encodeURIComponent(
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n` +
                `Subject: ${data.subject || 'General Inquiry'}\n\n` +
                `Message:\n${data.message}`
            );
            
            // Open email client
            window.location.href = `mailto:cmdredltd@gmail.com?subject=${subject}&body=${body}`;
            
            showFormMessage('Opening your email client...', 'success');
            contactForm.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('Something went wrong. Please try again or email directly.', 'error');
        } finally {
            resetSubmitButton(submitBtn, btnText, btnLoading);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

function resetSubmitButton(btn, textEl, loadingEl) {
    if (textEl) textEl.hidden = false;
    if (loadingEl) loadingEl.hidden = true;
    btn.disabled = false;
}

// Animate expertise bars on scroll
function initExpertiseBars() {
    const expertiseSection = document.querySelector('.about-expertise');
    if (!expertiseSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.expertise-fill').forEach(bar => {
                    const width = bar.style.getPropertyValue('--width');
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(expertiseSection);
}

// Add CSS animations for scroll reveal
function addScrollRevealStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .project-card,
        .service-card,
        .review-card,
        .about-card,
        .booking-step {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .project-card.animate-in,
        .service-card.animate-in,
        .review-card.animate-in,
        .about-card.animate-in,
        .booking-step.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stat-value {
            opacity: 0;
            transform: translateY(10px);
        }
        
        .stat-value.animate-in {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `;
    document.head.appendChild(style);
}

// Animate stat numbers
function animateStatNumbers() {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach(stat => {
        const originalText = stat.textContent;
        const isStars = originalText.includes('⭐');
        const hasPlus = originalText.includes('+');
        
        // Extract number
        const numMatch = originalText.match(/(\d+)/);
        if (!numMatch) return;
        
        const targetNum = parseInt(numMatch[1], 10);
        let currentNum = 0;
        const duration = 1500;
        const stepTime = duration / (targetNum || 1);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timer = setInterval(() => {
                        currentNum++;
                        let displayText = currentNum.toString();
                        if (hasPlus && currentNum === targetNum) displayText += '+';
                        if (isStars) displayText = '⭐ ' + displayText;
                        
                        stat.textContent = displayText;
                        
                        if (currentNum >= targetNum) {
                            stat.textContent = originalText;
                            clearInterval(timer);
                        }
                    }, Math.max(stepTime, 20));
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Copy to clipboard utility
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Escape to close mobile menu
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addScrollRevealStyles();
    initTypingAnimation();
    initScrollAnimations();
    initExpertiseBars();
    animateStatNumbers();
    
    // Add console greeting
    console.log('%c whoami ', 'background: linear-gradient(135deg, #ff4d4d, #ff6b6b); color: white; padding: 10px 20px; border-radius: 5px; font-size: 20px; font-weight: bold;');
    console.log('%c Linux training by Stefan — cmdRed Ltd ', 'color: #ff4d4d; font-size: 14px;');
    console.log('%c https://github.com/stefan-hacks ', 'color: #58a6ff;');
});

// Handle Calendly events if embedded
window.addEventListener('message', function(e) {
    if (isCalendlyEvent(e)) {
        if (e.data.event === 'calendly.event_scheduled') {
            console.log('Meeting scheduled!', e.data);
        }
    }
});

function isCalendlyEvent(e) {
    return e.data.event && e.data.event.indexOf('calendly.') === 0;
}

// Preload critical resources
function preloadResources() {
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalFonts.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Expose utility functions globally
window.whoami = {
    copyToClipboard,
    showFormMessage,
    version: '1.0.0'
};

// Reviews Carousel Navigation
function initReviewsCarousel() {
    const track = document.querySelector('.reviews-track');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const cardWidth = track.querySelector('.review-card').offsetWidth + 24; // card width + gap
    
    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
    
    // Touch swipe support
    let isDown = false;
    let startX;
    let scrollLeft;
    
    track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.style.cursor = 'grabbing';
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });
    
    track.addEventListener('mouseleave', () => {
        isDown = false;
        track.style.cursor = 'grab';
    });
    
    track.addEventListener('mouseup', () => {
        isDown = false;
        track.style.cursor = 'grab';
    });
    
    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
    });
    
    track.style.cursor = 'grab';
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initReviewsCarousel);
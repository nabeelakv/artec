// Initialize Lenis for buttery smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Custom Cursor Implementation
const cursor = document.querySelector('.cursor');

if(cursor) {
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    if(!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const links = document.querySelectorAll('a, button, .service-card, .btn-primary, .btn-outline');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            link.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
        
        document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
        document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
    } else {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
        document.querySelectorAll('a, button').forEach(el => el.style.cursor = 'pointer');
    }
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if(hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link, .btn-primary').forEach(n => {
        n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Intersection Observer for repeating Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger slightly before it comes into view
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // Remove class so the stunning animation repeats when scrolling back up or down
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Target all regular slide-up triggers
document.querySelectorAll('.slide-up-trigger').forEach(el => observer.observe(el));

// For stagger groups, observe the group container itself
const staggerGroups = document.querySelectorAll('.services-grid');
staggerGroups.forEach(group => observer.observe(group));

// Parallax for Hero Background Accent
const heroBg = document.querySelector('.hero-bg-accent');
window.addEventListener('scroll', () => {
    if(heroBg) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.4}px) rotate(${window.scrollY * 0.05}deg)`;
    }
});

// Clone items for seamless infinite marquee
document.addEventListener('DOMContentLoaded', () => {
    const marqueeContent = document.querySelector('.marquee-content');
    if(marqueeContent) {
        const marqueeClone = marqueeContent.innerHTML;
        marqueeContent.innerHTML += marqueeClone;
    }
});

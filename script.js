// ==========================================
// Scroll Animations with Intersection Observer
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade-in animation to elements with fade-in-up class
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in-up elements on page load
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
        // Reset animation state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });

    // Also observe section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        observer.observe(title);
    });
});

// ==========================================
// Navigation Bar Active Link Highlighting
// ==========================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (entry.isIntersecting) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current section link
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-50% 0% -50% 0%'
});

sections.forEach(section => {
    navObserver.observe(section);
});

// ==========================================
// Smooth Scroll for Navigation Links
// ==========================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking
                closeMobileMenu();
            }
        }
    });
});

// ==========================================
// Mobile Menu Toggle
// ==========================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';

    if (mobileMenu.classList.contains('active')) {
        mobileMenu.style.maxHeight = '500px';
    } else {
        mobileMenu.style.maxHeight = '0';
    }
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenu.style.maxHeight = '0';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        closeMobileMenu();
    }
});

// ==========================================
// Navbar Background on Scroll
// ==========================================

const nav = document.querySelector('nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

// ==========================================
// Scroll-to-Top Button (Optional)
// ==========================================

window.addEventListener('scroll', () => {
    // Add any additional scroll-based effects here
});

// ==========================================
// Prevent Layout Shift on Scroll
// ==========================================

// Ensure body doesn't shift when scrollbar appears/disappears
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');

// ==========================================
// Handle Window Resize
// ==========================================

window.addEventListener('resize', () => {
    // Close mobile menu on window resize to desktop
    if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ==========================================
// Animation Reset on Page Load
// ==========================================

window.addEventListener('load', () => {
    // Trigger animation on load
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach((element, index) => {
        // Stagger animations
        setTimeout(() => {
            element.style.animationDelay = `${index * 0.1}s`;
        }, 0);
    });
});

// ==========================================
// Keyboard Navigation Support
// ==========================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        closeMobileMenu();
    }

    // Tab navigation support (built-in)
});

// ==========================================
// Performance: Lazy Loading Optimization
// ==========================================

// Modern browsers support native lazy loading
// Images will load when they come into view
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// Utility: Get Current Section
// ==========================================

function getCurrentSection() {
    let currentSection = null;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    return currentSection;
}

// ==========================================
// Console Message
// ==========================================

console.log('%c이동원의 프로필 웹사이트에 방문해주셨습니다!', 'color: #06b6d4; font-size: 14px; font-weight: bold;');
console.log('%cGitHub: https://github.com/mygithub05253', 'color: #06b6d4; font-size: 12px;');
console.log('%cEmail: kik328288@gmail.com', 'color: #06b6d4; font-size: 12px;');
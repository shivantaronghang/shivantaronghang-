// ===================================
// Civilization 3.0 Innovation Hub
// JavaScript File
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initCardInteractions();
    initScrollAnimations();
    initButtonInteractions();
    initExploreHubButton();
});

// ===================================
// 1. Card Interactions
// ===================================
function initCardInteractions() {
    const cards = document.querySelectorAll('.civ3-card');

    cards.forEach((card, index) => {
        // Add click event
        card.addEventListener('click', function() {
            console.log(`Card ${index + 1} clicked`);
            // Add your navigation logic here
            // Example: window.location.href = 'innovation-' + ['cem', 'hdgm', 'absf', 'psf'][index] + '.html';
        });

        // Add hover effect tracking
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

// ===================================
// 2. Scroll Animations (Intersection Observer)
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards
    const cards = document.querySelectorAll('.civ3-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `slideUp 0.6s ease-out ${index * 0.1}s forwards`;
        observer.observe(card);
    });
}

// ===================================
// 3. Button Interactions
// ===================================
function initButtonInteractions() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    readMoreButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const cardTitle = btn.closest('.civ3-card').querySelector('h3').textContent;
            console.log(`Read More clicked for: ${cardTitle}`);
            
            // Add ripple effect
            createRipple(btn, e);
        });
    });
}

// ===================================
// 4. Explore Hub Button
// ===================================
function initExploreHubButton() {
    const exploreBtn = document.querySelector('.civ3-explore-btn');

    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Explore Hub clicked');
            
            // Add click feedback
            exploreBtn.style.transform = 'scale(0.98)';
            setTimeout(() => {
                exploreBtn.style.transform = '';
            }, 150);

            // Your navigation logic here
            // Example: window.location.href = 'innovation-theories.html';
        });

        // Add tooltip
        exploreBtn.setAttribute('title', 'Click to explore all innovation frameworks and theories');
    }
}

// ===================================
// 5. Ripple Effect Function
// ===================================
function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// ===================================
// 6. Smooth Scroll Behavior
// ===================================
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.civ3-hero');
    const scrollPosition = window.scrollY;

    // Parallax effect on hero
    if (scrollPosition < 500) {
        heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ===================================
// 7. Analytics / Tracking (Optional)
// ===================================
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // Add your analytics code here (Google Analytics, Mixpanel, etc.)
}

// ===================================
// 8. Add Animation Styles Dynamically
// ===================================
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .animate-in {
        animation: slideUp 0.6s ease-out forwards !important;
    }
`;
document.head.appendChild(style);

// ===================================
// 9. Console Log (Development)
// ===================================
console.log('%c🚀 Civilization 3.0 Innovation Hub Loaded', 'color: #6a4df5; font-size: 16px; font-weight: bold;');
console.log('%cReady for interactions', 'color: #9b6efc; font-size: 12px;');


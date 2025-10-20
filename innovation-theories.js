// ========================================
// Civilization 3.0 - Innovation Subpage JS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializePage();
});

// ===================================
// 1. INITIALIZE PAGE
// ===================================
function initializePage() {
    console.log('%c🚀 Innovation & Theories Hub Initialized', 'color: #6a4df5; font-size: 14px; font-weight: bold;');
    
    initCategoryTabs();
    initSearchFunctionality();
    initCardInteractions();
    initScrollAnimations();
}

// ===================================
// 2. CATEGORY TABS FILTERING
// ===================================
function initCategoryTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get selected category
            const category = btn.dataset.category;
            
            // Filter cards
            filterCardsByCategory(category);
            
            // Track event
            trackEvent('category_filter', { category: category });
        });
    });
}

// ===================================
// 3. FILTER CARDS BY CATEGORY
// ===================================
function filterCardsByCategory(category) {
    const cards = document.querySelectorAll('.topic-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'slideInUp 0.6s ease-out';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    updateResultsInfo(visibleCount);
    handleNoResults(visibleCount);
}

// ===================================
// 4. SEARCH FUNCTIONALITY
// ===================================
function initSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        // Debounce search for better performance
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                const searchQuery = e.target.value.toLowerCase();
                performSearch(searchQuery);
            }, 300);
        });
    }
}

// ===================================
// 5. PERFORM SEARCH
// ===================================
function performSearch(query) {
    const cards = document.querySelectorAll('.topic-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const title = card.dataset.title.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(query) || description.includes(query) || query === '') {
            card.style.display = 'block';
            card.style.animation = 'slideInUp 0.6s ease-out';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    updateResultsInfo(visibleCount);
    handleNoResults(visibleCount);
    
    // Track search
    if (query !== '') {
        trackEvent('search', { query: query, results: visibleCount });
    }
}

// ===================================
// 6. UPDATE RESULTS INFO
// ===================================
function updateResultsInfo(count) {
    const resultsInfo = document.getElementById('resultsCount');
    
    if (resultsInfo) {
        if (count === 1) {
            resultsInfo.innerHTML = `Showing <strong>1 topic</strong>`;
        } else {
            resultsInfo.innerHTML = `Showing <strong>${count} topics</strong>`;
        }
    }
}

// ===================================
// 7. HANDLE NO RESULTS
// ===================================
function handleNoResults(visibleCount) {
    const noResultsDiv = document.getElementById('noResults');
    
    if (noResultsDiv) {
        if (visibleCount === 0) {
            noResultsDiv.style.display = 'block';
            noResultsDiv.style.animation = 'fadeIn 0.3s ease-out';
        } else {
            noResultsDiv.style.display = 'none';
        }
    }
}

// ===================================
// 8. CARD INTERACTIONS
// ===================================
function initCardInteractions() {
    const cards = document.querySelectorAll('.topic-card');
    
    cards.forEach((card, index) => {
        // Card click to navigate
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on the button
            if (e.target.closest('.read-more-btn')) {
                return;
            }
            
            const link = this.querySelector('.read-more-btn');
            if (link) {
                window.location.href = link.href;
            }
        });
        
        // Hover cursor
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
        
        // Add accessibility
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');
        
        // Keyboard navigation
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = this.querySelector('.read-more-btn');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
    });
}

// ===================================
// 9. SCROLL ANIMATIONS
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
            }
        });
    }, observerOptions);
    
    // Observe CTA section
    const ctaSection = document.querySelector('.civ3-cta-section');
    if (ctaSection) {
        observer.observe(ctaSection);
    }
}

// ===================================
// 10. SMOOTH SCROLL BEHAVIOR
// ===================================
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===================================
// 11. CTA BUTTON INTERACTIONS
// ===================================
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Add visual feedback
            btn.style.transform = 'scale(0.98)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
            
            // Track CTA click
            trackEvent('cta_click', { 
                button: btn.textContent.trim() 
            });
        });
    });
}

// Initialize CTA buttons
initCTAButtons();

// ===================================
// 12. ANALYTICS / EVENT TRACKING
// ===================================
function trackEvent(eventName, eventData) {
    console.log(`%c📊 Event: ${eventName}`, 'color: #9b6efc; font-weight: bold;', eventData);
    
    // Add your analytics code here (Google Analytics, Mixpanel, etc.)
    // Example for Google Analytics:
    // if (window.gtag) {
    //     gtag('event', eventName, eventData);
    // }
}

// ===================================
// 13. ADD DYNAMIC STYLES
// ===================================
const dynamicStyles = document.createElement('style');
dynamicStyles.innerHTML = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .animate-in {
        animation: slideInUp 0.6s ease-out forwards !important;
    }

    .no-results {
        animation: fadeIn 0.3s ease-out;
    }

    /* Focus styles for accessibility */
    .tab-btn:focus,
    .read-more-btn:focus,
    .topic-card:focus {
        outline: 2px solid #6a4df5;
        outline-offset: 2px;
    }
`;
document.head.appendChild(dynamicStyles);

// ===================================
// 14. EXPORT FUNCTIONS FOR GLOBAL USE
// ===================================
window.InnovationHub = {
    filterByCategory: filterCardsByCategory,
    performSearch: performSearch,
    smoothScroll: smoothScroll,
    trackEvent: trackEvent
};

console.log('%c✨ Innovation Hub Ready!', 'color: #6a4df5; font-size: 12px;');


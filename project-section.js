/* ===================================
   Universal Nexus - Civilization 3.0
   Advanced JavaScript Functionality
   =================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize all features
    initIntersectionObserver();
    initFilterButtons();
    initLazyLoading();
    initSmoothScroll();
    initButtonHoverEffects();
});

/* ===================================
   Intersection Observer for Animations
   =================================== */

function initIntersectionObserver() {
    const cards = document.querySelectorAll(".nexus-card");
    const header = document.querySelector(".nexus-header");

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for cards
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards
    cards.forEach(card => observer.observe(card));

    // Animate header
    if (header) {
        header.style.animation = "fadeInDown 0.8s ease-out";
    }
}

/* ===================================
   Filter Functionality
   =================================== */

function initFilterButtons() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".nexus-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");

            // Update active button with ripple effect
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            createRipple(btn);

            // Filter cards with smooth animation
            cards.forEach((card, index) => {
                const category = card.getAttribute("data-category");
                
                // Fade out
                card.style.opacity = "0";
                card.style.transform = "scale(0.95)";
                card.style.pointerEvents = "none";

                setTimeout(() => {
                    if (filter === "all" || category === filter) {
                        card.style.display = "flex";
                        card.style.pointerEvents = "auto";
                        
                        // Fade in with stagger
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "scale(1)";
                        }, index * 50);
                    } else {
                        card.style.display = "none";
                    }
                }, 300);
            });
        });
    });
}

/* ===================================
   Ripple Effect for Buttons
   =================================== */

function createRipple(element) {
    const ripple = document.createElement("span");
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    // Remove existing ripples
    const existing = element.querySelector(".ripple");
    if (existing) {
        existing.remove();
    }

    element.appendChild(ripple);
}

/* ===================================
   Lazy Loading Images
   =================================== */

function initLazyLoading() {
    const images = document.querySelectorAll(".nexus-card-image img");

    const imageObserverOptions = {
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loaded class for fade-in effect
                img.addEventListener("load", () => {
                    img.classList.add("loaded");
                });

                imageObserver.unobserve(img);
            }
        });
    }, imageObserverOptions);

    images.forEach(img => imageObserver.observe(img));
}

/* ===================================
   Smooth Scroll for Links
   =================================== */

function initSmoothScroll() {
    const links = document.querySelectorAll("a[href^='#']");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}

/* ===================================
   Button Hover Effects
   =================================== */

function initButtonHoverEffects() {
    const buttons = document.querySelectorAll(".nexus-btn");

    buttons.forEach(button => {
        button.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-3px)";
        });

        button.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
        });

        button.addEventListener("mousedown", function() {
            this.style.transform = "translateY(0)";
        });

        button.addEventListener("mouseup", function() {
            this.style.transform = "translateY(-3px)";
        });
    });
}

/* ===================================
   Dynamic Counter Animation (Optional)
   =================================== */

function initCounterAnimation() {
    const stats = document.querySelectorAll(".stat strong");

    const counterObserverOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateCounter(entry.target);
                entry.target.dataset.animated = "true";
            }
        });
    }, counterObserverOptions);

    stats.forEach(stat => counterObserver.observe(stat));
}

function animateCounter(element) {
    const text = element.textContent;
    const match = text.match(/(\d+)/);
    
    if (!match) return;

    const endValue = parseInt(match[1]);
    const duration = 1000;
    const startTime = Date.now();

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(endValue * progress);

        element.textContent = value + text.replace(match[1], "");

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    update();
}

/* ===================================
   Scroll-based Parallax Effect
   =================================== */

function initParallaxEffect() {
    const section = document.querySelector(".nexus-section");
    const orbs = document.querySelector(".nexus-bg-orbs");

    if (!orbs) return;

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const sectionRect = section.getBoundingClientRect();
        const sectionCenter = sectionRect.top + sectionRect.height / 2;
        
        if (sectionCenter < window.innerHeight && sectionCenter > 0) {
            const offset = (scrollY * 0.5) % 100;
            orbs.style.transform = `translateY(${offset}px)`;
        }
    }, { passive: true });
}

// Initialize parallax when page loads
window.addEventListener("load", initParallaxEffect);

/* ===================================
   Mobile Menu Touch Optimization
   =================================== */

function optimizeTouchInteractions() {
    const cards = document.querySelectorAll(".nexus-card");

    cards.forEach(card => {
        card.addEventListener("touchstart", function() {
            this.style.boxShadow = "0 25px 50px rgba(0, 114, 206, 0.2)";
            this.style.transform = "scale(0.98)";
        });

        card.addEventListener("touchend", function() {
            this.style.boxShadow = "";
            this.style.transform = "";
        });
    });
}

document.addEventListener("load", optimizeTouchInteractions);

/* ===================================
   Performance: Debounce Function
   =================================== */

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/* ===================================
   Resize Handling
   =================================== */

window.addEventListener("resize", debounce(() => {
    const grid = document.querySelector(".nexus-grid");
    if (grid) {
        // Force recalculation of grid layout
        grid.style.gridAutoRows = "auto";
    }
}, 250), { passive: true });

/* ===================================
   Accessibility: Keyboard Navigation
   =================================== */

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        // Close any open modals/dropdowns if implemented
        document.activeElement.blur();
    }

    // Arrow key navigation for filter buttons
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const filterBtns = document.querySelectorAll(".filter-btn");
        const activeBtn = document.querySelector(".filter-btn.active");
        
        if (activeBtn) {
            const currentIndex = Array.from(filterBtns).indexOf(activeBtn);
            let nextIndex;

            if (e.key === "ArrowRight") {
                nextIndex = (currentIndex + 1) % filterBtns.length;
            } else {
                nextIndex = (currentIndex - 1 + filterBtns.length) % filterBtns.length;
            }

            filterBtns[nextIndex].click();
            filterBtns[nextIndex].focus();
        }
    }
});

/* ===================================
   Analytics Tracking (Optional)
   =================================== */

function trackCardClick(cardTitle) {
    // Replace with your analytics service (Google Analytics, Mixpanel, etc.)
    console.log("Card clicked:", cardTitle);
    
    // Example: Google Analytics
    if (typeof gtag !== "undefined") {
        gtag("event", "card_click", {
            "card_title": cardTitle
        });
    }
}

// Add click tracking to cards
document.querySelectorAll(".nexus-card").forEach(card => {
    card.addEventListener("click", () => {
        const title = card.querySelector("h3").textContent;
        trackCardClick(title);
    });
});

/* ===================================
   Page Visibility API
   =================================== */

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        // Pause animations
        document.querySelectorAll(".nexus-card").forEach(card => {
            card.style.animationPlayState = "paused";
        });
    } else {
        // Resume animations
        document.querySelectorAll(".nexus-card").forEach(card => {
            card.style.animationPlayState = "running";
        });
    }
});

/* ===================================
   Console Logging for Debugging
   =================================== */

console.log("%c🚀 Universal Nexus Section Loaded", "color: #0072CE; font-size: 16px; font-weight: bold;");
console.log("%cCivilization 3.0 - Advanced Features Active", "color: #003366; font-size: 12px;");


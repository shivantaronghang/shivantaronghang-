// ================================
// HERO SECTION - RESPONSIVE ENHANCEMENT
// ================================

(function() {
  'use strict';

  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // LAZY LOAD IMAGES OPTIMIZATION
    // ================================
    const images = document.querySelectorAll('.hero-img');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      images.forEach(img => imageObserver.observe(img));
    }

    // ================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && document.querySelector(href)) {
          e.preventDefault();
          const target = document.querySelector(href);
          
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // ================================
    // BUTTON INTERACTION FEEDBACK
    // ================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        // Add ripple effect on click
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    });

    // ================================
    // RESPONSIVE IMAGE LOADING
    // ================================
    function optimizeImagesForDevice() {
      const screenWidth = window.innerWidth;
      const images = document.querySelectorAll('.hero-img');
      
      images.forEach(img => {
        let imageSize = 800;
        
        if (screenWidth <= 480) {
          imageSize = 600;
        } else if (screenWidth <= 768) {
          imageSize = 800;
        } else if (screenWidth <= 1024) {
          imageSize = 1000;
        }
        
        // Update image URL with optimal size (if using dynamic image service)
        const currentSrc = img.src;
        if (currentSrc.includes('?w=')) {
          const newSrc = currentSrc.replace(/\?w=\d+/, `?w=${imageSize}`);
          if (newSrc !== currentSrc) {
            img.src = newSrc;
          }
        }
      });
    }

    // Run on load
    optimizeImagesForDevice();

    // ================================
    // DEBOUNCED RESIZE HANDLER
    // ================================
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        optimizeImagesForDevice();
      }, 250);
    });

    // ================================
    // ACCESSIBILITY ENHANCEMENTS
    // ================================
    
    // Add keyboard navigation support
    const focusableElements = document.querySelectorAll('.btn, .hero-img');
    
    focusableElements.forEach(el => {
      el.setAttribute('tabindex', '0');
      
      el.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });

    // ================================
    // TOUCH DEVICE OPTIMIZATION
    // ================================
    function isTouchDevice() {
      return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
    }

    if (isTouchDevice()) {
      document.body.classList.add('touch-device');
      
      // Optimize hover effects for touch
      const imgWrappers = document.querySelectorAll('.img-wrapper');
      
      imgWrappers.forEach(wrapper => {
        wrapper.addEventListener('touchstart', function() {
          this.classList.add('touch-active');
        });
        
        wrapper.addEventListener('touchend', function() {
          setTimeout(() => {
            this.classList.remove('touch-active');
          }, 300);
        });
      });
    }

    // ================================
    // PERFORMANCE MONITORING
    // ================================
    if ('PerformanceObserver' in window) {
      const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.renderTime || entry.loadTime);
          }
        }
      });
      
      try {
        perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP not supported
      }
    }

    // ================================
    // NETWORK STATUS HANDLER
    // ================================
    window.addEventListener('online', function() {
      console.log('Connection restored');
    });

    window.addEventListener('offline', function() {
      console.log('Connection lost');
      // Could show offline message to user
    });

    // ================================
    // REDUCED MOTION PREFERENCE
    // ================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduced-motion');
    }

    // ================================
    // ERROR HANDLING FOR IMAGES
    // ================================
    images.forEach(img => {
      img.addEventListener('error', function() {
        console.error('Failed to load image:', this.src);
        this.style.backgroundColor = '#e3f2fd';
        this.alt = 'Image unavailable';
      });
    });

    console.log('Hero section initialized successfully ✓');
  });

})();


// ===== PHILOSOPHY SECTION ANIMATIONS =====
const philosophyCards = document.querySelectorAll('.content-card');

philosophyCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
});

// ===== MISSION CARDS STAGGER ANIMATION =====
const missionCards = document.querySelectorAll('.mission-card');

missionCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.15}s`;
});

// ===== INITIATIVE CARDS HOVER EFFECT =====
const initiativeCards = document.querySelectorAll('.initiative-card');

initiativeCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  });
});

// ===== PROJECT CARDS IMAGE PARALLAX =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const img = this.querySelector('.project-image img');
    if (img) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      img.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });
  
  card.addEventListener('mouseleave', function() {
    const img = this.querySelector('.project-image img');
    if (img) {
      img.style.transform = 'scale(1) rotateX(0) rotateY(0)';
    }
  });
});

// ===== BLOG CARD DATE HIGHLIGHT =====
const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach(card => {
  const date = card.querySelector('.blog-meta .date');
  if (date) {
    card.addEventListener('mouseenter', () => {
      date.style.color = '#F59E0B';
      date.style.transform = 'scale(1.1)';
      date.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      date.style.color = '#6D28D9';
      date.style.transform = 'scale(1)';
    });
  }
});

// ===== RESOURCE ITEMS ANIMATION =====
const resourceItems = document.querySelectorAll('.resource-item');

resourceItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.2}s`;
  
  const links = item.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      // Add

      
// ===== SCROLL PROGRESS INDICATOR =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #1E3A8A, #F59E0B, #6D28D9);
  width: 0%;
  z-index: 9999;
  transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = (window.pageYOffset / documentHeight) * 100;
  progressBar.style.width = scrolled + '%';
});

// ===== CONSOLE MESSAGE FOR HOMEPAGE =====
console.log('%c🚀 Homepage Loaded Successfully!', 'background: linear-gradient(135deg, #10B981, #6D28D9); color: white; font-size: 18px; padding: 10px; border-radius: 5px;');
console.log('%cExplore the future of Civilization 3.0', 'color: #1E3A8A; font-size: 14px; font-weight: bold;');


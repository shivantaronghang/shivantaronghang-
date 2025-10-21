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



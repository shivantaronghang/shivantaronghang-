// ===== RESOURCES SECTION JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== SMOOTH SCROLL ANIMATION ON PAGE LOAD =====
  const resourceItems = document.querySelectorAll('.resource-item');
  
  // Add fade-in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          entry.target.style.transition = 'all 0.6s ease-out';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  resourceItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(item);
  });
  
  
  // ===== LINK CLICK ANALYTICS (Optional) =====
  const resourceLinks = document.querySelectorAll('.resource-list a');
  
  resourceLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const category = this.closest('.resource-item').dataset.category;
      const linkText = this.querySelector('.link-text').textContent;
      
      // Log click event (can be used for analytics)
      console.log(`Resource clicked: ${category} - ${linkText}`);
      
      // Add a visual feedback
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
  
  
  // ===== DYNAMIC HOVER EFFECT FOR RESOURCE ITEMS =====
  resourceItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      // Add subtle scaling to icon
      const icon = this.querySelector('.resource-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.resource-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
  
  
  // ===== KEYBOARD ACCESSIBILITY ENHANCEMENT =====
  resourceLinks.forEach(link => {
    link.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  
  // ===== LAZY LOADING OPTIMIZATION =====
  // Add loading attribute to any images if they exist
  const images = document.querySelectorAll('.resource-item img');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
  
  
  // ===== RESPONSIVE GRID ADJUSTMENT =====
  function adjustGridOnResize() {
    const grid = document.querySelector('.resources-grid');
    const width = window.innerWidth;
    
    if (width < 768) {
      grid.style.gap = '20px';
    } else if (width < 1024) {
      grid.style.gap = '25px';
    } else {
      grid.style.gap = '30px';
    }
  }
  
  // Initial adjustment
  adjustGridOnResize();
  
  // Adjust on window resize with debounce
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(adjustGridOnResize, 250);
  });
  
  
  // ===== TOUCH DEVICE OPTIMIZATION =====
  function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
  }
  
  if (isTouchDevice()) {
    // Add touch-specific class
    document.body.classList.add('touch-device');
    
    // Optimize touch interactions
    resourceItems.forEach(item => {
      item.addEventListener('touchstart', function() {
        this.style.transform = 'translateY(-5px)';
      });
      
      item.addEventListener('touchend', function() {
        setTimeout(() => {
          this.style.transform = '';
        }, 300);
      });
    });
  }
  
  
  // ===== SECTION TITLE ANIMATION =====
  const sectionTitle = document.querySelector('.section-title');
  if (sectionTitle) {
    const titleObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(-20px)';
          
          setTimeout(() => {
            entry.target.style.transition = 'all 0.8s ease-out';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 50);
          
          titleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    titleObserver.observe(sectionTitle);
  }
  
  
  // ===== PERFORMANCE MONITORING =====
  if ('performance' in window) {
    window.addEventListener('load', function() {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`Resources Section Load Time: ${perfData.loadEventEnd - perfData.fetchStart}ms`);
      }, 0);
    });
  }
  
  
  // ===== ARIA LABELS FOR ACCESSIBILITY =====
  resourceItems.forEach((item, index) => {
    const title = item.querySelector('.resource-title').textContent;
    item.setAttribute('aria-label', `Resource category: ${title}`);
    item.setAttribute('role', 'article');
  });
  
  resourceLinks.forEach(link => {
    link.setAttribute('aria-label', `Download or view: ${link.querySelector('.link-text').textContent}`);
  });
  
  
  console.log('Resources Section Initialized Successfully ✓');
});


// ===== UTILITY FUNCTIONS =====

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to smoothly scroll to section
function scrollToResources() {
  const section = document.getElementById('resources');
  if (section) {
    section.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
}

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isInViewport,
    scrollToResources
  };
}


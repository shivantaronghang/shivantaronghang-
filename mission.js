/* ============================================
   MISSION PAGE - JAVASCRIPT FUNCTIONALITY
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initMissionPage();
});

// Initialize all mission page functionality
function initMissionPage() {
  animateStats();
  setupScrollAnimations();
  setupSmoothScroll();
  lazyLoadImages();
}

/* ============================================
   ANIMATED COUNTER FOR STATS
   ============================================ */
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => statsObserver.observe(stat));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60 FPS
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = formatNumber(target);
      clearInterval(timer);
    } else {
      element.textContent = formatNumber(Math.floor(current));
    }
  }, 16);
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K+';
  }
  return num.toString();
}

/* ============================================
   SCROLL ANIMATIONS FOR MISSION CARDS
   ============================================ */
function setupScrollAnimations() {
  const missionCards = document.querySelectorAll('.mission-card');
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100); // Stagger animation
      }
    });
  }, observerOptions);

  missionCards.forEach(card => cardsObserver.observe(card));
}

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only handle internal anchor links
      if (href !== '#' && href !== '') {
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ============================================
   LAZY LOAD IMAGES
   ============================================ */
function lazyLoadImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Add loaded class for fade-in effect
          img.addEventListener('load', () => {
            img.classList.add('loaded');
          });
          
          // If image is already cached
          if (img.complete) {
            img.classList.add('loaded');
          }
          
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    images.forEach(img => {
      img.classList.add('loaded');
    });
  }
}

/* ============================================
   PARALLAX EFFECT FOR HERO SECTION
   ============================================ */
function setupParallaxEffect() {
  const heroContent = document.querySelector('.hero-content');
  
  if (!heroContent) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    if (scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${rate}px)`;
      heroContent.style.opacity = 1 - (scrolled / 500);
    }
  });
}

// Initialize parallax on larger screens only
if (window.innerWidth > 768) {
  setupParallaxEffect();
}

/* ============================================
   BUTTON RIPPLE EFFECT
   ============================================ */
function setupButtonRipple() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

setupButtonRipple();

/* ============================================
   PROGRESS INDICATOR
   ============================================ */
function setupProgressIndicator() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    
    const progressBarElement = document.querySelector('.scroll-progress-bar');
    if (progressBarElement) {
      progressBarElement.style.width = scrolled + '%';
    }
  });
}

setupProgressIndicator();

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
function setupBackToTop() {
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

setupBackToTop();

/* ============================================
   ACCESSIBILITY ENHANCEMENTS
   ============================================ */
function setupAccessibility() {
  // Add keyboard navigation for cards
  const missionCards = document.querySelectorAll('.mission-card');
  
  missionCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
  
  // Focus management for buttons
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('focus', function() {
      this.classList.add('focused');
    });
    
    button.addEventListener('blur', function() {
      this.classList.remove('focused');
    });
  });
}

setupAccessibility();

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize scroll listeners
const optimizedScroll = debounce(() => {
  // Any additional scroll-based functionality can be added here
}, 100);

window.addEventListener('scroll', optimizedScroll);

/* ============================================
   ERROR HANDLING FOR IMAGES
   ============================================ */
function setupImageErrorHandling() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('error', function() {
      // Create placeholder if image fails to load
      this.style.background = 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)';
      this.alt = 'Image not available';
    });
  });
}

setupImageErrorHandling();

/* ============================================
   CONSOLE MESSAGE
   ============================================ */
console.log('%c🎯 Mission Page Loaded Successfully', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cCivilization 3.0 - Building the Future', 'color: #6b7280; font-size: 12px;');


// ===================================
// ARTICLE TEMPLATE JAVASCRIPT
// ===================================

(function() {
  'use strict';

  // ========== READING PROGRESS BAR ==========
  function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const articleContent = document.querySelector('.article-content');
    
    if (!progressBar || !articleContent) return;

    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Calculate progress percentage
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      // Update progress bar width
      progressBar.style.width = scrollPercent + '%';
    });
  }

  // ========== BACK TO TOP BUTTON ==========
  function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========== TABLE OF CONTENTS TOGGLE (MOBILE) ==========
  function initTocToggle() {
    const tocToggle = document.querySelector('.toc-toggle');
    const tocNav = document.getElementById('toc-nav');
    
    if (!tocToggle || !tocNav) return;

    tocToggle.addEventListener('click', function() {
      const isExpanded = tocToggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle states
      tocToggle.setAttribute('aria-expanded', !isExpanded);
      tocNav.hidden = isExpanded;
    });
  }

  // ========== SCROLLSPY FOR TOC ACTIVE LINKS ==========
  function initScrollSpy() {
    const sections = document.querySelectorAll('.article-body h2, .article-references');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    if (sections.length === 0 || tocLinks.length === 0) return;

    // Create an intersection observer
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          
          // Remove active class from all links
          tocLinks.forEach(function(link) {
            link.classList.remove('active');
          });
          
          // Add active class to corresponding link
          const activeLink = document.querySelector('.toc-link[href="#' + id + '"]');
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach(function(section) {
      if (section.getAttribute('id')) {
        observer.observe(section);
      }
    });
  }

  // ========== SMOOTH SCROLL FOR TOC LINKS ==========
  function initSmoothScroll() {
    const tocLinks = document.querySelectorAll('.toc-link');
    
    tocLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offset = 100; // Offset for fixed headers
          const targetPosition = targetElement.offsetTop - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile TOC after clicking (if open)
          const tocNav = document.getElementById('toc-nav');
          const tocToggle = document.querySelector('.toc-toggle');
          
          if (window.innerWidth <= 992 && tocNav && !tocNav.hidden) {
            tocNav.hidden = true;
            if (tocToggle) {
              tocToggle.setAttribute('aria-expanded', 'false');
            }
          }
        }
      });
    });
  }

  // ========== AUTO-GENERATE IDS FOR HEADINGS ==========
  function generateHeadingIds() {
    const headings = document.querySelectorAll('.article-body h2, .article-body h3');
    
    headings.forEach(function(heading, index) {
      // Only generate ID if heading doesn't already have one
      if (!heading.getAttribute('id')) {
        const text = heading.textContent.trim();
        const id = 'section-' + (index + 1);
        heading.setAttribute('id', id);
      }
    });
  }

  // ========== EXTERNAL LINKS BEHAVIOR ==========
  function initExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    
    links.forEach(function(link) {
      // Ensure external links open in new tab
      if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // ========== INITIALIZE ALL FEATURES ==========
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        generateHeadingIds();
        initProgressBar();
        initBackToTop();
        initTocToggle();
        initScrollSpy();
        initSmoothScroll();
        initExternalLinks();
      });
    } else {
      // DOM already loaded
      generateHeadingIds();
      initProgressBar();
      initBackToTop();
      initTocToggle();
      initScrollSpy();
      initSmoothScroll();
      initExternalLinks();
    }
  }

  // Start initialization
  init();

})();


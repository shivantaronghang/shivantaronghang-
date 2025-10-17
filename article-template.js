/* ===== ARTICLE TEMPLATE JAVASCRIPT ===== */

document.addEventListener('DOMContentLoaded', function() {
  initTOC();
  initBackToTop();
  initReadingProgress();
  initNavMenu();
  initActiveLinks();
  fixResponsiveIssues();
});

/* ===== FIX RESPONSIVE & OVERFLOW ISSUES ===== */
function fixResponsiveIssues() {
  // Ensure no horizontal overflow
  document.documentElement.style.width = '100%';
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.width = '100%';
  document.body.style.overflowX = 'hidden';

  // Fix all main sections
  const mainSections = document.querySelectorAll(
    'header, main, footer, section, article'
  );
  mainSections.forEach(section => {
    if (section.classList.contains('article-main') ||
        section.classList.contains('article-content') ||
        section.classList.contains('research-container')) {
      section.style.width = '100%';
      section.style.boxSizing = 'border-box';
    }
  });

  // Fix viewport on window resize
  window.addEventListener('resize', function() {
    document.documentElement.style.width = '100%';
    document.body.style.width = '100%';
  });
}

/* ===== TABLE OF CONTENTS SMOOTH OPEN/CLOSE ===== */
function initTOC() {
  const tocToggle = document.querySelector('.toc-toggle');
  const tocNav = document.getElementById('toc-nav');
  const tocLinks = document.querySelectorAll('.toc-link');

  if (!tocToggle || !tocNav) return;

  // Toggle button with smooth animation
  tocToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      closeTOC();
    } else {
      openTOC();
    }
  });

  // Close TOC when clicking on a link
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      // Close TOC with slight delay for smooth effect
      closeTOC();
      
      // Smooth scroll to section
      setTimeout(() => {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = 200;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - headerHeight,
            behavior: 'smooth'
          });
        }
      }, 200);
    });
  });

  // Close TOC when clicking outside
  document.addEventListener('click', function(e) {
    const isClickInside = 
      tocNav.contains(e.target) || 
      tocToggle.contains(e.target);
    
    if (!isClickInside && tocNav.classList.contains('open')) {
      closeTOC();
    }
  });

  // Close TOC on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && tocNav.classList.contains('open')) {
      closeTOC();
    }
  });
}

function openTOC() {
  const tocToggle = document.querySelector('.toc-toggle');
  const tocNav = document.getElementById('toc-nav');
  
  if (tocNav) {
    tocNav.classList.add('open');
    tocToggle.setAttribute('aria-expanded', 'true');
  }
}

function closeTOC() {
  const tocToggle = document.querySelector('.toc-toggle');
  const tocNav = document.getElementById('toc-nav');
  
  if (tocNav) {
    tocNav.classList.remove('open');
    tocToggle.setAttribute('aria-expanded', 'false');
  }
}

/* ===== READING PROGRESS BAR ===== */
function initReadingProgress() {
  const progressBar = document.querySelector('.progress-bar');
  
  if (!progressBar) return;

  window.addEventListener('scroll', function() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const scrollPercent = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
    
    progressBar.style.width = scrollPercent + '%';
  });
}

/* ===== BACK TO TOP BUTTON ===== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  
  if (!backToTopBtn) return;

  // Show/hide button on scroll
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Smooth scroll to top
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ===== HAMBURGER MENU ===== */
function initNavMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking on a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    const isClickInsideNav = navLinks.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });

  // Close menu on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
}

/* ===== ACTIVE LINKS HIGHLIGHTING ===== */
function initActiveLinks() {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('[id^="section-"], [id="references"]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

/* ===== BACK BUTTON ===== */
function goBack() {
  window.history.back();
}

/* ===== SHARE BUTTON ===== */
function shareArticle() {
  const title = document.querySelector('.hero-title')?.textContent || 'Check this article';
  const url = window.location.href;
  const text = `${title} - Civilization 3.0`;

  if (navigator.share) {
    // Use native share API if available
    navigator.share({
      title: title,
      text: text,
      url: url
    }).catch(err => console.log('Share cancelled'));
  } else {
    // Fallback: copy to clipboard
    const shareText = `${text}\n${url}`;
    navigator.clipboard.writeText(shareText).then(() => {
      showNotification('Article link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }
}

/* ===== NOTIFICATION ===== */
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 120px;
    right: 20px;
    background-color: #27ae60;
    color: white;
    padding: 15px 25px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 14px;
    z-index: 300;
    animation: slideIn 0.3s ease;
    max-width: 300px;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

/* ===== ANIMATIONS ===== */
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .nav-links.active {
    animation: slideDown 0.3s ease;
  }

  @media (max-width: 768px) {
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }
`;
document.head.appendChild(style);

/* ===== PREVENT DOUBLE SCROLLBAR ===== */
document.addEventListener('DOMContentLoaded', function() {
  if (document.body.scrollHeight <= window.innerHeight) {
    document.documentElement.style.overflowY = 'auto';
  }
});

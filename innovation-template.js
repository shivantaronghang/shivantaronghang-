// ===================================
// Article Page - JavaScript
// ===================================

// ===================================
// Scroll Progress Bar
// ===================================
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  document.getElementById('progressBar').style.width = scrolled + '%';
});

// ===================================
// Reveal Animation on Scroll
// ===================================
const sections = document.querySelectorAll('.article-section');

function revealOnScroll() {
  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect().top;
    if (rect < window.innerHeight - 100) {
      sec.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Run on page load

// ===================================
// Back to Top Button Logic
// ===================================
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===================================
// Table of Contents Toggle (Mobile)
// ===================================
const tocToggle = document.querySelector('.toc-toggle');
const tocNav = document.querySelector('#toc-nav');

if (tocToggle) {
  // Toggle TOC visibility
  tocToggle.addEventListener('click', () => {
    const expanded = tocToggle.getAttribute('aria-expanded') === 'true';
    tocToggle.setAttribute('aria-expanded', !expanded);
    tocNav.classList.toggle('visible');
  });

  // Close TOC when a link is clicked
  const tocLinks = document.querySelectorAll('.toc-link');
  tocLinks.forEach(link => {
    link.addEventListener('click', () => {
      tocToggle.setAttribute('aria-expanded', 'false');
      tocNav.classList.remove('visible');
    });
  });
}

// ===================================
// Theme Toggle (Dark Mode)
// ===================================
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    
    // Update button icon
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Load saved theme on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }
}

// ===================================
// Social Share Buttons Functionality
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const pageTitle = document.querySelector('.article-hero-content h1').textContent;
  const pageUrl = window.location.href;

  // Top Share Buttons
  const topShareBtns = document.querySelectorAll('.article-social .social-btn');
  
  topShareBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      shareArticle(btn.classList.contains('facebook') ? 'facebook' : 
                  btn.classList.contains('twitter') ? 'twitter' : 'linkedin',
                  pageTitle, pageUrl);
    });
  });

  // Footer Share Buttons
  const footerShareBtns = document.querySelectorAll('.footer-social-buttons .footer-social-btn');
  
  footerShareBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = btn.classList.contains('facebook') ? 'facebook' : 
                      btn.classList.contains('twitter') ? 'twitter' : 
                      btn.classList.contains('linkedin') ? 'linkedin' : 'email';
      shareArticle(platform, pageTitle, pageUrl);
    });
  });
});

/**
 * Share article on social media or email
 * @param {string} platform - Platform name (facebook, twitter, linkedin, email)
 * @param {string} title - Article title
 * @param {string} url - Page URL
 */
function shareArticle(platform, title, url) {
  let shareUrl = '';

  switch(platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
    
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
      break;
    
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      break;
    
    case 'email':
      shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
      break;
  }

  if (shareUrl) {
    if (platform === 'email') {
      window.location.href = shareUrl;
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }
}

// ===================================
// Smooth Scroll for TOC Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Only smooth scroll if target exists
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

// ===================================
// Intersection Observer for Analytics
// ===================================
const observerOptions = {
  threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // You can add analytics tracking here
      // Example: trackPageView(entry.target.id)
      console.log('Viewed section:', entry.target.id);
    }
  });
}, observerOptions);

// Observe all article sections
document.querySelectorAll('.article-section').forEach(section => {
  observer.observe(section);
});

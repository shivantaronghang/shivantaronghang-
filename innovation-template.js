// ===============================
// Scroll Progress Bar
// ===============================
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  document.getElementById('scrollProgress').style.width = scrolled + '%';

  // Back to top button visibility
  const backToTop = document.getElementById('backToTop');
  backToTop.classList.toggle('show', scrollTop > 300);

  // Active TOC link highlighting
  updateActiveTOCLink();
});

// ===============================
// Back to Top Button
// ===============================
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===============================
// TOC Toggle Functionality
// ===============================
const tocToggle = document.getElementById('tocToggle');
const tocList = document.getElementById('tocList');

tocToggle.addEventListener('click', () => {
  const isExpanded = tocToggle.getAttribute('aria-expanded') === 'true';
  tocToggle.setAttribute('aria-expanded', !isExpanded);
  tocList.toggleAttribute('hidden');
});

// Close TOC on mobile when link clicked
document.querySelectorAll('.toc-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Auto-close TOC on small screens
    if (window.innerWidth <= 900) {
      tocToggle.setAttribute('aria-expanded', 'false');
      tocList.setAttribute('hidden', '');
    }
  });
});

// Ensure TOC is visible on resize if screen is large
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    tocToggle.setAttribute('aria-expanded', 'true');
    tocList.removeAttribute('hidden');
  }
});

// ===============================
// Active TOC Link Highlighting
// ===============================
function updateActiveTOCLink() {
  const sections = document.querySelectorAll('.article-section');
  const tocLinks = document.querySelectorAll('.toc-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  tocLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}

// ===============================
// Theme Toggle
// ===============================
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Check if user has saved theme preference or use system preference
if (typeof localStorage !== 'undefined') {
  if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  }
} else if (prefersDark) {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  
  // Save theme preference if localStorage is available
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
});

// ===============================
// Copy Section Link on Click
// ===============================
document.querySelectorAll('.section-title').forEach(title => {
  title.addEventListener('click', () => {
    const section = title.closest('.article-section');
    const id = section.getAttribute('id');
    const url = window.location.origin + window.location.pathname + '#' + id;
    
    // Use modern Clipboard API if available, fallback to older method
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        showCopyFeedback(title);
      }).catch(() => {
        fallbackCopy(url, title);
      });
    } else {
      fallbackCopy(url, title);
    }
  });
});

function showCopyFeedback(element) {
  const original = element.textContent;
  element.textContent = '✓ Link copied!';
  setTimeout(() => {
    element.textContent = original;
  }, 2000);
}

function fallbackCopy(text, element) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showCopyFeedback(element);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
  
  document.body.removeChild(textarea);
}

// ===============================
// Smooth Scroll for Internal Links
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      const target = document.querySelector(href);
      if (target && !this.classList.contains('toc-link')) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ===============================
// Initialize on Page Load
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  // Set initial active TOC link
  updateActiveTOCLink();
  
  // Set initial back-to-top visibility
  const backToTop = document.getElementById('backToTop');
  backToTop.classList.toggle('show', window.scrollY > 300);
});

// ===============================
// Keyboard Navigation
// ===============================
document.addEventListener('keydown', (e) => {
  // Close TOC with Escape key on mobile
  if (e.key === 'Escape' && window.innerWidth <= 900) {
    if (tocToggle.getAttribute('aria-expanded') === 'true') {
      tocToggle.setAttribute('aria-expanded', 'false');
      tocList.setAttribute('hidden', '');
    }
  }
  
  // Jump to top with Ctrl+Home or Cmd+Home
  if ((e.ctrlKey || e.metaKey) && e.code === 'Home') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// ===============================
// Mobile Menu Accessibility
// ===============================
document.addEventListener('click', (e) => {
  // Close TOC if clicking outside on mobile
  if (window.innerWidth <= 900) {
    const tocBox = document.querySelector('.toc-box');
    const isClickInsideTOC = tocBox && tocBox.contains(e.target);
    const isToggleButton = e.target === tocToggle || tocToggle.contains(e.target);
    
    if (!isClickInsideTOC && !isToggleButton && tocToggle.getAttribute('aria-expanded') === 'true') {
      tocToggle.setAttribute('aria-expanded', 'false');
      tocList.setAttribute('hidden', '');
    }
  }
});


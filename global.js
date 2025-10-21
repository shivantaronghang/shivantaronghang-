// ===== GLOBAL JAVASCRIPT - Common functionality across all pages =====

// ===== HAMBURGER MENU TOGGLE =====
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll("span");
    spans.forEach((span, index) => {
      if (navLinks.classList.contains("active")) {
        if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)";
        if (index === 1) span.style.opacity = "0";
        if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        span.style.transform = "none";
        span.style.opacity = "1";
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      const spans = hamburger.querySelectorAll("span");
      spans.forEach(span => {
        span.style.transform = "none";
        span.style.opacity = "1";
      });
    }
  });

  // Close menu when clicking a link
  const links = navLinks.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const spans = hamburger.querySelectorAll("span");
      spans.forEach(span => {
        span.style.transform = "none";
        span.style.opacity = "1";
      });
    });
  });
}

// ===== SMOOTH SCROLL FOR INTERNAL LINKS =====
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    }
  });
});

// ===== STICKY HEADER - ALWAYS VISIBLE =====
const mainHeader = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Enhanced shadow on scroll
  if (currentScroll > 100) {
    mainHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
  } else {
    mainHeader.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
  }

  // Header always stays at top - never hides
  mainHeader.style.transform = 'translateY(0)';
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNavLink() {
  let current = '';
  const scrollPosition = window.pageYOffset + 200;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active-link');
    item.style.color = '#E0E7FF';
    
    const href = item.getAttribute('href');
    if (href === `#${current}` || (href === '#hero' && current === '')) {
      item.classList.add('active-link');
      item.style.color = '#F59E0B';
      item.style.fontWeight = '700';
    } else {
      item.style.fontWeight = '500';
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and sections
const animateElements = document.querySelectorAll(
  '.content-card, .mission-card, .initiative-card, .project-card, .blog-card, .resource-item, .event-card'
);

animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.visibility = 'visible';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.visibility = 'hidden';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
  scrollToTopBtn.style.transform = 'scale(1.1)';
  scrollToTopBtn.style.background = 'linear-gradient(135deg, #F59E0B, #6D28D9)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
  scrollToTopBtn.style.transform = 'scale(1)';
  scrollToTopBtn.style.background = 'linear-gradient(135deg, #1E3A8A, #6D28D9)';
});

// ===== FORM VALIDATION =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const name = contactForm.querySelector('input[name="name"]');
    const email = contactForm.querySelector('input[name="_replyto"]');
    const message = contactForm.querySelector('textarea[name="message"]');

    let isValid = true;
    let errorMessage = '';

    // Validate name
    if (name && name.value.trim().length < 2) {
      isValid = false;
      errorMessage += 'Please enter a valid name.\n';
      name.style.borderColor = '#EF4444';
    } else if (name) {
      name.style.borderColor = '#E0E7FF';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.value)) {
      isValid = false;
      errorMessage += 'Please enter a valid email address.\n';
      email.style.borderColor = '#EF4444';
    } else if (email) {
      email.style.borderColor = '#E0E7FF';
    }

    // Validate message
    if (message && message.value.trim().length < 10) {
      isValid = false;
      errorMessage += 'Message must be at least 10 characters long.\n';
      message.style.borderColor = '#EF4444';
    } else if (message) {
      message.style.borderColor = '#E0E7FF';
    }

    if (!isValid) {
      e.preventDefault();
      alert(errorMessage);
    }
  });
}

// ===== NEWSLETTER FORM VALIDATION =====
const newsletterForms = document.querySelectorAll('.footer-newsletter form');

newsletterForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    const email = form.querySelector('input[name="_replyto"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email.value)) {
      e.preventDefault();
      alert('Please enter a valid email address.');
      email.style.borderColor = '#EF4444';
    } else if (email) {
      email.style.borderColor = '#E0E7FF';
    }
  });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ===== LOG MESSAGE =====
console.log('%c🌐 Welcome to Civilization 3.0! ', 'background: linear-gradient(135deg, #1E3A8A, #6D28D9); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cBuilding the Future of Humanity', 'color: #F59E0B; font-size: 16px; font-weight: bold;');

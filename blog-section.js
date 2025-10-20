// ===== Blog Cards Navigation =====
document.addEventListener('DOMContentLoaded', function() {
  const blogCards = document.querySelectorAll('#blog-cards-container .blog-card');
  const exploreButtons = document.querySelectorAll('.explore-btn');

  // Handle card click navigation
  blogCards.forEach(card => {
    card.addEventListener('click', function() {
      const link = this.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    });

    // Prevent button click from triggering card click
    const button = card.querySelector('.explore-btn');
    if (button) {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        const link = card.getAttribute('data-link');
        if (link) {
          window.location.href = link;
        }
      });
    }
  });

  // Add smooth hover effects
  blogCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.cursor = 'pointer';
    });
  });

  // Smooth scroll behavior for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Apply initial styles for animation
  blogCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });

  // Blog container cards animation
  const containerCards = document.querySelectorAll('.blog-container .blog-card');
  containerCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
});

// ===== Active Link Highlighting =====
function highlightActiveSection() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('a');

  window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  });
}

highlightActiveSection();

// ===== Button Ripple Effect =====
function addRippleEffect() {
  const buttons = document.querySelectorAll('.explore-btn, .blog-hub-link, .read-more');

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

      // Remove any existing ripples
      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(ripple);
    });
  });
}

addRippleEffect();

// ===== Scroll Animation =====
function animateOnScroll() {
  const elements = document.querySelectorAll('.blog-card, h2, h3, p');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(element => {
    scrollObserver.observe(element);
  });
}

animateOnScroll();

// ===== Keyboard Navigation =====
document.addEventListener('keydown', function(e) {
  const cards = document.querySelectorAll('#blog-cards-container .blog-card');
  const activeCard = document.activeElement;

  if (e.key === 'Enter' && Array.from(cards).includes(activeCard)) {
    const link = activeCard.getAttribute('data-link');
    if (link) {
      window.location.href = link;
    }
  }
});

// ===== Add Tab Navigation =====
document.querySelectorAll('#blog-cards-container .blog-card').forEach((card, index) => {
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' && index < document.querySelectorAll('#blog-cards-container .blog-card').length - 1) {
      document.querySelectorAll('#blog-cards-container .blog-card')[index + 1].focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      document.querySelectorAll('#blog-cards-container .blog-card')[index - 1].focus();
    }
  });
});


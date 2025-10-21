// ===== INITIATIVES SECTION INTERACTIONS =====

document.addEventListener('DOMContentLoaded', () => {
  
  // Smooth scroll animation for cards on page load
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
        cardObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Apply animation to all cards
  const cards = document.querySelectorAll('.initiative-card');
  cards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
  });
  
  // Add click tracking for "Learn More" links
  const cardLinks = document.querySelectorAll('.card-link');
  cardLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cardTitle = link.closest('.initiative-card').querySelector('h3').textContent;
      console.log(`User clicked: ${cardTitle}`);
      
      // Add your navigation logic here
      // Example: window.location.href = link.href;
      
      // Visual feedback
      link.style.transform = 'scale(0.95)';
      setTimeout(() => {
        link.style.transform = 'scale(1)';
      }, 150);
    });
  });
  
  // Parallax effect for images on scroll
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const cardImages = document.querySelectorAll('.card-image img');
        cardImages.forEach((img) => {
          const rect = img.getBoundingClientRect();
          const scrolled = window.pageYOffset;
          const imgTop = rect.top + scrolled;
          const windowHeight = window.innerHeight;
          
          if (rect.top < windowHeight && rect.bottom > 0) {
            const yPos = (scrolled - imgTop) * 0.15;
            img.style.transform = `translateY(${yPos}px) scale(1)`;
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Lazy loading for images (if not using native lazy loading)
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => imageObserver.observe(img));
  }
  
  // Add touch support for mobile devices
  if ('ontouchstart' in window) {
    cards.forEach((card) => {
      card.addEventListener('touchstart', () => {
        card.style.transform = 'translateY(-3px)';
      });
      
      card.addEventListener('touchend', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }
  
  // Keyboard navigation support
  cardLinks.forEach((link, index) => {
    link.setAttribute('tabindex', index + 1);
    
    link.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
    });
  });
  
  // Console log for debugging
  console.log(`Initiatives Section Loaded: ${cards.length} cards initialized`);
  
});


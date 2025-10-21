// Mission Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // Intersection Observer for card animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all mission cards
  const missionCards = document.querySelectorAll('.mission-card');
  missionCards.forEach((card, index) => {
    // Add stagger delay
    card.style.setProperty('--animation-delay', `${index * 0.1}s`);
    observer.observe(card);
  });

  // Add smooth scroll for mission button
  const missionBtn = document.querySelector('.nexus-btn.primary');
  if (missionBtn) {
    missionBtn.addEventListener('click', function(e) {
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  }

  // Add parallax effect on scroll (optional)
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const missionSection = document.querySelector('.mission-section');
    
    if (missionSection) {
      const rect = missionSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        const cards = document.querySelectorAll('.mission-card');
        cards.forEach((card, index) => {
          const speed = 0.5 + (index * 0.1);
          const yPos = -(scrollTop - missionSection.offsetTop) * speed * 0.05;
          card.style.transform = `translateY(${yPos}px)`;
        });
      }
    }
    
    lastScrollTop = scrollTop;
  });

  // Add hover sound effect (optional - requires audio file)
  /*
  missionCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // const hoverSound = new Audio('assets/sounds/hover.mp3');
      // hoverSound.volume = 0.2;
      // hoverSound.play();
    });
  });
  */

  // Analytics tracking (optional)
  missionCards.forEach((card, index) => {
    card.addEventListener('click', function() {
      const cardTitle = this.querySelector('h3').textContent;
      console.log(`Mission card clicked: ${cardTitle}`);
      
      // Example: Send to analytics
      // gtag('event', 'mission_card_click', {
      //   'card_title': cardTitle,
      //   'card_index': index
      // });
    });
  });

  // Image lazy loading fallback
  const images = document.querySelectorAll('.mission-image img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.classList.add('loaded');
    });
    
    img.addEventListener('error', function() {
      this.src = 'assets/images/placeholder.jpg'; // Fallback image
      this.alt = 'Mission image unavailable';
    });
  });

});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .mission-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .mission-card.animate-in {
    opacity: 1;
    transform: translateY(0);
    transition-delay: var(--animation-delay, 0s);
  }
  
  .mission-image img.loaded {
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);


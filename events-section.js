// =====================================
// ONSNC Foundation - Events Section JS
// =====================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initEventCards();
  initScrollAnimations();
  initEventTracking();
});

// Animate event cards on page load
function initEventCards() {
  const eventCards = document.querySelectorAll('.event-card');
  
  eventCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate');
    }, index * 150);
  });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const eventCards = document.querySelectorAll('.event-card');
  eventCards.forEach(card => {
    observer.observe(card);
  });
}

// Track event card clicks for analytics
function initEventTracking() {
  const registerButtons = document.querySelectorAll('.btn-register');
  
  registerButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const eventCard = this.closest('.event-card');
      const eventTitle = eventCard.querySelector('h3').textContent;
      const eventId = eventCard.getAttribute('data-event-id');
      
      // Log event (you can replace this with your analytics service)
      console.log('Event Registration Clicked:', {
        id: eventId,
        title: eventTitle,
        timestamp: new Date().toISOString()
      });
      
      // Optional: Add a visual feedback
      const originalText = this.textContent;
      this.textContent = 'Opening Registration...';
      setTimeout(() => {
        this.textContent = originalText;
      }, 2000);
    });
  });

  // Track explore button
  const exploreButton = document.querySelector('.btn-explore');
  if (exploreButton) {
    exploreButton.addEventListener('click', function(e) {
      console.log('Explore More Events Clicked:', {
        timestamp: new Date().toISOString()
      });
    });
  }
}

// Optional: Add countdown timer functionality
function addCountdownTimer(eventDate, elementId) {
  const countdownElement = document.getElementById(elementId);
  if (!countdownElement) return;

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      countdownElement.innerHTML = 'Event Started!';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Optional: Filter events by category
function filterEventsByTag(tag) {
  const eventCards = document.querySelectorAll('.event-card');
  
  eventCards.forEach(card => {
    const tags = Array.from(card.querySelectorAll('.event-tag')).map(t => t.textContent);
    
    if (tag === 'all' || tags.some(t => t.includes(tag))) {
      card.style.display = 'flex';
      setTimeout(() => card.classList.add('animate'), 100);
    } else {
      card.style.display = 'none';
    }
  });
}

// Export functions for use in other scripts
window.EventsSection = {
  filterByTag: filterEventsByTag,
  addCountdown: addCountdownTimer
};


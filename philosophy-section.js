// Philosophy Section JavaScript

// Smooth scroll for explore button
document.addEventListener('DOMContentLoaded', function() {
  
  // Smooth scroll functionality
  const exploreButtons = document.querySelectorAll('.explore-btn');
  
  exploreButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Check if it's an anchor link
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe philosophy section elements
  const philosophyImage = document.querySelector('.philosophy-image');
  const philosophyContent = document.querySelector('.philosophy-content');

  if (philosophyImage) {
    fadeInObserver.observe(philosophyImage);
  }

  if (philosophyContent) {
    fadeInObserver.observe(philosophyContent);
  }

  // Add stagger effect to key points
  const keyPoints = document.querySelectorAll('.key-points li');
  
  keyPoints.forEach((point, index) => {
    point.style.opacity = '0';
    point.style.transform = 'translateX(-20px)';
    point.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
  });

  // Animate key points when in view
  const keyPointsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const points = entry.target.querySelectorAll('li');
        points.forEach(point => {
          point.style.opacity = '1';
          point.style.transform = 'translateX(0)';
        });
      }
    });
  }, observerOptions);

  const keyPointsList = document.querySelector('.key-points');
  if (keyPointsList) {
    keyPointsObserver.observe(keyPointsList);
  }

});


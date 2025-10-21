// About Section - Video Functionality
document.addEventListener('DOMContentLoaded', function() {
  const playVideoBtn = document.getElementById('playVideoBtn');
  const founderImage = document.getElementById('founderImage');
  const videoContainer = document.getElementById('videoContainer');
  const founderVideo = document.getElementById('founderVideo');

  // Replace this URL with the actual YouTube or Vimeo video URL
  // For YouTube: https://www.youtube.com/embed/VIDEO_ID
  // For Vimeo: https://player.vimeo.com/video/VIDEO_ID
  const videoURL = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Replace with actual video URL

  if (playVideoBtn) {
    playVideoBtn.addEventListener('click', function() {
      // Set video source
      founderVideo.src = videoURL;
      
      // Hide image and show video
      founderImage.style.display = 'none';
      videoContainer.style.display = 'block';
      
      // Change button text
      playVideoBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
        Hide Video
      `;
      
      // Toggle functionality
      playVideoBtn.onclick = function() {
        if (videoContainer.style.display === 'block') {
          // Hide video and show image
          videoContainer.style.display = 'none';
          founderImage.style.display = 'block';
          founderVideo.src = ''; // Stop video
          
          // Reset button
          playVideoBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Watch Introduction Video
          `;
        } else {
          // Show video and hide image
          founderVideo.src = videoURL;
          founderImage.style.display = 'none';
          videoContainer.style.display = 'block';
          
          playVideoBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
            Hide Video
          `;
        }
      };
    });
  }

  // Smooth scroll animation for contact links
  const contactLinks = document.querySelectorAll('.contact-info a');
  contactLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 100);
    });
  });

  // Animate stats on scroll
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stats = entry.target.querySelectorAll('.stat strong');
        stats.forEach((stat, index) => {
          const finalValue = parseInt(stat.textContent);
          let currentValue = 0;
          const increment = finalValue / 50;
          const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
              stat.textContent = finalValue + '+';
              clearInterval(timer);
            } else {
              stat.textContent = Math.floor(currentValue) + '+';
            }
          }, 30);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const founderStats = document.querySelector('.founder-stats');
  if (founderStats) {
    statsObserver.observe(founderStats);
  }

  // Add hover effect to contact items
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.contact-icon');
      icon.style.transform = 'rotate(10deg) scale(1.1)';
    });
    
    item.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.contact-icon');
      icon.style.transform = 'rotate(0deg) scale(1)';
    });
  });
});


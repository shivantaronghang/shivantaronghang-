// ===== HOMEPAGE SPECIFIC JAVASCRIPT =====

// ===== HERO CANVAS ANIMATION =====
const canvas = document.getElementById('hero-canvas');

if (canvas) {
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Particle system
  let particles = [];
  const numParticles = 60;
  const maxDistance = 150;

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 2 + 1.5;
      this.dx = (Math.random() - 0.5) * 1.5;
      this.dy = (Math.random() - 0.5) * 1.5;
      this.color = this.getRandomColor();
    }

    getRandomColor() {
      const colors = [
        'rgba(245, 158, 11, 0.8)',  // Orange
        'rgba(96, 165, 250, 0.8)',   // Blue
        'rgba(167, 139, 250, 0.8)',  // Purple
        'rgba(255, 255, 255, 0.7)'   // White
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      
      // Add glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    update() {
      this.x += this.dx;
      this.y += this.dy;

      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

      // Keep within bounds
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));

      this.draw();
    }
  }

  // Initialize particles
  function initParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  }

  initParticles();

  // Draw connecting lines between particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => particle.update());
    drawConnections();
    
    requestAnimationFrame(animate);
  }

  animate();

  // Mouse interaction - particles react to mouse
  let mouseX = null;
  let mouseY = null;

  canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    particles.forEach(particle => {
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        const force = (120 - distance) / 120;
        particle.x -= dx * force * 0.03;
        particle.y -= dy * force * 0.03;
      }
    });
  });

  canvas.addEventListener('mouseleave', () => {
    mouseX = null;
    mouseY = null;
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
}

// ===== DYNAMIC STATS COUNTER ANIMATION =====
const stats = document.querySelectorAll('.stat strong');

const animateCounter = (element, target) => {
  let current = 0;
  const increment = target / 100;
  const duration = 2000; // 2 seconds
  const stepTime = duration / 100;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    // Format number
    if (target >= 1000) {
      element.textContent = Math.floor(current / 1000) + 'K+';
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, stepTime);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.textContent.replace(/[^0-9]/g, '');
      const multiplier = entry.target.textContent.includes('K') ? 1000 : 1;
      animateCounter(entry.target, parseInt(target) * multiplier);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// ===== PHILOSOPHY SECTION ANIMATIONS =====
const philosophyCards = document.querySelectorAll('.content-card');

philosophyCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
});

// ===== MISSION CARDS STAGGER ANIMATION =====
const missionCards = document.querySelectorAll('.mission-card');

missionCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.15}s`;
});

// ===== INITIATIVE CARDS HOVER EFFECT =====
const initiativeCards = document.querySelectorAll('.initiative-card');

initiativeCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  });
});

// ===== PROJECT CARDS IMAGE PARALLAX =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const img = this.querySelector('.project-image img');
    if (img) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      img.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });
  
  card.addEventListener('mouseleave', function() {
    const img = this.querySelector('.project-image img');
    if (img) {
      img.style.transform = 'scale(1) rotateX(0) rotateY(0)';
    }
  });
});

// ===== BLOG CARD DATE HIGHLIGHT =====
const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach(card => {
  const date = card.querySelector('.blog-meta .date');
  if (date) {
    card.addEventListener('mouseenter', () => {
      date.style.color = '#F59E0B';
      date.style.transform = 'scale(1.1)';
      date.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      date.style.color = '#6D28D9';
      date.style.transform = 'scale(1)';
    });
  }
});

// ===== RESOURCE ITEMS ANIMATION =====
const resourceItems = document.querySelectorAll('.resource-item');

resourceItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.2}s`;
  
  const links = item.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      // Add a subtle pulse effect when clicking resource links
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
});

// ===== EVENT CARDS COUNTDOWN TIMER (Optional Feature) =====
const eventCards = document.querySelectorAll('.event-card');

eventCards.forEach(card => {
  const monthText = card.querySelector('.event-date .month')?.textContent;
  const dayText = card.querySelector('.event-date .day')?.textContent;
  
  if (monthText && dayText) {
    // Add a subtle glow animation to upcoming events
    const eventDate = card.querySelector('.event-date');
    eventDate.style.animation = 'pulse 2s ease-in-out infinite';
  }
});

// Add pulse animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(109, 40, 217, 0.7);
    }
    50% {
      box-shadow: 0 0 20px 10px rgba(109, 40, 217, 0);
    }
  }
`;
document.head.appendChild(style);

// ===== CONTACT SECTION FIELD FOCUS EFFECTS =====
const contactInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

contactInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.style.borderColor = '#6D28D9';
    this.style.borderWidth = '3px';
    this.style.boxShadow = '0 0 15px rgba(109, 40, 217, 0.2)';
  });
  
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.style.borderColor = '#E0E7FF';
      this.style.borderWidth = '2px';
      this.style.boxShadow = 'none';
    }
  });
});

// ===== HERO TEXT TYPE EFFECT (Optional) =====
const heroSubtitle = document.querySelector('.hero-text h2');

if (heroSubtitle) {
  const originalText = heroSubtitle.textContent;
  heroSubtitle.textContent = '';
  heroSubtitle.style.opacity = '1';
  
  let charIndex = 0;
  const typeSpeed = 30;
  
  function typeWriter() {
    if (charIndex < originalText.length) {
      heroSubtitle.textContent += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, typeSpeed);
    }
  }
  
  // Start typing after a short delay
  setTimeout(typeWriter, 500);
}

// ===== SCROLL PROGRESS INDICATOR =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #1E3A8A, #F59E0B, #6D28D9);
  width: 0%;
  z-index: 9999;
  transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = (window.pageYOffset / documentHeight) * 100;
  progressBar.style.width = scrolled + '%';
});

// ===== CONSOLE MESSAGE FOR HOMEPAGE =====
console.log('%c🚀 Homepage Loaded Successfully!', 'background: linear-gradient(135deg, #10B981, #6D28D9); color: white; font-size: 18px; padding: 10px; border-radius: 5px;');
console.log('%cExplore the future of Civilization 3.0', 'color: #1E3A8A; font-size: 14px; font-weight: bold;');


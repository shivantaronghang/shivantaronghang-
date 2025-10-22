// ========================================
// Background Particles Animation
// ========================================
const bgCanvas = document.querySelector('.bg-particles');
const bgCtx = bgCanvas.getContext('2d');
bgCanvas.width = window.innerWidth;
bgCanvas.height = document.querySelector('.future-map-section').offsetHeight;

const bgParticles = [];

// Create background particles
for(let i = 0; i < 80; i++) {
  bgParticles.push({
    x: Math.random() * bgCanvas.width,
    y: Math.random() * bgCanvas.height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    color: `rgba(${Math.random() > 0.5 ? '94, 61, 238' : '0, 255, 224'}, ${Math.random() * 0.5 + 0.2})`
  });
}

// Animate background particles
function animateBgParticles() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  
  bgParticles.forEach(p => {
    bgCtx.fillStyle = p.color;
    bgCtx.beginPath();
    bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    bgCtx.fill();
    
    // Move particles
    p.x += p.speedX;
    p.y += p.speedY;
    
    // Bounce off edges
    if(p.x < 0 || p.x > bgCanvas.width) p.speedX *= -1;
    if(p.y < 0 || p.y > bgCanvas.height) p.speedY *= -1;
  });
  
  requestAnimationFrame(animateBgParticles);
}

animateBgParticles();

// ========================================
// Timeline Phases Scroll Animation
// ========================================
const timelinePhases = document.querySelectorAll('.timeline-phase');

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if(entry.isIntersecting) {
      // Staggered animation delay
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 200);
    }
  });
}, { threshold: 0.2 });

timelinePhases.forEach(phase => observer.observe(phase));

// ========================================
// Flowing Energy Particles Between Phases
// ========================================
function animateFlow(canvas, isReverse = false) {
  if(!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  const particles = [];
  const colors = [
    'rgba(94, 61, 238, 0.8)', 
    'rgba(0, 255, 224, 0.8)', 
    'rgba(255, 0, 255, 0.8)'
  ];
  
  // Create flow particles
  for(let i = 0; i < 25; i++) {
    particles.push({
      x: isReverse ? canvas.width : 0,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: (Math.random() - 0.5) * 0.5
    });
  }

  // Draw and animate flow particles
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Move particles horizontally
      if(isReverse) {
        p.x -= p.speed;
        if(p.x < 0) p.x = canvas.width;
      } else {
        p.x += p.speed;
        if(p.x > canvas.width) p.x = 0;
      }
      
      // Add sine wave motion for organic feel
      p.y += Math.sin(p.x * 0.02) * p.angle;
      
      // Wrap around vertically
      if(p.y < 0) p.y = canvas.height;
      if(p.y > canvas.height) p.y = 0;
    });
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

// Initialize flow animations for all connectors
document.querySelectorAll('.timeline-flow-canvas').forEach((canvas, index) => {
  const phase = canvas.closest('.timeline-phase');
  const phaseIndex = Array.from(timelinePhases).indexOf(phase);
  const isEven = phaseIndex % 2 === 1;
  animateFlow(canvas, isEven);
});

// ========================================
// Resize Handler
// ========================================
window.addEventListener('resize', () => {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = document.querySelector('.future-map-section').offsetHeight;
});


// Create floating particles
const particlesContainer = document.getElementById('particles');
for(let i = 0; i < 50; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 20 + 's';
  particle.style.animationDuration = (15 + Math.random() * 10) + 's';
  particlesContainer.appendChild(particle);
}

// Email form submission with ripple effect
document.getElementById('emailForm').addEventListener('submit', function(e){
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const btn = e.target.querySelector('.btn');

  // Create ripple effect
  const ripple = document.createElement('span');
  ripple.style.position = 'absolute';
  ripple.style.width = '20px';
  ripple.style.height = '20px';
  ripple.style.background = 'rgba(255, 255, 255, 0.6)';
  ripple.style.borderRadius = '50%';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'ripple 0.6s ease-out';
  btn.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);

  if(name && email){
    document.getElementById('emailSuccess').textContent = `✓ Welcome aboard, ${name}! Check your inbox for confirmation.`;
    document.getElementById('emailForm').reset();
    // TODO: Integrate with your email service (e.g., EmailJS, Formspree, or backend API)
  } else {
    document.getElementById('emailSuccess').textContent = "⚠ Please fill in all fields.";
  }
});

// Scroll animation with parallax effect
const cards = document.querySelectorAll('.animate');

function showCards() {
  const triggerBottom = window.innerHeight * 0.85;

  cards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;

    if(cardTop < triggerBottom) {
      setTimeout(() => {
        card.classList.add('show');
      }, index * 150);
    }
  });
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
  showCards();
  
  const scrolled = window.pageYOffset;
  const particles = document.querySelectorAll('.particle');
  
  particles.forEach((particle, i) => {
    const speed = 0.5 + (i % 3) * 0.2;
    particle.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

window.addEventListener('load', showCards);

// Ripple animation for buttons
document.querySelectorAll('.btn, .restricted-btn, .platform').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'rippleEffect 0.6s ease-out';
    
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleEffect {
    to {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);


// Scroll animation for donate card
const donateCard = document.querySelectorAll('.animate');

function showDonateCard() {
  const triggerBottom = window.innerHeight * 0.85;

  donateCard.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if(cardTop < triggerBottom) {
      card.classList.add('show');
    }
  });
}

window.addEventListener('scroll', showDonateCard);
window.addEventListener('load', showDonateCard);
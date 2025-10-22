// Event Page Common JavaScript

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== FORM HANDLING =====
  const registrationForm = document.getElementById('registrationForm');
  const thankYouSection = document.getElementById('thankYouSection');
  const registrationSection = document.querySelector('.registration-section');
  
  // Handle form submission
  if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      if (!validateForm(this)) {
        return;
      }
      
      // Show loading state
      const submitBtn = this.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '⏳ Processing...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual API call)
      setTimeout(function() {
        // Hide registration section
        registrationSection.style.display = 'none';
        
        // Show thank you section
        thankYouSection.style.display = 'block';
        
        // Scroll to thank you section
        thankYouSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        
        // Reset form
        registrationForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Log submission (for tracking)
        console.log('Registration submitted successfully!');
        
      }, 1500);
    });
  }
  
  // ===== FORM VALIDATION =====
  function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(function(field) {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#ef4444';
        
        // Reset border color on input
        field.addEventListener('input', function() {
          this.style.borderColor = '#e2e8f0';
        }, { once: true });
      }
    });
    
    // Validate checkboxes
    const checkboxGroups = form.querySelectorAll('.checkbox-group');
    checkboxGroups.forEach(function(group) {
      const checkboxes = group.querySelectorAll('input[type="checkbox"]');
      const isChecked = Array.from(checkboxes).some(cb => cb.checked);
      
      if (!isChecked) {
        isValid = false;
        const label = group.closest('.form-group').querySelector('label');
        label.style.color = '#ef4444';
        
        // Reset label color on checkbox change
        checkboxes.forEach(function(cb) {
          cb.addEventListener('change', function() {
            label.style.color = '#1e293b';
          }, { once: true });
        });
      }
    });
    
    if (!isValid) {
      alert('Please fill in all required fields marked with *');
    }
    
    return isValid;
  }
  
  // ===== DYNAMIC FORM FIELDS =====
  const categorySelect = document.getElementById('category');
  const startupDetailsField = document.getElementById('startupDetails');
  const startupStageField = document.getElementById('startupStage');
  
  if (categorySelect) {
    categorySelect.addEventListener('change', function() {
      const value = this.value;
      
      // Show/hide startup-specific fields
      if (value === 'founder' || value === 'aspiring') {
        if (startupDetailsField) startupDetailsField.style.display = 'block';
        if (startupStageField) startupStageField.style.display = 'block';
      } else {
        if (startupDetailsField) startupDetailsField.style.display = 'none';
        if (startupStageField) startupStageField.style.display = 'none';
      }
    });
  }
  
  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
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
  
  // ===== SCROLL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.highlight-card, .schedule-item, .info-card, .event-intro, .event-highlights, .event-schedule'
  );
  
  animateElements.forEach(function(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
  
  // Add animation class
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
  
  // ===== FORM INPUT ENHANCEMENTS =====
  const formInputs = document.querySelectorAll('.event-form input, .event-form select, .event-form textarea');
  
  formInputs.forEach(function(input) {
    // Add focus effect
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
  
  // ===== EMAIL VALIDATION =====
  const emailInputs = document.querySelectorAll('input[type="email"]');
  
  emailInputs.forEach(function(input) {
    input.addEventListener('blur', function() {
      const email = this.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (email && !emailRegex.test(email)) {
        this.style.borderColor = '#ef4444';
        
        // Show error message
        let errorMsg = this.nextElementSibling;
        if (!errorMsg || !errorMsg.classList.contains('error-message')) {
          errorMsg = document.createElement('span');
          errorMsg.className = 'error-message';
          errorMsg.style.color = '#ef4444';
          errorMsg.style.fontSize = '0.85rem';
          errorMsg.style.marginTop = '5px';
          errorMsg.style.display = 'block';
          errorMsg.textContent = 'Please enter a valid email address';
          this.parentElement.appendChild(errorMsg);
        }
      } else {
        this.style.borderColor = '#e2e8f0';
        const errorMsg = this.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
          errorMsg.remove();
        }
      }
    });
  });
  
  // ===== PHONE NUMBER FORMATTING =====
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  
  phoneInputs.forEach(function(input) {
    input.addEventListener('input', function() {
      // Remove non-numeric characters except + at the start
      let value = this.value.replace(/[^\d+]/g, '');
      
      // Ensure + is only at the start
      if (value.includes('+')) {
        const parts = value.split('+');
        value = '+' + parts.join('');
      }
      
      this.value = value;
    });
  });
  
  // ===== TEXTAREA AUTO-RESIZE =====
  const textareas = document.querySelectorAll('textarea');
  
  textareas.forEach(function(textarea) {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  });
  
  // ===== COUNTDOWN TIMER (Optional) =====
  function createCountdown(eventDate) {
    const countdownElement = document.getElementById('countdown');
    
    if (!countdownElement) return;
    
    const countdown = setInterval(function() {
      const now = new Date().getTime();
      const distance = eventDate - now;
      
      if (distance < 0) {
        clearInterval(countdown);
        countdownElement.innerHTML = 'Event has started!';
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      countdownElement.innerHTML = `
        <div class="countdown-item">${days}<span>Days</span></div>
        <div class="countdown-item">${hours}<span>Hours</span></div>
        <div class="countdown-item">${minutes}<span>Minutes</span></div>
        <div class="countdown-item">${seconds}<span>Seconds</span></div>
      `;
    }, 1000);
  }
  
  // ===== BACK TO TOP BUTTON =====
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(backToTopBtn);
  
  // Show/hide back to top button
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });
  
  // Scroll to top on click
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Hover effect for back to top button
  backToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
  });
  
  backToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
  
  // ===== CONSOLE LOG =====
  console.log('Event page loaded successfully!');
  console.log('Form validation active');
  console.log('Scroll animations enabled');
  
});


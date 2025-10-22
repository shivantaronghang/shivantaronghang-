// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const submitButton = contactForm.querySelector('.btn-submit');
  const btnText = submitButton.querySelector('.btn-text');
  
  // Email configuration
  const CONTACT_EMAIL = 'contact@civilization3.org';
  
  // Form validation
  function validateForm(formData) {
    const errors = [];
    
    // Name validation
    if (formData.name.trim().length < 2) {
      errors.push('Please enter a valid name (at least 2 characters)');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Phone validation (optional but if provided should be valid)
    if (formData.phone && formData.phone.trim().length > 0) {
      const phoneRegex = /^[\d\s\+\-\(\)]+$/;
      if (!phoneRegex.test(formData.phone) || formData.phone.trim().length < 10) {
        errors.push('Please enter a valid phone number');
      }
    }
    
    // Subject validation
    if (!formData.subject || formData.subject === '') {
      errors.push('Please select a subject');
    }
    
    // Message validation
    if (formData.message.trim().length < 10) {
      errors.push('Please enter a message (at least 10 characters)');
    }
    
    return errors;
  }
  
  // Show message function
  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
  
  // Create email body
  function createEmailBody(formData) {
    return `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from Civilization 3.0 Contact Form
${new Date().toLocaleString()}
    `.trim();
  }
  
  // Send email using mailto (opens email client)
  function sendEmailViaMailto(formData) {
    const subject = encodeURIComponent(`Contact Form: ${formData.subject}`);
    const body = encodeURIComponent(createEmailBody(formData));
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
  }
  
  // Alternative: Send via Formspree or similar service
  async function sendEmailViaFormspree(formData) {
    // Replace with your actual Formspree endpoint
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/yourformid';
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Contact Form: ${formData.subject}`
        })
      });
      
      if (response.ok) {
        return { success: true };
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Form submit handler
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
      showMessage(errors.join('. '), 'error');
      return;
    }
    
    // Disable submit button
    submitButton.disabled = true;
    btnText.textContent = 'Sending...';
    
    // Method 1: Use mailto (default - always works)
    // This opens the user's email client
    sendEmailViaMailto(formData);
    
    // Show success message
    setTimeout(() => {
      showMessage('Your email client has been opened. Please send the message from there.', 'success');
      submitButton.disabled = false;
      btnText.textContent = 'Send Message';
      contactForm.reset();
    }, 1000);
    
    /* 
    // Method 2: Use Formspree or similar service (uncomment to use)
    // You need to set up a Formspree account and replace the endpoint above
    
    const result = await sendEmailViaFormspree(formData);
    
    if (result.success) {
      showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
      contactForm.reset();
    } else {
      showMessage('Oops! Something went wrong. Please try again or contact us directly via email.', 'error');
    }
    
    submitButton.disabled = false;
    btnText.textContent = 'Send Message';
    */
  });
  
  // Real-time validation feedback
  const inputs = contactForm.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() !== '' && !this.checkValidity()) {
        this.style.borderColor = '#EF4444';
      } else if (this.value.trim() !== '') {
        this.style.borderColor = '#22C55E';
      }
    });
    
    input.addEventListener('focus', function() {
      this.style.borderColor = '#6366F1';
    });
  });
  
  // Smooth scroll to section
  const contactLinks = document.querySelectorAll('a[href="#contact"]');
  contactLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
  
  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe contact elements
  const contactElements = document.querySelectorAll('.info-card, .form-card, .map-container');
  contactElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
});

// WhatsApp integration
function openWhatsApp() {
  const phone = '919864469182';
  const message = encodeURIComponent('Hello! I would like to connect regarding Civilization 3.0.');
  const whatsappURL = `https://wa.me/${phone}?text=${message}`;
  window.open(whatsappURL, '_blank');
}

// Add WhatsApp click handlers if needed
document.addEventListener('DOMContentLoaded', function() {
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Optional: Add analytics tracking here
      console.log('WhatsApp link clicked');
    });
  });
});

// Google Maps integration - Add markers or custom styling if needed
function initMap() {
  // This function can be used if you want to use Google Maps JavaScript API
  // instead of the iframe embed
  // Requires Google Maps API key
  
  /*
  const location = { lat: 25.5788, lng: 91.8933 }; // Shillong coordinates
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: location,
    styles: [] // Add custom map styles here
  });
  
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: 'Civilization 3.0 - Shillong'
  });
  */
}

// Email copy functionality
function copyEmail() {
  const email = 'contact@civilization3.org';
  navigator.clipboard.writeText(email).then(() => {
    alert('Email address copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy email:', err);
  });
}

// Phone click tracking
document.addEventListener('DOMContentLoaded', function() {
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
      console.log('Phone link clicked');
      // Add analytics tracking here if needed
    });
  });
});


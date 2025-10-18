// ===== READING PROGRESS BAR =====
window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});

// ===== SCROLL TO TOP =====
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ===== DOWNLOAD CONTENT =====
function downloadContent() {
  const sections = Array.from(document.querySelectorAll('.research-section'));
  let content = '';
  
  sections.forEach(section => {
    const heading = section.querySelector('h2') ? section.querySelector('h2').textContent : '';
    const text = section.textContent.trim();
    content += `${heading}\n${'='.repeat(heading.length)}\n\n${text}\n\n`;
  });

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Research_Article.txt';
  link.click();
  URL.revokeObjectURL(link.href);
}

// ===== TOC TOGGLE =====
document.getElementById('tocToggle').addEventListener('click', function() {
  const tocNav = document.getElementById('toc-nav');
  tocNav.classList.toggle('show');
  this.setAttribute('aria-expanded', tocNav.classList.contains('show'));
});

// ===== SMOOTH SCROLL FOR TOC LINKS =====
document.querySelectorAll('.toc-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Close TOC on mobile
      if (window.innerWidth <= 1024) {
        document.getElementById('toc-nav').classList.remove('show');
        document.getElementById('tocToggle').setAttribute('aria-expanded', 'false');
      }

      // Highlight active link
      document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// ===== SCROLLSPY FOR ACTIVE TOC LINK =====
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('.research-section');
  const links = document.querySelectorAll('.toc-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 300) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// ===== SECTION FOCUS STYLING =====
document.querySelectorAll('.research-section').forEach(section => {
  section.addEventListener('focusin', function() {
    this.style.backgroundColor = '#f8f7ff';
    this.style.borderLeft = '4px solid #6D28D9';
    this.style.paddingLeft = '16px';
  });

  section.addEventListener('focusout', function() {
    this.style.backgroundColor = 'transparent';
    this.style.borderLeft = 'none';
    this.style.paddingLeft = '0';
  });
});

// ===== HAMBURGER MENU =====
document.querySelector('.hamburger').addEventListener('click', function() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// ===== CLOSE MOBILE MENU ON LINK CLICK =====
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelector('.nav-links').style.display = 'none';
  });
});

// ===== EXTERNAL LINKS =====
document.querySelectorAll('a[href^="http"]').forEach(link => {
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
});

// ===== FORM SUBMISSION =====
document.querySelector('.footer-newsletter form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value;
  alert(`Thank you for subscribing with ${email}!`);
  this.reset();
});

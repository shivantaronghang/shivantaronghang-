// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  document.getElementById('scrollProgress').style.width = scrolled + '%';
});

// Back to top button logic
const backToTopBtn = document.getElementById('backToTopBtn');
window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});
backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// TOC toggle (mobile)
const tocToggle = document.querySelector('.toc-toggle');
const tocNav = document.querySelector('#toc-nav');
if (tocToggle) {
  tocToggle.addEventListener('click', () => {
    const expanded = tocToggle.getAttribute('aria-expanded') === 'true' || false;
    tocToggle.setAttribute('aria-expanded', !expanded);
    tocNav.hidden = expanded;
  });
}

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});


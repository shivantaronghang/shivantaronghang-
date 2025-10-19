// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progressPercent = (scrollTop / docHeight) * 100;
  document.getElementById('scrollProgress').style.width = progressPercent + '%';
});

// Back to top button
const backToTopBtn = document.getElementById('backToTopBtn');
window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Theme toggle button
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});


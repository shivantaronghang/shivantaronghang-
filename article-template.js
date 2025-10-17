// ===== Research Article Interactivity =====

// Reading progress bar
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});

// TOC Toggle
const tocToggle = document.querySelector('.toc-toggle');
const tocNav = document.getElementById('toc-nav');
tocToggle.addEventListener('click', () => {
  tocNav.classList.toggle('open');
  const expanded = tocToggle.getAttribute('aria-expanded') === 'true' || false;
  tocToggle.setAttribute('aria-expanded', !expanded);
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

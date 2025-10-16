// Reading progress bar
const progressBar = document.querySelector('.read-progress .bar');
window.addEventListener('scroll', () => {
  const article = document.querySelector('.article-main');
  if (!article) return;
  const scrollTop = window.scrollY;
  const docHeight = article.scrollHeight - window.innerHeight;
  const scrolled = Math.min(Math.max(scrollTop, 0), docHeight);
  const percent = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
  progressBar.style.width = percent + '%';
});

// Back-to-top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// TOC toggle (for mobile)
const tocToggle = document.querySelector('.toc-toggle');
const tocList = document.getElementById('toc-list');
if (tocToggle && tocList) {
  tocToggle.addEventListener('click', () => {
    const expanded = tocToggle.getAttribute('aria-expanded') === 'true';
    tocToggle.setAttribute('aria-expanded', !expanded);
    tocList.hidden = expanded;
  });
}

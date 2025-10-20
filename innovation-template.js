// innovation-template.js

document.addEventListener('DOMContentLoaded', function() {
  // Desktop TOC Toggle
  const desktopTocToggle = document.querySelector('.desktop-toc-toggle');
  const articleToc = document.querySelector('.article-toc');
  const articleContent = document.querySelector('.article-content');
  
  if (desktopTocToggle && articleToc) {
    desktopTocToggle.addEventListener('click', function() {
      const isExpanded = articleToc.classList.contains('collapsed');
      
      if (isExpanded) {
        // Expand TOC
        articleToc.classList.remove('collapsed');
        desktopTocToggle.setAttribute('aria-expanded', 'true');
        if (articleContent) {
          articleContent.style.marginLeft = '0';
        }
      } else {
        // Collapse TOC
        articleToc.classList.add('collapsed');
        desktopTocToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Mobile TOC Toggle
  const mobileTocToggle = document.querySelector('.mobile-toc-toggle');
  const tocNav = document.getElementById('toc-nav');
  
  if (mobileTocToggle && tocNav) {
    mobileTocToggle.addEventListener('click', function() {
      const isExpanded = mobileTocToggle.getAttribute('aria-expanded') === 'true';
      mobileTocToggle.setAttribute('aria-expanded', !isExpanded);
      tocNav.classList.toggle('expanded');
    });
  }
  
  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Highlight active section in TOC
  const sections = document.querySelectorAll('.article-section');
  const tocLinks = document.querySelectorAll('.toc-link');
  
  function highlightActiveSection() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });
    
    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
        link.style.borderLeftColor = '#2a5298';
        link.style.fontWeight = '600';
      } else {
        link.style.borderLeftColor = 'transparent';
        link.style.fontWeight = '500';
      }
    });
  }
  
  window.addEventListener('scroll', highlightActiveSection);
  
  // Smooth scrolling for TOC links
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update URL without page jump
        history.pushState(null, null, targetId);
        
        // Close TOC on mobile after clicking
        if (window.innerWidth <= 992) {
          if (tocNav) {
            tocNav.classList.remove('expanded');
          }
          if (mobileTocToggle) {
            mobileTocToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });
  
  // Initialize TOC state based on screen size
  function initTOCState() {
    if (window.innerWidth <= 992) {
      // Mobile - collapse TOC nav by default
      if (tocNav) {
        tocNav.classList.remove('expanded');
      }
      if (mobileTocToggle) {
        mobileTocToggle.setAttribute('aria-expanded', 'false');
      }
    } else {
      // Desktop - expand TOC by default
      if (articleToc) {
        articleToc.classList.remove('collapsed');
      }
      if (desktopTocToggle) {
        desktopTocToggle.setAttribute('aria-expanded', 'true');
      }
    }
  }
  
  // Initialize on load
  initTOCState();
  
  // Update on resize
  window.addEventListener('resize', initTOCState);
});

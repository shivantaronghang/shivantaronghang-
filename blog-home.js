// Header & Footer
document.getElementById("global-header").innerHTML = `
  <div class="header-container">
    <h2 class="logo">🌍 Civilization 3.0</h2>
    <nav>
      <a href="index.html">Home</a>
      <a href="blog-home.html" class="active">Blog</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
  </div>
`;
document.getElementById("global-footer").innerHTML = `
  <p>© 2025 Civilization 3.0 | Vision by <strong>Shivanta Ronghang</strong></p>
`;

// Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.blog-card');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    const cat = btn.dataset.category;
    cards.forEach(c => {
      c.style.display = cat === 'all' || c.dataset.category === cat ? 'block' : 'none';
    });
  });
});

// Search
document.getElementById('searchInput').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? 'block' : 'none';
  });
});

// Dark Mode Toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');

// Back to Top
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Copy Link Buttons
document.querySelectorAll('.copy-link').forEach(btn => {
  btn.addEventListener('click', () => {
    const link = btn.dataset.link;
    navigator.clipboard.writeText(window.location.origin + '/' + link);
    btn.textContent = "✅ Copied!";
    setTimeout(() => (btn.textContent = "📋 Copy Link"), 1500);
  });
});

// Global Site Link Copy
document.getElementById('copy-site-link').addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href);
  alert("Website link copied to clipboard ✅");
});// Header & Footer
document.getElementById("global-header").innerHTML = `
  <div class="header-container">
    <h2 class="logo">🌍 Civilization 3.0</h2>
    <nav>
      <a href="index.html">Home</a>
      <a href="blog-home.html" class="active">Blog</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
  </div>
`;
document.getElementById("global-footer").innerHTML = `
  <p>© 2025 Civilization 3.0 | Vision by <strong>Shivanta Ronghang</strong></p>
`;

// Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.blog-card');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    const cat = btn.dataset.category;
    cards.forEach(c => {
      c.style.display = cat === 'all' || c.dataset.category === cat ? 'block' : 'none';
    });
  });
});

// Search
document.getElementById('searchInput').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? 'block' : 'none';
  });
});

// Dark Mode Toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');

// Back to Top
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Copy Link Buttons
document.querySelectorAll('.copy-link').forEach(btn => {
  btn.addEventListener('click', () => {
    const link = btn.dataset.link;
    navigator.clipboard.writeText(window.location.origin + '/' + link);
    btn.textContent = "✅ Copied!";
    setTimeout(() => (btn.textContent = "📋 Copy Link"), 1500);
  });
});

// Global Site Link Copy
document.getElementById('copy-site-link').addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href);
  alert("Website link copied to clipboard ✅");
});



document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("blog-container");
  if (!container) return;

  fetch("data/blog-data.json")
    .then(response => {
      if (!response.ok) throw new Error("Network error");
      return response.json();
    })
    .then(data => {
      container.innerHTML = "";
      data.forEach(article => {
        const card = document.createElement("article");
        card.classList.add("blog-card");
        card.innerHTML = `
          <img src="${article.image}" alt="${article.title}">
          <div class="blog-content">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <div class="blog-meta">
              <span>🕒 ${article.date}</span>
              <span>By ${article.author}</span>
            </div>
            <a href="${article.link}" class="read-more">Explore Full Article →</a>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error loading blog data:", error);
      container.innerHTML = `<p style="color:#999;">⚠️ Failed to load blog articles.</p>`;
    });
});

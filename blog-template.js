// Dynamic article data - structured for scalability
const articles = [
  {
    id: 1,
    title: 'How to Write a Blog Post Template',
    author: 'John Doe',
    date: 'October 15, 2025',
    image: 'https://via.placeholder.com/900x400',
    content: `
      <p>Writing a blog post template helps you save time and stay consistent with your writing style. This article explores how to structure and optimize your blog posts effectively.</p>
      <h3>Step 1: Define Your Structure</h3>
      <p>Start by defining your main headers: Introduction, Main Points, and Conclusion. Consistency helps readers follow your ideas clearly.</p>
      <h3>Step 2: Use SEO Optimized Headings</h3>
      <p>Include target keywords naturally in H1, H2, and H3 tags. This improves readability and SEO ranking.</p>
      <p>By applying these steps, you’ll create blog content that engages your readers and performs better in search results.</p>
    `,
  },
  // Add more articles here as needed
];

// Utility: sanitize strings if inserting user input (optional enhancement)
// function sanitizeHTML(str) {
//   // Use DOMPurify or manual sanitization to avoid XSS
// }

// Render selected article dynamically
function loadArticle() {
  const container = document.getElementById('article-container');
  if (!container) {
    console.error('Article container element not found.');
    return;
  }

  // Parse URL parameter 'id' using modern API
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get('id');

  // Use strict comparison & fallback logic
  const articleId = Number(idParam);
  const article = articles.find((a) => a.id === articleId) ?? articles[0];

  if (!article) {
    container.innerHTML = `
      <p>Sorry, the requested article was not found.</p>
      <a href="articles.html" class="back-link">← Back to Articles</a>
    `;
    return;
  }

  // Inject article content using template literals
  container.innerHTML = `
    <div class="article-header">
      <h2>${article.title}</h2>
      <p class="article-meta" aria-label="Published on ${article.date} by ${article.author}">Published on ${article.date} by ${article.author}</p>
    </div>
    <img src="${article.image}" alt="${article.title}" class="article-image" />
    <div class="article-content">${article.content}</div>
    <a href="articles.html" class="back-link" aria-label="Back to articles list">← Back to Articles</a>
  `;

  // Optional: add fade-in animation class
  container.classList.add('fadeIn');
}

// Initialize after DOM fully loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    loadArticle();
  } catch (error) {
    console.error('Error loading article:', error);
    const container = document.getElementById('article-container');
    if (container) {
      container.innerHTML = `<p>Unexpected error occurred. Please try again later.</p>`;
    }
  }
});




let articles = [ /* आपकी existing in-code array यहाँ */ ];

// JSON backup file का URL
const JSON_BACKUP_URL = 'https://yourdomain.com/path/to/articles-backup.json';

// JSON से backup data fetch करें, fallback to existing JS data
async function fetchJsonBackup() {
  try {
    const response = await fetch(JSON_BACKUP_URL, { cache: 'reload' });
    if (!response.ok) throw new Error('Failed to fetch JSON backup');

    const jsonData = await response.json();
    if (Array.isArray(jsonData) && jsonData.length > 0) {
      articles = jsonData; // Update articles only if fetch successful
      console.log('JSON backup data loaded successfully');
    }
  } catch (error) {
    console.warn('Using fallback existing JS data. JSON backup fetch error:', error);
  }
}

// आपकी existing render व load functions
function renderArticlesList() {
  const container = document.getElementById('articles-list');
  if (!container) return;

  container.innerHTML = articles.map(a => `
    <article class="article-card" aria-labelledby="title-${a.id}">
      <h2 id="title-${a.id}">${a.title}</h2>
      <p>${a.excerpt}</p>
      <a href="article-details.html?id=${a.id}" aria-label="Read more about ${a.title}">Read More →</a>
    </article>
  `).join('');
}

function loadArticle() {
  const container = document.getElementById('article-container');
  if (!container) return;

  const id = Number(new URLSearchParams(window.location.search).get('id'));
  const article = articles.find(a => a.id === id) || articles[0];

  if (!article) {
    container.innerHTML = '<p>Article not found.</p>';
    return;
  }

  container.innerHTML = `
    <h2>${article.title}</h2>
    <p>Published on ${article.date} by ${article.author}</p>
    <img src="${article.image}" alt="${article.title}" />
    <div>${article.content}</div>
    <a href="articles.html" aria-label="Back to articles">← Back to Articles</a>
  `;
}

// DOMContentLoaded पर JSON fetch करें फिर render करें
document.addEventListener('DOMContentLoaded', async () => {
  await fetchJsonBackup();

  if (document.getElementById('article-container')) {
    loadArticle();  // Detail view
  } else if (document.getElementById('articles-list')) {
    renderArticlesList();  // List view
  }
});



// Service Worker को Register करना (main.js या किसी JS में) //
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}



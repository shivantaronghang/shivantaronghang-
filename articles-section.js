// === Blog Filter & Search Functionality ===

// Get all necessary elements
const filterButtons = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const blogList = document.getElementById('blogList');

// Store current filter category
let currentCategory = 'all';

// === Category Filter Functionality ===
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Get selected category
    currentCategory = button.getAttribute('data-category');
    
    // Clear search input when changing filter
    searchInput.value = '';
    
    // Apply filter
    filterCards();
  });
});

// === Search Functionality ===
searchInput.addEventListener('input', () => {
  filterCards();
});

// === Main Filter Function ===
function filterCards() {
  const searchQuery = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;
  
  blogCards.forEach(card => {
    const cardCategories = card.getAttribute('data-category').toLowerCase();
    const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
    const cardDescription = card.querySelector('.card-description').textContent.toLowerCase();
    
    // Check if card matches category filter
    const matchesCategory = currentCategory === 'all' || cardCategories.includes(currentCategory);
    
    // Check if card matches search query
    const matchesSearch = searchQuery === '' || 
                         cardTitle.includes(searchQuery) || 
                         cardDescription.includes(searchQuery) ||
                         cardCategories.includes(searchQuery);
    
    // Show card if it matches both filters
    if (matchesCategory && matchesSearch) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.5s ease forwards';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Show/hide "no results" message
  if (visibleCount === 0) {
    noResults.style.display = 'block';
    blogList.style.display = 'grid';
  } else {
    noResults.style.display = 'none';
  }
}

// === Smooth Scroll for Read More Links ===
document.querySelectorAll('.read-more').forEach(link => {
  link.addEventListener('click', (e) => {
    // Add a subtle animation effect on click
    link.style.transform = 'scale(0.95)';
    setTimeout(() => {
      link.style.transform = 'scale(1)';
    }, 150);
  });
});

// === Add Loading Animation ===
window.addEventListener('load', () => {
  blogCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
    }, index * 100);
  });
});

// === Accessibility: Keyboard Navigation ===
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchInput.value = '';
    filterCards();
    searchInput.blur();
  }
});

// === Real-time Results Counter (Optional Enhancement) ===
function updateResultsCount() {
  const visibleCards = Array.from(blogCards).filter(card => 
    card.style.display !== 'none'
  ).length;
  
  // You can display this count somewhere if needed
  console.log(`Showing ${visibleCards} of ${blogCards.length} articles`);
}

// === Clear Search Button Functionality (Enhancement) ===
searchInput.addEventListener('input', (e) => {
  if (e.target.value.length > 0) {
    searchInput.style.paddingRight = '45px';
  } else {
    searchInput.style.paddingRight = '20px';
  }
  updateResultsCount();
});

// === Highlight Search Terms (Optional Enhancement) ===
function highlightSearchTerm(text, term) {
  if (!term) return text;
  
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// === Initialize ===
document.addEventListener('DOMContentLoaded', () => {
  // Set initial state
  filterCards();
  
  // Add smooth transitions
  blogCards.forEach(card => {
    card.style.opacity = '0';
  });
  
  // Console message for developers
  console.log('Blog filter and search system initialized successfully!');
  console.log(`Total articles: ${blogCards.length}`);
  console.log(`Filter categories: ${filterButtons.length}`);
});


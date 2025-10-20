/* ---------------- Dark Mode Toggle ---------------- */
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('click', () => document.body.classList.toggle('dark'));

/* ---------------- Back to Top ---------------- */
const backToTop = document.getElementById('back-to-top');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------------- Copy Link ---------------- */
document.getElementById('copy-link').addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href);
  alert('Link copied to clipboard!');
});

/* ---------------- Article & AI Dashboard ---------------- */
let nodes = [], links = [], currentArticleHtml = document.getElementById('article-body').innerHTML;
const summaryContainer = document.getElementById('ai-summary-cards');
const reasoningPanel = document.getElementById('ai-reasoning-panel');
const tooltip = document.getElementById('ai-tooltip');
let userInteractions = { clickedNodes: {}, clickedCards: {}, timelineScrubs: 0 };

/* ---------------- Generate AI Summary ---------------- */
async function generateAISummary() {
  summaryContainer.innerHTML = 'Loading...';
  try {
    const res = await fetch('/api/ai-summary', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ html: currentArticleHtml })
    });
    const data = await res.json();
    summaryContainer.innerHTML = '';
    data.cards.forEach(card => {
      const div = document.createElement('div');
      div.className = 'summary-card';
      div.innerHTML = `<h4>${card.title}</h4>
                       <p>${card.content}</p>
                       <div class="progress-bar" style="width:${card.importance}%"></div>`;
      div.addEventListener('mouseenter', () => showReasoning(card.reasoning));
      div.addEventListener('mouseleave', hideReasoning);
      summaryContainer.appendChild(div);
    });
  } catch(e) {
    summaryContainer.innerHTML = '<p>Failed to load AI summary. Showing fallback summary.</p>';
  }
}

/* ---------------- Reasoning Panel ---------------- */
function showReasoning(text) {
  reasoningPanel.innerHTML = text;
  reasoningPanel.classList.add('visible');
}
function hideReasoning() {
  reasoningPanel.classList.remove('visible');
}

/* ---------------- Regenerate Summary ---------------- */
document.getElementById('regenerate-summary').addEventListener('click', async () => {
  summaryContainer.style.opacity = 0;
  await generateAISummary();
  summaryContainer.style.opacity = 1;
});

/* ---------------- AI Knowledge Map ---------------- */
const canvas = document.getElementById('ai-knowledge-map');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function drawNodes() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size || 20, 0, 2*Math.PI);
    ctx.fillStyle = node.isPredicted ? '#ffba3d' : '#6c63ff';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  let found = false;

  nodes.forEach(n => {
    const dx = mouseX - n.x, dy = mouseY - n.y;
    if(Math.sqrt(dx*dx + dy*dy) < (n.size || 20)) {
      tooltip.style.left = e.clientX + 12 + 'px';
      tooltip.style.top = e.clientY + 12 + 'px';
      tooltip.innerHTML = n.reasoning || 'Loading reasoning...';
      tooltip.style.opacity = 1;
      found = true;
    }
  });

  if(!found) tooltip.style.opacity = 0;
});

/* ---------------- Timeline Slider ---------------- */
document.getElementById('timeline-slider').addEventListener('input', e => {
  userInteractions.timelineScrubs++;
  // Optionally update nodes/cards according to timeline
});

/* ---------------- Suggested Reading ---------------- */
const suggestedContainer = document.getElementById('suggested-reading');
async function generatePredictiveInsights() {
  suggestedContainer.innerHTML = '';
  try {
    const res = await fetch('/api/predict-insights', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ html: currentArticleHtml, interactions: userInteractions })
    });
    const data = await res.json();
    data.predictedCards.forEach(card => {
      const div = document.createElement('div');
      div.className = 'suggested-card predicted-card';
      div.setAttribute('data-id', card.id);
      div.innerHTML = `<h5>${card.title}</h5><p>${card.description}</p>`;
      div.addEventListener('click', () => handleSuggestedClick(card));
      div.addEventListener('mouseenter', () => showReasoning(card.reasoning));
      div.addEventListener('mouseleave', hideReasoning);
      suggestedContainer.appendChild(div);
    });

    // Highlight predicted nodes
    data.predictedNodes.forEach(pred => {
      const node = nodes.find(n => n.id === pred.id);
      if(node) node.isPredicted = true;
    });
    drawNodes();

  } catch(e) {
    console.warn('Prediction API failed, using local fallback');
  }
}

function handleSuggestedClick(card) {
  userInteractions.clickedCards[card.id] = (userInteractions.clickedCards[card.id] || 0) + 1;
  generatePredictiveInsights();
}

/* ---------------- Initial Load ---------------- */
(async function initDashboard() {
  // Mock nodes and links for demo
  nodes = [
    {id:'n1', x:100, y:100, size:20, reasoning:'Node 1: Core Civilization Idea'},
    {id:'n2', x:300, y:200, size:20, reasoning:'Node 2: Innovation Hub'},
    {id:'n3', x:500, y:120, size:20, reasoning:'Node 3: Future Tech Trends'}
  ];
  drawNodes();
  await generateAISummary();
  await generatePredictiveInsights();
})();
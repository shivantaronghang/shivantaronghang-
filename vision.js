// ===== FUTURE CIVILIZATION MAP INTERACTIVITY =====
const infoCard = document.getElementById("infoCard");
const sectorTitle = document.getElementById("sectorTitle");
const sectorDescription = document.getElementById("sectorDescription");

const sectorData = {
  education: {
    title: "📚 Education Revolution",
    description: "Transforming education with AI, ethics, and digital learning to build scientifically enlightened global citizens who can innovate and lead civilization’s evolution."
  },
  ai: {
    title: "🤖 Artificial Intelligence & Ethics",
    description: "Developing transparent, ethical AI frameworks that serve humanity — powering healthcare, governance, and sustainable industries without bias or exploitation."
  },
  ecology: {
    title: "🌱 Ecology & Sustainability",
    description: "Restoring balance between humanity and nature through green innovation, renewable energy, circular economy, and biodiversity protection."
  },
  economy: {
    title: "💰 Economy & Innovation",
    description: "Building a decentralized, inclusive economy driven by innovation, digital infrastructure, ethical trade, and equitable wealth distribution."
  },
  governance: {
    title: "🏛 Governance & Justice",
    description: "Designing transparent, accountable, and participatory systems that ensure equality, liberty, and justice for all citizens in Civilization 3.0."
  }
};

document.querySelectorAll("area[data-sector]").forEach(area => {
  area.addEventListener("click", (e) => {
    e.preventDefault();
    const sector = e.target.dataset.sector;
    const data = sectorData[sector];
    if (data) {
      sectorTitle.textContent = data.title;
      sectorDescription.textContent = data.description;
      infoCard.style.transform = "scale(1.05)";
      setTimeout(() => infoCard.style.transform = "scale(1)", 200);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in, .fade-in-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach((el) => observer.observe(el));
});

document.addEventListener("scroll", () => {
  document.querySelectorAll(".phase").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});

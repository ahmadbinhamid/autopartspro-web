const tabs = document.querySelectorAll('.feature-tab');
const cards = document.querySelectorAll('.spec-card');
const searchInput = document.getElementById('featureSearch');
const emptyState = document.getElementById('featureEmpty');

let activeFilter = 'all';

cards.forEach((card, i) => {
  card.style.setProperty('--card-index', i % 9);
});

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchesQuery = !query || card.dataset.search.includes(query) || card.textContent.toLowerCase().includes(query);
    const visible = matchesCategory && matchesQuery;
    card.style.display = visible ? '' : 'none';
    if (visible) visibleCount++;
  });

  emptyState.hidden = visibleCount !== 0;
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    activeFilter = tab.dataset.filter;
    applyFilters();
  });
});

searchInput.addEventListener('input', applyFilters);

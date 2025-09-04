document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.destination-card');
  const searchInput = document.getElementById("searchInput");
  let currentRegion = 'all';

  window.filterByRegion = function(region) {
    currentRegion = region.toLowerCase();
    searchInput.value = ""; // Clear search input
    applyFilters();
  };

  window.filterDestinations = function () {
    applyFilters();
  };

  function applyFilters() {
    const query = searchInput.value.toLowerCase();
    cards.forEach(card => {
      const cardRegion = card.dataset.region.toLowerCase();
      const name = card.dataset.name.toLowerCase();

      const matchesRegion = currentRegion === 'all' || cardRegion === currentRegion;
      const matchesSearch = !query || name.includes(query);

      card.classList.toggle('hidden', !(matchesRegion && matchesSearch));
    });
  }
});


// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-theme');
  if (!toggleBtn) return;

  function applyTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      toggleBtn.textContent = '☀️'; // Sun icon
    } else {
      document.documentElement.classList.remove('dark-theme');
      toggleBtn.textContent = '🌙'; // Moon icon
    }
  }

  applyTheme();

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    applyTheme();
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const taskCards = document.querySelectorAll('.task-card');
  const searchInput = document.getElementById('taskSearch');

  let currentFilter = 'all';

  function updateTasks() {
    const query = searchInput.value.toLowerCase();
    taskCards.forEach(card => {
      const status = card.dataset.status;
      const text = card.querySelector('.task-text').textContent.toLowerCase();
      const matchesFilter = currentFilter === 'all' || currentFilter === status;
      const matchesSearch = text.includes(query);
      card.style.display = matchesFilter && matchesSearch ? 'flex' : 'none';
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.filter;
      filterButtons.forEach(btn => btn.classList.remove('active-filter'));
      button.classList.add('active-filter');
      updateTasks();
    });
  });

  searchInput.addEventListener('input', updateTasks);

  updateTasks();

    toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    applyTheme();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-theme');
  if (!toggleBtn) return;

  function applyTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      toggleBtn.textContent = '☀️';
    } else {
      document.body.classList.remove('dark-mode');
      toggleBtn.textContent = '🌙';
    }
  }

  applyTheme();

  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    applyTheme();
  });
});

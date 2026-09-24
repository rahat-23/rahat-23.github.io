(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) root.dataset.theme = 'dark';

  const themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    const sync = () => themeBtn.textContent = root.dataset.theme === 'dark' ? '☀' : '☾';
    sync();
    themeBtn.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', root.dataset.theme);
      sync();
    });
  }

  const menuBtn = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('.nav-links');
  if (menuBtn && nav) menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));
})();

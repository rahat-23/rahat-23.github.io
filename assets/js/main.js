(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');

  if (saved) {
    root.dataset.theme = saved;
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.dataset.theme = 'dark';
  }

  const themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    const sync = () => {
      themeBtn.textContent = root.dataset.theme === 'dark' ? '☀' : '☾';
    };
    sync();

    themeBtn.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', root.dataset.theme);
      sync();
    });
  }

  const menuBtn = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('.nav-links');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  }

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => nav?.classList.remove('open'));
  });

  // Site-wide academic name consistency.
  // Existing pages may still contain the older "Dr. Rahat Izhar" label in their source;
  // this keeps the visible portfolio consistent while pages are progressively refreshed.
  const oldName = 'Dr. Rahat Izhar';
  const newName = 'Rahat Izhar, Ph.D.';

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE'].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.includes(oldName)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    }
  );

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    node.nodeValue = node.nodeValue.replaceAll(oldName, newName);
  });

  document.title = document.title.replaceAll(oldName, newName);

  document.querySelectorAll('meta[content], img[alt]').forEach(el => {
    const attr = el.hasAttribute('content') ? 'content' : 'alt';
    const value = el.getAttribute(attr);
    if (value && value.includes(oldName)) {
      el.setAttribute(attr, value.replaceAll(oldName, newName));
    }
  });
})();


// Back to top button
(() => {
  const button = document.createElement('button');

  button.className = 'back-to-top';
  button.type = 'button';
  button.setAttribute('aria-label', 'Back to top');
  button.setAttribute('title', 'Back to top');
  button.innerHTML = '↑';

  document.body.appendChild(button);

  const updateVisibility = () => {
    button.classList.toggle('visible', window.scrollY > 450);
  };

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();

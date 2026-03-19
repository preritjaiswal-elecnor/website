(function () {
  const nav = document.getElementById('primary-nav');
  const toggle = document.querySelector('.nav-toggle');
  const subToggles = nav ? nav.querySelectorAll('.has-sub > .top-link') : [];

  // Mobile drawer toggle
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    if (open) {
      // Focus first link/button in the drawer
      setTimeout(() => (nav.querySelector('.top-link, a')?.focus()), 0);
    }
  });

  // Open/close submenus on click (mobile + keyboard)
  subToggles.forEach(btn => {
    if (btn.tagName.toLowerCase() !== 'button') return; // top-link may be an <a> for non-sub items
    btn.addEventListener('click', (e) => {
      const li = e.currentTarget.closest('li');
      const isOpen = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));

      // Close siblings
      li.parentElement.querySelectorAll(':scope > .has-sub').forEach(sibling => {
        if (sibling !== li) {
          sibling.classList.remove('open');
          sibling.querySelector('.top-link')?.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  // Close drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav) return;
    const clickedInside = nav.contains(e.target) || toggle.contains(e.target);
    if (!clickedInside && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ESC closes drawer and any open submenu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      nav?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      document.querySelectorAll('.has-sub').forEach(li => {
        li.classList.remove('open');
        li.querySelector('.top-link')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Mark current page as active (aria-current)
  (function markActive() {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      const file = href.split('/').pop();
      if (file === current) a.setAttribute('aria-current', 'page');
    });
  })();
})();

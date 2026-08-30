(async () => {
  // Fetch the single file containing both header and footer
  const res = await fetch('layout.html');
  const html = await res.text();

  // Parse it so we can pull out the <header> and <footer> pieces separately
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const headerEl = doc.querySelector('header');
  const footerEl = doc.querySelector('footer');

  const headerPlaceholder = document.getElementById('site-header');
  const footerPlaceholder = document.getElementById('site-footer');

  if (headerPlaceholder && headerEl) headerPlaceholder.innerHTML = headerEl.outerHTML;
  if (footerPlaceholder && footerEl) footerPlaceholder.innerHTML = footerEl.outerHTML;

  // Mark the current page's nav link as active
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-page]').forEach(link => {
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('active');
    }
  });

  // Hamburger menu (must run after header is injected)
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
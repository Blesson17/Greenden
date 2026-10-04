document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      navLinks.classList.toggle('open', !isOpen);
    });

    navLinks.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
        navLinks.classList.remove('open');
      }
    });
  }

  const productGrid = document.querySelector('#product-grid');

  if (productGrid) {
    const products = [...productGrid.querySelectorAll('.product-card')];
    const filterButtons = [...document.querySelectorAll('.filter-button')];
    const searchInput = document.querySelector('#product-search');
    const status = document.querySelector('#filter-status');
    const emptyState = document.querySelector('#empty-state');
    let activeFilter = 'all';

    const updateProducts = () => {
      const query = searchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      products.forEach((product) => {
        const matchesFilter = activeFilter === 'all' || product.dataset.category === activeFilter;
        const matchesSearch = product.dataset.name.includes(query);
        const isVisible = matchesFilter && matchesSearch;
        product.hidden = !isVisible;
        visibleCount += Number(isVisible);
      });

      status.textContent = `Showing ${visibleCount} of ${products.length} pieces`;
      emptyState.hidden = visibleCount > 0;
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.filter;
        filterButtons.forEach((filterButton) => {
          const isSelected = filterButton === button;
          filterButton.classList.toggle('selected', isSelected);
          filterButton.setAttribute('aria-pressed', String(isSelected));
        });
        updateProducts();
      });
    });

    searchInput.addEventListener('input', updateProducts);
  }

  const contactForm = document.querySelector('#contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const name = new FormData(contactForm).get('name').trim();
      document.querySelector('#form-status').textContent = `Thanks, ${name}. Your note is ready for the Greenden team.`;
      contactForm.reset();
    });
  }
});

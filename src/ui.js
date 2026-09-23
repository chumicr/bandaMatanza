/** Interacciones compartidas por todas las vistas. */
export function renderNavigation(element, items) {
  element.innerHTML = items.map((item) => {
    if (!item.children) return `<div class="nav-item"><a class="nav-link" href="${item.href}">${item.label}</a></div>`;
    const children = item.children.map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
    return `<div class="nav-item"><a class="nav-link" href="${item.href}">${item.label}<span class="chevron" aria-hidden="true">⌄</span></a><div class="dropdown">${children}</div></div>`;
  }).join('');
}

export function setupNavigation({ navElement, menuButton }) {
  menuButton.addEventListener('click', () => {
    const isOpen = navElement.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    const item = event.target.closest('.nav-item');
    if (window.innerWidth > 900 || !item?.querySelector('.dropdown')) return;
    if (event.target.matches('.nav-link')) {
      item.classList.toggle('open');
      event.preventDefault();
    }
  });
}

export function setupRevealAnimations(root) {
  const nodes = root.querySelectorAll('.card, .event, .person, .contact-card, .gallery-item, .paper, .feature-card, .board-member, .price-card');
  nodes.forEach((node, index) => {
    node.classList.add('reveal');
    node.style.transitionDelay = `${Math.min(index * 55, 280)}ms`;
  });
  if (!('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  nodes.forEach((node) => observer.observe(node));
}

export function setActiveNavigation(navElement, route) {
  navElement.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${route}` || (route === 'inicio' && link.getAttribute('href') === '#inicio'));
  });
}

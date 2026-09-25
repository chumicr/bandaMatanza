export function renderNavigation(element, items) {
  element.innerHTML = items.map((item) => {
    if (!item.children) return `<div class="nav-item"><a class="nav-link" href="${item.href}">${item.label}</a></div>`;
    const children = item.children.map(([label, href]) => {
      const external = /^https?:\/\//i.test(href);
      return `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
    }).join('');
    return `<div class="nav-item"><button class="nav-link nav-parent" type="button" aria-haspopup="true" aria-expanded="false">${item.label}<span class="chevron" aria-hidden="true">⌄</span></button><div class="dropdown">${children}</div></div>`;
  }).join('');
}

export function setupNavigation(navElement, menuButton) {
  menuButton.addEventListener('click', () => {
    const isOpen = navElement.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  document.addEventListener('click', (event) => {
    const item = event.target.closest('.nav-item');
    if (window.innerWidth > 900 || !item?.querySelector('.dropdown')) return;
    if (event.target.matches('.nav-parent')) {
      const isOpen = item.classList.toggle('open');
      event.target.setAttribute('aria-expanded', String(isOpen));
      event.preventDefault();
    }
  });
}

export function setActiveNavigation(navElement, route) {
  navElement.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${route}` || (route === 'inicio' && link.getAttribute('href') === '#inicio')));
  navElement.querySelectorAll('.nav-item').forEach((item) => {
    const hasActiveChild = [...item.querySelectorAll('.dropdown a')].some(link => link.getAttribute('href') === `#${route}`);
    item.querySelector('.nav-parent')?.classList.toggle('active', hasActiveChild);
  });
}

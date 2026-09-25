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
  const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  nodes.forEach((node) => observer.observe(node));
}

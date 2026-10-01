(() => {
  const carousel = document.querySelector('[data-promo-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('.promo-carousel-track');
  const slides = track ? [...track.children] : [];
  const previous = carousel.querySelector('.promo-carousel-button.is-prev');
  const next = carousel.querySelector('.promo-carousel-button.is-next');
  const dots = carousel.querySelector('.promo-carousel-dots');
  if (!track || slides.length < 2) {
    carousel.querySelector('.promo-carousel-controls')?.setAttribute('hidden', '');
    return;
  }

  let activeIndex = 0;
  let timer;
  let pointerStartX = null;
  let pointerStartY = null;
  const setActive = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    dots?.querySelectorAll('button').forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
  };
  const restart = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => setActive(activeIndex + 1), 15000);
  };

  if (dots) {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ver anuncio ${index + 1}`);
      dot.addEventListener('click', () => { setActive(index); restart(); });
      dots.append(dot);
    });
  }
  previous?.addEventListener('click', () => { setActive(activeIndex - 1); restart(); });
  next?.addEventListener('click', () => { setActive(activeIndex + 1); restart(); });
  carousel.addEventListener('mouseenter', () => window.clearInterval(timer));
  carousel.addEventListener('mouseleave', restart);
  carousel.addEventListener('focusin', () => window.clearInterval(timer));
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) restart();
  });
  carousel.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    window.clearInterval(timer);
  });
  carousel.addEventListener('pointerup', (event) => {
    if (pointerStartX === null || pointerStartY === null) return;
    const deltaX = event.clientX - pointerStartX;
    const deltaY = event.clientY - pointerStartY;
    pointerStartX = null;
    pointerStartY = null;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
      setActive(activeIndex + (deltaX < 0 ? 1 : -1));
    }
    restart();
  });
  carousel.addEventListener('pointercancel', () => {
    pointerStartX = null;
    pointerStartY = null;
    restart();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) window.clearInterval(timer);
    else restart();
  });
  setActive(0);
  restart();
})();

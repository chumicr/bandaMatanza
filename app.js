const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Escuela', href: '#escuela', children: [['Matr\u00edcula', '#matricula'], ['Proyecto educativo', '#proyecto-educativo'], ['Profesorado', '#profesorado'], ['Banda Joven', '#banda-joven'], ['Calendario y horarios', '#calendario']] },
  { label: 'Banda', href: '#banda', children: [['Nuestra Historia', '#nuestra-historia'], ['Director', '#director'], ['Junta directiva', '#junta-directiva']] },
  { label: 'Galer\u00eda', href: '#galeria' },
  { label: 'Hazte socio', href: '#socios' }
];


const MEDIA = {
  hero: 'assets/portada.jpg',
  concert: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80',
  music: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1000&q=80',
  people: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  conductor: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
  classroom: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80'
};

const GOOGLE_MATRICULA_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe4RqX9fAiKJMHloaDeJsIDnBM1OJbAM5EcYm_EAPrhZkgsSQ/viewform?embedded=true';

function renderNavigation(element, items) {
  element.innerHTML = items.map((item) => {
    if (!item.children) return `<div class="nav-item"><a class="nav-link" href="${item.href}">${item.label}</a></div>`;
    const children = item.children.map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
    return `<div class="nav-item"><button class="nav-link nav-parent" type="button" aria-haspopup="true" aria-expanded="false">${item.label}<span class="chevron" aria-hidden="true">&#x2304;</span></button><div class="dropdown">${children}</div></div>`;
  }).join('');
}

function setupNavigation(navElement, menuButton) {
  menuButton.addEventListener('click', () => {
    const isOpen = navElement.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  document.addEventListener('click', (event) => {
    const item = event.target.closest('.nav-item');
    if (window.innerWidth > 900 || !item?.querySelector('.dropdown')) return;
    if (event.target.matches('.nav-parent')) { const isOpen = item.classList.toggle('open'); event.target.setAttribute('aria-expanded', String(isOpen)); event.preventDefault(); }
  });
}

function setupRevealAnimations(root) {
  const nodes = root.querySelectorAll('.card, .event, .person, .contact-card, .gallery-item, .paper, .feature-card, .board-member, .price-card');
  nodes.forEach((node, index) => { node.classList.add('reveal'); node.style.transitionDelay = `${Math.min(index * 55, 280)}ms`; });
  if (!('IntersectionObserver' in window)) { nodes.forEach((node) => node.classList.add('is-visible')); return; }
  const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); currentObserver.unobserve(entry.target); }
  }), { threshold: 0.12 });
  nodes.forEach((node) => observer.observe(node));
}

function setActiveNavigation(navElement, route) {
  navElement.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${route}` || (route === 'inicio' && link.getAttribute('href') === '#inicio')));
}

function setupGalleryLightbox(root) {
  const lightbox = root.querySelector('[data-gallery-lightbox]');
  if (!lightbox) return;
  const image = lightbox.querySelector('img');
  const caption = lightbox.querySelector('p');
  const close = () => { lightbox.hidden = true; document.body.classList.remove('modal-open'); };
  root.querySelectorAll('[data-gallery-item]').forEach((item) => item.addEventListener('click', () => {
    image.src = item.dataset.src;
    image.alt = item.dataset.label;
    caption.textContent = item.dataset.label;
    lightbox.hidden = false;
    document.body.classList.add('modal-open');
  }));
  root.querySelector('.gallery-open-feature')?.addEventListener('click', () => {
    const feature = root.querySelector('.gallery-feature-image');
    feature.click();
  });
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox || event.target.closest('.gallery-lightbox-close')) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); }, { once: true });
}

/* Legacy inline configuration replaced by src/config.js.
const nav = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Escuela', href: '#escuela', children: [
    ['Matrícula', '#matricula'], ['Proyecto educativo', '#proyecto-educativo'], ['Profesorado', '#profesorado'], ['Banda Joven', '#banda-joven'], ['Calendario y horarios', '#calendario']
  ]},
  { label: 'Banda', href: '#banda', children: [['Nuestra Historia', '#nuestra-historia'], ['Director', '#director'], ['Junta directiva', '#junta-directiva']] },
  { label: 'Hazte socio', href: '#socios' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' }
];

const navEl = document.querySelector('#main-nav');
navEl.innerHTML = nav.map(item => item.children ? `<div class="nav-item"><a class="nav-link" href="${item.href}">${item.label}<span class="chevron">⌄</span></a><div class="dropdown">${item.children.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}</div></div>` : `<div class="nav-item"><a class="nav-link" href="${item.href}">${item.label}</a></div>`).join('');

const img = {
  hero: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
  concert: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80",
  music: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1000&q=80",
  people: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  conductor: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
  classroom: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80"
};

// La navegación se genera desde la configuración compartida en src/config.js.
*/
const navEl = document.querySelector('#main-nav');
const img = MEDIA;
renderNavigation(navEl, NAV_ITEMS);
setupNavigation(navEl, document.querySelector('.menu-toggle'));

// ---------------------------------------------------------------------------
// Page composition. Each route returns a complete, accessible view.
// ---------------------------------------------------------------------------
const page = (content, cls = 'page') => `<section class="${cls}">${content}</section>`;
const title = (eyebrow, heading, text = '') => `<div class="page-title"><p class="eyebrow">${eyebrow}</p><h1 class="display">${heading}</h1>${text ? `<p class="lead">${text}</p>` : ''}</div>`;

const templates = {
  inicio: () => `<div class="hero"><div class="hero-copy"><p class="eyebrow">Asociación musical · desde 2008</p><h1 class="display">La música<br><em>nos reúne.</em></h1><p class="lead">Un lugar para aprender, tocar y compartir. Descubre una escuela viva y una banda con futuro.</p><div class="btn-row"><a class="btn btn-primary" href="#matricula">Conoce la escuela ↗</a><a class="btn btn-light" href="#contacto">Contacta con la banda</a></div></div><div class="hero-art" style="background-image:url('${img.hero}')"></div></div><div class="home-band"><div class="section-head"><div><p class="eyebrow">Mucho más que una banda</p><h2>Una casa para la música.</h2></div><p>Formación, repertorio y comunidad en un mismo espacio. Una historia que sigue sonando.</p></div><div class="feature-grid"><article class="feature-card large"><small>La banda</small><h3>Sonar juntos cambia todo.</h3><p>Conoce nuestro recorrido, los directores y los proyectos que nos mueven.</p></article><article class="feature-card small"><small>La escuela</small><h3>Tu primer compás.</h3><p>Clases para todas las edades, desde iniciación hasta conjunto instrumental.</p></article></div></div><div class="page" style="padding-top:0"><div class="section-head"><div><p class="eyebrow">Descubre</p><h2>Todo lo que hacemos</h2></div></div><div class="cards"><article class="card"><div class="card-icon">♫</div><h3>Escuela de música</h3><p>Aprende con un equipo docente cercano y especializado.</p><a class="text-link" href="#escuela">Explorar la escuela</a></article><article class="card"><div class="card-icon">✦</div><h3>Banda y conciertos</h3><p>Una agrupación activa, abierta a nuevos repertorios.</p><a class="text-link" href="#banda">Conocer la banda</a></article><article class="card"><div class="card-icon">◌</div><h3>Una comunidad</h3><p>Socios, familias y músicos construyendo cultura.</p><a class="text-link" href="#socios">Formar parte</a></article></div><div class="events" id="agenda"><div class="section-head"><div><p class="eyebrow">Agenda</p><h2>Próximas actuaciones</h2></div><a class="text-link" href="#calendario">Ver calendario completo</a></div><div class="event-list"><article class="event"><div class="event-date"><strong>25</strong><small>SEP</small></div><div><h3>Concierto Intercambio La Murada</h3><p>CEIP Maestro Ismael García · 20:30</p></div></article><article class="event"><div class="event-date"><strong>26</strong><small>SEP</small></div><div><h3>Concierto Intercambio La Matanza</h3><p>Parroquia de La Matanza · 17:30</p></div></article><article class="event"><div class="event-date"><strong>07</strong><small>OCT</small></div><div><h3>Pasacalles Fiestas La Matanza</h3><p>Parroquia de La Matanza · 19:00</p></div></article></div></div></div>`,
  escuela: () => page(title('Escuela de música', 'Aprender para sonar juntos.', 'Una escuela abierta a todas las edades y niveles, con itinerarios flexibles y acompañamiento cercano.') + `<div class="cards"><article class="card"><div class="card-icon">✺</div><h3>Matrícula y oferta</h3><p>Iniciación, lenguaje musical, instrumentos, coro y conjunto.</p><a class="text-link" href="#matricula">Ver matrícula</a></article><article class="card"><div class="card-icon">⌁</div><h3>Proyecto educativo</h3><p>Los principios que guían nuestra manera de enseñar.</p><a class="text-link" href="#proyecto-educativo">Conocer el proyecto</a></article><article class="card"><div class="card-icon">♬</div><h3>Banda Joven</h3><p>El primer escenario para aprender a tocar en grupo.</p><a class="text-link" href="#banda-joven">Descubrir Banda Joven</a></article></div>`),
  matricula: () => page(`<div class="enroll-intro"><div><p class="eyebrow">Escuela · Curso 2026 / 2027</p><h1>Tu primer<br><span>compás.</span></h1><p>Encuentra tu instrumento, conoce la escuela y empieza a hacer música a tu ritmo.</p><div class="btn-row"><a class="btn btn-primary" href="#solicitud-matricula">Solicitar matrícula ↗</a></div></div><div class="enroll-hero-image" style="background-image:linear-gradient(145deg,rgba(49,93,42,.3),rgba(167,222,131,.42)),url('${img.classroom}')"><span>Escuela La Matanza · Inscripciones abiertas</span></div></div><div class="enroll-info"><div class="enroll-deadline"><span class="pill">Plazo de inscripción</span><strong>Hasta el 30 de septiembre</strong><small>30% de descuento hasta el 31 de julio</small></div><div class="enroll-copy"><p>La escuela está abierta a todas las edades y niveles. Te acompañamos desde la iniciación hasta el conjunto instrumental.</p></div></div><div class="enroll-section-head"><div><p class="eyebrow">Oferta formativa</p><h2>Encuentra tu lugar</h2></div><p>Un itinerario flexible para aprender, compartir y avanzar.</p></div><div class="enroll-programs"><article><span>01</span><h3>Iniciación musical</h3><p>Desde los 3 años. Ritmo, juego y descubrimiento.</p><a href="#contacto">Más información ↗</a></article><article><span>02</span><h3>Instrumento</h3><p>Viento madera, metal, percusión, piano, guitarra y cuerda.</p><a href="#contacto">Ver especialidades ↗</a></article><article><span>03</span><h3>Coro y conjunto</h3><p>Aprender a escuchar y tocar con otros desde el primer curso.</p><a href="#banda-joven">Conocer agrupaciones ↗</a></article></div><div class="enroll-instruments"><div><p class="eyebrow">Especialidades</p><h2>¿Qué te gustaría tocar?</h2></div><div class="instrument-list"><span>Clarinete</span><span>Saxofón</span><span>Trompeta</span><span>Trompa</span><span>Tuba</span><span>Percusión</span><span>Otro</span></div></div>`, 'page enroll-page'),
  'solicitud-matricula': () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const courseStart = month >= 6 ? now.getFullYear() : now.getFullYear() - 1;
    const courseLabel = `${courseStart}—${courseStart + 1}`;
    // Solo se fuerza el cierre en una previsualización explícita.
    // La URL normal siempre respeta el calendario real de matrícula.
    const previewClosed = new URLSearchParams(location.search).get('preview') === 'closed';
    const open = !previewClosed && month >= 6 && month <= 10;
    const status = open
      ? `<div class="enrollment-status is-open"><span class="status-dot"></span><div><strong>Preinscripción abierta</strong><small>Disponible hasta el 31 de octubre de ${now.getFullYear()}</small></div></div>`
      : `<div class="enrollment-status is-closed"><span class="status-dot"></span><div><strong>Periodo cerrado</strong><small>La matrícula vuelve a estar disponible del 1 de junio al 31 de octubre.</small></div></div>`;
    const form = open ? `<form class="enrollment-form" novalidate><div class="form-grid"><label>Nombre y apellidos del alumno/a<input required name="nombre-alumno" autocomplete="name" placeholder="Nombre completo" /></label><label>Correo electrónico de contacto<input required type="email" name="email" autocomplete="email" placeholder="tu@email.com" /></label><label>Teléfono<input required type="tel" name="telefono" autocomplete="tel" placeholder="600 000 000" pattern="[6789][0-9]{8}" /></label><label>Fecha de nacimiento<input required type="date" name="nacimiento" /></label><label>DNI/NIF/NIE del alumno/a<input required name="dni-alumno" placeholder="12345678A" /></label><label class="tutor-field">Padre, madre o tutor legal<input required name="tutor" placeholder="Nombre completo" /></label><label class="tutor-field">DNI/NIF/NIE del tutor<input required name="dni-tutor" placeholder="12345678A" /></label><label>Domicilio<input required name="domicilio" placeholder="Calle y número" /></label><label>Localidad<input required name="localidad" value="La Matanza - Orihuela" /></label><label>Código postal<input required name="codigo-postal" value="03316" inputmode="numeric" pattern="[0-9]{5}" /></label><label>Provincia<input required name="provincia" value="Alicante" /></label><label>Nº de cuenta IBAN (opcional)<input name="iban" placeholder="ES00 0000 0000 0000 0000 0000" /></label><label class="form-check form-full adult-toggle"><input type="checkbox" id="alumno-mayor" /> El alumno/a es mayor de 18 años.</label><label class="form-full">Se matricula en<select required name="instrumento"><option value="">Selecciona una opción</option><option value="instrumento">Instrumento (elige una especialidad)</option><option>Iniciación musical (3, 4 y 5 años)</option><option>Lenguaje musical (a partir de 6 años)</option><option>Clases para adultos</option><option>Coro y canto</option></select></label><label class="form-full instrument-choice" hidden>Instrumento elegido<select name="especialidad"><option value="">Selecciona un instrumento</option><option>Clarinete</option><option>Saxofón</option><option>Trompeta</option><option>Trompa</option><option>Tuba</option><option>Percusión</option><option>Otro</option></select></label><label class="form-full">Cuéntanos algo más<textarea name="mensaje" placeholder="Qué te gustaría aprender o consultar"></textarea></label></div><label class="form-check"><input required type="checkbox" /> He leído y acepto la <a href="#privacidad">información de matrícula</a> y el <a href="#privacidad">aviso de privacidad</a>.</label><label class="form-check"><input required type="checkbox" /> Autorizo el uso de imágenes en actividades de la asociación.</label><button class="btn btn-primary" type="submit">Enviar solicitud ↗</button></form>` : `<div class="enrollment-closed"><h2>Ahora estamos fuera de plazo.</h2><p>El periodo de matrícula permanece cerrado del 1 de noviembre al 30 de mayo. Déjanos tu email en <a href="mailto:bandalamatanza@gmail.com">bandalamatanza@gmail.com</a> y te avisaremos cuando se abra el próximo plazo.</p><a class="btn btn-light" href="#contacto">Contactar con la asociación</a></div>`;
    return page(`<div class="enrollment-page-head"><div><p class="eyebrow">Escuela · Solicitud de matrícula</p><h1>Empieza tu<br><em>camino musical.</em></h1><p>Cuéntanos quién eres y qué te gustaría aprender. Te orientaremos sobre horarios, instrumentos y agrupaciones.</p></div><div class="enrollment-year"><strong>${courseLabel}</strong></div></div>${status}<div class="enrollment-panel"><div class="enrollment-panel-head"><div><span class="pill">Asociación Musical La Matanza</span><h2>Solicitud de matrícula</h2></div><p>Una primera conversación para encontrar tu lugar en la escuela.</p></div>${form}</div>`, 'page enrollment-page');
  },
  privacidad: () => page(title('Matrícula · Información', 'Privacidad y condiciones.', 'Antes de enviar tu solicitud, consulta cómo utilizaremos los datos que nos facilites.' ) + `<div class="paper prose privacy-content"><h2>Información de matrícula</h2><p>Los datos enviados a través de este formulario se utilizarán únicamente para gestionar la solicitud de matrícula, contactar contigo y organizar la actividad formativa de la Asociación Musical “Ntra. Sra. del Remedio” La Matanza.</p><h2>Tratamiento de datos</h2><p>La asociación conservará la información durante el tiempo necesario para atender tu solicitud y cumplir sus obligaciones administrativas. No se cederán datos a terceros salvo obligación legal.</p><h2>Tus derechos</h2><p>Puedes solicitar el acceso, rectificación o eliminación de tus datos escribiendo a <a href="mailto:bandalamatanza@gmail.com">bandalamatanza@gmail.com</a>.</p><a class="btn btn-light" href="#solicitud-matricula">Volver al formulario</a></div>`),
  'alta-socio': () => page(`<div class="enrollment-page-head"><div><p class="eyebrow">Asociación · Alta de socio</p><h1>Forma parte de<br><em>la asociación.</em></h1><p>Completa tus datos para solicitar el alta como socio de la Asociación Musical “Ntra. Sra. del Remedio” La Matanza.</p></div><div class="enrollment-year"><strong>2026</strong></div></div><div class="enrollment-status is-open"><span class="status-dot"></span><div><strong>Solicitud de alta</strong><small>Revisaremos tus datos y contactaremos contigo para confirmar el registro.</small></div></div><div class="enrollment-panel member-form-panel"><div class="enrollment-panel-head"><div><span class="pill">Ficha de inscripción</span><h2>Datos del socio/a</h2></div><p>Los campos son obligatorios para poder tramitar la solicitud.</p></div><form class="enrollment-form member-form" novalidate><div class="form-grid"><label>Nombre<input required name="nombre" autocomplete="given-name" placeholder="Tu nombre" /></label><label>Apellidos<input required name="apellidos" autocomplete="family-name" placeholder="Tus apellidos" /></label><label>Fecha de nacimiento<input required type="date" name="nacimiento" /></label><label>DNI/NIF/NIE<input required name="dni" placeholder="12345678A" /></label><label class="form-full">Dirección<input required name="direccion" autocomplete="street-address" placeholder="Calle y número" /></label><label>Población<input required name="poblacion" value="La Matanza - Orihuela" /></label><label>Provincia<input required name="provincia" value="Alicante" /></label><label>Código postal<input required name="codigo-postal" value="03316" inputmode="numeric" pattern="[0-9]{5}" /></label><label>Teléfono<input required type="tel" name="telefono" autocomplete="tel" pattern="[6789][0-9]{8}" placeholder="600 000 000" /></label><label>Email<input required type="email" name="email" autocomplete="email" placeholder="tu@email.com" /></label></div><label class="form-check"><input required type="checkbox" /> He leído y acepto la <a href="#privacidad">información de alta como socio</a> y el <a href="#privacidad">aviso de privacidad</a>.</label><button class="btn btn-primary" type="submit">Solicitar alta ↗</button></form></div>`, 'page enrollment-page'),
  'proyecto-educativo': () => page(title('Escuela', 'Un proyecto que escucha.', 'Nuestra propuesta combina exigencia, disfrute y participación para que cada alumno encuentre su propia voz.') + `<div class="paper prose"><p>El proyecto educativo de Asociación Musical La Matanza entiende la enseñanza como un recorrido compartido. Cada etapa suma herramientas, confianza y experiencias escénicas.</p><p>Trabajamos con grupos reducidos, repertorios diversos y objetivos claros. La práctica colectiva tiene un papel central desde el primer curso.</p><div class="timeline"><article><small>01 · Acompañar</small><h3>Un comienzo amable</h3><p>Descubrir el instrumento y crear hábitos que duren.</p></article><article><small>02 · Compartir</small><h3>Aprender con otros</h3><p>El ensemble como espacio de escucha, respeto y energía.</p></article><article><small>03 · Proyectar</small><h3>Subir al escenario</h3><p>Conciertos y proyectos para celebrar lo aprendido.</p></article></div></div>`),
  profesorado: () => page(`<div class="faculty-intro"><div><p class="eyebrow">Escuela · Equipo docente</p><h1>Quienes hacen <span>sonar</span> la escuela.</h1><p>Profesionales de la música y la educación que acompañan cada paso, desde la primera nota hasta el escenario.</p></div></div><div class="faculty-feature"><div class="faculty-feature-image" style="background-image:url('${img.conductor}')"></div><div class="faculty-feature-copy"><span class="pill">Dirección académica</span><h2>Marta Soler</h2><p>“Enseñar música es ayudar a encontrar una voz propia. Cada alumno llega con un ritmo distinto y merece un espacio para hacerlo crecer.”</p><a class="text-link" href="#contacto">Contactar con la escuela</a></div></div><div class="faculty-grid">${[['Dirección','Marta Soler','Dirección académica',img.conductor],['Viento madera','Irene Navarro','Flauta y clarinete',img.people],['Viento metal','Álex Molina','Trompeta y trombón',img.concert],['Lenguaje musical','Clara Pérez','Iniciación y lenguaje',img.classroom],['Cuerda y piano','Nuria Campos','Piano y guitarra',img.music],['Administración','Laura Vidal','Atención a familias',img.people]].map(p=>`<article class="person faculty-person"><div class="person-img" style="background-image:url('${p[3]}')"></div><div class="person-body"><span class="pill">${p[0]}</span><h3>${p[1]}</h3><p>${p[2]}</p></div></article>`).join('')}</div>`, 'page faculty-page'),
  'banda-joven': () => page(`<div class="youth-hero"><div class="youth-hero-copy"><p class="eyebrow">Banda · Formación joven</p><h1>Aprender a tocar.<br><span>Aprender a escuchar.</span></h1><p>La Banda Joven es el primer gran escenario para descubrir la energía de hacer música en equipo.</p><div class="btn-row"><a class="btn btn-primary" href="#contacto">Quiero participar ↗</a><a class="btn btn-light" href="#galeria">Ver momentos</a></div></div><div class="youth-hero-image" style="background-image:linear-gradient(145deg,rgba(49,93,42,.24),rgba(167,222,131,.36)),url('${img.people}')"><span>Ensayo · La Matanza</span></div></div><div class="youth-intro"><div><p class="eyebrow">Un recorrido compartido</p><h2>La música crece cuando se comparte.</h2></div><p>Desde las primeras notas hasta el concierto, acompañamos a cada alumno con repertorio adaptado, ensayos dinámicos y experiencias que dejan huella.</p></div><div class="youth-pillars"><article><span class="youth-number">01</span><h3>Escuchar</h3><p>Aprender a formar parte de un sonido común, respetando el pulso y el espacio de los demás.</p></article><article><span class="youth-number">02</span><h3>Ensayar</h3><p>Convertir la práctica en un encuentro semanal lleno de retos, confianza y pequeños logros.</p></article><article><span class="youth-number">03</span><h3>Compartir</h3><p>Llevar lo aprendido a conciertos didácticos, pasacalles y proyectos de la comunidad.</p></article></div><div class="youth-bottom"><div class="youth-bottom-image" style="background-image:url('${img.concert}')"></div><div class="youth-bottom-copy"><span class="pill">Tu siguiente paso</span><h2>Un lugar para encontrar tu sonido.</h2><p>Si estudias un instrumento y quieres empezar a tocar en grupo, te contamos cómo incorporarte a la Banda Joven.</p><a class="text-link" href="#contacto">Hablar con la escuela</a></div></div>`, 'page youth-page'),
  precios: () => page(`<div class="pricing-intro"><div><p class="eyebrow">Escuela · Tarifas</p><h1>Aprender música<br><span>sin complicaciones.</span></h1><p>Elige el formato que mejor encaja contigo. Todas las opciones incluyen acompañamiento docente y acceso a la vida de la escuela.</p></div><div class="pricing-note"><span>♪</span><p><strong>Primera matrícula</strong><br>Sin coste en especialidades seleccionadas.</p></div></div><div class="pricing-grid"><article class="price-card"><div class="price-card-top"><span class="pill">Para empezar</span><h2>Iniciación</h2><p>Primer contacto con la música, el ritmo y el juego sonoro.</p></div><div class="price"><strong>35 €</strong><span>/ mes</span></div><ul><li>1 sesión semanal</li><li>Jardín musical y lenguaje</li><li>Material de aula incluido</li></ul><a class="btn btn-light" href="#contacto">Solicitar información</a></article><article class="price-card featured"><div class="featured-label">Más elegido</div><div class="price-card-top"><span class="pill">Tu instrumento</span><h2>Formación instrumental</h2><p>Clases adaptadas a tu nivel con seguimiento personalizado.</p></div><div class="price"><strong>48 €</strong><span>/ mes</span></div><ul><li>Clase individual o compartida</li><li>Lenguaje musical incluido</li><li>Acceso a conjunto instrumental</li></ul><a class="btn btn-primary" href="#matricula">Quiero matricularme ↗</a></article><article class="price-card"><div class="price-card-top"><span class="pill">Tocar juntos</span><h2>Agrupación</h2><p>La experiencia de formar parte de una banda y crecer en equipo.</p></div><div class="price"><strong>Incluido</strong></div><ul><li>Ensayo semanal</li><li>Conciertos y encuentros</li><li>Repertorio por niveles</li></ul><a class="btn btn-light" href="#banda-joven">Conocer agrupaciones</a></article></div><div class="pricing-footer"><p>Estas tarifas son orientativas y se adaptarán al curso y a cada especialidad.</p><a class="text-link" href="#contacto">Resolver una duda</a></div>`, 'page pricing-page'),
  calendario: () => page(`<div class="calendar-intro"><div><p class="eyebrow">Escuela · Curso 2026 / 2027</p><h1>Calendario <span>y horarios</span></h1><p>Todo el curso, de un vistazo. Consulta clases, ensayos y fechas especiales.</p></div><div class="calendar-intro-meta"><span class="calendar-meta-icon">✦</span><div><strong>Próximo hito</strong><b>25 septiembre</b><small>Concierto Intercambio La Murada</small></div></div></div><div class="schedule-layout"><article class="calendar-card"><div class="calendar-top"><div><span class="pill">Curso 2026 / 2027</span><h2>Septiembre 2026</h2></div><div class="calendar-actions"><button type="button" aria-label="Mes anterior">←</button><button type="button" aria-label="Mes siguiente">→</button></div></div><div class="calendar-grid calendar-weekdays"><span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span></div><div class="calendar-grid calendar-days"><span class="muted-day">31</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span class="today"><b>25</b><i>Concierto</i></span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span class="muted-day">1</span><span class="muted-day">2</span><span class="muted-day">3</span><span class="muted-day">4</span></div><div class="calendar-legend"><span><i class="legend-dot green"></i> Escuela</span><span><i class="legend-dot dark"></i> Conciertos</span><span><i class="legend-dot yellow"></i> Festivos</span></div></article><aside class="schedule-side"><article class="schedule-card"><div class="schedule-card-head"><span class="pill">Próximamente</span><a href="#contacto">Ver todo ↗</a></div><h3>Fechas importantes</h3><ul class="schedule-list"><li><time><strong>25</strong><small>SEP</small></time><div><b>Concierto Intercambio La Murada</b><span>CEIP Maestro Ismael García · 20:30</span></div></li><li><time><strong>26</strong><small>SEP</small></time><div><b>Concierto Intercambio La Matanza</b><span>Parroquia de La Matanza · 17:30</span></div></li><li><time><strong>07</strong><small>OCT</small></time><div><b>Pasacalles Fiestas La Matanza</b><span>Parroquia de La Matanza · 19:00</span></div></li><li><time><strong>10</strong><small>OCT</small></time><div><b>Pasacalles Fiestas La Matanza</b><span>Parroquia de La Matanza · 19:30</span></div></li><li><time><strong>11</strong><small>OCT</small></time><div><b>Pasacalles y Procesión La Matanza</b><span>Parroquia de La Matanza · 19:00</span></div></li></ul></article></aside></div></div>`, 'page calendar-page'),
  banda: () => page(title('La banda', 'Una historia que sigue sonando.', 'Repertorio, memoria y futuro: descubre la agrupación y sus proyectos.'), `<div class="feature-grid"><article class="feature-card large" style="background-image:url('${img.concert}')"><small>Desde 2008</small><h3>Una comunidad sobre el escenario.</h3><p>Conoce nuestra historia y los conciertos que nos esperan.</p></article><article class="feature-card small" style="background-image:url('${img.music}')"><small>Dirección musical</small><h3>Una mirada contemporánea.</h3><p>El equipo artístico que impulsa cada programa.</p></article></div><div class="cards" style="margin-top:20px"><article class="card"><h3>Currículum</h3><p>La línea del tiempo de nuestra agrupación.</p><a class="text-link" href="#curriculum">Leer la historia</a></article><article class="card"><h3>Director</h3><p>Conoce al director y a quienes le precedieron.</p><a class="text-link" href="#director">Ver perfiles</a></article><article class="card"><h3>Junta directiva</h3><p>Conoce a las personas que acompañan el proyecto.</p><a class="text-link" href="#junta-directiva">Ver equipo</a></article></div>`),
  curriculum: () => page(`<div class="history-intro"><div><p class="eyebrow">Banda · Historia</p><h1>Una historia<br><span>en movimiento.</span></h1><p>16 años de música, personas y momentos compartidos. Una memoria que sigue creciendo con cada generación.</p></div><div class="history-stamp"><strong>16</strong><span>años<br>sonando</span></div></div><div class="history-lead"><div class="history-lead-number">2008</div><div><span class="pill">El primer compás</span><h2>Todo empezó con una idea compartida.</h2><p>Nace la agrupación que con el tiempo se convertiría en Asociación Musical La Matanza. Desde entonces, cada etapa ha sumado nuevos músicos, repertorios y formas de encontrarnos.</p></div></div><div class="history-section-head"><div><p class="eyebrow">Línea del tiempo</p><h2>Las etapas que nos trajeron hasta aquí</h2></div><p>Una selección de momentos que explican quiénes somos.</p></div><div class="history-timeline"><article><div class="history-year">2008</div><div class="history-dot"></div><div class="history-copy"><span>Origen</span><h3>El primer compás</h3><p>Nace la agrupación y comienza una historia ligada a la cultura musical de la comunidad.</p></div></article><article><div class="history-year">2015</div><div class="history-dot"></div><div class="history-copy"><span>Consolidación</span><h3>Una nueva etapa</h3><p>La formación se consolida, crece la escuela y se amplía la actividad musical.</p></div></article><article><div class="history-year">2008</div><div class="history-dot"></div><div class="history-copy"><span>Reconocimiento</span><h3>Celebrar el camino</h3><p>La banda recibe una distinción por su trayectoria y por el trabajo de varias generaciones.</p></div></article><article><div class="history-year">Hoy</div><div class="history-dot"></div><div class="history-copy"><span>Futuro</span><h3>Seguir avanzando</h3><p>Nuevos repertorios, nuevos músicos y la misma pasión por tocar juntos.</p></div></article></div><div class="history-legacy"><div><p class="eyebrow">Nuestro legado</p><h2>La historia no se archiva.<br>Se sigue tocando.</h2></div><a class="btn btn-primary" href="#galardones">Ver reconocimientos ↗</a></div>`, 'page history-page'),
  galardones: () => page(`<div class="awards-intro"><div><p class="eyebrow">Banda · Reconocimientos</p><h1>El camino<br><span>deja huella.</span></h1><p>Premios, grabaciones y momentos que celebran el trabajo de muchas generaciones de músicos.</p></div><div class="awards-emblem">✦<small>Desde<br>2008</small></div></div><div class="award-feature"><div class="award-feature-art"><span>Reconocimiento a la trayectoria</span><strong>16</strong><small>años de música compartida</small></div><div class="award-feature-copy"><span class="pill">Distinción especial</span><h2>Medalla de Oro</h2><p>Un reconocimiento a una historia sostenida por generaciones, ensayos, conciertos y una comunidad que nunca ha dejado de acompañar.</p><a class="text-link" href="#curriculum">Conocer nuestra historia</a></div></div><div class="awards-head"><div><p class="eyebrow">Hitos destacados</p><h2>Una trayectoria que suena</h2></div><p>Algunos momentos que forman parte de nuestro archivo musical.</p></div><div class="awards-grid"><article class="award-card"><span class="award-year">2019</span><div class="award-icon">✦</div><span class="pill">Certamen nacional</span><h3>Primer premio</h3><p>Una actuación especial que todavía recordamos con orgullo.</p></article><article class="award-card"><span class="award-year">2008</span><div class="award-icon">◈</div><span class="pill">Trayectoria</span><h3>Medalla de Oro</h3><p>Un reconocimiento a los primeros 16 años de la agrupación.</p></article><article class="award-card"><span class="award-year">2007</span><div class="award-icon">♫</div><span class="pill">Grabaciones</span><h3>Álbum de estudio</h3><p>Un repertorio compartido que permanece en nuestra memoria.</p></article></div><div class="awards-quote"><span>“</span><p>Cada premio pertenece a quienes estuvieron, a quienes están y a quienes seguirán haciendo música.</p><small>— Archivo Asociación Musical La Matanza</small></div>`, 'page awards-page'),
  director: () => page(`<div class="director-intro"><div><p class="eyebrow">Banda · Dirección musical</p><h1>La música también <span>se dirige.</span></h1><p>Una mirada artística que convierte cada ensayo en una conversación y cada concierto en un encuentro.</p></div><div class="director-mark">♫</div></div><div class="director-profile"><div class="director-photo" style="background-image:url('${img.conductor}')"><span>Álvaro Serrano · Director titular</span></div><div class="director-bio"><span class="pill">Director musical</span><h2>Álvaro Serrano</h2><p>Director de orquesta y trombonista, formado entre conservatorio, escenario y trabajo colectivo.</p><p>Su manera de dirigir combina precisión, escucha y una mirada abierta al repertorio. Con él, cada sección encuentra su lugar y cada programa cuenta una historia.</p><a class="btn btn-primary" href="#contacto">Contactar con la banda ↗</a></div></div><div class="director-career"><div><p class="eyebrow">Trayectoria</p><h2>Una dirección<br>en movimiento.</h2></div><div class="director-timeline"><article><span>01</span><div><b>Formación superior</b><p>Dirección de banda, orquesta y especialización instrumental.</p></div></article><article><span>02</span><div><b>Experiencia escénica</b><p>Proyectos con agrupaciones jóvenes y ensembles profesionales.</p></div></article><article><span>03</span><div><b>Al frente de La Matanza</b><p>Una etapa para ampliar repertorio, energía y comunidad.</p></div></article></div></div><div class="director-archive"><div class="director-archive-head"><div><p class="eyebrow">Archivo</p><h2>Quienes dirigieron antes</h2></div></div><div class="director-archive-list"><div><span>2018—2025</span><b>Clara Molina</b><i>↗</i></div><div><span>2010—2018</span><b>Javier Belda</b><i>↗</i></div><div><span>1998—2010</span><b>María Torres</b><i>↗</i></div><div><span>1982—1998</span><b>Antonio Serra</b><i>↗</i></div></div></div>`, 'page director-page'),
  sociedad: () => page(title('Sociedad', 'Una comunidad que participa.', 'Detrás de cada concierto hay personas que sostienen, acompañan y hacen crecer el proyecto.') + `<div class="cards"><article class="card"><div class="card-icon">+</div><h3>Hazte socio</h3><p>Apoya la escuela, los conciertos y los proyectos culturales.</p><a class="text-link" href="#socios">Quiero participar</a></article></div>`),
  socios: () => page(`<div class="member-intro"><div><p class="eyebrow">Sociedad · Participa</p><h1>La música crece<br><span>cuando se comparte.</span></h1><p>Hazte socio de la Asociación Musical La Matanza y ayuda a sostener una escuela, una banda y una comunidad cultural abierta a todos.</p><div class="btn-row"><a class="btn btn-primary" href="#alta-socio">Quiero hacerme socio ↗</a></div></div><div class="member-intro-card"><span>Tu apoyo</span><strong>Hace posible</strong><small>clases · conciertos · futuro</small></div></div><div class="member-values"><div><p class="eyebrow">Por qué participar</p><h2>Tu aportación<br>se convierte en música.</h2></div><div class="member-value-list"><article><span>01</span><div><h3>Apoyas la formación</h3><p>Ayudas a que más personas puedan descubrir y aprender música.</p></div></article><article><span>02</span><div><h3>Impulsas la cultura</h3><p>Contribuyes a mantener conciertos, proyectos y actividades abiertas.</p></div></article><article><span>03</span><div><h3>Formas parte</h3><p>Recibes información y compartes la vida de una comunidad activa.</p></div></article></div></div><div class="member-steps"><div class="member-steps-head"><p class="eyebrow">Es muy sencillo</p><h2>Empieza en tres pasos</h2></div><div class="steps-grid"><article><b>1</b><h3>Escríbenos</h3><p>Cuéntanos que quieres formar parte de la asociación.</p></article><article><b>2</b><h3>Te informamos</h3><p>Te explicamos las opciones y resolvemos tus dudas.</p></article><article><b>3</b><h3>Bienvenido</h3><p>Comienzas a participar en la comunidad de La Matanza.</p></article></div></div><div class="member-cta"><div><span class="pill">Hazte socio</span><h2>¿Nos ayudas a seguir haciendo música?</h2><p>El formulario definitivo estará disponible aquí.</p></div><a class="btn btn-primary" href="#alta-socio">Solicitar alta ↗</a></div>`, 'page member-page'),
  'junta-directiva': () => page(`<div class="board-intro"><div><p class="eyebrow">Sociedad · Organización</p><h1>Una dirección que <span>acompaña.</span></h1><p>Personas que ponen tiempo, criterio y cuidado al servicio de toda la comunidad musical.</p></div><div class="board-term"><span>Junta actual</span><strong>2024—2028</strong><small>Equipo de gobierno</small></div></div><div class="board-lead"><div class="board-lead-image" style="background-image:url('${img.people}')"></div><div class="board-lead-copy"><span class="pill">Presidencia</span><h2>Elena Martínez</h2><p>“Cuidar la asociación es cuidar los espacios donde la música puede crecer.”</p><span class="board-caption">Presidenta · Asociación Musical La Matanza</span></div></div><div class="board-section-head"><div><p class="eyebrow">Equipo actual</p><h2>Las personas detrás del proyecto</h2></div><p>Una estructura cercana y transparente para acompañar la escuela, la banda y sus actividades.</p></div><div class="board-grid">${[['Vicepresidente','Pablo Ríos',img.conductor],['Secretaria','Lucía Bernal',img.classroom],['Tesorero','Jorge Vidal',img.music],['Vocal','Marta Pérez',img.concert],['Vocal','Sergio Cano',img.people]].map(p=>`<article class="board-member"><div class="board-member-avatar" style="background-image:url('${p[2]}')"></div><div><span>${p[0]}</span><h3>${p[1]}</h3><small>Junta directiva · 2024—2028</small></div></article>`).join('')}</div><div class="board-history"><div><p class="eyebrow">Archivo</p><h2>Juntas anteriores</h2><p>Consulta la evolución de los equipos que han acompañado a la asociación.</p></div><div class="board-years"><button type="button"><span>2020—2024</span><b>Ver composición</b><i>↗</i></button><button type="button"><span>2016—2020</span><b>Ver composición</b><i>↗</i></button><button type="button"><span>2012—2016</span><b>Ver composición</b><i>↗</i></button></div></div>`, 'page board-page'),
  revista: () => page(`<div class="magazine-intro"><div><p class="eyebrow">Sociedad · Publicación anual</p><h1>La revista<br><span>de la casa.</span></h1><p>Historias y memoria para conservar todo aquello que forma parte de nuestra vida musical.</p><a class="btn btn-primary" href="#contacto">Descargar última edición ↗</a></div><div class="magazine-cover"><div class="cover-top">La Matanza <span>2026</span></div><strong>El pulso<br>de la comunidad</strong><small>Revista anual · Nº IX</small><i>♫</i></div></div><div class="magazine-feature"><div><p class="eyebrow">Nº IX · 2026</p><h2>Una publicación para volver a encontrarnos.</h2><p>La revista reúne la actualidad de la escuela, los conciertos, las voces de nuestros músicos y los recuerdos que construyen nuestra historia.</p></div><div class="magazine-feature-list"><span>En este número</span><b>Escuela · Archivo · Conciertos</b><a class="text-link" href="#contacto">Leer la edición</a></div></div><div class="magazine-archive-head"><div><p class="eyebrow">Colección</p><h2>Ediciones anteriores</h2></div><p>Una biblioteca pequeña, pero llena de historias.</p></div><div class="magazine-grid"><article class="magazine-card"><div class="mini-cover green-cover"><span>2025</span><b>Aprender<br>escuchando</b></div><div><span class="pill">Nº VIII · 2025</span><h3>Aprender escuchando</h3><a class="text-link" href="#contacto">Consultar edición</a></div></article><article class="magazine-card"><div class="mini-cover cream-cover"><span>2023</span><b>Volver<br>a sonar</b></div><div><span class="pill">Nº VII · 2023</span><h3>Volver a sonar</h3><a class="text-link" href="#contacto">Consultar edición</a></div></article><article class="magazine-card"><div class="mini-cover dark-cover"><span>2015</span><b>Memoria<br>compartida</b></div><div><span class="pill">Nº VI · 2015</span><h3>Memoria compartida</h3><a class="text-link" href="#contacto">Consultar edición</a></div></article></div>`, 'page magazine-page'),
  galeria: () => page(`<div class="gallery-intro"><div><p class="eyebrow">Comunidad · Imágenes</p><h1>Momentos<br><span>que permanecen.</span></h1><p>Conciertos, ensayos y encuentros que cuentan cómo se vive la música dentro y fuera del escenario.</p></div><div class="gallery-count"><strong>07</strong><span>historias<br>para recordar</span></div></div><div class="gallery-feature"><button class="gallery-item gallery-feature-image" type="button" data-gallery-item data-src="${img.concert}" data-label="Concierto de invierno" style="background-image:url('${img.concert}')"><span>Concierto de invierno <i>↗</i></span></button><div class="gallery-feature-copy"><span class="pill">Álbum destacado</span><h2>La música se ve así.</h2><p>Una colección de escenas cotidianas, energía compartida y momentos que merecen quedarse.</p><button class="text-link gallery-open-feature" type="button" data-gallery-target="${img.concert}">Ver imagen completa ↗</button></div></div><div class="gallery-heading"><div><p class="eyebrow">Selección visual</p><h2>Dentro de la casa</h2></div><p>Haz clic en cualquier imagen para verla con más detalle.</p></div><div class="gallery-grid gallery-grid-new">${[['Ensayo abierto',img.music],['Banda Joven',img.people],['Clase de conjunto',img.classroom],['Día de la música',img.hero],['Entre bambalinas',img.conductor],['Fiestas de verano',img.concert]].map(([label,url])=>`<button class="gallery-item" type="button" data-gallery-item data-src="${url}" data-label="${label}" style="background-image:url('${url}')"><span>${label} <i>↗</i></span></button>`).join('')}</div><div class="gallery-lightbox" data-gallery-lightbox hidden><button class="gallery-lightbox-close" type="button" aria-label="Cerrar imagen">×</button><img alt="" /><p></p></div>`, 'page gallery-page'),
  contacto: () => page(`<div class="contact-hero"><div><p class="eyebrow">Contacto · La Matanza</p><h1>Hablemos<br><em>de música.</em></h1></div><p class="contact-hero-copy">¿Tienes una pregunta? Escríbenos y te ayudaremos a encontrar la mejor forma de participar.</p></div><div class="contact-layout"><div class="contact-aside"><div class="contact-heading"><span class="pill">La Matanza · Orihuela</span><h2>Encuentra tu lugar en la banda.</h2><p>Una pregunta, una visita o un mensaje puede ser el comienzo de tu próxima experiencia musical.</p></div><div class="contact-info-card"><div class="contact-info-icon">⌖</div><div><strong>Ven a visitarnos</strong><span>C/ El Hondo Nº13<br>03316 · La Matanza · Orihuela</span></div></div><div class="contact-info-card"><div class="contact-info-icon">@</div><div><strong>Escríbenos</strong><a href="mailto:bandalamatanza@gmail.com">bandalamatanza@gmail.com</a></div></div><div class="contact-socials"><a class="btn btn-primary" href="#contacto">WhatsApp ↗</a><a class="btn btn-light" href="#contacto">Facebook ↗</a></div></div><div class="contact-form-card"><div class="contact-form-head"><span class="eyebrow">Contacto directo</span><h3>Cuéntanos qué necesitas</h3><p>Te responderemos lo antes posible.</p></div><form class="form"><label>Nombre<input required placeholder="Tu nombre" /></label><label>Email<input required type="email" placeholder="tu@email.com" /></label><label>Mensaje<textarea required placeholder="¿En qué podemos ayudarte?"></textarea></label><button class="btn btn-dark" type="submit">Enviar mensaje ↗</button></form></div></div>`)
};

templates['politica-privacidad'] = () => page(title('Privacidad', 'Tu información, clara.', 'Consulta cómo tratamos los datos que compartes con la Asociación Musical La Matanza.') + `<div class="paper prose legal-content"><p class="legal-note">Borrador pendiente de completar con el NIF/CIF y la identificación definitiva del responsable.</p><h2>Responsable del tratamiento</h2><p><strong>Asociación Musical “Ntra. Sra. del Remedio” La Matanza</strong><br />C/ El Hondo Nº13 · 03316 La Matanza · Orihuela (Alicante)<br /><a href="mailto:bandalamatanza@gmail.com">bandalamatanza@gmail.com</a><br />NIF/CIF: pendiente de confirmar.</p><h2>Para qué utilizamos tus datos</h2><p>Gestionamos las consultas de contacto, las solicitudes de matrícula y alta de socio, la comunicación de actividades y la organización de eventos de la asociación.</p><h2>Base y conservación</h2><p>Tratamos los datos con tu consentimiento y, cuando corresponda, para atender una solicitud previa a la relación con la asociación. Conservaremos la información durante el tiempo necesario para atender la solicitud y cumplir las obligaciones legales.</p><h2>Destinatarios</h2><p>No cedemos datos a terceros salvo obligación legal o cuando sea necesario para prestar un servicio contratado por la asociación con las garantías exigidas.</p><h2>Tus derechos</h2><p>Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a <a href="mailto:bandalamatanza@gmail.com">bandalamatanza@gmail.com</a>. También puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es/" target="_blank" rel="noopener noreferrer">AEPD</a>).</p><h2>Cookies y servicios externos</h2><p>Esta versión no utiliza cookies propias de analítica. Algunas imágenes, tipografías o servicios externos pueden realizar sus propias conexiones técnicas; revisaremos y documentaremos esos servicios antes de publicar la versión definitiva.</p><h2>Actualizaciones</h2><p>Esta política podrá actualizarse cuando cambien los servicios, la normativa o la forma en que gestionamos la información.</p><a class="btn btn-light" href="#inicio">Volver al inicio</a></div>`, 'page legal-page');
templates['aviso-legal'] = () => page(title('Aviso legal', 'Información del sitio.', 'Condiciones de uso y datos identificativos de la web de la Asociación Musical La Matanza.') + `<div class="paper prose legal-content"><p class="legal-note">Borrador pendiente de completar con el NIF/CIF, representante legal y proveedor de alojamiento.</p><h2>Datos identificativos</h2><p><strong>Asociación Musical “Ntra. Sra. del Remedio” La Matanza</strong><br />C/ El Hondo Nº13 · 03316 La Matanza · Orihuela (Alicante)<br /><a href="mailto:bandalamatanza@gmail.com">bandalamatanza@gmail.com</a><br />NIF/CIF: pendiente de confirmar.</p><h2>Objeto</h2><p>Este sitio informa sobre la escuela, la banda, sus actividades, eventos y vías de contacto de la asociación.</p><h2>Condiciones de uso</h2><p>El acceso y uso del sitio implica la aceptación de este aviso. La persona usuaria se compromete a utilizar sus contenidos de forma lícita y a no dañar, inutilizar o sobrecargar el sitio.</p><h2>Propiedad intelectual</h2><p>Los textos, logotipos, fotografías, código y demás elementos propios están protegidos por la normativa aplicable. No se permite su reproducción o distribución sin autorización, salvo los usos permitidos legalmente.</p><h2>Enlaces externos</h2><p>Los enlaces a terceros se ofrecen como referencia. La asociación no controla sus contenidos, disponibilidad ni políticas, por lo que cada sitio aplica sus propias condiciones.</p><h2>Responsabilidad y disponibilidad</h2><p>Se procurará que la información sea exacta y esté actualizada, pero puede contener errores o quedar temporalmente no disponible. La asociación podrá modificar contenidos o interrumpir el servicio por mantenimiento.</p><h2>Legislación aplicable</h2><p>Este sitio se rige por la legislación española. Cualquier conflicto se resolverá ante los juzgados y tribunales que resulten competentes conforme a la normativa vigente.</p><a class="btn btn-light" href="#inicio">Volver al inicio</a></div>`, 'page legal-page');
templates['donaciones'] = () => page(title('Hazte socio', 'Apoya la música.', 'Elige una cantidad y ayuda a sostener la escuela, la banda y los proyectos culturales de La Matanza.') + `<div class="donation-layout"><div class="donation-intro"><span class="pill">Aportación puntual</span><h2>Tu ayuda se convierte en instrumentos, clases y conciertos.</h2><p>Cualquier cantidad suma. Selecciona el importe que quieras aportar y te prepararemos el siguiente paso cuando la pasarela de pago esté conectada.</p><a class="text-link" href="#alta-socio">También puedes hacerte socio ↗</a></div><div class="donation-panel"><form class="donation-form" novalidate><fieldset><legend>Elige una cantidad</legend><div class="donation-amounts"><button type="button" data-donation-amount="5">5 €</button><button type="button" data-donation-amount="10">10 €</button><button type="button" data-donation-amount="20">20 €</button><button type="button" data-donation-amount="50">50 €</button></div><label class="donation-custom">Otra cantidad<input type="number" name="donation-custom" min="1" step="0.01" inputmode="decimal" placeholder="0,00" /> <span>€</span></label><p class="donation-error" role="alert" hidden>Selecciona o introduce una cantidad válida.</p></fieldset><label class="form-check donation-consent"><input type="checkbox" required /> Acepto que la asociación utilice mis datos para gestionar esta solicitud de donación.</label><button class="btn btn-primary" type="submit">Continuar con la donación ↗</button><p class="donation-note">La pasarela de pago todavía no está conectada. Este formulario no realiza ningún cargo.</p></form></div></div>`, 'page donation-page');

templates['nuestra-historia'] = () => page(`<div class="history-intro"><div><p class="eyebrow">Banda · Historia</p><h1>Nuestra historia<br><span>sigue sonando.</span></h1><p>Lo que comenzó con la ilusión de acercar la música a los niños y jóvenes de La Matanza ha crecido hasta convertirse en un proyecto compartido por músicos, familias y vecinos. Más de dos décadas de aprendizaje, conciertos y momentos que forman parte de la historia de nuestro pueblo.</p></div><div class="history-stamp"><strong>18</strong><span>años como<br>asociación</span></div></div><div class="history-lead"><div class="history-lead-number">2005</div><div><span class="pill">Los primeros pasos</span><h2>La música empezó a reunirnos.</h2><p>La historia de nuestra banda comenzó gracias a la iniciativa de <strong>Antonio Bailén y Charo Fuentes</strong>, profesores de música y vecinos de La Matanza. Con esfuerzo e ilusión empezaron a acercar la enseñanza musical a los niños y jóvenes de la localidad, ofreciendo una oportunidad que hasta entonces no era fácil encontrar en nuestro entorno.</p><p>En <strong>2005</strong> llegó uno de los primeros grandes momentos: la presentación pública de la banda con su <strong>primer Concierto de Navidad en la Iglesia de La Matanza</strong>, bajo la dirección de Charo Fuentes. Aquel concierto fue mucho más que una actuación: fue el comienzo de una historia que seguiría creciendo año tras año.</p></div></div><div class="history-section-head"><div><p class="eyebrow">Nuestra historia</p><h2>Los momentos que nos han traído hasta aquí</h2></div><p>De los primeros alumnos y ensayos a una asociación plenamente integrada en la vida cultural de La Matanza.</p></div><div class="history-timeline"><article><div class="history-year">2006</div><div class="history-dot"></div><div class="history-copy"><span>Primeros años</span><h3>La banda sale a la calle</h3><p>La agrupación comienza a participar de manera habitual en la vida de La Matanza: procesiones, conciertos de fin de curso, fiestas patronales, pasacalles y otros actos hacen que la música empiece a ocupar un lugar cada vez más importante en el pueblo.</p></div></article><article><div class="history-year">2007</div><div class="history-dot"></div><div class="history-copy"><span>Dirección musical</span><h3>Una nueva etapa</h3><p>Charo Fuentes cede la dirección de la banda a <strong>Rafael González García</strong>, iniciándose una nueva etapa en la que la agrupación continúa creciendo tanto musicalmente como en número de componentes.</p></div></article><article><div class="history-year">2008</div><div class="history-dot"></div><div class="history-copy"><span>Fundación</span><h3>Nace oficialmente nuestra Asociación</h3><p>El crecimiento de la escuela, de la banda y del número de alumnos hizo necesario dar un paso adelante. El <strong>11 de mayo de 2008</strong> se constituye oficialmente la <strong>Asociación Musical Nuestra Señora del Remedio de La Matanza</strong>, con su acta fundacional y su primera junta directiva.</p><p>La música dejaba de ser únicamente una iniciativa nacida de un grupo de profesores y alumnos para convertirse en un proyecto cultural organizado y con vocación de futuro.</p></div></article><article><div class="history-year">2010</div><div class="history-dot"></div><div class="history-copy"><span>Federación</span><h3>Formamos parte de una gran familia musical</h3><p>El <strong>16 de enero de 2010</strong>, la Asociación pasa a formar parte de la <strong>Federación de Sociedades Musicales de la Comunitat Valenciana</strong>.</p><p>La incorporación a la Federación permite participar en encuentros, conciertos, intercambios y actividades junto a otras sociedades musicales, reforzando la formación de nuestros músicos y llevando el nombre de La Matanza más allá de nuestro entorno más cercano.</p></div></article><article><div class="history-year">2018</div><div class="history-dot"></div><div class="history-copy"><span>Patrimonio cultural</span><h3>Un reconocimiento compartido</h3><p>El <strong>25 de mayo de 2018</strong> se produce un reconocimiento de especial importancia para el movimiento musical valenciano. El Decreto 68/2018 del Consell declara <strong>Bien de Interés Cultural Inmaterial la tradición musical popular valenciana materializada por las Sociedades Musicales de la Comunitat Valenciana</strong>.</p><p>Como sociedad musical valenciana, nuestra Asociación forma parte de una tradición basada en la enseñanza, la convivencia, el asociacionismo y la transmisión de la música de generación en generación.</p></div></article><article><div class="history-year">Hoy</div><div class="history-dot"></div><div class="history-copy"><span>Presente y futuro</span><h3>Una historia que continúa</h3><p>Desde aquellos primeros alumnos hasta las nuevas generaciones que hoy comienzan su formación, la <strong>Escuela de Música</strong> continúa siendo uno de los pilares fundamentales de nuestra Asociación.</p><p>La banda sigue acompañando a La Matanza y participando en conciertos, procesiones, pasacalles, fiestas y encuentros musicales. Pero, sobre todo, sigue siendo un espacio en el que niños, jóvenes y adultos aprenden, conviven y comparten una misma pasión.</p><p>Cada músico que se incorpora, cada alumno que toca sus primeras notas y cada actuación compartida con nuestros vecinos añade una nueva página a nuestra historia.</p></div></article></div><div class="history-legacy"><div><p class="eyebrow">Nuestro legado</p><h2>La historia no se guarda.<br>Se sigue tocando.</h2><p>La Asociación Musical Nuestra Señora del Remedio es el resultado del trabajo de muchas personas: profesores, directores, músicos, alumnos, juntas directivas, socios, familias, colaboradores y vecinos que, generación tras generación, han hecho posible que la música continúe sonando en La Matanza.</p></div></div>`, 'page history-page');
delete templates.curriculum;

function getAssociationYears(date = new Date()) {
  const foundationYear = 2008;
  const anniversary = new Date(date.getFullYear(), 4, 11);
  return date.getFullYear() - foundationYear - (date < anniversary ? 1 : 0);
}

const GLISSANDOO_EVENTS_URL = 'https://glissandoo.com/sites/am_lamatanza';

function parseGlissandooEvents(html) {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) return [];
  try {
    const data = JSON.parse(match[1]);
    return (data?.props?.pageProps?.group?.events || [])
      .filter(event => event.datetime && event.displayName)
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  } catch (error) {
    console.warn('No se pudieron interpretar los eventos de Glissandoo.', error);
    return [];
  }
}

function formatRemoteEvent(event) {
  const date = new Date(event.datetime);
  return {
    day: new Intl.DateTimeFormat('es-ES', { day: '2-digit', timeZone: event.timezone || 'Europe/Madrid' }).format(date),
    month: new Intl.DateTimeFormat('es-ES', { month: 'short', timeZone: event.timezone || 'Europe/Madrid' }).format(date).replace('.', '').toUpperCase(),
    time: new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: event.timezone || 'Europe/Madrid' }).format(date),
    title: event.displayName,
    location: event.locality || 'La Matanza'
  };
}

const fallbackCalendarEvents = [
  { datetime: '2026-09-25T18:30:00+00:00', displayName: 'Concierto Intercambio La Murada', locality: 'CEIP Maestro Ismael García' },
  { datetime: '2026-09-26T15:30:00+00:00', displayName: 'Concierto Intercambio La Matanza', locality: 'Parroquia de La Matanza' },
  { datetime: '2026-10-07T17:00:00+00:00', displayName: 'Pasacalles Fiestas La Matanza', locality: 'Parroquia de La Matanza' },
  { datetime: '2026-10-10T17:30:00+00:00', displayName: 'Pasacalles Fiestas La Matanza', locality: 'Parroquia de La Matanza' },
  { datetime: '2026-10-11T17:00:00+00:00', displayName: 'Pasacalles y Procesión La Matanza', locality: 'Parroquia de La Matanza' }
];
let calendarCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let calendarEvents = fallbackCalendarEvents;

const holidayCalendar = {
  2026: [
    ['01-01', 'Año Nuevo · nacional'], ['01-06', 'Epifanía del Señor · nacional'],
    ['03-19', 'San José · Comunitat Valenciana'], ['04-03', 'Viernes Santo · nacional'],
    ['04-06', 'Lunes de Pascua · Comunitat Valenciana'], ['05-01', 'Fiesta del Trabajo · nacional'],
    ['06-24', 'San Juan · Comunitat Valenciana'], ['07-17', 'Fiestas de la Reconquista · Orihuela'],
    ['08-15', 'Asunción de la Virgen · nacional'], ['09-08', 'Virgen de Monserrate · Orihuela'],
    ['10-09', 'Día de la Comunitat Valenciana · autonómico'], ['10-12', 'Fiesta Nacional de España · nacional'],
    ['12-08', 'Inmaculada Concepción · nacional'], ['12-25', 'Natividad del Señor · nacional']
  ]
};

function holidaysForYear(year) {
  if (holidayCalendar[year]) return new Map(holidayCalendar[year].map(([date, label]) => [`${year}-${date}`, label]));
  const dates = [
    ['01-01', 'Año Nuevo · nacional'], ['01-06', 'Epifanía del Señor · nacional'],
    ['03-19', 'San José · Comunitat Valenciana'], ['05-01', 'Fiesta del Trabajo · nacional'],
    ['06-24', 'San Juan · Comunitat Valenciana'], ['07-17', 'Fiestas de la Reconquista · Orihuela'],
    ['08-15', 'Asunción de la Virgen · nacional'], ['09-08', 'Virgen de Monserrate · Orihuela'],
    ['10-09', 'Día de la Comunitat Valenciana · autonómico'], ['10-12', 'Fiesta Nacional de España · nacional'],
    ['12-08', 'Inmaculada Concepción · nacional'], ['12-25', 'Natividad del Señor · nacional']
  ];
  // Viernes Santo y Lunes de Pascua se calculan para que el calendario siga funcionando en años futuros.
  const a = year % 19; const b = Math.floor(year / 100); const c = year % 100;
  const d = Math.floor(b / 4); const e = b % 4; const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3); const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4); const k = c % 4; const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451); const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  const easter = new Date(Date.UTC(year, month - 1, day));
  const iso = date => `${year}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
  const goodFriday = new Date(easter); goodFriday.setUTCDate(goodFriday.getUTCDate() - 2);
  const easterMonday = new Date(easter); easterMonday.setUTCDate(easterMonday.getUTCDate() + 1);
  dates.push([iso(goodFriday).slice(5), 'Viernes Santo · nacional'], [iso(easterMonday).slice(5), 'Lunes de Pascua · Comunitat Valenciana']);
  return new Map(dates.map(([date, label]) => [`${year}-${date}`, label]));
}

function eventDateKey(event) {
  return String(event.datetime).slice(0, 10);
}

function renderCalendarMonth(monthDate, events = calendarEvents) {
  const grid = document.querySelector('.calendar-days');
  const heading = document.querySelector('.calendar-top h2');
  const previous = document.querySelector('.calendar-actions button:first-child');
  const next = document.querySelector('.calendar-actions button:last-child');
  if (!grid || !heading) return;
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leading = (firstDay.getDay() + 6) % 7;
  const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(firstDay);
  heading.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const eventMap = new Map(events.map(event => [eventDateKey(event), event]));
  const holidayMap = holidaysForYear(year);
  const cells = [];
  for (let i = 0; i < leading; i += 1) cells.push('<span class="muted-day"></span>');
  for (let day = 1; day <= daysInMonth; day += 1) {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const event = eventMap.get(key);
    const holiday = holidayMap.get(key);
    if (event && holiday) cells.push(`<span class="calendar-event-day calendar-holiday-day" title="${event.displayName} · ${holiday}"><b>${day}</b><i>Concierto · Festivo</i></span>`);
    else if (event) cells.push(`<span class="calendar-event-day" title="${event.displayName}"><b>${day}</b><i>Concierto</i></span>`);
    else if (holiday) cells.push(`<span class="calendar-holiday-day" title="${holiday}"><b>${day}</b><i>Festivo</i></span>`);
    else cells.push(`<span>${day}</span>`);
  }
  while (cells.length % 7) cells.push('<span class="muted-day"></span>');
  grid.innerHTML = cells.join('');
  grid.querySelectorAll('.calendar-event-day').forEach(cell => {
    const concert = /concierto|pasacalles|procesi[oó]n/i.test(cell.getAttribute('title') || '');
    const label = cell.querySelector('i');
    if (concert) cell.classList.add('calendar-concert-day');
    if (label) label.textContent = `${concert ? 'Concierto' : 'Escuela'}${cell.classList.contains('calendar-holiday-day') ? ' · Festivo' : ''}`;
  });
  const now = new Date();
  const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  if (previous) previous.disabled = monthDate <= currentMonth;
  const maximumMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  if (next) next.disabled = monthDate >= maximumMonth;
}

function setupCalendarControls() {
  const calendar = document.querySelector('.calendar-page');
  if (!calendar) return;
  calendar.querySelector('.schedule-card-head a')?.remove();
  calendarCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  renderCalendarMonth(calendarCursor);
  const buttons = calendar.querySelectorAll('.calendar-actions button');
  buttons[0]?.addEventListener('click', () => {
    const current = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    if (calendarCursor <= current) return;
    calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1);
    renderCalendarMonth(calendarCursor);
  });
  buttons[1]?.addEventListener('click', () => {
    const maximumMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
    if (calendarCursor >= maximumMonth) return;
    calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1);
    renderCalendarMonth(calendarCursor);
  });
}

function setupEnrollmentForm() {
  const form = document.querySelector('.enrollment-form');
  const toggle = document.querySelector('#alumno-mayor');
  const program = document.querySelector('select[name="instrumento"]');
  const speciality = document.querySelector('.instrument-choice');
  if (!toggle && !program && !form) return;
  const tutorFields = [...document.querySelectorAll('.tutor-field')];
  const update = () => tutorFields.forEach(field => {
    field.hidden = toggle.checked;
    const input = field.querySelector('input');
    if (input) { input.required = !toggle.checked; if (toggle.checked) input.setCustomValidity(''); }
  });
  if (toggle) {
    toggle.addEventListener('change', update);
    update();
  }
  if (program && speciality) {
    const instrumentSelect = speciality.querySelector('select');
    const updateSpeciality = () => {
      const visible = program.value === 'instrumento';
      speciality.hidden = !visible;
      instrumentSelect.required = visible;
      if (!visible) instrumentSelect.value = '';
    };
    program.addEventListener('change', updateSpeciality);
    updateSpeciality();
  }
  if (form) {
    form.querySelectorAll('input[type="date"]').forEach(input => {
      const today = new Date();
      input.max = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      input.addEventListener('click', () => {
      if (typeof input.showPicker === 'function') {
        try { input.showPicker(); } catch (_) { /* el navegador puede requerir una interacción directa */ }
      }
      });
    });
    const validateDni = field => {
      const value = field.value.trim().toUpperCase();
      field.setCustomValidity('');
      if (!value) return;
      const match = value.match(/^(\d{8}|[XYZKLM]\d{7})([A-Z])$/);
      if (!match) { field.setCustomValidity('Introduce un DNI, NIF o NIE válido.'); return; }
      const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
      const numeric = match[1].replace(/^X/, '0').replace(/^Y/, '1').replace(/^Z/, '2').replace(/^[KLM]/, '0');
      if (letters[Number(numeric) % 23] !== match[2]) field.setCustomValidity('La letra no corresponde al DNI/NIF/NIE indicado.');
    };
    const showFieldError = field => {
      const label = field.closest('label');
      if (!label || label.querySelector('.field-error')) return;
      const messages = { email: 'Escribe un correo válido, por ejemplo nombre@dominio.com.', telefono: 'Introduce un teléfono válido de 9 dígitos.', 'codigo-postal': 'El código postal debe tener exactamente 5 números.', dni: 'Introduce un DNI, NIF o NIE válido.', 'dni-alumno': 'Introduce un DNI, NIF o NIE válido.', 'dni-tutor': 'Introduce un DNI, NIF o NIE válido.', nacimiento: 'Selecciona una fecha de nacimiento válida.', especialidad: 'Selecciona un instrumento.' };
      const message = field.validity.valueMissing ? 'Este campo es obligatorio.' : field.validity.customError ? field.validationMessage : messages[field.name] || (field.validity.typeMismatch ? 'Introduce un formato válido.' : 'Revisa el formato indicado.');
      const error = document.createElement('small');
      error.className = 'field-error';
      error.textContent = message;
      label.appendChild(error);
    };
    const clearFieldError = field => field.closest('label')?.querySelector('.field-error')?.remove();
    form.addEventListener('submit', event => {
      form.classList.add('was-validated');
      form.querySelectorAll('input[name="dni-alumno"], input[name="dni-tutor"], input[name="dni"]').forEach(validateDni);
      const invalid = [...form.elements].filter(element => element.willValidate && !element.checkValidity());
      invalid.forEach(showFieldError);
      if (invalid.length) {
        event.preventDefault();
        invalid[0].focus();
        return;
      }
      event.preventDefault();
      alert(form.classList.contains('member-form') ? 'Solicitud de alta validada correctamente. El envío se activará cuando configuremos el servicio de recepción.' : 'Solicitud validada correctamente. El envío de correo se activará cuando configuremos el servicio de recepción.');
    });
    form.addEventListener('input', event => {
      if (event.target.name === 'dni-alumno' || event.target.name === 'dni-tutor' || event.target.name === 'dni') validateDni(event.target);
      if (event.target.willValidate && event.target.checkValidity()) clearFieldError(event.target);
    });
    form.addEventListener('blur', event => {
      if (event.target.willValidate && !event.target.checkValidity()) showFieldError(event.target);
    }, true);
    // Validación inmediata: al editar se actualiza el mensaje sin esperar al envío.
    const dniFields = ['dni-alumno', 'dni-tutor', 'dni'];
    const validateInteractiveField = field => {
      if (!field || !field.willValidate) return;
      if (dniFields.includes(field.name)) validateDni(field);
      field.dataset.touched = 'true';
      field.classList.toggle('has-error', !field.checkValidity());
      if (field.checkValidity()) clearFieldError(field);
      else {
        field.closest('label')?.querySelector('.field-error')?.remove();
        showFieldError(field);
      }
    };
    form.addEventListener('input', event => {
      if (event.target.matches('input, select, textarea')) validateInteractiveField(event.target);
    });
    form.addEventListener('change', event => {
      if (event.target.matches('input, select, textarea')) validateInteractiveField(event.target);
    });
    form.addEventListener('blur', event => validateInteractiveField(event.target), true);
    toggle?.addEventListener('change', () => {
      if (toggle.checked) tutorFields.forEach(field => {
        field.querySelector('.field-error')?.remove();
      });
    });
  }
}

function setupDonationForm() {
  const form = document.querySelector('.donation-form');
  if (!form) return;
  const intro = document.querySelector('.donation-intro');
  if (intro && !intro.querySelector('.donation-back')) intro.insertAdjacentHTML('beforeend', '<a class="btn btn-light donation-back" href="#socios">← Volver a Hazte socio</a>');
  const amountButtons = [...form.querySelectorAll('[data-donation-amount]')];
  const custom = form.querySelector('input[name="donation-custom"]');
  const error = form.querySelector('.donation-error');
  let selected = 0;
  const selectAmount = value => {
    selected = Number(value) || 0;
    amountButtons.forEach(button => button.classList.toggle('is-selected', Number(button.dataset.donationAmount) === selected));
    if (custom && selected) custom.value = '';
    if (error) error.hidden = true;
  };
  amountButtons.forEach(button => button.addEventListener('click', () => selectAmount(button.dataset.donationAmount)));
  custom?.addEventListener('input', () => {
    selected = Number(custom.value) || 0;
    amountButtons.forEach(button => button.classList.remove('is-selected'));
    if (error) error.hidden = true;
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const consent = form.querySelector('input[type="checkbox"]');
    const amount = Number(custom?.value) || selected;
    if (!amount || amount < 1 || !consent?.checked) {
      if (error) { error.textContent = !consent?.checked ? 'Debes aceptar la autorización para continuar.' : 'Selecciona o introduce una cantidad válida.'; error.hidden = false; }
      return;
    }
    alert(`Has seleccionado una donación de ${amount.toFixed(2).replace('.', ',')} €. La pasarela de pago se activará cuando esté configurada.`);
  });
}

function removeButtonArrows(root = document) {
  root.querySelectorAll('a.btn, a.header-donation, a.header-cta, button').forEach((button) => {
    // Las flechas del archivo de juntas anteriores se mantienen como indicador visual.
    if (button.closest('.board-years')) return;
    if (button.closest('.calendar-actions')) return;
    button.querySelectorAll('i, span').forEach((icon) => {
      if (/↗/.test(icon.textContent || '')) icon.remove();
    });
    [...button.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) node.textContent = node.textContent.replace(/\s*↗/g, '').replace(/^\s*[←→]\s*/g, '');
    });
  });
}

function syncDonationLink() {
  const memberCta = document.querySelector('.member-cta');
  const memberIntro = document.querySelector('.member-intro');
  if (!memberCta) return;
  if (memberIntro && memberCta.previousElementSibling !== memberIntro) memberIntro.insertAdjacentElement('afterend', memberCta);
  if (!memberCta.querySelector('.donation-cta')) memberCta.insertAdjacentHTML('beforeend', '<a class="btn btn-light donation-cta" href="#donaciones">Hacer una donación ↗</a>');
}

function applyRemoteEvents(events) {
  calendarEvents = events;
  renderCalendarMonth(calendarCursor, events);
  const formatted = events.map(formatRemoteEvent);
  document.querySelectorAll('.event-list .event').forEach((card, index) => {
    const event = formatted[index];
    if (!event) return;
    const date = card.querySelector('.event-date');
    const titleEl = card.querySelector('h3');
    const location = card.querySelector('p');
    if (date) date.innerHTML = `<strong>${event.day}</strong><small>${event.month}</small>`;
    if (titleEl) titleEl.textContent = event.title;
    if (location) location.textContent = `${event.location} · ${event.time}`;
  });
  document.querySelectorAll('.schedule-list li').forEach((item, index) => {
    const event = formatted[index];
    if (!event) return;
    const date = item.querySelector('time');
    const titleEl = item.querySelector('b');
    const location = item.querySelector('span');
    if (date) date.innerHTML = `<strong>${event.day}</strong><small>${event.month}</small>`;
    if (titleEl) titleEl.textContent = event.title;
    if (location) location.textContent = `${event.location} · ${event.time}`;
  });
  const next = formatted[0];
  const meta = document.querySelector('.calendar-intro-meta');
  if (next && meta) {
    const strong = meta.querySelector('b');
    const small = meta.querySelector('small');
    if (strong) strong.textContent = `${next.day} ${next.month.toLowerCase()}`;
    if (small) small.textContent = next.title;
  }
}

async function syncGlissandooEvents() {
  try {
    const response = await fetch(`${GLISSANDOO_EVENTS_URL}?_=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const events = parseGlissandooEvents(await response.text());
    if (events.length) applyRemoteEvents(events);
  } catch (error) {
    console.info('Eventos en modo respaldo local (Glissandoo no permite lectura directa).');
  }
}

function syncEnrollmentPeriodCopy() {
  const deadline = document.querySelector('.enroll-deadline');
  if (!deadline) return;
  const now = new Date();
  const month = now.getMonth() + 1;
  const open = month >= 6 && month <= 10;
  const headline = deadline.querySelector('strong');
  const detail = deadline.querySelector('small');
  const heroLabel = document.querySelector('.enroll-hero-image span');
  if (headline) headline.textContent = 'Del 1 de junio al 31 de octubre';
  if (detail) detail.textContent = 'La matrícula permanece cerrada del 1 de noviembre al 30 de mayo.';
  if (heroLabel) heroLabel.textContent = open ? 'Escuela La Matanza · Inscripciones abiertas del 1 de junio al 31 de octubre' : 'Escuela La Matanza · Matrícula cerrada hasta el 31 de mayo';
}

function syncCurrentYearLabels() {
  const now = new Date();
  const year = now.getFullYear();
  const courseStart = now.getMonth() + 1 >= 6 ? year : year - 1;
  const courseLabel = `${courseStart} / ${courseStart + 1}`;
  document.querySelectorAll('[data-current-year]').forEach(node => { node.textContent = String(year); });
  const enrollmentIntro = document.querySelector('.enroll-intro .eyebrow');
  if (enrollmentIntro) enrollmentIntro.textContent = `Escuela · Curso ${courseLabel}`;
  const calendarIntro = document.querySelector('.calendar-intro .eyebrow');
  if (calendarIntro) calendarIntro.textContent = `Escuela · Curso ${courseLabel}`;
  const calendarPill = document.querySelector('.calendar-card .calendar-top .pill');
  if (calendarPill) calendarPill.textContent = `Curso ${courseLabel}`;
  const calendarMetaTitle = document.querySelector('.calendar-intro-meta strong');
  if (calendarMetaTitle) calendarMetaTitle.textContent = 'Próximo concierto';
  const memberPanel = document.querySelector('.member-form-panel');
  if (memberPanel) {
    const memberYear = memberPanel.closest('.enrollment-page')?.querySelector('.enrollment-year strong');
    if (memberYear) memberYear.textContent = String(year);
  }
  const magazineYear = document.querySelector('.magazine-cover .cover-top span');
  if (magazineYear) magazineYear.textContent = String(year);
  const magazineFeature = document.querySelector('.magazine-feature .eyebrow');
  if (magazineFeature) magazineFeature.textContent = `Nº IX · ${year}`;
}

function syncLegalDetails() {
  const legal = document.querySelector('.legal-content');
  if (!legal) return;
  legal.innerHTML = legal.innerHTML.replaceAll('NIF/CIF: pendiente de confirmar.', 'CIF: G 54361241');
  const note = legal.querySelector('.legal-note');
  if (note) note.textContent = legal.querySelector('h2')?.textContent.includes('Responsable')
    ? 'Texto pendiente de revisión jurídica y actualización cuando cambien los tratamientos.'
    : 'Texto pendiente de completar con los datos de inscripción registral y alojamiento.';
  const heading = [...legal.querySelectorAll('h2')].find(node => /Responsable del tratamiento|Datos identificativos/.test(node.textContent));
  const identity = heading?.nextElementSibling;
  if (identity && !identity.querySelector('.legal-representative')) {
    identity.insertAdjacentHTML('beforeend', '<br /><span class="legal-representative">Representante legal: Cristian Chumillas García · Presidente</span><br /><span class="legal-registration">Registro de Asociaciones de la Generalitat Valenciana · Unidad Territorial de Alicante<br />Nº de inscripción: CV-01-043239-A<br />Fecha de inscripción: 27 de junio de 2008</span>');
  }
  if (heading?.textContent.includes('Responsable') && !legal.querySelector('.legal-external-services')) {
    const cookiesHeading = [...legal.querySelectorAll('h2')].find(node => node.textContent.includes('Cookies y servicios externos'));
    cookiesHeading?.nextElementSibling?.insertAdjacentHTML('afterend', '<p class="legal-external-services">Actualmente no utilizamos Google Analytics, reCAPTCHA, Mailchimp ni plataformas externas de formularios. La web carga tipografías de Google Fonts, imágenes alojadas en Unsplash y consulta puntualmente la agenda pública de Glissandoo; esos servicios pueden registrar datos técnicos como la dirección IP conforme a sus propias políticas.</p><h2>Delegado de Protección de Datos</h2><p class="legal-external-services">No aplica a la actividad actual de la asociación. Para cualquier consulta sobre privacidad puedes escribir a <a href="mailto:bandalamatanza@gmail.com">bandalamatanza@gmail.com</a>.</p>');
  }
}

function syncSocialLinks() {
  const links = document.querySelectorAll('.contact-socials a');
  links.forEach(link => {
    const isWhatsApp = /whatsapp/i.test(link.textContent);
    link.href = isWhatsApp ? 'https://whatsapp.com/channel/0029VaX4PyZ7T8bRQwQVfd0x' : 'https://www.facebook.com/BandaLaMatanza/?locale=es_ES';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

function positionFooterLegalLinks() {
  const footerBottom = document.querySelector('.footer-bottom');
  if (!footerBottom || document.querySelector('.footer-legal')) return;
  const legal = [...footerBottom.children].find((node) => node.querySelector?.('a[href="#politica-privacidad"]'));
  if (!legal) return;
  const legalBar = document.createElement('div');
  legalBar.className = 'footer-legal';
  legalBar.appendChild(legal);
  footerBottom.parentNode.insertBefore(legalBar, footerBottom);
}

function syncDirectorName() {
  const name = 'Adrián Marcos García';
  const caption = document.querySelector('.director-photo span');
  const heading = document.querySelector('.director-bio h2');
  if (caption) caption.textContent = `${name} · Director titular`;
  if (heading) heading.textContent = name;
  if (caption) caption.remove();
  document.querySelector('.director-bio .btn')?.remove();
  const photo = document.querySelector('.director-photo');
  if (photo) photo.style.backgroundImage = "url('assets/presidente-unknown.png')";
}

// ---------------------------------------------------------------------------
// Hash router. The site stays static and deployable without a backend.
// ---------------------------------------------------------------------------
function setupGoogleEnrollmentForm() {
  if (!location.hash.startsWith('#solicitud-matricula')) return;
  const form = document.querySelector('.enrollment-form');
  if (!form) return;

  const embed = document.createElement('div');
  embed.className = 'google-form-embed';
  embed.innerHTML = `<iframe src="${GOOGLE_MATRICULA_FORM_URL}" title="Formulario de solicitud de matrícula" loading="lazy">Cargando el formulario de matrícula…</iframe><p>Si el formulario no se muestra, puedes <a href="${GOOGLE_MATRICULA_FORM_URL.replace('?embedded=true', '')}" target="_blank" rel="noopener noreferrer">abrirlo en una pestaña nueva</a>.</p>`;
  form.replaceWith(embed);
}

function render() {
  const key = (location.hash || '#inicio').slice(1);
  const html = templates[key] ? templates[key]() : templates.inicio();
  document.querySelector('main').innerHTML = html;
  if (window.presidentsCarouselTimer) clearInterval(window.presidentsCarouselTimer);
  if (key === 'junta-directiva') {
    document.querySelector('.board-term')?.remove();
    const boardLead = document.querySelector('.board-lead-copy');
    if (boardLead) {
      boardLead.querySelector('.pill').textContent = 'Presidente';
      boardLead.querySelector('h2').textContent = 'Cristian Chumillas García';
      boardLead.querySelector('.board-caption').textContent = 'Presidente · Asociación Musical La Matanza';
    }
    const boardGrid = document.querySelector('.board-grid');
    setTimeout(() => {
      document.querySelector('.board-lead-image')?.style.setProperty('background-image', "url('assets/presidente-unknown.png')");
      document.querySelectorAll('.board-member-avatar').forEach(avatar => avatar.style.backgroundImage = "url('assets/presidente-unknown.png')");
    }, 0);
    if (boardGrid) {
      const boardMembers = [
        ['Secretaria', 'Carmen Valverde Ruiz', img.classroom],
        ['Tesorero', 'Trino García Escudero', img.music],
        ['Vocal', 'María José Valverde Tristán', img.concert]
      ];
      boardGrid.innerHTML = boardMembers.map(([role, name, image]) => `<article class="board-member"><div class="board-member-avatar" style="background-image:url('${image}')"></div><div><span>${role}</span><h3>${name}</h3><small>Junta directiva · 2024—2028</small></div></article>`).join('');
    }
    document.querySelector('main').insertAdjacentHTML('beforeend', `<section class="presidents-archive"><div class="presidents-archive-head"><div><p class="eyebrow">Memoria de la Asociación</p><h2>Presidentes que nos precedieron</h2></div><p>Cada etapa de la Asociación ha contado con personas comprometidas con la música, la escuela y la vida cultural de La Matanza.</p></div><div class="presidents-archive-intro"><span class="presidents-archive-mark">✦</span><div><h3>Un legado construido entre todos</h3><p>Estamos reuniendo la información de las presidencias anteriores para completar este archivo histórico y reconocer a quienes han dedicado su tiempo al proyecto.</p></div></div><div class="presidents-carousel"><button class="presidents-carousel-button is-prev" type="button" aria-label="Presidencia anterior">←</button><div class="presidents-carousel-viewport"><div class="presidents-archive-grid presidents-carousel-track"><article><span>2020—2024</span><strong>Presidencia anterior</strong><small>Archivo histórico en preparación</small></article><article><span>2016—2020</span><strong>Presidencia anterior</strong><small>Archivo histórico en preparación</small></article><article><span>2012—2016</span><strong>Presidencia anterior</strong><small>Archivo histórico en preparación</small></article><article><span>2008—2012</span><strong>Presidencia anterior</strong><small>Archivo histórico en preparación</small></article><article><span>2004—2008</span><strong>Presidencia anterior</strong><small>Archivo histórico en preparación</small></article><article><span>2000—2004</span><strong>Presidencia anterior</strong><small>Archivo histórico en preparación</small></article></div></div><button class="presidents-carousel-button is-next" type="button" aria-label="Siguiente presidencia">→</button></div></section>`);
    const boardPeriodRoles = ['Presidencia', 'Secretaría', 'Tesorería', 'Vocalías'];
    document.querySelectorAll('.board-years button').forEach((button) => {
      button.addEventListener('click', () => {
        const period = button.querySelector('span')?.textContent.trim() || 'Periodo anterior';
        const modal = document.createElement('div');
        modal.className = 'board-period-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.innerHTML = `<div class="board-period-dialog"><button class="board-period-close" type="button" aria-label="Cerrar ventana">×</button><p class="eyebrow">Archivo histórico</p><h2>Composición ${period}</h2><p class="board-period-note">Cargos correspondientes a este periodo. La información de las personas se incorporará al completar el archivo histórico.</p><ul>${boardPeriodRoles.map(role => `<li><strong>${role}</strong><span>Información pendiente de completar</span></li>`).join('')}</ul></div>`;
        let closeOnEscape;
        const closeModal = () => { modal.remove(); document.body.classList.remove('modal-open'); if (closeOnEscape) document.removeEventListener('keydown', closeOnEscape); };
        modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
        modal.querySelector('.board-period-close')?.addEventListener('click', closeModal);
        closeOnEscape = (event) => { if (event.key === 'Escape') closeModal(); };
        document.addEventListener('keydown', closeOnEscape);
        document.body.append(modal);
        document.body.classList.add('modal-open');
        modal.querySelector('.board-period-close')?.focus();
      });
    });
    const carousel = document.querySelector('.presidents-carousel');
    carousel?.querySelectorAll('.presidents-carousel-button').forEach(button => button.remove());
    const track = carousel?.querySelector('.presidents-carousel-track');
    const viewport = carousel?.querySelector('.presidents-carousel-viewport');
    const cards = track ? [...track.children] : [];
    const presidentImages = ['assets/presidente-2016-2021.png', 'assets/presidente-unknown.png', 'assets/presidente-unknown.png', 'assets/presidente-unknown.png', 'assets/presidente-unknown.png', 'assets/presidente-unknown.png'];
    const presidentData = [
      ['2016—2021', 'Ricardo Pina Bernabeu', 'A la música le das tiempo, esfuerzo y corazón; y, a cambio, siempre te devuelve mucho más de lo que le entregas. Las asociaciones musicales son de los pocos espacios donde conviven y cooperan distintas generaciones en una misma banda, compartiendo espacio y momentos.'],
      ['2020—2024', 'Nombre y apellidos', 'Descripción breve de su etapa al frente de la Asociación.'],
      ['2012—2016', 'Nombre y apellidos', 'Descripción breve de su etapa al frente de la Asociación.'],
      ['2008—2012', 'Nombre y apellidos', 'Descripción breve de su etapa al frente de la Asociación.'],
      ['2004—2008', 'Nombre y apellidos', 'Descripción breve de su etapa al frente de la Asociación.'],
      ['2000—2004', 'Nombre y apellidos', 'Descripción breve de su etapa al frente de la Asociación.']
    ];
    cards.forEach((card, index) => {
      const [period, name, description] = presidentData[index];
      card.innerHTML = `<span class="president-period">${period}</span><strong class="president-name">${name}</strong><p class="president-description">${description}</p>`;
      card.classList.add('president-card-quote');
      const avatar = document.createElement('div');
      avatar.className = 'president-avatar';
      avatar.style.backgroundImage = `url('${presidentImages[index]}')`;
      avatar.setAttribute('aria-hidden', 'true');
      card.prepend(avatar);
    });
    let carouselIndex = 0;
    let dragStartX = null;
    let dragDistance = 0;
    const visibleCards = () => window.matchMedia('(max-width: 640px)').matches ? 1 : window.matchMedia('(max-width: 900px)').matches ? 2 : 3;
    const moveCarousel = (step = 1) => {
      const visible = visibleCards();
      const maxIndex = Math.max(0, cards.length - visible);
      carouselIndex = (carouselIndex + step + maxIndex + 1) % (maxIndex + 1);
      track.style.transform = `translateX(calc(${carouselIndex} * -${100 / visible}% - ${carouselIndex * 8}px))`;
    };
    viewport?.addEventListener('pointerdown', event => {
      dragStartX = event.clientX;
      dragDistance = 0;
      track.style.transition = 'none';
      viewport.setPointerCapture?.(event.pointerId);
    });
    viewport?.addEventListener('pointermove', event => {
      if (dragStartX === null) return;
      dragDistance = event.clientX - dragStartX;
      track.style.transform = `translateX(calc(${carouselIndex} * -${100 / visibleCards()}% - ${carouselIndex * 8}px + ${dragDistance}px))`;
    });
    const finishDrag = () => {
      if (dragStartX === null) return;
      track.style.transition = '';
      if (Math.abs(dragDistance) > 45) moveCarousel(dragDistance < 0 ? 1 : -1);
      else moveCarousel(0);
      dragStartX = null;
      dragDistance = 0;
    };
    viewport?.addEventListener('pointerup', finishDrag);
    viewport?.addEventListener('pointercancel', finishDrag);
    window.presidentsCarouselTimer = setInterval(() => moveCarousel(1), 15000);
  }
  if (key === 'director') {
    document.querySelector('.director-archive')?.remove();
    document.querySelector('main').insertAdjacentHTML('beforeend', `<section class="presidents-archive directors-archive"><div class="presidents-archive-head"><div><p class="eyebrow">Archivo de la banda</p><h2>Directores que nos precedieron</h2></div><p>Personas que han guiado musicalmente a la agrupación y han dejado su huella en cada etapa de nuestra historia.</p></div><div class="presidents-carousel"><div class="presidents-carousel-viewport"><div class="presidents-archive-grid presidents-carousel-track"><article><span>2018—2025</span><strong>Clara Molina</strong><small>Dirección musical</small></article><article><span>2010—2018</span><strong>Javier Belda</strong><small>Dirección musical</small></article><article><span>1998—2010</span><strong>María Torres</strong><small>Dirección musical</small></article><article><span>1982—1998</span><strong>Antonio Serra</strong><small>Dirección musical</small></article><article><span>1970—1982</span><strong>Nombre por confirmar</strong><small>Dirección musical</small></article><article><span>Anterior</span><strong>Nombre por confirmar</strong><small>Dirección musical</small></article></div></div></div></section>`);
    const carousel = document.querySelector('.directors-archive .presidents-carousel');
    const track = carousel?.querySelector('.presidents-carousel-track');
    const viewport = carousel?.querySelector('.presidents-carousel-viewport');
    const cards = track ? [...track.children] : [];
    const directorImages = ['assets/presidente-unknown.png', 'assets/presidente-unknown.png', 'assets/presidente-unknown.png', 'assets/presidente-unknown.png', 'assets/presidente-unknown.png', 'assets/presidente-unknown.png'];
    const directorDescriptions = ['Dirección musical y acompañamiento de la agrupación.', 'Una etapa de crecimiento artístico y trabajo colectivo.', 'Repertorio, ensayos y conciertos al servicio de la banda.', 'Una mirada musical ligada a la comunidad.', 'Trayectoria y compromiso con la formación musical.', 'Información histórica pendiente de completar.'];
    cards.forEach((card, index) => {
      const avatar = document.createElement('div');
      avatar.className = 'president-avatar';
      avatar.style.backgroundImage = `url('${directorImages[index]}')`;
      avatar.setAttribute('aria-hidden', 'true');
      card.classList.add('president-card-quote');
      card.innerHTML = `${card.innerHTML.replace(/<small>[\s\S]*?<\/small>/, `<p class="president-description">${directorDescriptions[index]}</p>`)}`;
      card.prepend(avatar);
    });
    let carouselIndex = 0;
    let dragStartX = null;
    let dragDistance = 0;
    const visibleCards = () => window.matchMedia('(max-width: 640px)').matches ? 1 : window.matchMedia('(max-width: 900px)').matches ? 2 : 3;
    const moveCarousel = (step = 1) => {
      const visible = visibleCards();
      const maxIndex = Math.max(0, cards.length - visible);
      carouselIndex = (carouselIndex + step + maxIndex + 1) % (maxIndex + 1);
      track.style.transform = `translateX(calc(${carouselIndex} * -${100 / visible}% - ${carouselIndex * 8}px))`;
    };
    viewport?.addEventListener('pointerdown', event => { dragStartX = event.clientX; dragDistance = 0; track.style.transition = 'none'; viewport.setPointerCapture?.(event.pointerId); });
    viewport?.addEventListener('pointermove', event => { if (dragStartX === null) return; dragDistance = event.clientX - dragStartX; track.style.transform = `translateX(calc(${carouselIndex} * -${100 / visibleCards()}% - ${carouselIndex * 8}px + ${dragDistance}px))`; });
    const finishDrag = () => { if (dragStartX === null) return; track.style.transition = ''; if (Math.abs(dragDistance) > 45) moveCarousel(dragDistance < 0 ? 1 : -1); else moveCarousel(0); dragStartX = null; dragDistance = 0; };
    viewport?.addEventListener('pointerup', finishDrag);
    viewport?.addEventListener('pointercancel', finishDrag);
    window.presidentsCarouselTimer = setInterval(() => moveCarousel(1), 15000);
  }
  if (key === 'galeria') document.querySelector('.gallery-count')?.remove();
  const associationYears = document.querySelector('.history-stamp strong');
  if (associationYears && key === 'nuestra-historia') {
    associationYears.textContent = getAssociationYears();
    const stamp = document.querySelector('.history-stamp');
    document.querySelector('.history-intro > div:first-child')?.append(stamp);
    stamp?.classList.add('history-stamp-inline');
    document.querySelector('.history-section-head > p')?.remove();
  }
  document.querySelectorAll('a[href="#curriculum"]').forEach(link => { link.href = '#nuestra-historia'; });
  document.querySelectorAll('h3').forEach(heading => {
    if (heading.textContent === 'Currículum') heading.textContent = 'Nuestra Historia';
  });
  setupRevealAnimations(document.querySelector('main'));
  setupGalleryLightbox(document.querySelector('main'));
  setupCalendarControls();
  setupEnrollmentForm();
  setupGoogleEnrollmentForm();
  setupDonationForm();
  syncEnrollmentPeriodCopy();
  syncCurrentYearLabels();
  syncLegalDetails();
  syncSocialLinks();
  positionFooterLegalLinks();
  syncDirectorName();
  syncDonationLink();
  removeButtonArrows(document);
  setActiveNavigation(navEl, key);
  const routeTitle = key === 'inicio' ? 'Asociación Musical La Matanza' : (key.replaceAll('-', ' ').replace(/\b\w/g, c => c.toUpperCase())) + ' · Asociación Musical La Matanza';
  document.title = routeTitle;
  window.scrollTo({top:0,behavior:'smooth'});
  document.querySelector('.main-nav').classList.remove('open');
  document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');
}

window.addEventListener('hashchange', render); render();
syncGlissandooEvents();

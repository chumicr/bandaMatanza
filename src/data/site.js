export const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Escuela', href: '#escuela', children: [['Matrícula', '#matricula'], ['Proyecto educativo', '#proyecto-educativo'], ['Profesorado', '#profesorado'], ['Banda Joven', '#banda-joven'], ['Calendario y horarios', '#calendario'], ['Precios', '#precios']] },
  { label: 'Banda', href: '#banda', children: [['Nuestra Historia', '#nuestra-historia'], ['Director', '#director'], ['Junta directiva', '#junta-directiva'], ['Glissandoo', 'https://auth.glissandoo.com/es/signin']] },
  { label: 'Galería', href: '#galeria' },
  { label: 'Hazte socio', href: '#socios' }
];

export const MEDIA = Object.freeze({
  hero: 'assets/portada.jpg',
  concert: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80',
  music: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1000&q=80',
  people: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  conductor: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
  classroom: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80'
});

export const SITE = Object.freeze({
  contactEmail: 'bandalamatanza@gmail.com',
  foundationYear: 2008,
  googleEnrollmentFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe4RqX9fAiKJMHloaDeJsIDnBM1OJbAM5EcYm_EAPrhZkgsSQ/viewform?embedded=true',
  glissandooEventsUrl: 'https://glissandoo.com/sites/am_lamatanza'
});

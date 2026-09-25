/**
 * Configuración pública de la navegación y los recursos visuales.
 * Mantener estos datos fuera de la lógica facilita cambiar la arquitectura
 * del sitio sin tocar los componentes de interfaz.
 */
export const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  {
    label: 'Escuela', href: '#escuela', children: [
      ['Matr\u00edcula', '#matricula'],
      ['Proyecto educativo', '#proyecto-educativo'],
      ['Profesorado', '#profesorado'],
      ['Banda Joven', '#banda-joven'],
      ['Calendario y horarios', '#calendario'],
      ['Precios', '#precios']
    ]
  },
  { label: 'Banda', href: '#banda', children: [['Nuestra Historia', '#nuestra-historia'], ['Director', '#director'], ['Galardones', '#galardones']] },
  { label: 'Sociedad', href: '#sociedad', children: [['Hazte socio', '#socios'], ['Junta directiva', '#junta-directiva'], ['Revista', '#revista']] },
  { label: 'Galer\u00eda', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' }
];

export const MEDIA = Object.freeze({
  hero: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
  concert: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80',
  music: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1000&q=80',
  people: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  conductor: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
  classroom: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80'
});

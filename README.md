# Asociación Musical La Matanza

Web estática responsive para la Asociación Musical Nuestra Señora del Remedio de La Matanza.

## Estructura

```text
.
├── index.html      # Shell HTML, cabecera y pie
├── app.js          # Arranque, plantillas y composición de páginas
├── styles.css      # Sistema visual y responsive
├── src/
│   ├── components/ # Navegación y animaciones compartidas
│   ├── data/       # Configuración y datos públicos
│   ├── pages/      # Helpers comunes de las vistas
│   └── utils/      # Router y utilidades de aplicación
└── assets/         # Logotipos y fotografías locales
```

## Desarrollo local

La web no necesita dependencias externas para ejecutarse. Desde esta carpeta:

```powershell
npm run dev
```

Después, abre <http://localhost:4173>.

## Rutas principales

Las páginas utilizan rutas hash, por ejemplo `#inicio`, `#nuestra-historia`, `#director`, `#junta-directiva`, `#galeria` y `#contacto`. La ruta antigua `#curriculum` se redirige a `#nuestra-historia`.

## Integraciones

- La matrícula se gestiona mediante Google Forms.
- Contacto, alta de socio y donaciones preparan un correo dirigido a `bandalamatanza@gmail.com`.
- La agenda intenta consultar Glissandoo y conserva datos locales de respaldo si la consulta externa no está disponible.

Antes de publicar, hay que confirmar los datos legales, las fotografías y las fechas de la agenda.

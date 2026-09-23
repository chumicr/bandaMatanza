# Asociación Musical La Matanza

Web estática responsive para una escuela y banda de música.

## Estructura

```text
.
├── index.html           # Shell HTML, cabecera y pie
├── app.js               # Router hash, composición e interacciones
├── styles.css           # Sistema visual y responsive
└── src/
    ├── config.js        # Navegación y recursos multimedia
    └── ui.js            # Componentes de navegación e interacciones
```

## Desarrollo local

Desde esta carpeta se puede levantar con cualquier servidor estático. Por ejemplo:

```powershell
node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{const file=path.join(process.cwd(),req.url==='/'?'index.html':req.url.split('?')[0]);fs.readFile(file,(err,data)=>{if(err){res.statusCode=404;res.end('Not found');return}res.end(data)})}).listen(4173,()=>console.log('http://localhost:4173'))"
```

El arranque principal es JavaScript clásico para que la web funcione también al abrir `index.html` directamente en local.

## Convenciones

- Las rutas de la interfaz se gestionan mediante hash (`#inicio`, `#calendario`, etc.).
- La navegación y las imágenes viven en `src/config.js`.
- Las interacciones reutilizables están documentadas y centralizadas en `src/ui.js`; el arranque compatible se mantiene en `app.js`.
- Las páginas se mantienen agrupadas en `app.js` para facilitar una futura migración a componentes independientes.
- El contenido visual es ficticio y está preparado para conectarse posteriormente a un CMS.

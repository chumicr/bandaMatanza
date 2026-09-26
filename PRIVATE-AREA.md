# Area privada

El acceso está disponible en `/admin.html` cuando la web se ejecuta con `scripts/serve.mjs`. Tras iniciar sesión, el administrador vuelve a la web pública en modo edición: la misma cabecera, páginas, componentes y footer muestran controles discretos junto al contenido editable.

Antes de iniciarla, define una contraseña de administrador:

```powershell
$env:ADMIN_PASSWORD = "una-contrasena-larga-y-unica"
npm run dev
```

El modo edición permite cambiar textos directamente sobre la página. La agenda no se edita desde el área privada: la web muestra únicamente los eventos públicos que devuelve Glissandoo. Las solicitudes y mensajes se consultan desde las rutas privadas de la API.

Los datos se guardan en `data/admin.json`. Ese archivo puede contener datos personales y debe mantenerse protegido y fuera de repositorios públicos.

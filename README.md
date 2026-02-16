# UNAI App - Predicciones F1 2026

Aplicación de predicciones para la temporada de F1 2026.

## Instalación local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del proyecto

```
unai-app/
├── public/
│   ├── fonts/           # Fuentes Formula1
│   │   ├── Formula1-Regular_web_0.ttf
│   │   ├── Formula1-Bold_web_0.ttf
│   │   └── Formula1-Wide_web_0.ttf
│   └── manifest.json    # PWA manifest
├── src/
│   └── app/
│       ├── globals.css  # Estilos globales y fuentes
│       ├── layout.js    # Layout principal
│       └── page.jsx     # Aplicación principal
├── package.json
├── tailwind.config.js
└── next.config.js
```

## Despliegue en Vercel

1. Sube este proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com) y crea una cuenta (gratis)
3. Conecta tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Next.js
5. Click en "Deploy"

## Notas importantes

- **Fuentes**: Asegúrate de copiar los archivos .ttf a `public/fonts/`
- **Datos**: Los datos se guardan en localStorage del navegador
- **PWA**: La app se puede instalar como aplicación en móviles

## Próximos pasos (backend)

Para una versión de producción completa, necesitarás:
- Base de datos (Supabase recomendado)
- Autenticación real
- API para sincronizar datos entre usuarios

import './globals.css'

export const metadata = {
  title: 'UNAI App - Predicciones F1',
  description: 'Predice los resultados de las carreras de F1 2026',
  manifest: '/manifest.json',
  themeColor: '#E10600',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="bg-gray-900 text-white">
        {children}
      </body>
    </html>
  )
}

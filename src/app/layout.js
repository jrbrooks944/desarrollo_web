// src/app/layout.js
import './globals.css'; // Si tienes otros estilos globales

export const metadata = {
    title: 'Tu Título',
    description: 'Descripción de tu sitio',
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}

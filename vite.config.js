import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || 'https://universite-horizon.ml').replace(/\/+$/, '');

  return {
  // URL publique du site : "/" pour un domaine racine.
  // Pilotée par VITE_SITE_URL (variable d'environnement GitHub Actions).
  base: '/',
  define: {
    __SITE_URL__: JSON.stringify(siteUrl),
  },
  plugins: [
    react(),
    // Remplace %VITE_SITE_URL% dans index.html par l'URL réelle
    {
      name: 'site-url-html',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          return html.replace(/%VITE_SITE_URL%/g, siteUrl);
        },
      },
    },
  ],
  build: {
    outDir: 'dist',
    // Nettoie le dossier dist avant chaque build (évite les fichiers orphelins)
    emptyOutDir: true,
    // Séparation des chunks pour un chargement optimisé
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: false
  }
  };
});

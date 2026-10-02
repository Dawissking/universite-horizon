import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // Chemin public : "/" pour un domaine racine (ex: https://universite-horizon.ml)
  // Utiliser "./" si le site est déployé dans un sous-dossier (ex: /university/)
  base: '/',
  plugins: [react()],
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
});

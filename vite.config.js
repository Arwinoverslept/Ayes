import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Cameras/phones often save photos with UPPERCASE extensions (e.g. .JPG).
  // Vite only treats lowercase image extensions as assets by default, so we
  // explicitly include the uppercase variants used by the Favorites folder.
  assetsInclude: [
    '**/*.JPG',
    '**/*.JPEG',
    '**/*.PNG',
    '**/*.WEBP',
    '**/*.GIF',
    '**/*.AVIF',
  ],
  server: {
    port: 5173,
    open: true,
    host: true, // expose on your local network so phones on the same WiFi can connect
  },
});

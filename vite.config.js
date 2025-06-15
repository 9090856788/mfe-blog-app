import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation"

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shellApp',
      remotes: {
        // dynamically loaded in code, not statically declared here
      },
      shared: ['react', 'react-dom']
    })
  ],
  server: {
    port: 3000
  },
  build: {
    target: 'esnext'
  }
});

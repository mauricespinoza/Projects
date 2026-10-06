import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages sirve esta app desde /<repo>/geophoto/ (repo de usuario, no de
// organización), así que los assets deben pedirse con ese prefijo. El workflow
// de deploy pasa VITE_BASE con el nombre real del repo; GITHUB_PAGES queda como
// respaldo. En dev/build normal la base es '/'.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || (process.env.GITHUB_PAGES ? '/ClaudeCoding/geophoto/' : '/'),
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
})

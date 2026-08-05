import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise the warning threshold — large media is expected in this project
    chunkSizeWarningLimit: 2000,
    // Enable CSS code splitting for faster per-page loads
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Separate large media assets from JS/CSS so they can be cached independently
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] || assetInfo.name || ''
          if (/\.(mp4|webm|ogg)$/i.test(name)) return 'assets/video/[name]-[hash][extname]'
          if (/\.(png|jpe?g|gif|webp|avif|svg)$/i.test(name)) return 'assets/img/[name]-[hash][extname]'
          if (/\.(woff2?|ttf|eot)$/i.test(name)) return 'assets/fonts/[name]-[hash][extname]'
          return 'assets/[name]-[hash][extname]'
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Core React — loads first, cached longest
            if (id.includes('react-dom') || id.includes('react/') || id.includes('react-router')) {
              return 'vendor-react'
            }
            // Animation — large but shared across pages
            if (id.includes('framer-motion')) {
              return 'vendor-motion'
            }
            // 3D — only loaded on pages that need it
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three'
            }
            // Everything else — icons, utilities, etc.
            return 'vendor-libs'
          }
        }
      }
    }
  }
})

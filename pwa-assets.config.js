import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'karr-tienda-awp',
        short_name: 'karr-tienda-awp',
        description: 'Catalogo productos de Axelrrotes',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'favicon.svg', // Icono genérico
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ]
})

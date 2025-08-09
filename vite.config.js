/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'
import { webfontDownload } from 'vite-plugin-webfont-dl'
// import { ViteCompress } from 'vite-plugin-compress' // Temporarily disabled
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig(({ command, mode }) => ({
  plugins: [
    vue(),
    
    // Auto-import Vue APIs for better DX and smaller bundles
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia'
      ],
      dts: true,
      eslintrc: {
        enabled: true
      }
    }),
    
    // Auto-import Vue components
    Components({
      dts: true
    }),
    
    // Download and optimize web fonts
    webfontDownload(),
    
    // PWA capabilities with service worker
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.svg', 'robots.txt'],
      manifest: {
        name: 'Unified Contractors',
        short_name: 'UC',
        description: 'Park City Construction & Remodeling Company',
        theme_color: '#05b3f2',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'logo.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}']
      }
    }),
    
    // Compression for static assets (handled by server/CDN)
    // mode === 'production' && ViteCompress({
    //   algorithm: 'gzip'
    // }),
    
    // Bundle analyzer (only in analyze mode)
    mode === 'analyze' && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ].filter(Boolean),
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  
  // Build optimizations
  build: {
    target: 'es2015',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: mode === 'development',
    
    rollupOptions: {
      output: {
        // Manual chunk splitting for optimal loading
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'bootstrap': ['bootstrap'],
          'icons': ['lucide-vue-next']
        },
        // Optimize chunk file names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
          if (facadeModuleId) {
            const fileName = facadeModuleId.split('/').pop()
            if (fileName.includes('.vue')) {
              return 'views/[name]-[hash].js'
            }
          }
          return 'chunks/[name]-[hash].js'
        }
      }
    },
    
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  
  // CSS optimization
  css: {
    devSourcemap: mode === 'development'
  },
  
  // Performance optimizations
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'lucide-vue-next'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  
  // Test configuration
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,vue}'],
      exclude: [
        'src/main.js',
        'src/test/**',
        'src/**/*.d.ts',
        'node_modules/**'
      ]
    }
  }
}))
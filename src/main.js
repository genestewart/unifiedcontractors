import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import App from './App.vue'
import router from './router'

// Optimized CSS imports - load critical CSS first
import './styles/main.css'

// Lazy load non-critical CSS
const loadNonCriticalCSS = () => {
  // Load PrimeIcons
  const primeIconsLink = document.createElement('link')
  primeIconsLink.rel = 'stylesheet'
  primeIconsLink.href = '/node_modules/primeicons/primeicons.css'
  primeIconsLink.media = 'print'
  primeIconsLink.onload = () => { primeIconsLink.media = 'all' }
  document.head.appendChild(primeIconsLink)
  
  // Load Bootstrap utilities
  const bootstrapUtilitiesLink = document.createElement('link')
  bootstrapUtilitiesLink.rel = 'stylesheet'
  bootstrapUtilitiesLink.href = '/node_modules/bootstrap/dist/css/bootstrap-utilities.min.css'
  bootstrapUtilitiesLink.media = 'print'
  bootstrapUtilitiesLink.onload = () => { bootstrapUtilitiesLink.media = 'all' }
  document.head.appendChild(bootstrapUtilitiesLink)
  
  // Load Bootstrap grid
  const bootstrapGridLink = document.createElement('link')
  bootstrapGridLink.rel = 'stylesheet'
  bootstrapGridLink.href = '/node_modules/bootstrap/dist/css/bootstrap-grid.min.css'
  bootstrapGridLink.media = 'print'
  bootstrapGridLink.onload = () => { bootstrapGridLink.media = 'all' }
  document.head.appendChild(bootstrapGridLink)
}

// Load non-critical CSS after page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadNonCriticalCSS)
} else {
  loadNonCriticalCSS()
}

const app = createApp(App)

// Performance optimized Pinia store
const pinia = createPinia()

// Add performance monitoring
if (import.meta.env.PROD) {
  // Performance observer for monitoring Core Web Vitals
  const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        console.log('Navigation performance:', {
          domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
          load: entry.loadEventEnd - entry.loadEventStart,
          firstPaint: entry.responseEnd - entry.requestStart
        })
      }
      
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime)
      }
      
      if (entry.entryType === 'first-input') {
        console.log('FID:', entry.processingStart - entry.startTime)
      }
      
      if (entry.entryType === 'layout-shift') {
        console.log('CLS:', entry.value)
      }
    }
  })
  
  performanceObserver.observe({ entryTypes: ['navigation', 'largest-contentful-paint', 'first-input', 'layout-shift'] })
}

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
})

// Preload critical routes
router.beforeEach((to, from, next) => {
  // Preload the next likely route
  const preloadRoutes = {
    '/': ['/services', '/about'],
    '/services': ['/contact', '/portfolio'],
    '/about': ['/services', '/contact']
  }
  
  const routesToPreload = preloadRoutes[to.path]
  if (routesToPreload) {
    routesToPreload.forEach(route => {
      const routeRecord = router.resolve(route)
      if (routeRecord.matched[0]?.components?.default) {
        // Preload the component
        routeRecord.matched[0].components.default()
      }
    })
  }
  
  next()
})

app.mount('#app')
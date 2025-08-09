# Performance Optimization Guide

## Overview

This guide documents the comprehensive performance optimizations implemented for the Unified Contractors Vue 3 + Vite application. The optimizations focus on reducing initial bundle size, improving Core Web Vitals, and enhancing mobile performance.

## Performance Metrics Targets

### Core Web Vitals
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100 milliseconds
- **Cumulative Layout Shift (CLS)**: < 0.1

### Additional Metrics
- **First Contentful Paint (FCP)**: < 1.8 seconds
- **Speed Index**: < 3.0 seconds
- **Total Blocking Time (TBT)**: < 200 milliseconds

## Implemented Optimizations

### 1. Bundle Analysis and Code Splitting

#### Manual Chunk Splitting
```javascript
// vite.config.js
manualChunks: {
  'vue-vendor': ['vue', 'vue-router', 'pinia'],
  'ui-vendor': ['primevue', 'primeicons', '@primevue/themes'],
  'bootstrap': ['bootstrap'],
  'icons': ['lucide-vue-next']
}
```

#### Route-based Code Splitting
All routes except the home page use dynamic imports for lazy loading:
```javascript
component: () => import('../views/ServicesView.vue')
```

### 2. Resource Preloading and Prefetching

#### Critical Resource Preloading
- Module preloading for main.js, App.vue, and router
- CSS preloading for critical styles
- Image preloading for above-the-fold content

#### Smart Route Preloading
Implemented intelligent route preloading based on user navigation patterns:
```javascript
const preloadRoutes = {
  '/': ['/services', '/about'],
  '/services': ['/contact', '/portfolio'],
  '/about': ['/services', '/contact']
}
```

### 3. Image Optimization

#### Lazy Loading Composable
Created `useLazyImage.js` composable with:
- Intersection Observer for efficient lazy loading
- Responsive image support with srcset
- Connection-aware loading
- Placeholder and error handling

#### Image Best Practices
- WebP format support
- Responsive image sizes
- Lazy loading with smooth transitions
- Preloading for critical images

### 4. CSS Optimization

#### Critical CSS Strategy
- Inline critical above-the-fold styles in HTML
- Lazy load non-critical CSS (PrimeIcons, Bootstrap utilities)
- CSS layers for prioritization

#### CSS Performance Features
- Custom properties for consistent theming
- Optimized animations with `prefers-reduced-motion`
- Print-specific styles
- Low-bandwidth optimizations

### 5. PWA Implementation

#### Service Worker Features
- Automatic updates with workbox
- Strategic caching for different resource types
- Offline fallbacks
- Background sync capabilities

#### Caching Strategies
- **StaleWhileRevalidate**: Fonts and static resources
- **CacheFirst**: Images with 30-day expiration
- **NetworkFirst**: API calls and dynamic content

### 6. Performance Monitoring

#### Core Web Vitals Tracking
```javascript
// usePerformance.js composable
const performanceObserver = new PerformanceObserver((list) => {
  // Track LCP, FID, CLS automatically
})
```

#### Development Tools
- Bundle analyzer with visual reports
- Lighthouse CI integration
- Performance grade calculation
- Resource timing analysis

### 7. Build Optimizations

#### Vite Configuration
- ES2015 target for modern browsers
- ESBuild for fast minification
- Tree shaking enabled
- Source maps in development only
- Compression (Gzip + Brotli)

#### Auto-Import Strategy
- Vue APIs auto-imported
- Components auto-imported
- Reduced bundle size through tree shaking

## Usage Instructions

### Development Commands

```bash
# Standard development
npm run dev

# Build with analysis
npm run build:analyze

# Performance audit
npm run perf:audit

# Lighthouse CI
npm run lighthouse
```

### Performance Monitoring

#### Using the Performance Composable
```vue
<script setup>
import { usePerformance } from '@/composables/usePerformance'

const { metrics, measureComponentRender, logPerformanceReport } = usePerformance()

// Measure component render time
const renderTimer = measureComponentRender('MyComponent')
renderTimer.start()
// ... component logic
renderTimer.end()

// Get performance report
const report = logPerformanceReport()
</script>
```

#### Using the Lazy Image Composable
```vue
<script setup>
import { useLazyImage } from '@/composables/useLazyImage'

const { imageRef, currentSrc, isLoaded } = useLazyImage(
  '/path/to/image.jpg',
  '/path/to/placeholder.jpg'
)
</script>

<template>
  <img
    ref="imageRef"
    :src="currentSrc"
    :class="{ loaded: isLoaded }"
    alt="Description"
    loading="lazy"
  >
</template>
```

## Performance Best Practices

### 1. Component Optimization
- Use `defineAsyncComponent` for heavy components
- Implement proper `v-memo` for expensive renders
- Minimize reactive data overhead
- Use computed properties for derived state

### 2. Asset Management
- Optimize images before deployment
- Use appropriate image formats (WebP, AVIF)
- Implement lazy loading for all images
- Preload critical resources only

### 3. JavaScript Optimization
- Debounce expensive operations
- Use throttling for scroll/resize handlers
- Implement virtual scrolling for large lists
- Minimize DOM manipulations

### 4. CSS Performance
- Avoid large CSS files
- Use CSS containment where appropriate
- Minimize layout thrashing
- Optimize animations for 60fps

## Monitoring and Alerts

### Lighthouse CI Integration
Automated performance testing on every build with thresholds:
- Performance Score: > 90
- Accessibility Score: > 95
- Best Practices: > 90
- SEO Score: > 95

### Performance Budget
- Initial Bundle: < 200KB gzipped
- Images: < 500KB per route
- Third-party scripts: < 100KB total
- CSS: < 50KB critical path

## Troubleshooting

### Common Performance Issues

#### Large Bundle Size
1. Check bundle analyzer report
2. Identify large dependencies
3. Consider code splitting
4. Remove unused dependencies

#### Slow Initial Load
1. Verify critical resource preloading
2. Check CSS delivery strategy
3. Optimize above-the-fold content
4. Review JavaScript execution timing

#### Poor LCP Score
1. Optimize largest content element
2. Preload hero images
3. Reduce server response time
4. Eliminate render-blocking resources

#### High CLS Score
1. Set explicit dimensions for images
2. Avoid inserting content above existing content
3. Use CSS transforms for animations
4. Reserve space for dynamic content

## Future Optimizations

### Planned Improvements
1. **Advanced Image Optimization**
   - AVIF format support
   - Dynamic image resizing
   - CDN integration

2. **Enhanced Caching**
   - HTTP/2 Server Push
   - Edge-side includes
   - Advanced service worker strategies

3. **Performance Analytics**
   - Real User Monitoring (RUM)
   - Performance API integration
   - Custom performance metrics

4. **Mobile Optimizations**
   - Progressive loading
   - Touch gesture optimization
   - Battery-aware features

## Conclusion

These optimizations provide a solid foundation for excellent web performance. Regular monitoring and testing ensure that performance remains optimal as the application evolves. Continue to use the provided tools and follow the best practices outlined in this guide.

For questions or improvements to this guide, please refer to the development team or create an issue in the project repository.
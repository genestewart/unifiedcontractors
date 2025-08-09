import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for lazy loading images with Intersection Observer
 * @param {string} src - Image source URL
 * @param {string} placeholder - Placeholder image (optional)
 * @param {Object} options - Intersection Observer options
 * @returns {Object} - Reactive refs and methods
 */
export function useLazyImage(src, placeholder = '', options = {}) {
  const imageRef = ref(null)
  const isLoaded = ref(false)
  const isError = ref(false)
  const currentSrc = ref(placeholder)

  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  }

  const observerOptions = { ...defaultOptions, ...options }
  let observer = null

  const loadImage = () => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      
      img.onload = () => {
        currentSrc.value = src
        isLoaded.value = true
        resolve(img)
      }
      
      img.onerror = () => {
        isError.value = true
        reject(new Error(`Failed to load image: ${src}`))
      }
      
      // Add srcset support for responsive images
      if (src.includes('srcset=')) {
        const [baseSrc, srcsetParams] = src.split('?srcset=')
        img.srcset = srcsetParams
        img.src = baseSrc
      } else {
        img.src = src
      }
    })
  }

  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isLoaded.value && !isError.value) {
        loadImage().catch(() => {
          // Image failed to load, keep placeholder or show error state
          console.warn(`Failed to lazy load image: ${src}`)
        })
        
        // Unobserve after loading starts
        if (observer && imageRef.value) {
          observer.unobserve(imageRef.value)
        }
      }
    })
  }

  onMounted(() => {
    if ('IntersectionObserver' in window && imageRef.value) {
      observer = new IntersectionObserver(handleIntersection, observerOptions)
      observer.observe(imageRef.value)
    } else {
      // Fallback for browsers without Intersection Observer
      loadImage()
    }
  })

  onUnmounted(() => {
    if (observer && imageRef.value) {
      observer.unobserve(imageRef.value)
      observer = null
    }
  })

  return {
    imageRef,
    currentSrc,
    isLoaded,
    isError,
    loadImage
  }
}

/**
 * Utility function to generate responsive image URLs
 * @param {string} baseUrl - Base image URL
 * @param {Array} sizes - Array of width sizes
 * @returns {string} - Srcset string
 */
export function generateSrcSet(baseUrl, sizes = [320, 640, 768, 1024, 1280, 1920]) {
  return sizes
    .map(size => {
      const url = baseUrl.includes('?') 
        ? `${baseUrl}&w=${size}` 
        : `${baseUrl}?w=${size}`
      return `${url} ${size}w`
    })
    .join(', ')
}

/**
 * Utility function to optimize image loading based on connection speed
 */
export function getOptimalImageQuality() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  
  if (!connection) return 'high'
  
  const effectiveType = connection.effectiveType
  const saveData = connection.saveData
  
  if (saveData) return 'low'
  
  switch (effectiveType) {
    case 'slow-2g':
    case '2g':
      return 'low'
    case '3g':
      return 'medium'
    case '4g':
    default:
      return 'high'
  }
}

/**
 * Preload critical images
 * @param {Array} imageUrls - Array of image URLs to preload
 */
export function preloadImages(imageUrls) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  
  imageUrls.forEach(url => {
    const preloadLink = link.cloneNode()
    preloadLink.href = url
    document.head.appendChild(preloadLink)
  })
}
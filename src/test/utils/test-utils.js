import { mount, nextTick } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

// Create a test router with minimal routes
export const createTestRouter = (routes = []) => {
  const defaultRoutes = [
    { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
    { path: '/about', name: 'about', component: { template: '<div>About</div>' } },
    { path: '/services', name: 'services', component: { template: '<div>Services</div>' } },
    { path: '/contact', name: 'contact', component: { template: '<div>Contact</div>' } },
    { path: '/portfolio', name: 'portfolio', component: { template: '<div>Portfolio</div>' } }
  ]
  
  return createRouter({
    history: createWebHistory(),
    routes: routes.length > 0 ? routes : defaultRoutes
  })
}

// Create a test pinia instance
export const createTestPinia = () => {
  return createPinia()
}

// Enhanced render function with common providers
export const renderWithProviders = (component, options = {}) => {
  const router = options.router || createTestRouter()
  const pinia = options.pinia || createTestPinia()
  
  const defaultGlobal = {
    plugins: [router, pinia],
    stubs: {
      RouterLink: {
        template: '<a><slot /></a>',
        props: ['to']
      },
      RouterView: {
        template: '<div><slot /></div>'
      }
    }
  }
  
  const mergedOptions = {
    ...options,
    global: {
      ...defaultGlobal,
      ...options.global,
      plugins: [
        ...(defaultGlobal.plugins || []),
        ...(options.global?.plugins || [])
      ],
      stubs: {
        ...defaultGlobal.stubs,
        ...options.global?.stubs
      }
    }
  }
  
  return mount(component, mergedOptions)
}

// Helper to wait for Vue's next tick multiple times
export const waitForTicks = async (ticks = 1) => {
  for (let i = 0; i < ticks; i++) {
    await nextTick()
  }
}

// Mock data generators
export const mockUser = (overrides = {}) => ({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  ...overrides
})

export const mockProject = (overrides = {}) => ({
  id: 1,
  title: 'Test Project',
  description: 'A test project description',
  image: '/test-image.jpg',
  category: 'residential',
  ...overrides
})
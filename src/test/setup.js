import { vi } from 'vitest'

// Mock CSS imports
vi.mock('*.css', () => ({}))
vi.mock('*.scss', () => ({}))

// Mock image imports
vi.mock('*.svg', () => '/mock-logo.svg')
vi.mock('*.png', () => '/mock-image.png')
vi.mock('*.jpg', () => '/mock-image.jpg')
vi.mock('*.jpeg', () => '/mock-image.jpeg')

// Global test configuration
globalThis.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver
globalThis.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
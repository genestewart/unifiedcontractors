# Testing Infrastructure Documentation

## Overview

This document outlines the comprehensive testing setup for the Unified Contractors Vue 3 + Vite project. The testing infrastructure is built with Vitest, @vue/test-utils, and follows Vue 3 best practices.

## 🛠️ Testing Stack

- **Test Runner**: Vitest - Fast, Vite-native test runner
- **Component Testing**: @vue/test-utils - Official Vue testing utilities
- **DOM Environment**: jsdom - Simulates browser environment in Node.js
- **Coverage**: @vitest/coverage-v8 - V8-based coverage reporting
- **Mocking**: Built-in Vitest mocking capabilities

## 📁 Project Structure

```
src/test/
├── README.md                           # This documentation
├── setup.js                           # Global test setup and mocks
├── utils/
│   └── test-utils.js                  # Custom testing utilities
├── components/
│   ├── HeaderNav.test.js              # Navigation component tests
│   └── component-mounting.test.js     # Component mounting examples
├── views/
│   └── HomeView.test.js               # Home view component tests
└── router/
    └── router.test.js                 # Router configuration tests
```

## 🚀 Getting Started

### Running Tests

```bash
# Run all tests once
npm run test:run

# Run tests in watch mode (recommended for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in interactive mode
npm test

# Run tests with UI interface
npm run test:ui
```

### Test Coverage

The coverage configuration is set to:
- **Provider**: V8 (faster than Istanbul)
- **Reporters**: Text, JSON, HTML
- **Include**: All `.js` and `.vue` files in `src/`
- **Exclude**: `main.js`, test files, type definitions, node_modules

Coverage reports are generated in the `coverage/` directory.

## 🧪 Testing Patterns and Best Practices

### 1. Component Testing Structure

Follow the AAA pattern (Arrange, Act, Assert):

```javascript
import { describe, it, expect, beforeEach } from 'vitest'
import { renderWithProviders } from '../utils/test-utils.js'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  let wrapper

  beforeEach(() => {
    // Arrange
    wrapper = renderWithProviders(MyComponent, {
      props: { message: 'Test' }
    })
  })

  it('renders correctly', () => {
    // Assert
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-testid="message"]').text()).toBe('Test')
  })
})
```

### 2. Element Selection Best Practices

**✅ Recommended**: Use `data-testid` attributes

```javascript
// In your component template
<button data-testid="submit-button">Submit</button>

// In your test
const button = wrapper.find('[data-testid="submit-button"]')
```

**❌ Avoid**: Relying on CSS classes or HTML structure

```javascript
// Fragile - breaks if styling changes
const button = wrapper.find('.btn-primary')
const button = wrapper.find('div > button')
```

### 3. Event Testing

```javascript
it('handles click events correctly', async () => {
  const button = wrapper.find('[data-testid="click-button"]')
  
  // Trigger event
  await button.trigger('click')
  
  // Check emitted events
  expect(wrapper.emitted('click')).toHaveLength(1)
  expect(wrapper.emitted('click')[0]).toEqual([expectedPayload])
})
```

### 4. Async Testing

Always await async operations and use `nextTick` when needed:

```javascript
import { nextTick } from 'vue'

it('updates state asynchronously', async () => {
  await wrapper.setProps({ newProp: 'value' })
  await nextTick()
  
  expect(wrapper.find('[data-testid="content"]').text()).toBe('expected')
})
```

### 5. Router Testing

Use the provided `renderWithProviders` utility for components that depend on Vue Router:

```javascript
import { renderWithProviders } from '../utils/test-utils.js'

it('navigates correctly', async () => {
  const wrapper = renderWithProviders(RouterComponent)
  
  expect(wrapper.find('[data-testid="home-link"]').exists()).toBe(true)
  expect(wrapper.vm.$route).toBeDefined()
})
```

### 6. Mocking External Dependencies

Mock external dependencies in your test files:

```javascript
import { vi } from 'vitest'

// Mock an imported module
vi.mock('@/api/service', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'mock' }))
}))

// Mock a component
vi.mock('@/components/HeavyComponent.vue', () => ({
  default: { template: '<div data-testid="mocked-component">Mocked</div>' }
}))
```

## 🧰 Testing Utilities

### renderWithProviders

Enhanced component mounting with common providers pre-configured:

```javascript
import { renderWithProviders } from './utils/test-utils.js'

const wrapper = renderWithProviders(MyComponent, {
  props: { message: 'Hello' },
  router: customRouter, // Optional custom router
  pinia: customPinia,   // Optional custom pinia instance
  global: {
    stubs: { 'child-component': true }
  }
})
```

### Test Data Generators

Use the provided mock data generators for consistent test data:

```javascript
import { mockUser, mockProject } from './utils/test-utils.js'

const testUser = mockUser({ name: 'Custom Name' })
const testProject = mockProject({ title: 'Custom Project' })
```

## 📝 Writing Good Tests

### Test Naming Conventions

- Use descriptive test names that explain what is being tested
- Group related tests in `describe` blocks
- Use nested `describe` blocks for logical grouping

```javascript
describe('HeaderNav', () => {
  describe('Mobile Menu Functionality', () => {
    it('opens mobile menu when toggle button is clicked', () => {
      // Test implementation
    })

    it('closes mobile menu when nav link is clicked', () => {
      // Test implementation
    })
  })

  describe('Navigation Links', () => {
    it('renders all required navigation links', () => {
      // Test implementation
    })
  })
})
```

### Test Categories to Cover

1. **Rendering Tests**: Component renders correctly
2. **Props Tests**: Component handles props correctly
3. **Events Tests**: Component emits and handles events
4. **User Interaction Tests**: Component responds to user actions
5. **Edge Cases**: Component handles edge cases and errors
6. **Integration Tests**: Component works with other components/systems

### Example Test Categories

```javascript
describe('MyComponent', () => {
  describe('Component Rendering', () => {
    // Basic rendering tests
  })

  describe('Props Handling', () => {
    // Props validation and reactivity tests
  })

  describe('User Interactions', () => {
    // Click, input, form submission tests
  })

  describe('Edge Cases', () => {
    // Error handling, boundary conditions
  })

  describe('Integration', () => {
    // Tests with router, store, other components
  })
})
```

## 🔍 Coverage Guidelines

### Coverage Targets

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

### What to Focus On

1. **Critical Business Logic**: 90%+ coverage
2. **User Interactions**: All paths covered
3. **Error Handling**: Exception scenarios tested
4. **Edge Cases**: Boundary conditions validated

### What Not to Over-Test

- Simple getters/setters
- Third-party library integrations (mock them instead)
- CSS and styling (use visual regression tests for UI)
- Trivial computed properties

## 🚫 Common Anti-Patterns to Avoid

### 1. Testing Implementation Details

```javascript
// ❌ Bad - testing internal method names
expect(wrapper.vm.internalMethod).toHaveBeenCalled()

// ✅ Good - testing behavior
expect(wrapper.find('[data-testid="result"]').text()).toBe('expected')
```

### 2. Overly Specific Mocks

```javascript
// ❌ Bad - too specific, brittle
vi.mock('api', () => ({
  getData: vi.fn().mockResolvedValue({ id: 1, name: 'specific' })
}))

// ✅ Good - flexible, focused on what matters
vi.mock('api', () => ({
  getData: vi.fn().mockResolvedValue(mockUser())
}))
```

### 3. Testing Everything in One Test

```javascript
// ❌ Bad - testing multiple concerns
it('component works correctly', () => {
  // 50 lines of assertions testing everything
})

// ✅ Good - focused, single concern
it('displays user name correctly', () => {
  expect(wrapper.find('[data-testid="user-name"]').text()).toBe(user.name)
})
```

## 🔧 Configuration Files

### vite.config.js Test Configuration

```javascript
export default defineConfig({
  // ... other config
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,vue}'],
      exclude: ['src/main.js', 'src/test/**', 'src/**/*.d.ts', 'node_modules/**']
    }
  }
})
```

### Global Test Setup (setup.js)

The setup file includes:
- CSS and image mocks
- Global browser API mocks (ResizeObserver, IntersectionObserver)
- Window.matchMedia mock
- Common test utilities

## 📚 Additional Resources

### Useful Links

- [Vitest Documentation](https://vitest.dev/)
- [Vue Test Utils Documentation](https://test-utils.vuejs.org/)
- [Vue 3 Testing Guide](https://vuejs.org/guide/scaling-up/testing.html)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

### Recommended Reading

1. **"The Testing Trophy"** by Kent C. Dodds - Testing strategy philosophy
2. **"Common Testing Mistakes"** - What to avoid in your tests
3. **"Testing Vue.js Components"** - Vue-specific testing patterns

## 🤝 Contributing

When adding new tests:

1. Follow the established patterns in existing tests
2. Use the provided utilities (`renderWithProviders`, mock generators)
3. Write descriptive test names
4. Group tests logically with `describe` blocks
5. Include both happy path and edge case tests
6. Maintain test isolation (each test should be independent)

## 📋 Checklist for New Components

When creating a new component, ensure you test:

- [ ] Component renders without errors
- [ ] All props are handled correctly
- [ ] Default props work as expected
- [ ] All custom events are emitted with correct payloads
- [ ] User interactions work as expected
- [ ] Component integrates correctly with router/store
- [ ] Edge cases and error conditions are handled
- [ ] Accessibility attributes are present
- [ ] Component cleans up properly on unmount

Remember: Good tests are not about achieving 100% coverage, but about building confidence that your code works correctly in all scenarios your users might encounter.
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue.js 3 website for Unified Contractors, a construction and restoration company in Park City, Utah. It's a static marketing website built with Vite, PrimeVue components, and Bootstrap utilities.

## Essential Commands

```bash
npm install           # Install dependencies
npm run dev           # Start development server (runs on http://localhost:5173)
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint v9 with auto-fix
npm run test:run      # Run all tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate test coverage report
npm run build:analyze # Build with bundle size analysis
npm run perf:audit    # Run Lighthouse performance audit
```

## Architecture & Key Patterns

### Technology Stack
- **Vue 3** with Composition API
- **Vite 6** for build tooling with optimized chunking
- **PrimeVue** for UI components with Lara theme
- **Bootstrap** for grid and utilities only (not full framework)
- **Vue Router 4** for client-side routing with lazy loading
- **Pinia** for state management (if needed)
- **Vitest** for unit testing with Vue Test Utils
- **ESLint 9** with flat config for code quality
- **PWA** support with Vite PWA plugin and Workbox

### Project Structure
- `/src/views/` - Page-level components (HomeView, ServicesView, etc.)
- `/src/components/home/` - Homepage section components (HeroSection, CTASection, etc.)
- `/src/components/layout/` - Shared layout components (HeaderNav, FooterSection)
- `/src/router/` - Vue Router configuration with lazy-loaded routes
- `/src/styles/main.css` - Global styles and custom CSS

### Routing Pattern
All routes except Home are lazy-loaded for performance:
- `/` - HomeView (eagerly loaded)
- `/services`, `/about`, `/contact`, `/portfolio` - Lazy-loaded views

### Styling Approach
1. PrimeVue components provide base styling with Lara theme
2. Bootstrap provides responsive grid (`container`, `row`, `col-*`) and utilities
3. Custom styles in `main.css` using company color palette:
   - Primary Blue: `#05b3f2`
   - Secondary Red: `#e30414`
   - Dark: `#252525`

### Import Aliases
- `@/` maps to `/src/` directory (configured in vite.config.js)

## Development Workflow

When making changes:
1. Components should follow Vue 3 Composition API patterns
2. Use PrimeVue components where applicable
3. Maintain responsive design using Bootstrap grid
4. Test across different viewport sizes
5. Write tests for new components/features
6. Run `npm run test:run` to ensure tests pass
7. Run `npm run lint` before finalizing changes
8. Check bundle size with `npm run build:analyze` for significant changes
9. Verify accessibility with keyboard navigation and screen readers
10. Test performance impact with `npm run perf:audit`

## Component Conventions

- Homepage sections are modular components in `/src/components/home/`
- Each view component represents a full page
- Layout components (header/footer) are shared across all pages
- Use semantic HTML and maintain accessibility
- Composables for reusable logic are in `/src/composables/`
- Tests should be co-located in `/src/test/` with similar structure

## Key Composables

- `useSEO()` - Manage meta tags and structured data
- `useAccessibility()` - Keyboard navigation and ARIA helpers
- `useLazyImage()` - Optimized image loading with placeholders
- `usePerformance()` - Performance monitoring and metrics

## Testing Guidelines

- Unit tests use Vitest and Vue Test Utils
- Test files end with `.test.js` or `.spec.js`
- Mock PrimeVue components and external dependencies
- Focus on user interactions and component behavior
- Aim for >80% code coverage on critical paths
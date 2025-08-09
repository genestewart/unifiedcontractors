# Unified Contractors Website

[![CI Pipeline](https://github.com/genestewart/unifiedcontractors/actions/workflows/ci.yml/badge.svg)](https://github.com/genestewart/unifiedcontractors/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/genestewart/unifiedcontractors/actions/workflows/deploy.yml/badge.svg)](https://github.com/genestewart/unifiedcontractors/actions/workflows/deploy.yml)
[![codecov](https://codecov.io/gh/genestewart/unifiedcontractors/branch/main/graph/badge.svg)](https://codecov.io/gh/genestewart/unifiedcontractors)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vue](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)

Professional website for Unified Contractors - Park City's premier construction and restoration company.

## Features

- **Modern Vue.js 3 Application** - Built with Vite 6 for optimal performance
- **Responsive Design** - Mobile-first approach with Bootstrap grid utilities
- **PrimeVue Components** - Professional UI components with Lara theme
- **SEO Optimized** - Meta tags, structured data, sitemap, and Open Graph support
- **PWA Support** - Offline capability with service workers and app manifest
- **Accessibility** - WCAG 2.1 AA compliant with full keyboard navigation
- **Performance Optimized** - Code splitting, lazy loading, and resource hints
- **Service Showcase** - Comprehensive display of all construction services
- **Contact Integration** - Accessible forms with validation and error handling
- **Testing Suite** - 69+ unit tests with Vitest and coverage reporting
- **CI/CD Pipeline** - Automated testing, building, and deployment

## Tech Stack

- **Frontend Framework:** Vue.js 3 (Composition API)
- **Build Tool:** Vite 6.x with optimized chunking
- **UI Library:** PrimeVue with Lara theme
- **CSS Framework:** Bootstrap (Grid & Utilities)
- **Icons:** PrimeIcons & Lucide Vue
- **Routing:** Vue Router 4 with lazy loading
- **State Management:** Pinia
- **Testing:** Vitest + Vue Test Utils
- **Linting:** ESLint 9 with flat config
- **PWA:** Vite PWA plugin with Workbox

## Color Palette

Extracted from the company logo:
- Primary Blue: `#05b3f2`
- Secondary Red: `#e30414`
- Dark: `#252525`
- Light: `#fbfbfb`
- Gray: `#9ea8ac`

## Project Structure

```
src/
├── components/
│   ├── home/         # Homepage sections
│   └── layout/       # Header and Footer
├── composables/      # Reusable composition functions
│   ├── useSEO.js    # SEO management
│   ├── useAccessibility.js # A11y utilities
│   ├── useLazyImage.js # Image optimization
│   └── usePerformance.js # Performance monitoring
├── views/           # Page components
├── router/          # Vue Router configuration
├── styles/          # Global styles
├── assets/          # Static assets including logo
├── test/            # Test suites and utilities
└── utils/           # Helper functions and utilities
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server at http://localhost:5173
npm run preview          # Preview production build

# Building
npm run build            # Build for production
npm run build:analyze    # Build with bundle analysis

# Testing
npm test                 # Run tests in interactive mode
npm run test:run         # Run tests once
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Code Quality
npm run lint             # Run ESLint with auto-fix

# Performance
npm run perf:audit       # Run Lighthouse audit
npm run perf:test        # Run performance tests
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Continuous Integration
- **Multi-version Node.js testing** (18.x, 20.x, 22.x)
- **Automated linting** with ESLint v9
- **Unit testing** with Vitest and coverage reporting
- **Security scanning** for vulnerabilities
- **Build verification** for production readiness
- **Lighthouse performance audits** on PRs

### Continuous Deployment
- **Automatic deployment** to GitHub Pages on main branch
- **Alternative deployment** options for Netlify and Vercel
- **Environment-specific** builds and configurations

### Running Workflows Locally

You can test GitHub Actions workflows locally using [act](https://github.com/nektos/act):

```bash
# Install act
brew install act  # macOS
# or see: https://github.com/nektos/act#installation

# Run CI workflow
act -W .github/workflows/ci.yml

# Run specific job
act -j lint-and-test -W .github/workflows/ci.yml
```

## Development

The website follows a modular component architecture with:
- Reusable components for consistent UI
- Responsive design patterns
- Accessibility best practices (WCAG 2.1 AA)
- Performance optimization (Core Web Vitals focused)
- Comprehensive testing coverage
- SEO-friendly architecture

### Performance Metrics

- **Bundle Size:** 28KB gzipped (main bundle)
- **Lighthouse Score:** 90+ target
- **Core Web Vitals:**
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1

### Testing

The project includes comprehensive testing:
- 69+ unit tests covering components and views
- Integration tests for routing
- Accessibility testing
- Performance monitoring

## Services Highlighted

1. **Custom Home Construction** - Luxury mountain homes with LEED certification
2. **Design Services** - Professional architectural and interior design
3. **Complete Remodeling** - Kitchen, bath, and whole home renovations
4. **Water Damage Restoration** - 24/7 emergency response
5. **Sump Pump Systems** - Installation and maintenance

## Contact Information

- **Phone:** (435) 555-0100
- **Email:** info@unifiedcontractors.com
- **Address:** 8343 N Silver Creek Rd, Park City, UT 84098

## Documentation

- [Performance Guide](PERFORMANCE_GUIDE.md) - Performance optimization strategies
- [Accessibility Guidelines](ACCESSIBILITY_GUIDELINES.md) - WCAG compliance guide
- [Testing Documentation](src/test/README.md) - Testing patterns and examples
- [CI/CD Workflows](.github/WORKFLOW_DOCUMENTATION.md) - GitHub Actions setup
- [Deployment Guide](.github/DEPLOYMENT_GUIDE.md) - Deployment options
- [Task Tracker](.claude/tasks.md) - Project task management

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Run tests (`npm run test:run`)
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## License

© 2025 Unified Contractors. All rights reserved.
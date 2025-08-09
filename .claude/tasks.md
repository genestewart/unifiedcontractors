# Project Tasks - Unified Contractors Website

## 🔴 Critical Issues
Tasks that should be addressed immediately for security and stability.

### Security & Dependencies
- [ ] Fix npm security vulnerabilities
  - Run `npm audit fix --force` to address 2 moderate severity vulnerabilities
  - Review and test after updates to ensure nothing breaks
  
- [ ] Update deprecated npm packages
  - Replace `rimraf@3.0.2` with `rimraf@5` or use native Node.js `rm`
  - Update `glob@7.2.3` to `glob@9` or later
  - Replace `inflight@1.0.6` dependency

## 🟡 Important Improvements
Tasks that improve code quality and developer experience.

### Linting & Code Quality
- [ ] Update ESLint from v8 to v9
  - Migrate `.eslintrc.cjs` to new flat config format (`eslint.config.js`)
  - Update `@humanwhocodes/config-array` to `@eslint/config-array`
  - Update `@humanwhocodes/object-schema` to `@eslint/object-schema`
  - Update `eslint-plugin-vue` to latest compatible version

### Testing Infrastructure
- [ ] Set up Vitest testing framework
  - Install `vitest`, `@vue/test-utils`, and `jsdom`
  - Create `vitest.config.js` configuration
  - Add test scripts to `package.json`
  - Create `/tests` directory structure

- [ ] Create initial test suite
  - Write unit test for `HeaderNav.vue` component
  - Write unit test for `HomeView.vue`
  - Add routing tests
  - Create component mounting tests
  - Add test coverage reporting

## 🟢 Nice-to-Have Enhancements
Tasks that add value but are not urgent.

### CI/CD & Automation
- [ ] Add GitHub Actions workflow
  - Create `.github/workflows/ci.yml`
  - Configure automated testing on pull requests
  - Add build verification
  - Set up deployment pipeline (if needed)

### Documentation
- [ ] Update CLAUDE.md
  - Add testing commands (`npm run test`, `npm run test:coverage`)
  - Document testing patterns and best practices
  - Add CI/CD workflow documentation

- [ ] Create comprehensive README
  - Add badges for build status, test coverage
  - Include development workflow
  - Add contribution guidelines

### Performance & Optimization
- [ ] Optimize bundle size
  - Analyze current bundle with `npm run build -- --analyze`
  - Implement code splitting for large components
  - Optimize image assets
  - Add lazy loading for images

- [ ] Add PWA capabilities
  - Install `vite-plugin-pwa`
  - Configure service worker
  - Add manifest.json
  - Implement offline functionality

### SEO & Accessibility
- [ ] Enhance SEO
  - Add meta tags to all pages
  - Implement structured data (JSON-LD)
  - Create sitemap.xml
  - Add robots.txt

- [ ] Improve accessibility
  - Add ARIA labels where needed
  - Ensure keyboard navigation works properly
  - Test with screen readers
  - Add skip navigation links

## 📝 Notes

### Priority Order
1. Fix security vulnerabilities first
2. Update deprecated packages
3. Set up testing infrastructure
4. Update ESLint
5. Add CI/CD
6. Implement nice-to-have features

### Time Estimates
- Critical Issues: 1-2 hours
- Important Improvements: 3-4 hours  
- Nice-to-Have Enhancements: 5-8 hours

### Commands Reference
```bash
# Security fixes
npm audit
npm audit fix
npm audit fix --force

# Testing (after setup)
npm run test
npm run test:watch
npm run test:coverage

# Build analysis
npm run build -- --analyze

# Current available commands
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview build
npm run lint      # Run ESLint
```

## 🔄 Status Legend
- [ ] Not started
- [x] Completed
- 🚧 In progress
- ⏸️ On hold
- ❌ Cancelled

---
*Last updated: 2025-08-08*
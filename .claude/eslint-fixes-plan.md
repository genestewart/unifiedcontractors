# ESLint Fixes Plan

## Summary
CI pipeline failed due to ESLint errors and warnings. Total: 5 errors, 17 warnings.

## Critical Errors (Must Fix)

### 1. lighthouserc.js - 'module' is not defined
- **File**: `lighthouserc.js:1:1`
- **Error**: `no-undef`
- **Fix**: Add ESLint environment configuration or use ES modules syntax
- **Solution**: Either add `/* eslint-env node */` comment or convert to ES modules

### 2. src/test/setup.js - 'global' is not defined (2 occurrences)
- **File**: `src/test/setup.js:14:1, 36:1`
- **Error**: `no-undef`
- **Fix**: Use `globalThis` instead of `global` for modern JavaScript compatibility
- **Solution**: Replace `global` with `globalThis`

### 3. src/views/ContactView.vue - Unnecessary escape characters
- **File**: `src/views/ContactView.vue:453:28, 453:30`
- **Error**: `no-useless-escape`
- **Fix**: Remove unnecessary escapes in regex pattern for parentheses
- **Solution**: Change `\(` and `\)` to `(` and `)` in the phone validation regex

## Warnings (Should Fix for Clean Code)

### Unused Variables/Imports
1. **scripts/performance-test.js**: Lines 165, 178, 237 - unused 'error' parameters
2. **src/composables/useAccessibility.js**: Unused imports and variables
3. **src/composables/useSEO.js**: Unused 'onMounted'
4. **src/test/components/HeaderNav.test.js**: Unused 'mount'
5. **src/test/components/component-mounting.test.js**: Multiple unused imports
6. **src/test/router/router.test.js**: Unused 'wrapper'
7. **src/test/views/HomeView.test.js**: Unused 'mount'
8. **src/utils/sitemap.js**: Unused 'additionalUrls'
9. **src/views/ContactView.vue**: Unused 'error' parameter
10. **vite.config.js**: Unused 'command' parameter

## Implementation Strategy

### Phase 1: Fix Critical Errors
1. **lighthouserc.js**: Add Node.js environment configuration
2. **src/test/setup.js**: Replace `global` with `globalThis`
3. **ContactView.vue**: Fix regex escape characters

### Phase 2: Clean Up Warnings
1. Remove unused imports from test files
2. Clean up unused error parameters in catch blocks
3. Remove unused variables from composables

### Phase 3: Verification
1. Run `npm run lint` to verify all fixes
2. Ensure no new issues introduced
3. Commit changes with clear message

## Agent Assignments

### Bug Fixer Agent
- Fix the 5 critical errors
- Handle environment-specific issues (module, global)
- Fix regex patterns

### Code Quality Agent
- Clean up all 17 warnings
- Remove unused imports and variables
- Optimize catch blocks

## Expected Outcome
- All ESLint errors resolved
- Zero warnings policy maintained
- CI pipeline passes successfully
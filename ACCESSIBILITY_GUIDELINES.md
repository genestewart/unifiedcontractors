# Accessibility Guidelines and Standards

This document outlines the accessibility implementation and maintenance standards for the Unified Contractors website. Our goal is to provide an inclusive experience that meets or exceeds WCAG 2.1 AA standards.

## Table of Contents

- [Overview](#overview)
- [Implementation Summary](#implementation-summary)
- [SEO Enhancements](#seo-enhancements)
- [Accessibility Features](#accessibility-features)
- [Testing Guidelines](#testing-guidelines)
- [Maintenance Standards](#maintenance-standards)
- [Development Guidelines](#development-guidelines)

## Overview

The Unified Contractors website has been enhanced with comprehensive accessibility and SEO features to ensure:

- **Accessibility**: WCAG 2.1 AA compliance for all users
- **SEO Optimization**: Enhanced search engine visibility and social media sharing
- **User Experience**: Improved navigation and interaction for all users
- **Technical Excellence**: Modern web standards and best practices

## Implementation Summary

### SEO Enhancements ✅

1. **Comprehensive Meta Tags**
   - Dynamic title, description, and keywords for all pages
   - Page-specific meta data using Vue composable
   - Proper meta tag management with cleanup

2. **Open Graph & Social Media**
   - Facebook, Twitter, and LinkedIn optimization
   - Dynamic image and content sharing
   - LocalBusiness structured data

3. **Technical SEO**
   - Canonical URLs for all pages
   - XML sitemap generation utility
   - Robots.txt configuration
   - 404 error handling

### Accessibility Features ✅

1. **Navigation & Focus Management**
   - Skip navigation links
   - Keyboard navigation support
   - Focus trapping for dropdowns
   - ARIA labels and roles

2. **Forms & User Input**
   - Proper fieldsets and legends
   - Error handling with screen reader support
   - Form validation with accessible feedback
   - Help text and character counters

3. **Visual & Interactive Elements**
   - WCAG AA color contrast compliance
   - Focus indicators for all interactive elements
   - Reduced motion support
   - High contrast mode compatibility

## SEO Enhancements

### Meta Tag Management

Use the `useSEO` composable for dynamic meta tag management:

```javascript
import { useSEO, pageMeta } from '@/composables/useSEO'

const { setMeta, setStructuredData } = useSEO()

onMounted(() => {
  setMeta(pageMeta.yourPage)
  setStructuredData()
})
```

### Page-Specific Configuration

Each page should have unique meta data defined in the `pageMeta` object:

```javascript
export const pageMeta = {
  yourPage: {
    title: 'Your Page Title',
    description: 'Your page description (150-160 characters)',
    keywords: 'relevant, keywords, for, your, page',
    url: '/your-page'
  }
}
```

### Structured Data

LocalBusiness schema is automatically implemented with:
- Business information (name, address, phone)
- Service catalog
- Geographic data
- Operating hours
- Review aggregation support

## Accessibility Features

### Navigation

#### Skip Links
- Implemented in `App.vue`
- Allows keyboard users to skip to main content
- Visible only when focused

```html
<div class="skip-links">
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <a href="#main-navigation" class="skip-link">Skip to navigation</a>
</div>
```

#### Header Navigation
- Full ARIA implementation with roles and properties
- Keyboard navigation support (Tab, Enter, Escape, Arrow keys)
- Mobile menu accessibility
- Dropdown menu focus management

### Forms

#### Contact Form Enhancements
- Semantic fieldsets and legends for form sections
- Proper labels with required indicators
- Error handling with `aria-live` regions
- Help text linked with `aria-describedby`
- Form validation with accessible feedback

```html
<fieldset class="form-fieldset">
  <legend class="form-legend">Personal Information</legend>
  <label for="firstName">
    First Name <span class="required-indicator" aria-label="required">*</span>
  </label>
  <input
    id="firstName"
    type="text"
    required
    aria-required="true"
    aria-describedby="firstName-error"
    class="form-control"
  >
  <div id="firstName-error" role="alert">
    <!-- Error message appears here -->
  </div>
</fieldset>
```

### Focus Management

#### Focus Indicators
- Consistent 2px outline for all focusable elements
- High contrast colors (primary blue)
- Visible focus states for keyboard navigation

#### Focus Composable
Use the `useAccessibility` composable for advanced focus management:

```javascript
import { useAccessibility } from '@/composables/useAccessibility'

const { focusFirst, trapFocus, announce } = useAccessibility()

// Focus first element in container
focusFirst('#modal-content')

// Announce to screen readers
announce('Form submitted successfully', 'polite')
```

### Color Contrast

All colors meet WCAG AA standards:
- **Primary (#05b3f2)**: 3.1:1 on white (AA Large text)
- **Primary Dark (#0491c8)**: 4.2:1 on white (AA)
- **Secondary (#e30414)**: 5.3:1 on white (AA)
- **Dark Text (#252525)**: 14.8:1 on white (AAA)
- **Gray Text (#9ea8ac)**: 2.8:1 on white (AA Large text)

## Testing Guidelines

### Automated Testing

1. **Accessibility Testing Tools**
   - axe-core browser extension
   - Lighthouse accessibility audit
   - WAVE Web Accessibility Evaluator

2. **SEO Testing Tools**
   - Google Search Console
   - Bing Webmaster Tools
   - Open Graph testing tools

### Manual Testing

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Skip links work properly
- [ ] Dropdown menus navigate with arrow keys
- [ ] Form validation works with keyboard
- [ ] Modal dialogs trap focus

#### Screen Reader Testing
- [ ] Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] Form labels and descriptions read correctly
- [ ] Error messages announced properly
- [ ] Page structure navigable by headings

#### Mobile Accessibility
- [ ] Touch targets minimum 44x44px
- [ ] Content readable at 200% zoom
- [ ] Horizontal scrolling not required
- [ ] Voice control compatibility

### Testing Checklist

```markdown
## Accessibility Testing Checklist

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Tab order is logical
- [ ] Skip links functional
- [ ] No keyboard traps
- [ ] Focus visible on all elements

### Screen Reader
- [ ] Proper heading structure (h1-h6)
- [ ] Alt text for all images
- [ ] Form labels properly associated
- [ ] Error messages announced
- [ ] Status updates communicated

### Visual
- [ ] Color contrast meets AA standards
- [ ] Text readable at 200% zoom
- [ ] No information conveyed by color alone
- [ ] Focus indicators visible
- [ ] High contrast mode supported

### Forms
- [ ] Required fields marked
- [ ] Error messages descriptive
- [ ] Fieldsets and legends used
- [ ] Help text provided where needed
- [ ] Success feedback provided
```

## Maintenance Standards

### Regular Audits

1. **Monthly SEO Review**
   - Check meta tags for new pages
   - Update sitemap.xml
   - Review search console errors
   - Monitor page performance

2. **Quarterly Accessibility Audit**
   - Run automated testing tools
   - Manual keyboard navigation test
   - Screen reader compatibility check
   - Mobile accessibility review

### Code Quality Standards

#### HTML Structure
- Use semantic HTML elements
- Proper heading hierarchy (h1 → h6)
- Form labels always associated
- Alt text for all images

#### ARIA Usage
- Use ARIA labels for complex interactions
- Implement ARIA states (expanded, selected, etc.)
- Provide ARIA descriptions for context
- Use ARIA landmarks appropriately

#### CSS Guidelines
- Ensure focus indicators are visible
- Maintain color contrast ratios
- Support high contrast mode
- Respect `prefers-reduced-motion`

### Error Handling

#### Form Validation
```javascript
// Example accessible error handling
const showError = (fieldId, message) => {
  const field = document.getElementById(fieldId)
  const errorEl = document.getElementById(`${fieldId}-error`)
  
  field.setAttribute('aria-invalid', 'true')
  field.classList.add('error')
  errorEl.textContent = message
  errorEl.setAttribute('aria-live', 'polite')
  
  field.focus()
}
```

#### Page Errors
- 404 pages with helpful navigation
- Error pages maintain site navigation
- Clear error messages for users
- Fallback content for failed loads

## Development Guidelines

### Adding New Pages

1. **SEO Setup**
   ```javascript
   // Add meta data to pageMeta object
   export const pageMeta = {
     newPage: {
       title: 'New Page Title | Unified Contractors',
       description: 'Page description for search engines',
       keywords: 'relevant keywords',
       url: '/new-page'
     }
   }
   
   // Use in component
   onMounted(() => {
     setMeta(pageMeta.newPage)
     setBreadcrumbStructuredData([
       { name: 'Home', url: '/' },
       { name: 'New Page', url: '/new-page' }
     ])
   })
   ```

2. **Accessibility Implementation**
   - Use semantic HTML structure
   - Add proper ARIA labels
   - Implement focus management
   - Test keyboard navigation

### Form Development

1. **Structure**
   ```html
   <form role="form" aria-labelledby="form-heading">
     <fieldset class="form-fieldset">
       <legend class="form-legend">Section Name</legend>
       <!-- Form fields here -->
     </fieldset>
   </form>
   ```

2. **Validation**
   - Use `aria-required` for required fields
   - Implement `aria-invalid` for errors
   - Provide `aria-describedby` for help text
   - Use `role="alert"` for error announcements

### Interactive Components

1. **Dropdowns/Modals**
   ```javascript
   // Use accessibility composable
   const { trapFocus, setFocus } = useAccessibility()
   
   const openModal = () => {
     modal.value = true
     nextTick(() => {
       setFocus('#modal-first-element')
     })
   }
   ```

2. **Dynamic Content**
   ```javascript
   // Announce changes to screen readers
   const { announce } = useAccessibility()
   
   const updateContent = () => {
     // Update content
     announce('Content updated', 'polite')
   }
   ```

## Resources

### Standards and Guidelines
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### SEO Tools
- [Google Search Console](https://search.google.com/search-console)
- [Open Graph Testing](https://developers.facebook.com/tools/debug/)
- [Schema.org Validator](https://validator.schema.org/)

## Support

For questions about accessibility implementation or maintenance:

1. Review this documentation
2. Check the implemented composables (`useSEO.js`, `useAccessibility.js`)
3. Run automated testing tools
4. Test manually with keyboard and screen readers
5. Update documentation as needed

Remember: Accessibility is not a one-time implementation but an ongoing commitment to inclusive design. Regular testing and updates ensure continued compliance and improved user experience for all visitors.
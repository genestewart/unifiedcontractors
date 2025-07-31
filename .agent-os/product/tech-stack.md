# Technical Stack

> Last Updated: 2025-07-31
> Version: 1.0.0

## Core Technologies

### Application Framework
- **Framework:** Laravel
- **Version:** 11.0+
- **Language:** PHP 8.2+

### Database
- **Primary:** MySQL
- **Version:** 8.0+
- **ORM:** Eloquent

## Frontend Stack

### JavaScript Framework
- **Framework:** Vue.js
- **Version:** 3.0+
- **Build Tool:** Vite

### Import Strategy
- **Strategy:** ES modules
- **Package Manager:** npm
- **Node Version:** 22 LTS

### CSS Framework
- **Framework:** TailwindCSS
- **Version:** 4.0+
- **PostCSS:** Yes
- **Custom Color Palette:** #E60012, #00B4F1, #212121, #F2F2F2, #4A4A4A, #FFD500, #7A5848

### UI Components
- **Library:** PrimeVue
- **Version:** Latest
- **Installation:** Via npm

## Assets & Media

### Fonts
- **Provider:** Google Fonts
- **Loading Strategy:** Self-hosted for performance
- **Primary Font:** Open Sans (body text)
- **Heading Font:** Montserrat (headings)

### Icons
- **Library:** Lucide
- **Implementation:** Vue components

### Images
- **Logo:** SVG format placeholder
- **Service Images:** Placeholder images for each service category
- **Portfolio Images:** Placeholder project images

## Infrastructure

### Application Hosting
- **Platform:** Hostinger
- **Service:** VPS / Shared Hosting
- **Region:** Based on user base location

### Database Hosting
- **Provider:** Hostinger
- **Service:** MySQL Database
- **Backups:** Regular automated backups

### Asset Storage
- **Provider:** Hostinger
- **Service:** File storage / CDN
- **Access:** Standard file serving

## Deployment

### CI/CD Pipeline
- **Platform:** GitHub Actions
- **Trigger:** Push to main/staging branches
- **Tests:** Run before deployment

### Environments
- **Production:** main branch
- **Staging:** staging branch
- **Review Apps:** Branch-based (if supported)

### Code Repository
- **Platform:** GitHub
- **Repository URL:** To be created by user
- **Visibility:** Private repository
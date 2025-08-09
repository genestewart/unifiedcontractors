# Deployment Guide

This guide provides detailed instructions for deploying the Unified Contractors application using various platforms.

## Table of Contents
- [GitHub Pages Deployment](#github-pages-deployment)
- [Netlify Deployment](#netlify-deployment)
- [Vercel Deployment](#vercel-deployment)
- [Custom Server Deployment](#custom-server-deployment)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## GitHub Pages Deployment

### Prerequisites
1. GitHub repository with the project code
2. GitHub Pages enabled in repository settings
3. Proper base URL configuration for Vue Router

### Automatic Deployment Setup

1. **Enable GitHub Pages:**
   - Go to Settings → Pages in your GitHub repository
   - Source: Deploy from GitHub Actions
   - Branch: Not needed (using Actions)

2. **Configure Base URL (if repo is not at root):**
   
   Update `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: process.env.NODE_ENV === 'production' 
       ? '/unifiedcontractors/' // Replace with your repo name
       : '/',
     // ... rest of config
   })
   ```

3. **Update Vue Router:**
   
   In `src/router/index.js`:
   ```javascript
   const router = createRouter({
     history: createWebHistory(import.meta.env.BASE_URL),
     // ... routes
   })
   ```

4. **Push to main branch:**
   - The deploy workflow will automatically trigger
   - Check Actions tab for deployment status
   - Site will be available at: `https://YOUR_USERNAME.github.io/unifiedcontractors/`

### Manual Deployment

```bash
# Build the project
npm run build

# Create gh-pages branch
git checkout -b gh-pages

# Add dist folder
git add -f dist

# Commit
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

## Netlify Deployment

### One-Click Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/unifiedcontractors)

### Manual Setup

1. **Create Netlify Account:**
   - Sign up at [netlify.com](https://www.netlify.com)

2. **Import Project:**
   - New site from Git
   - Connect to GitHub
   - Select repository

3. **Configure Build Settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Add Environment Variables:**
   - Go to Site settings → Environment variables
   - Add required variables

5. **Create `netlify.toml` in project root:**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200

   [build.environment]
     NODE_VERSION = "20"
   ```

6. **Enable in GitHub Actions:**
   - Add secrets to repository:
     - `NETLIFY_AUTH_TOKEN`
     - `NETLIFY_SITE_ID`
   - Set `deploy-to-netlify` job to `if: true` in deploy.yml

## Vercel Deployment

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/unifiedcontractors)

### Manual Setup

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Create `vercel.json` in project root:**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vue",
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

5. **Enable in GitHub Actions:**
   - Add secrets to repository:
     - `VERCEL_TOKEN`
     - `VERCEL_ORG_ID`
     - `VERCEL_PROJECT_ID`
   - Set `deploy-to-vercel` job to `if: true` in deploy.yml

## Custom Server Deployment

### Using Docker

1. **Create `Dockerfile`:**
   ```dockerfile
   # Build stage
   FROM node:20-alpine as build-stage
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   # Production stage
   FROM nginx:stable-alpine as production-stage
   COPY --from=build-stage /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create `nginx.conf`:**
   ```nginx
   events {
     worker_connections 1024;
   }

   http {
     include /etc/nginx/mime.types;
     default_type application/octet-stream;
     
     server {
       listen 80;
       server_name localhost;
       root /usr/share/nginx/html;
       index index.html;
       
       location / {
         try_files $uri $uri/ /index.html;
       }
       
       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
         expires 1y;
         add_header Cache-Control "public, immutable";
       }
     }
   }
   ```

3. **Build and run:**
   ```bash
   docker build -t unifiedcontractors .
   docker run -p 80:80 unifiedcontractors
   ```

### Using PM2 with Express

1. **Install dependencies:**
   ```bash
   npm install express compression helmet
   npm install -D pm2
   ```

2. **Create `server.js`:**
   ```javascript
   import express from 'express';
   import compression from 'compression';
   import helmet from 'helmet';
   import { fileURLToPath } from 'url';
   import { dirname, join } from 'path';

   const __dirname = dirname(fileURLToPath(import.meta.url));
   const app = express();
   const PORT = process.env.PORT || 3000;

   app.use(helmet());
   app.use(compression());
   app.use(express.static(join(__dirname, 'dist')));

   app.get('*', (req, res) => {
     res.sendFile(join(__dirname, 'dist', 'index.html'));
   });

   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

3. **Create `ecosystem.config.js`:**
   ```javascript
   module.exports = {
     apps: [{
       name: 'unifiedcontractors',
       script: './server.js',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   };
   ```

4. **Deploy:**
   ```bash
   npm run build
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

## Environment Variables

### Required Variables
```bash
# API Configuration
VITE_API_URL=https://api.example.com
VITE_API_KEY=your-api-key

# Analytics (optional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Maps (if using)
VITE_GOOGLE_MAPS_KEY=your-maps-key

# Contact Form
VITE_CONTACT_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

### Setting Environment Variables

#### Local Development
Create `.env.local`:
```bash
VITE_API_URL=http://localhost:3001
VITE_API_KEY=development-key
```

#### Production
Set in your deployment platform's environment variables section.

## Troubleshooting

### Common Issues

#### 404 on Refresh (SPA Routing)
**Problem:** Pages return 404 when refreshing or direct navigation.

**Solution:** Configure server to serve index.html for all routes:
- GitHub Pages: Copy index.html to 404.html
- Netlify: Add redirect rules in netlify.toml
- Nginx: Use try_files directive

#### Blank Page After Deployment
**Problem:** Site shows blank page in production.

**Solution:**
1. Check base URL configuration in vite.config.js
2. Verify build output in dist folder
3. Check browser console for errors
4. Ensure all environment variables are set

#### Build Failures
**Problem:** Build fails in CI/CD pipeline.

**Solution:**
1. Check Node.js version compatibility
2. Clear cache and rebuild
3. Ensure all dependencies are in package.json
4. Check for case-sensitive file imports

#### Slow Initial Load
**Problem:** Site takes long to load initially.

**Solution:**
1. Enable gzip/brotli compression
2. Implement code splitting
3. Optimize images
4. Use CDN for static assets
5. Enable HTTP/2

### Performance Optimization

1. **Enable Compression:**
   ```javascript
   // vite.config.js
   import viteCompression from 'vite-plugin-compression';
   
   export default {
     plugins: [
       viteCompression({
         algorithm: 'brotliCompress',
       })
     ]
   }
   ```

2. **Lazy Load Routes:**
   ```javascript
   const routes = [
     {
       path: '/about',
       component: () => import('./views/AboutView.vue')
     }
   ]
   ```

3. **Optimize Images:**
   ```bash
   npm install -D vite-plugin-imagemin
   ```

## Security Checklist

- [ ] Environment variables not exposed in client code
- [ ] HTTPS enabled on production
- [ ] Security headers configured (CSP, HSTS, etc.)
- [ ] Dependencies regularly updated
- [ ] No sensitive data in repository
- [ ] API keys properly secured
- [ ] Input validation on forms
- [ ] XSS protection enabled

## Monitoring

### Recommended Services
- **Uptime:** UptimeRobot, Pingdom
- **Analytics:** Google Analytics, Plausible
- **Error Tracking:** Sentry, LogRocket
- **Performance:** Lighthouse CI, WebPageTest

### Setup Monitoring
```javascript
// main.js - Sentry example
import * as Sentry from "@sentry/vue";

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
});
```

## Support

For deployment issues:
1. Check GitHub Actions logs
2. Review deployment platform documentation
3. Open an issue in the repository
4. Contact the development team

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vue.js Deployment](https://vuejs.org/guide/best-practices/production-deployment.html)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
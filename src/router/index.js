import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Park City Construction & Remodeling Company',
        description: 'Unified Contractors is Park City\'s premier construction company with 25+ years of experience.',
        canonical: 'https://unifiedcontractors.com/',
        requiresAuth: false
      }
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue'),
      meta: {
        title: 'Construction Services - Custom Homes & Remodeling',
        description: 'Complete construction services in Park City, UT. Custom home building, design services, remodeling.',
        canonical: 'https://unifiedcontractors.com/services',
        requiresAuth: false
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About Us - Family-Owned Construction Company',
        description: 'Learn about Unified Contractors, Park City\'s trusted family-owned construction company.',
        canonical: 'https://unifiedcontractors.com/about',
        requiresAuth: false
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title: 'Contact Us - Free Construction Estimates',
        description: 'Get your free construction estimate today. Contact Unified Contractors for custom homes and remodeling.',
        canonical: 'https://unifiedcontractors.com/contact',
        requiresAuth: false
      }
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('../views/PortfolioView.vue'),
      meta: {
        title: 'Our Work - Construction Portfolio & Gallery',
        description: 'View our portfolio of custom homes, remodeling projects, and construction work in Park City, Utah.',
        canonical: 'https://unifiedcontractors.com/portfolio',
        requiresAuth: false
      }
    },
    // 404 catch-all route
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        title: 'Page Not Found',
        description: 'The page you are looking for could not be found.',
        noindex: true
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // If the user is navigating back/forward, restore scroll position
    if (savedPosition) {
      return savedPosition
    }
    // If navigating to an anchor link
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    // Default to top of page
    return { top: 0 }
  }
})

export default router
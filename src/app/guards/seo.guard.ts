import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { getSEOForRoute } from '../utils/seo-routes.config';

/**
 * Guard to update SEO meta tags when route changes
 * Usage: Add to route configuration as a guard
 */
export const seoGuard = (route: ActivatedRouteSnapshot) => {
  const seoService = inject(SEOService);
  
  // Get route path from the route config
  const routePath = route.routeConfig?.path || '';
  
  // Get SEO configuration for this route
  const seoData = getSEOForRoute(routePath);
  
  if (seoData) {
    seoService.updateSEO(seoData);
  }
  
  return true;
};

/**
 * Alternative: Resolver function for SEO
 * Can be used if you prefer resolvers over guards
 */
export const seoResolver = (route: ActivatedRouteSnapshot) => {
  const seoService = inject(SEOService);
  
  const routePath = route.routeConfig?.path || '';
  const seoData = getSEOForRoute(routePath);
  
  if (seoData) {
    seoService.updateSEO(seoData);
  }
  
  return null; // Resolvers must return a value
};


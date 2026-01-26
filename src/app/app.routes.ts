import { Routes } from '@angular/router';
import { seoGuard } from './guards/seo.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent),
    canActivate: [seoGuard]
  },
  {
    path: 'services',
    loadComponent: () => import('./components/services-page/services-page').then(m => m.ServicesPageComponent),
    canActivate: [seoGuard]
  },
  {
    path: 'support-theraflow',
    loadComponent: () => import('./components/support-theraflow/support-theraflow').then(m => m.SupportTheraflowComponent),
    canActivate: [seoGuard]
  },
  {
    path: 'unsubscribed',
    loadComponent: () => import('./components/unsubscribed/unsubscribed').then(m => m.UnsubscribedComponent),
    canActivate: [seoGuard]
  },
  {
    path: 'impressum',
    loadComponent: () => import('./components/impressum/impressum').then(m => m.ImpressumComponent),
    canActivate: [seoGuard]
  },
  {
    path: 'contact',
    loadComponent: () => import('./components/contact-page/contact-page.component').then(m => m.ContactPageComponent),
    canActivate: [seoGuard]
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./components/portfolio-page/portfolio-page.component').then(m => m.PortfolioPageComponent),
    canActivate: [seoGuard]
  },
  {
    path: 'privacy',
    loadComponent: () => import('./components/privacy/privacy').then(m => m.PrivacyComponent),
    canActivate: [seoGuard]
  },
  {
    path: 'terms',
    loadComponent: () => import('./components/terms/terms').then(m => m.TermsComponent),
    canActivate: [seoGuard]
  },
  {
    path: 'client-portal/login',
    loadComponent: () => import('./components/client-login/client-login').then(m => m.ClientLoginComponent),
    canActivate: [seoGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found').then(m => m.NotFoundComponent)
  }
];

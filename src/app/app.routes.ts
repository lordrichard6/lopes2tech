import { Routes } from '@angular/router';
import { seoGuard } from './guards/seo.guard';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent),
    canActivate: [seoGuard]
  },
  { 
    path: 'pricing', 
    loadComponent: () => import('./components/pricing/pricing').then(m => m.PricingComponent),
    canActivate: [seoGuard]
  },
  {
    path: 'support-theraflow',
    loadComponent: () => import('./components/support-theraflow/support-theraflow').then(m => m.SupportTheraflowComponent),
    canActivate: [seoGuard]
  },
  { 
    path: 'impressum', 
    loadComponent: () => import('./components/impressum/impressum').then(m => m.ImpressumComponent),
    canActivate: [seoGuard]
  },
  { path: '**', redirectTo: '' }
];

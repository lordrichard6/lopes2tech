import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent)
  },
  { 
    path: 'pricing', 
    loadComponent: () => import('./components/pricing/pricing').then(m => m.PricingComponent)
  },
  { 
    path: 'impressum', 
    loadComponent: () => import('./components/impressum/impressum').then(m => m.ImpressumComponent)
  },
  { path: '**', redirectTo: '' }
];

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ImpressumComponent } from './components/impressum/impressum';
import { PricingComponent } from './components/pricing/pricing';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: '**', redirectTo: '' }
];

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ImpressumComponent } from './components/impressum/impressum';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: '**', redirectTo: '' }
];

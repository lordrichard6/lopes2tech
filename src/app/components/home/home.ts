import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { ServicesComponent } from '../services/services.component';
import { PackagesComponent } from '../packages/packages.component';
import { About } from '../about/about';
import { Portfolio } from '../portfolio/portfolio';
import { CtaSectionComponent } from '../cta-section/cta-section';
import { WhatsappButtonComponent } from '../whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Hero,
    ServicesComponent,
    PackagesComponent,
    About,
    Portfolio,
    CtaSectionComponent,
    WhatsappButtonComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-services [isSummary]="true"></app-services>
    <app-packages [isPreview]="true"></app-packages>
    <app-about></app-about>
    <app-portfolio></app-portfolio>
    <app-cta-section></app-cta-section>
    
    <!-- WhatsApp Floating Button -->
    <app-whatsapp-button></app-whatsapp-button>
  `,
  styles: []
})
export class HomeComponent {
}

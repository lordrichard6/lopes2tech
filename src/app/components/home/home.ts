import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { ServicesV2Component } from '../services/servicesv2.component';
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
    ServicesV2Component,
    PackagesComponent,
    About,
    Portfolio,
    CtaSectionComponent,
    WhatsappButtonComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-servicesv2 [isSummary]="true"></app-servicesv2>
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

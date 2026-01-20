import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { ServicesV2Component } from '../services/servicesv2.component';
import { PackagesComponent } from '../packages/packages.component';
import { About } from '../about/about';
import { Portfolio } from '../portfolio/portfolio';
import { Contact } from '../contact/contact';
// import { MultistepComponent } from '../multistep/multistep';
// import { TeamComponent } from '../team/team';
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
    // MultistepComponent,
    // TeamComponent,
    WhatsappButtonComponent,
    Contact
  ],
  template: `
    <app-hero></app-hero>
    <app-servicesv2 [isSummary]="true"></app-servicesv2>
    <app-packages [isPreview]="true"></app-packages>
    <app-about></app-about>
    <app-portfolio></app-portfolio>
    <!-- <app-multistep></app-multistep> -->
    <app-contact></app-contact>
    <!-- <app-team></app-team> -->
    
    <!-- WhatsApp Floating Button -->
    <app-whatsapp-button></app-whatsapp-button>
  `,
  styles: []
})
export class HomeComponent {
}

import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { ServicesV2Component } from '../services/servicesv2.component';
import { PackagesComponent } from '../packages/packages.component';
import { About } from '../about/about';
import { Portfolio } from '../portfolio/portfolio';
import { Contact } from '../contact/contact';
// import { MultistepComponent } from '../multistep/multistep';
// import { TeamComponent } from '../team/team';
import { AiChatComponent } from '../ai-chat/ai-chat.component';

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
    AiChatComponent,
    Contact
  ],
  template: `
    <app-hero></app-hero>
    <app-servicesv2></app-servicesv2>
    <app-packages></app-packages>
    <app-about></app-about>
    <app-portfolio></app-portfolio>
    <!-- <app-multistep></app-multistep> -->
    <app-contact></app-contact>
    <!-- <app-team></app-team> -->
    
    <!-- AI Chat Assistant -->
    <app-ai-chat></app-ai-chat>
  `,
  styles: []
})
export class HomeComponent {
}

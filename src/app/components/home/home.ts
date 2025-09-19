import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { ServicesV2Component } from '../services/servicesv2.component';
import { About } from '../about/about';
// import { Contact } from '../contact/contact';
import { MultistepComponent } from '../multistep/multistep';
import { TeamComponent } from '../team/team';
import { AiChatComponent } from '../ai-chat/ai-chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Hero,
    ServicesV2Component,
    About,
    MultistepComponent,
    TeamComponent,
    AiChatComponent
    // Contact,
  ],
  template: `
    <app-hero></app-hero>
    <app-servicesv2></app-servicesv2>
    <app-about></app-about>
    <app-multistep></app-multistep>
    <app-team></app-team>
    <!-- <app-contact></app-contact> -->
    
    <!-- AI Chat Assistant -->
    <app-ai-chat></app-ai-chat>
  `,
  styles: []
})
export class HomeComponent {
}

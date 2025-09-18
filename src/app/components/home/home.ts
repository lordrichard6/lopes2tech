import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { ServicesV2Component } from '../services/servicesv2.component';
import { About } from '../about/about';
// import { Contact } from '../contact/contact';
import { MultistepComponent } from '../multistep/multistep';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Hero,
    ServicesV2Component,
    About,
    MultistepComponent
    // Contact,
  ],
  template: `
    <app-hero></app-hero>
    <app-servicesv2></app-servicesv2>
    <app-about></app-about>
    <app-multistep></app-multistep>
    <!-- <app-contact></app-contact> -->
  `,
  styles: []
})
export class HomeComponent {
}

import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Hero } from '../hero/hero';
import { Services } from '../services/services';
import { About } from '../about/about';
import { Contact } from '../contact/contact';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Header,
    Hero,
    Services,
    About,
    Contact,
    Footer
  ],
  template: `
    <app-header></app-header>
    <app-hero></app-hero>
    <app-services></app-services>
    <app-about></app-about>
    <app-contact></app-contact>
    <app-footer></app-footer>
  `,
  styles: []
})
export class HomeComponent {
}

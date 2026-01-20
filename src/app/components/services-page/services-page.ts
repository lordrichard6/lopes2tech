import { Component } from '@angular/core';
import { ServicesV2Component } from '../services/servicesv2.component';
import { Contact } from '../contact/contact';
import { PackagesComponent } from '../packages/packages.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    ServicesV2Component,
    PackagesComponent,
    Contact
  ],
  template: `
    <app-servicesv2></app-servicesv2>
    <app-packages [showBottomWave]="false"></app-packages>
    <app-contact></app-contact>
  `,
  styles: []
})
export class ServicesPageComponent {
}

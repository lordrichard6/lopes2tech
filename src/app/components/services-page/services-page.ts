import { Component } from '@angular/core';
import { ServicesV2Component } from '../services/servicesv2.component';
import { Contact } from '../contact/contact';

@Component({
    selector: 'app-services-page',
    standalone: true,
    imports: [
        ServicesV2Component,
        Contact
    ],
    template: `
    <app-servicesv2></app-servicesv2>
    <app-contact></app-contact>
  `,
    styles: []
})
export class ServicesPageComponent {
}

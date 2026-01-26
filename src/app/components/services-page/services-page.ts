import { Component } from '@angular/core';
import { ServicesV2Component } from '../services/servicesv2.component';
import { PackagesComponent } from '../packages/packages.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    ServicesV2Component,
    PackagesComponent
  ],
  template: `
    <app-servicesv2></app-servicesv2>
    <app-packages [showBottomWave]="false"></app-packages>

  `,
  styles: []
})
export class ServicesPageComponent {
}

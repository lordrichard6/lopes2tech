import { Component } from '@angular/core';
import { ServicesComponent } from '../services/services.component';
import { PackagesComponent } from '../packages/packages.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    ServicesComponent,
    PackagesComponent
  ],
  template: `
    <app-services></app-services>
    <app-packages [showBottomWave]="false"></app-packages>

  `,
  styles: []
})
export class ServicesPageComponent {
}

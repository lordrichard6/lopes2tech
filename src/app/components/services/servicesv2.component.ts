import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';

@Component({
  selector: 'app-servicesv2',
  imports: [TranslatePipe, ServiceDialogComponent],
  templateUrl: './servicesv2.component.html',
  styleUrl: './servicesv2.component.scss'
})
export class ServicesV2Component {
  isDialogOpen = false;
  selectedServiceKey = '';

  openServiceDialog(serviceKey: string): void {
    this.selectedServiceKey = serviceKey;
    this.isDialogOpen = true;
  }

  closeServiceDialog(): void {
    this.isDialogOpen = false;
    this.selectedServiceKey = '';
  }
}
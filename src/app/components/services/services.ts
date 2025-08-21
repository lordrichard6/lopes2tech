import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';

@Component({
  selector: 'app-services',
  imports: [TranslatePipe, ServiceDialogComponent],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {
  isDialogOpen = false;
  selectedService = '';

  openServiceDialog(serviceKey: string): void {
    this.selectedService = serviceKey;
    this.isDialogOpen = true;
  }

  closeServiceDialog(): void {
    this.isDialogOpen = false;
    this.selectedService = '';
  }
}

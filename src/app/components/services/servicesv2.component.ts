import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  openServiceDialog(serviceKey: string): void {
    // Navigate to AI Solutions page when clicking on AI service
    if (serviceKey === 'ai') {
      this.router.navigate(['/ai-solutions']);
      return;
    }
    
    this.selectedServiceKey = serviceKey;
    this.isDialogOpen = true;
  }

  closeServiceDialog(): void {
    this.isDialogOpen = false;
    this.selectedServiceKey = '';
  }
}
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessInfoService } from '../../services/business-info';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impressum.html',
  styleUrl: './impressum.scss'
})
export class ImpressumComponent {
  private businessInfoService = inject(BusinessInfoService);
  
  businessInfo = this.businessInfoService.getBusinessInfo();
  
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  
  getLastUpdated(): string {
    return '10.8.2025'; // Current date
  }
}

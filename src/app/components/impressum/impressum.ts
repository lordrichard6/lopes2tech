import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BusinessInfoService } from '../../services/business-info';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './impressum.html',
  styleUrls: ['./impressum.scss']
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

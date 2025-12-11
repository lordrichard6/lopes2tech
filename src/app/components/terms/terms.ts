import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BusinessInfoService } from '../../services/business-info';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './terms.html',
  styleUrls: ['./terms.scss']
})
export class TermsComponent {
  private businessInfoService = inject(BusinessInfoService);
  
  businessInfo = this.businessInfoService.getBusinessInfo();
  
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  
  getLastUpdated(): string {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}


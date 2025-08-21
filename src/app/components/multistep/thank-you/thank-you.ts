import { Component, Input } from '@angular/core';
import { MultiStepFormData } from '../../../services/email.service';

@Component({
  selector: 'app-thank-you',
  imports: [],
  templateUrl: './thank-you.html',
  styleUrl: './thank-you.scss'
})
export class ThankYouComponent {
  @Input() formData?: MultiStepFormData;

  generateInquiryId(): string {
    return 'INQ-' + Date.now().toString().slice(-6);
  }
}

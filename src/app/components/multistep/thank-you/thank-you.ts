import { Component, Input } from '@angular/core';
import { MultiStepFormData } from '../../../services/email.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-thank-you',
  imports: [TranslatePipe],
  templateUrl: './thank-you.html',
  styleUrl: './thank-you.scss'
})
export class ThankYouComponent {
  @Input() formData?: MultiStepFormData;

  generateInquiryId(): string {
    return 'INQ-' + Date.now().toString().slice(-6);
  }
}

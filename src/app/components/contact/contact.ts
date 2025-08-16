import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessInfoService, BusinessInfo } from '../../services/business-info';
import { EmailService, ContactFormData } from '../../services/email.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit {
  contactForm: FormGroup;
  businessInfo: BusinessInfo;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private businessInfoService: BusinessInfoService,
    private emailService: EmailService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.businessInfo = this.businessInfoService.getBusinessInfo();
  }

  ngOnInit() {
    // Component initialization
  }

  getPhoneLink(): string {
    return `tel:+41${this.businessInfo.phone.replace(/\s+/g, '')}`;
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      const formData: ContactFormData = this.contactForm.value;
      
      try {
        // Option 1: Send via EmailJS (requires setup)
        const emailSent = await this.emailService.sendContactEmail(formData);
        
        if (emailSent) {
          alert('Thank you for your message! We will get back to you soon.');
          this.contactForm.reset();
        } else {
          // Fallback to mailto link
          this.openMailtoLink(formData);
        }
      } catch (error) {
        console.error('Error sending email:', error);
        // Fallback to mailto link
        this.openMailtoLink(formData);
      } finally {
        this.isSubmitting = false;
      }
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  private openMailtoLink(formData: ContactFormData) {
    const mailtoLink = this.emailService.getMailtoLink(formData);
    window.open(mailtoLink, '_blank');
    alert('Your default email client will open with the message pre-filled.');
    this.contactForm.reset();
  }

  private markFormGroupTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.contactForm.get(fieldName);
    if (control?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength'].requiredLength;
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${requiredLength} characters`;
    }
    return '';
  }
}

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BusinessInfoService, BusinessInfo } from '../../services/business-info';
import { EmailService, ContactFormData, MultiStepFormData } from '../../services/email.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';
import { ThankYouComponent } from './thank-you/thank-you';

@Component({
  selector: 'app-multistep',
  imports: [ReactiveFormsModule, FormsModule, ThankYouComponent, TranslatePipe],
  templateUrl: './multistep.html',
  styleUrl: './multistep.scss'
})
export class MultistepComponent implements OnInit {
  contactForm: FormGroup;
  businessInfo: BusinessInfo;
  isSubmitting = false;
  isSubmitted = false;

  // Multi-step form properties
  currentStep = 1;
  totalSteps = 4;
  selectedService: string | null = null;
  selectedDetailServices: string[] = [];
  projectDescription = '';

  constructor(
    private fb: FormBuilder,
    private businessInfoService: BusinessInfoService,
    private emailService: EmailService,
    private translationService: TranslationService
  ) {
    this.contactForm = this.fb.group({
      additionalMessage: [''], // Additional message field
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      phone: ['']
    });

    this.businessInfo = this.businessInfoService.getBusinessInfo();
  }

  ngOnInit() {
    // Component initialization
  }

  // Multi-step form methods
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  selectService(service: string) {
    this.selectedService = service;
    this.selectedDetailServices = []; // Reset detail services when main service changes
  }

  getServiceDisplayName(service: string | null): string {
    if (!service) return this.translationService.instant('multistep.validation.required');
    
    const serviceKey = `multistep.steps.service.options.${service}.title`;
    return this.translationService.instant(serviceKey);
  }

  getPhoneLink(): string {
    return `tel:+41${this.businessInfo.phone.replace(/\s+/g, '')}`;
  }

  async onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      try {
        // Prepare multi-step form data for EmailJS
        const multiStepFormData: MultiStepFormData = {
          firstName: this.contactForm.get('firstName')?.value || '',
          lastName: this.contactForm.get('lastName')?.value || '',
          email: this.contactForm.get('email')?.value || '',
          company: this.contactForm.get('company')?.value || '',
          location: this.contactForm.get('location')?.value || '',
          phone: this.contactForm.get('phone')?.value || '',
          selectedService: this.selectedService || '',
          selectedDetailServices: [], // No longer collected in simplified form
          projectDescription: this.projectDescription,
          additionalMessage: this.contactForm.get('additionalMessage')?.value || ''
        };

        // Try to send via EmailJS
        const emailSent = await this.emailService.sendMultiStepFormEmail(multiStepFormData);
        
        if (emailSent) {
          console.log('Email sent successfully via EmailJS');
          this.isSubmitted = true;
        } else {
          // Show error message and ask user if they want to use mailto
          console.log('EmailJS failed, asking user for alternative');
          const useMailto = confirm('Email service is currently unavailable. Would you like to open your email client to send the message manually?');
          if (useMailto) {
            const mailtoLink = this.emailService.getMultiStepMailtoLink(multiStepFormData);
            window.open(mailtoLink, '_blank');
          }
          this.isSubmitted = true;
        }
        
      } catch (error) {
        console.error('Error submitting form:', error);
        
        // Show error message and ask user if they want to use mailto
        const useMailto = confirm('There was an error sending your message. Would you like to open your email client to send it manually?');
        if (useMailto) {
          const multiStepFormData: MultiStepFormData = {
            firstName: this.contactForm.get('firstName')?.value || '',
            lastName: this.contactForm.get('lastName')?.value || '',
            email: this.contactForm.get('email')?.value || '',
            company: this.contactForm.get('company')?.value || '',
            location: this.contactForm.get('location')?.value || '',
            phone: this.contactForm.get('phone')?.value || '',
            selectedService: this.selectedService || '',
            selectedDetailServices: [], // No longer collected in simplified form
            projectDescription: this.projectDescription,
            additionalMessage: this.contactForm.get('additionalMessage')?.value || ''
          };
          
          const mailtoLink = this.emailService.getMultiStepMailtoLink(multiStepFormData);
          window.open(mailtoLink, '_blank');
        }
        this.isSubmitted = true;
      } finally {
        this.isSubmitting = false;
      }
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  private resetForm() {
    this.contactForm.reset();
    this.currentStep = 1;
    this.selectedService = null;
    this.selectedDetailServices = [];
    this.projectDescription = '';
    this.isSubmitted = false;
    this.contactForm.patchValue({
      additionalMessage: '',
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      location: '',
      phone: ''
    });
  }

  private openMailtoLink(formData: ContactFormData) {
    const mailtoLink = this.emailService.getMailtoLink(formData);
    window.open(mailtoLink, '_blank');
    alert('Your default email client will open with the message pre-filled.');
    this.resetForm();
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
      return this.translationService.instant('multistep.validation.required');
    }
    if (control?.hasError('email')) {
      return this.translationService.instant('multistep.validation.email');
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength'].requiredLength;
      return this.translationService.instant('multistep.validation.minlength', { min: requiredLength });
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    switch (fieldName) {
      case 'firstName': return 'First name';
      case 'lastName': return 'Last name';
      case 'email': return 'Email address';
      case 'location': return 'Location';
      case 'message': return 'Message';
      default: return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    }
  }

  // Start over method
  startOver() {
    this.resetForm();
  }

  getFormData(): MultiStepFormData {
    return {
      selectedService: this.getServiceDisplayName(this.selectedService),
      selectedDetailServices: [], // No longer collected in simplified form
      projectDescription: this.projectDescription,
      additionalMessage: this.contactForm.get('additionalMessage')?.value || '',
      firstName: this.contactForm.get('firstName')?.value || '',
      lastName: this.contactForm.get('lastName')?.value || '',
      company: this.contactForm.get('company')?.value || '',
      email: this.contactForm.get('email')?.value || '',
      location: this.contactForm.get('location')?.value || '',
      phone: this.contactForm.get('phone')?.value || ''
    };
  }
}

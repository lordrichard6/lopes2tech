import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BusinessInfoService, BusinessInfo } from '../../services/business-info';
import { EmailService, ContactFormData } from '../../services/email.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit {
  contactForm: FormGroup;
  businessInfo: BusinessInfo;
  isSubmitting = false;

  // Multi-step form properties
  currentStep = 1;
  totalSteps = 4;
  selectedService: string | null = null;
  selectedDetailServices: string[] = [];
  projectDescription = '';

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

  toggleDetailService(service: string) {
    const index = this.selectedDetailServices.indexOf(service);
    if (index > -1) {
      this.selectedDetailServices.splice(index, 1);
    } else {
      this.selectedDetailServices.push(service);
    }
  }

  canProceedFromStep3(): boolean {
    if (this.selectedService === 'unsure' || this.selectedService === 'other') {
      return this.projectDescription.trim().length > 0;
    }
    return this.selectedDetailServices.length > 0;
  }

  getServiceDisplayName(service: string | null): string {
    const serviceNames: { [key: string]: string } = {
      'automation': 'Process Automation',
      'webapp': 'Web Applications & SaaS',
      'web': 'Web Development',
      'tools': 'Custom Tools',
      'unsure': 'Not sure yet',
      'other': 'Other'
    };
    return service ? serviceNames[service] || service : 'No service selected';
  }

  getDetailServicesDisplay(): string {
    const serviceLabels: { [key: string]: string } = {
      // Automation
      'rpa': 'RPA (Robotic Process Automation)',
      'workflow': 'Workflow Management',
      'integration': 'System Integration',
      'reporting': 'Automated Reporting',
      // Web Apps & SaaS
      'saas': 'SaaS Platform Development',
      'angular': 'Angular Applications',
      'django': 'Django Backend',
      'api': 'API Development',
      'database': 'Database Design',
      // Web Development
      'responsive': 'Responsive Design',
      'ecommerce': 'E-commerce Solutions',
      'cms': 'Content Management',
      'portfolio': 'Portfolio & Business Sites',
      // Custom Tools
      'scraping': 'Web Scraping Tools',
      'cli': 'Command Line Tools',
      'desktop': 'Desktop Applications',
      'maintenance': 'System Maintenance'
    };
    
    return this.selectedDetailServices
      .map(service => serviceLabels[service] || service)
      .join(', ');
  }

  getPhoneLink(): string {
    return `tel:+41${this.businessInfo.phone.replace(/\s+/g, '')}`;
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Combine form data with multi-step selections
      const baseFormData: ContactFormData = this.contactForm.value;
      const enhancedFormData: ContactFormData = {
        ...baseFormData,
        message: this.buildEnhancedMessage(baseFormData.message)
      };
      
      try {
        // Option 1: Send via EmailJS (requires setup)
        const emailSent = await this.emailService.sendContactEmail(enhancedFormData);
        
        if (emailSent) {
          alert('Thank you for your message! We will get back to you soon.');
          this.resetForm();
        } else {
          // Fallback to mailto link
          this.openMailtoLink(enhancedFormData);
        }
      } catch (error) {
        console.error('Error sending email:', error);
        // Fallback to mailto link
        this.openMailtoLink(enhancedFormData);
      } finally {
        this.isSubmitting = false;
      }
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  private buildEnhancedMessage(originalMessage: string): string {
    let enhancedMessage = '=== PROJECT DETAILS ===\n\n';
    
    enhancedMessage += `Service Category: ${this.getServiceDisplayName(this.selectedService)}\n`;
    
    if (this.selectedDetailServices.length > 0) {
      enhancedMessage += `Specific Services: ${this.getDetailServicesDisplay()}\n`;
    }
    
    if (this.projectDescription) {
      enhancedMessage += `Project Description: ${this.projectDescription}\n`;
    }
    
    enhancedMessage += '\n=== ADDITIONAL MESSAGE ===\n\n';
    enhancedMessage += originalMessage || 'No additional message provided.';
    
    return enhancedMessage;
  }

  private resetForm() {
    this.contactForm.reset();
    this.currentStep = 1;
    this.selectedService = null;
    this.selectedDetailServices = [];
    this.projectDescription = '';
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

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BusinessInfoService, BusinessInfo } from '../../services/business-info';
import { EmailService, ContactFormData } from '../../services/email.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-multistep',
  imports: [ReactiveFormsModule, FormsModule],
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
  totalSteps = 6;
  selectedService: string | null = null;
  selectedDetailServices: string[] = [];
  projectDescription = '';
  selectedCurrency = 'EUR'; // Default currency

  constructor(
    private fb: FormBuilder,
    private businessInfoService: BusinessInfoService,
    private emailService: EmailService
  ) {
    this.contactForm = this.fb.group({
      budget: [5000], // Default budget value
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
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      try {
        // For now, just show the thank you screen without sending emails
        // Simulate a brief delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.isSubmitted = true;
        
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your form. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  private buildEnhancedMessage(): string {
    let message = '=== PROJECT DETAILS ===\n\n';
    
    message += `Service Category: ${this.getServiceDisplayName(this.selectedService)}\n`;
    
    if (this.selectedDetailServices.length > 0) {
      message += `Specific Services: ${this.getDetailServicesDisplay()}\n`;
    }
    
    if (this.projectDescription) {
      message += `Project Description: ${this.projectDescription}\n`;
    }
    
    message += `Budget: ${this.getCurrencySymbol()}${this.formatBudget(this.contactForm.get('budget')?.value)}\n`;
    message += `Location: ${this.contactForm.get('location')?.value}\n`;
    
    if (this.contactForm.get('company')?.value) {
      message += `Company: ${this.contactForm.get('company')?.value}\n`;
    }
    
    if (this.contactForm.get('phone')?.value) {
      message += `Phone: ${this.contactForm.get('phone')?.value}\n`;
    }
    
    if (this.contactForm.get('additionalMessage')?.value) {
      message += '\n=== ADDITIONAL MESSAGE ===\n\n';
      message += this.contactForm.get('additionalMessage')?.value + '\n';
    }
    
    return message;
  }

  private resetForm() {
    this.contactForm.reset();
    this.currentStep = 1;
    this.selectedService = null;
    this.selectedDetailServices = [];
    this.projectDescription = '';
    this.selectedCurrency = 'EUR';
    this.isSubmitted = false;
    this.contactForm.patchValue({
      budget: 5000,
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
      return `${this.getFieldDisplayName(fieldName)} is required`;
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength'].requiredLength;
      return `${this.getFieldDisplayName(fieldName)} must be at least ${requiredLength} characters`;
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

  formatBudget(value: number): string {
    if (value >= 50000) {
      return '50,000+';
    }
    return value.toLocaleString();
  }

  selectCurrency(currency: string): void {
    this.selectedCurrency = currency;
  }

  getCurrencySymbol(): string {
    const symbols: { [key: string]: string } = {
      'EUR': '€',
      'CHF': 'CHF',
      'USD': '$'
    };
    return symbols[this.selectedCurrency] || '€';
  }
}

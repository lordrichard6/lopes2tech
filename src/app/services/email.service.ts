import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';
import { LoggerService } from './logger.service';
import { APP_CONSTANTS } from '../config/constants';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  context?: string;
}

export interface MultiStepFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  location: string;
  phone?: string;
  selectedService: string;
  selectedDetailServices: string[];
  projectDescription?: string;
  additionalMessage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private logger: LoggerService) {
    // Initialize EmailJS with public key from environment
    if (environment.emailjs.publicKey && environment.emailjs.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
      emailjs.init(environment.emailjs.publicKey);
    }
  }

  async sendMultiStepFormEmail(formData: MultiStepFormData): Promise<boolean> {
    // Check if EmailJS is configured
    if (!environment.emailjs.serviceId || environment.emailjs.serviceId === 'YOUR_EMAILJS_SERVICE_ID') {
      this.logger.warn('EmailJS not configured, falling back to mailto', undefined, 'EmailService');
      return false;
    }

    if (!environment.emailjs.templateId || environment.emailjs.templateId === 'YOUR_EMAILJS_TEMPLATE_ID') {
      this.logger.warn('EmailJS template not configured', undefined, 'EmailService');
      return false;
    }

    try {
      const serviceDisplayNames: { [key: string]: string } = {
        'automation': 'Process Automation',
        'webapp': 'Web Applications & SaaS',
        'web': 'Web Development',
        'tools': 'Custom Tools',
        'unsure': 'Not sure yet',
        'other': 'Other'
      };

      const detailServiceLabels: { [key: string]: string } = {
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
        // Web Development
        'responsive': 'Simple 1 page websites',
        'ecommerce': 'E-commerce Solutions',
        'cms': 'Content Management',
        'portfolio': 'Portfolio & Business Sites',
        // Custom Tools
        'scraping': 'Web Scraping Tools',
        'cli': 'Command Line Tools',
        'desktop': 'Desktop Applications',
        'maintenance': 'System Maintenance'
      };

      const currencySymbols: { [key: string]: string } = {
        'EUR': '€',
        'CHF': 'CHF',
        'USD': '$'
      };

      const detailServicesText = formData.selectedDetailServices
        .map(service => detailServiceLabels[service] || service)
        .join(', ');

      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        to_email: APP_CONSTANTS.BUSINESS.EMAIL,
        client_first_name: formData.firstName,
        client_last_name: formData.lastName,
        client_email: formData.email,
        client_company: formData.company || 'Not provided',
        client_location: formData.location,
        client_phone: formData.phone || 'Not provided',
        service_category: serviceDisplayNames[formData.selectedService] || formData.selectedService,
        detail_services: detailServicesText || 'None specified',
        project_description: formData.projectDescription || 'Not provided',
        additional_message: formData.additionalMessage || 'None',
        reply_to: formData.email,
        // For simple templates that expect these specific variable names (matching your template)
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        company: formData.company || 'Not provided',
        location: formData.location,
        selectedService: serviceDisplayNames[formData.selectedService] || formData.selectedService,
        selectedDetailServices: detailServicesText || 'None specified',
        projectDescription: formData.projectDescription || 'Not provided',
        additionalMessage: formData.additionalMessage || 'None',
        // Combined message for simple templates
        message: this.buildFullMessage(formData, serviceDisplayNames, detailServiceLabels)
      };

      const response = await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        templateParams
      );

      this.logger.info('Multi-step form email sent successfully', response, 'EmailService');
      return true;
    } catch (error) {
      this.logger.error('Failed to send multi-step form email', error, 'EmailService');
      return false;
    }
  }

  private buildFullMessage(
    formData: MultiStepFormData, 
    serviceDisplayNames: { [key: string]: string },
    detailServiceLabels: { [key: string]: string }
  ): string {
    let message = '=== NEW PROJECT INQUIRY ===\n\n';
    
    message += '--- CONTACT INFORMATION ---\n';
    message += `Name: ${formData.firstName} ${formData.lastName}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Company: ${formData.company || 'Not provided'}\n`;
    message += `Location: ${formData.location}\n`;
    message += `Phone: ${formData.phone || 'Not provided'}\n\n`;
    
    message += '--- PROJECT DETAILS ---\n';
    message += `Service Category: ${serviceDisplayNames[formData.selectedService] || formData.selectedService}\n`;
    
    if (formData.selectedDetailServices.length > 0) {
      const detailServicesText = formData.selectedDetailServices
        .map(service => detailServiceLabels[service] || service)
        .join(', ');
      message += `Specific Services: ${detailServicesText}\n`;
    }
    
    if (formData.projectDescription) {
      message += `Project Description: ${formData.projectDescription}\n`;
    }
    
    if (formData.additionalMessage) {
      message += '\n--- ADDITIONAL MESSAGE ---\n';
      message += formData.additionalMessage + '\n';
    }
    
    return message;
  }

  async sendContactEmail(formData: ContactFormData): Promise<boolean> {
    // Check if EmailJS is configured
    if (!environment.emailjs.serviceId || environment.emailjs.serviceId === 'YOUR_EMAILJS_SERVICE_ID') {
      this.logger.warn('EmailJS not configured, falling back to mailto', undefined, 'EmailService');
      return false;
    }

    const templateId =
      environment.emailjs.contactTemplateId &&
      environment.emailjs.contactTemplateId !== 'YOUR_EMAILJS_CONTACT_TEMPLATE_ID'
        ? environment.emailjs.contactTemplateId
        : environment.emailjs.templateId;

    if (!templateId || templateId === 'YOUR_EMAILJS_TEMPLATE_ID') {
      this.logger.warn('EmailJS contact template not configured', undefined, 'EmailService');
      return false;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not provided',
        phone: formData.phone || 'Not provided',
        message: formData.message,
        reply_to: formData.email,
        // Template-specific values
        name: formData.name,
        email: APP_CONSTANTS.BUSINESS.EMAIL,
        context: formData.context || 'Unknown context'
      };

      const response = await emailjs.send(
        environment.emailjs.serviceId,
        templateId,
        templateParams
      );

      this.logger.info('Contact email sent successfully', response, 'EmailService');
      return true;
    } catch (error) {
      this.logger.error('Failed to send contact email', error, 'EmailService');
      return false;
    }
  }

  // Alternative method using mailto for multi-step form
  getMultiStepMailtoLink(formData: MultiStepFormData): string {
    const subject = `New Project Inquiry from ${formData.firstName} ${formData.lastName}`;
    const body = this.buildFullMessage(
      formData,
      {
        'automation': 'Process Automation',
        'webapp': 'Web Applications & SaaS',
        'web': 'Web Development',
        'tools': 'Custom Tools',
        'unsure': 'Not sure yet',
        'other': 'Other'
      },
      {
        'rpa': 'RPA (Robotic Process Automation)',
        'workflow': 'Workflow Management',
        'integration': 'System Integration',
        'reporting': 'Automated Reporting',
        'saas': 'SaaS Platform Development',
        'angular': 'Angular Applications',
        'django': 'Django Backend',
        'api': 'API Development',
        'responsive': 'Simple 1 page websites',
        'ecommerce': 'E-commerce Solutions',
        'cms': 'Content Management',
        'portfolio': 'Portfolio & Business Sites',
        'scraping': 'Web Scraping Tools',
        'cli': 'Command Line Tools',
        'desktop': 'Desktop Applications',
        'maintenance': 'System Maintenance'
      }
    );
    
    return `mailto:${APP_CONSTANTS.BUSINESS.EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  // Alternative method using Gmail SMTP (for reference)
  getMailtoLink(formData: ContactFormData): string {
    const subject = `New Contact Form Message from ${formData.name}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}
Context: ${formData.context || 'Unknown context'}

Message:
${formData.message}
    `;
    
    return `mailto:${APP_CONSTANTS.BUSINESS.EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}

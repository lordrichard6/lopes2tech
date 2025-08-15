import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor() {
    // Initialize EmailJS with public key from environment
    if (environment.emailjs.publicKey && environment.emailjs.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
      emailjs.init(environment.emailjs.publicKey);
    }
  }

  async sendContactEmail(formData: ContactFormData): Promise<boolean> {
    // Check if EmailJS is configured
    if (!environment.emailjs.serviceId || environment.emailjs.serviceId === 'YOUR_EMAILJS_SERVICE_ID') {
      console.warn('EmailJS not configured, falling back to mailto');
      return false;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not provided',
        message: formData.message,
        to_email: 'info@lopes2tech.ch',
        reply_to: formData.email
      };

      const response = await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        templateParams
      );

      console.log('Email sent successfully:', response);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  // Alternative method using Gmail SMTP (for reference)
  getMailtoLink(formData: ContactFormData): string {
    const subject = `New Contact Form Message from ${formData.name}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not provided'}

Message:
${formData.message}
    `;
    
    return `mailto:info@lopes2tech.ch?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}

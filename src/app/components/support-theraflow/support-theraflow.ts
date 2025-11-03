import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { LoggerService } from '../../services/logger.service';
import { APP_CONSTANTS } from '../../config/constants';

@Component({
  selector: 'app-support-theraflow',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './support-theraflow.html',
  styleUrl: './support-theraflow.scss'
})
export class SupportTheraflowComponent {
  // UI State
  isLoadingDonation = false;
  
  constructor(
    private analyticsService: GoogleAnalyticsService,
    private logger: LoggerService
  ) {}
  
  /**
   * Track analytics event using GoogleAnalyticsService
   */
  private trackEvent(action: string, category: string, label?: string, value?: number, eventParams?: Record<string, any>): void {
    this.analyticsService.trackEvent(action, category, label, value);
    this.logger.debug('Analytics Event', { action, category, label, value, ...eventParams }, 'SupportTheraflowComponent');
  }

  openInvestorForm(): void {
    // Track investment inquiry
    this.trackEvent('click', 'button', 'investment_inquiry', undefined, {
      button_location: 'support_page',
      contact_method: 'email'
    });
    
    // Try to open email client with pre-filled investment inquiry
    const subject = encodeURIComponent('TheraFlow Investment Inquiry');
    const body = encodeURIComponent(
      'Hello Paulo,\n\n' +
      'I am interested in learning more about investment opportunities in TheraFlow.\n\n' +
      'Please provide information about:\n' +
      '- Investment structure and terms\n' +
      '- Current funding status and valuation\n' +
      '- Growth projections and timeline\n' +
      '- Team and development roadmap\n\n' +
      'Best regards'
    );
    
    const mailtoLink = `mailto:${APP_CONSTANTS.BUSINESS.EMAIL}?subject=${subject}&body=${body}`;
    
    // Try to open email client
    try {
      window.location.href = mailtoLink;
      
      // If email client doesn't open (detection after 1 second), show fallback
      setTimeout(() => {
        if (document.hasFocus()) {
          // Still on page, email client probably didn't open
          const copyEmail = confirm(
            `Email client not detected.\n\n` +
            `Would you like to copy the email address to your clipboard?\n\n` +
            `Email: ${APP_CONSTANTS.BUSINESS.EMAIL}\n` +
            `Subject: TheraFlow Investment Inquiry`
          );
          
          if (copyEmail) {
            navigator.clipboard.writeText(APP_CONSTANTS.BUSINESS.EMAIL).then(() => {
              alert(`✅ Email address copied to clipboard!\n\nSubject: TheraFlow Investment Inquiry`);
            }).catch(() => {
              alert(`📧 Contact email: ${APP_CONSTANTS.BUSINESS.EMAIL}\n\nSubject: TheraFlow Investment Inquiry`);
            });
          }
        }
      }, 1000);
    } catch (error) {
      this.logger.error('Error opening investor form', error, 'SupportTheraflowComponent');
      // Fallback: show email address
      alert(
        `📧 Please contact me at:\n\n` +
        `Email: ${APP_CONSTANTS.BUSINESS.EMAIL}\n` +
        `Subject: TheraFlow Investment Inquiry`
      );
    }
  }

  supportViaStripe(): void {
    // Set loading state
    this.isLoadingDonation = true;
    
    // Track donation button click
    this.trackEvent('click', 'button', 'donation_button', undefined, {
      button_location: 'support_page',
      currency: 'CHF',
      payment_method: 'stripe'
    });
    
    try {
      // Open Stripe payment link in new tab
      const opened = window.open(APP_CONSTANTS.STRIPE.DONATION_LINK, '_blank', 'noopener,noreferrer');
      
      // Check if popup was blocked
      if (!opened || opened.closed || typeof opened.closed === 'undefined') {
        this.logger.warn('Popup blocked - showing fallback', undefined, 'SupportTheraflowComponent');
        this.trackEvent('popup_blocked', 'user_interaction', 'stripe_donation', undefined, { fallback: 'same_tab' });
        // Fallback: navigate in same tab
        window.location.href = APP_CONSTANTS.STRIPE.DONATION_LINK;
      } else {
        // Track successful click
        this.trackEvent('donation_link_opened', 'user_interaction', 'stripe_donation', undefined, { method: 'new_tab' });
      }
    } catch (error) {
      this.logger.error('Failed to open Stripe link', error, 'SupportTheraflowComponent');
      this.trackEvent('donation_error', 'error', 'stripe_donation', undefined, { error: String(error) });
      // Fallback: try direct navigation
      window.location.href = APP_CONSTANTS.STRIPE.DONATION_LINK;
    } finally {
      // Reset loading state after 2 seconds
      setTimeout(() => {
        this.isLoadingDonation = false;
      }, 2000);
    }
  }
}

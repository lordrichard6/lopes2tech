import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-support-theraflow',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './support-theraflow.html',
  styleUrl: './support-theraflow.scss'
})
export class SupportTheraflowComponent {
  // Live Stripe Payment Link with "Customer chooses price"
  // Configured at: https://dashboard.stripe.com/payment-links
  // Customers can choose any amount they want to donate
  private readonly STRIPE_CUSTOM_LINK = 'https://donate.stripe.com/7sY8wQ8Y2b0ddXXaGK1Nu00';
  
  // UI State
  isLoadingDonation = false;
  
  /**
   * Track analytics event (ready for GA4 integration)
   * TODO: Replace with actual analytics service
   */
  private trackEvent(eventName: string, eventParams?: Record<string, any>): void {
    // Log to console for now - replace with analytics service later
    console.log('📊 Analytics Event:', eventName, eventParams);
    
    // Example for future GA4 integration:
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', eventName, eventParams);
    // }
  }

  openInvestorForm(): void {
    // Track investment inquiry
    this.trackEvent('investment_inquiry_click', {
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
    
    const mailtoLink = `mailto:lopes2tech.ch@gmail.com?subject=${subject}&body=${body}`;
    
    // Try to open email client
    try {
      window.location.href = mailtoLink;
      
      // If email client doesn't open (detection after 1 second), show fallback
      setTimeout(() => {
        if (document.hasFocus()) {
          // Still on page, email client probably didn't open
          const copyEmail = confirm(
            'Email client not detected.\n\n' +
            'Would you like to copy the email address to your clipboard?\n\n' +
            'Email: lopes2tech.ch@gmail.com\n' +
            'Subject: TheraFlow Investment Inquiry'
          );
          
          if (copyEmail) {
            navigator.clipboard.writeText('lopes2tech.ch@gmail.com').then(() => {
              alert('✅ Email address copied to clipboard!\n\nSubject: TheraFlow Investment Inquiry');
            }).catch(() => {
              alert('📧 Contact email: lopes2tech.ch@gmail.com\n\nSubject: TheraFlow Investment Inquiry');
            });
          }
        }
      }, 1000);
    } catch (error) {
      // Fallback: show email address
      alert(
        '📧 Please contact me at:\n\n' +
        'Email: lopes2tech.ch@gmail.com\n' +
        'Subject: TheraFlow Investment Inquiry'
      );
    }
  }

  supportViaStripe(): void {
    // Set loading state
    this.isLoadingDonation = true;
    
    // Track donation button click
    this.trackEvent('donation_button_click', {
      button_location: 'support_page',
      currency: 'CHF',
      payment_method: 'stripe'
    });
    
    try {
      // Open Stripe payment link in new tab
      const opened = window.open(this.STRIPE_CUSTOM_LINK, '_blank', 'noopener,noreferrer');
      
      // Check if popup was blocked
      if (!opened || opened.closed || typeof opened.closed === 'undefined') {
        console.warn('Popup blocked - showing fallback');
        this.trackEvent('popup_blocked', { fallback: 'same_tab' });
        // Fallback: navigate in same tab
        window.location.href = this.STRIPE_CUSTOM_LINK;
      } else {
        // Track successful click
        this.trackEvent('donation_link_opened', { method: 'new_tab' });
      }
    } catch (error) {
      console.error('Failed to open Stripe link:', error);
      this.trackEvent('donation_error', { error: String(error) });
      // Fallback: try direct navigation
      window.location.href = this.STRIPE_CUSTOM_LINK;
    } finally {
      // Reset loading state after 2 seconds
      setTimeout(() => {
        this.isLoadingDonation = false;
      }, 2000);
    }
  }
}

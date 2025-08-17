import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Track page views
   */
  trackPageView(url: string, title?: string): void {
    if (!this.isBrowser || typeof gtag === 'undefined') {
      return;
    }

    gtag('config', 'G-7GEMLENNLS', {
      page_path: url,
      page_title: title
    });
  }

  /**
   * Track custom events
   */
  trackEvent(action: string, category: string, label?: string, value?: number): void {
    if (!this.isBrowser || typeof gtag === 'undefined') {
      return;
    }

    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }

  /**
   * Track form submissions
   */
  trackFormSubmission(formName: string): void {
    this.trackEvent('submit', 'form', formName);
  }

  /**
   * Track button clicks
   */
  trackButtonClick(buttonName: string, location?: string): void {
    this.trackEvent('click', 'button', `${buttonName}${location ? ` - ${location}` : ''}`);
  }

  /**
   * Track language changes
   */
  trackLanguageChange(language: string): void {
    this.trackEvent('language_change', 'user_interaction', language);
  }

  /**
   * Track contact form submissions
   */
  trackContactForm(method: string): void {
    this.trackEvent('contact', 'engagement', method);
  }

  /**
   * Track service page views
   */
  trackServiceView(serviceName: string): void {
    this.trackEvent('service_view', 'engagement', serviceName);
  }
}

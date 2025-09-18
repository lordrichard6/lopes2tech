import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  templateUrl: './cookie-consent.html',
  styleUrls: ['./cookie-consent.scss']
})
export class CookieConsentComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  showBanner = false;
  showDetails = false;

  cookiePreferences = {
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false
  };

  ngOnInit() {
    // Only check localStorage in browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Check if user has already made a choice
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        // Show banner after a short delay for better UX
        setTimeout(() => {
          this.showBanner = true;
        }, 1000);
      } else {
        // Load existing preferences
        const preferences = JSON.parse(consent);
        this.cookiePreferences = { ...this.cookiePreferences, ...preferences };
        this.loadAnalytics();
      }
    }
  }

  acceptAll() {
    this.cookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    this.savePreferences();
    this.loadAnalytics();
    this.hideBanner();
  }

  acceptNecessary() {
    this.cookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    this.savePreferences();
    this.hideBanner();
  }

  saveCustomPreferences() {
    this.savePreferences();
    this.loadAnalytics();
    this.hideBanner();
  }

  private savePreferences() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookie-consent', JSON.stringify(this.cookiePreferences));
      localStorage.setItem('cookie-consent-date', new Date().toISOString());
    }
  }

  private loadAnalytics() {
    if (this.cookiePreferences.analytics) {
      // Initialize Google Analytics if accepted
      if (typeof window.gtag !== 'undefined') {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': this.cookiePreferences.marketing ? 'granted' : 'denied'
        });
      }
    }
  }

  private hideBanner() {
    this.showBanner = false;
    this.showDetails = false;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  resetCookies() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('cookie-consent');
      localStorage.removeItem('cookie-consent-date');
    }
    this.cookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    this.showBanner = true;
    this.showDetails = false;
  }
}
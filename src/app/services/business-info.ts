import { Injectable } from '@angular/core';

export interface BusinessInfo {
  companyName: string;
  ownerName: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email?: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class BusinessInfoService {

  constructor() { }

  getBusinessInfo(): BusinessInfo {
    return {
      companyName: 'lopes2tech',
      ownerName: 'Paulo R. Lopes',
      address: 'Riemenstr. 1a',
      city: 'Rüschlikon',
      country: 'Switzerland',
      phone: '078 798 95 33',
      email: 'info@lopes2tech.com' // Optional email
    };
  }

  getServices(): Service[] {
    return [
      {
        icon: 'fas fa-cogs',
        title: 'Process Automation',
        description: 'Unlock efficiency by automating your daily operations. With over 10 years of experience, we design intelligent systems that reduce manual tasks, minimize errors, and free up valuable resources.'
      },
      {
        icon: 'fas fa-code',
        title: 'Web Development',
        description: 'We build modern, responsive websites and web applications that not only showcase your brand but also integrate automation features to improve user experience and operational efficiency.'
      },
      {
        icon: 'fas fa-mobile-alt',
        title: 'App Development',
        description: 'We create seamless experiences with native and cross‑platform apps for macOS, iPad, and iOS. Our applications are designed to support your business needs while incorporating automation elements to streamline tasks.'
      },
      {
        icon: 'fas fa-tools',
        title: 'Custom Tools',
        description: 'We develop automation tools that integrate into your workflow and simplify complex processes. From automating data entry to orchestrating full-scale digital operations, our solutions are built to boost productivity and reliability.'
      }
    ];
  }

  getCompanyFeatures(): Array<{icon: string, title: string}> {
    return [
      { icon: 'fas fa-mountain', title: 'Swiss precision and reliability' },
      { icon: 'fas fa-rocket', title: 'Cutting-edge technology expertise' },
      { icon: 'fas fa-handshake', title: 'Personalized service approach' },
      { icon: 'fas fa-check-circle', title: 'End-to-end solution delivery' }
    ];
  }
}

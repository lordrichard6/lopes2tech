import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '../config/constants';

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
      companyName: APP_CONSTANTS.BUSINESS.COMPANY_NAME,
      ownerName: APP_CONSTANTS.BUSINESS.OWNER_NAME,
      address: APP_CONSTANTS.BUSINESS.ADDRESS,
      city: APP_CONSTANTS.BUSINESS.CITY,
      country: APP_CONSTANTS.BUSINESS.COUNTRY,
      phone: APP_CONSTANTS.BUSINESS.PHONE,
      email: APP_CONSTANTS.BUSINESS.EMAIL
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

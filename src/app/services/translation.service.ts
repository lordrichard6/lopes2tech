import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export interface Translation {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = new BehaviorSubject<string>('en');
  private translations: { [key: string]: Translation } = {};
  private isBrowser: boolean;
  
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Set default translations first
    this.setDefaultTranslations();
    
    // Only initialize language detection in browser
    if (this.isBrowser) {
      const detectedLang = this.detectBrowserLanguage();
      const savedLang = this.getSavedLanguage();
      
      // Priority: saved language > browser language > default (en)
      const preferredLang = savedLang || detectedLang || 'en';
      
      if (preferredLang !== 'en') {
        this.setLanguage(preferredLang);
      }
    }
  }
  
  private detectBrowserLanguage(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    
    // Get browser language preference
    const browserLang = navigator.language || (navigator as any).userLanguage;
    
    if (!browserLang) {
      return null;
    }
    
    // Extract the language code (e.g., 'en' from 'en-US')
    const langCode = browserLang.toLowerCase().split('-')[0];
    
    // Map to supported languages
    const supportedLanguages = ['en', 'pt', 'de'];
    
    // Check if the detected language is supported
    if (supportedLanguages.includes(langCode)) {
      return langCode;
    }
    
    return null;
  }
  
  private setDefaultTranslations(): void {
    // Set comprehensive default English translations
    this.translations['en'] = {
      nav: {
        home: 'Home',
        services: 'Services',
        about: 'About',
        contact: 'Contact'
      },
      hero: {
        badge: '✨ Automation Simplified',
        title: {
          line1: 'Simplify',
          line2: 'your life'
        },
        subtitle: 'Let technology work for you. We automate your daily tasks so you can focus on what truly matters.',
        cta: {
          primary: 'Get Started',
          secondary: 'See How It Works'
        },
        stats: {
          experience: 'Years Experience',
          projects: 'Projects Completed',
          support: 'Support Available'
        }
      },
      about: {
        badge: 'About Us',
        title: 'Swiss Quality, Global Innovation',
        subtitle: 'At lopes2tech, we blend Swiss precision with a decade of dedicated automation experience.',
        description1: 'We\'re passionate about helping businesses unlock their full potential by automating repetitive tasks, optimizing processes, and creating tailored digital tools.',
        description2: 'Whether you need a robust web app or a suite of custom automation tools for macOS, iPad, and iOS, we have the expertise to deliver solutions that work seamlessly for you.',
        features: {
          title: 'Why Choose Us',
          swiss: 'Swiss precision and reliability',
          technology: 'Cutting-edge technology expertise',
          service: 'Personalized service approach',
          delivery: 'End-to-end solution delivery'
        }
      },
      services: {
        title: 'Our Services',
        subtitle: 'Comprehensive IT solutions tailored to your needs',
        items: {
          automation: {
            title: 'Process Automation',
            description: 'Unlock efficiency by automating your daily operations. With over 10 years of experience, we design intelligent systems that reduce manual tasks, minimize errors, and free up valuable resources.'
          },
          web: {
            title: 'Web Development',
            description: 'We build modern, responsive websites and web applications that not only showcase your brand but also integrate automation features to improve user experience and operational efficiency.'
          },
          app: {
            title: 'App Development',
            description: 'We create seamless experiences with native and cross‑platform apps for macOS, iPad, and iOS. Our applications are designed to support your business needs while incorporating automation elements to streamline tasks.'
          },
          tools: {
            title: 'Custom Tools',
            description: 'We develop automation tools that integrate into your workflow and simplify complex processes. From automating data entry to orchestrating full-scale digital operations, our solutions are built to boost productivity and reliability.'
          }
        }
      },
      contact: {
        title: 'Send us a message',
        subtitle: 'We\'ll get back to you within 24 hours',
        form: {
          name: {
            label: 'Full Name',
            placeholder: 'Enter your full name'
          },
          email: {
            label: 'Email Address',
            placeholder: 'Enter your email address'
          },
          company: {
            label: 'Company (Optional)',
            placeholder: 'Enter your company name'
          },
          message: {
            label: 'Message',
            placeholder: 'Tell us about your project or how we can help you...'
          },
          send: 'Send Message',
          sending: 'Sending...'
        },
        info: {
          phone: 'Phone',
          email: 'Email',
          location: 'Location'
        }
      },
      footer: {
        company: 'lopes2tech',
        description: 'Simplifying life through intelligent automation solutions.',
        links: {
          services: 'Services',
          about: 'About',
          contact: 'Contact',
          privacy: 'Privacy Policy'
        },
        copyright: '© 2025 lopes2tech. All rights reserved.'
      },
      impressum: {
        title: 'Impressum / Legal Notice',
        sections: {
          company: {
            title: 'Company Information',
            sole_proprietorship: 'Sole Proprietorship'
          },
          contact: {
            title: 'Contact'
          },
          disclaimer: {
            title: 'Disclaimer',
            content1: 'The information provided on this website is for general informational purposes only. While we strive to keep the content accurate and up-to-date, we make no warranties about its completeness, reliability, or suitability for any purpose. Any reliance you place on such information is therefore strictly at your own risk.',
            content2: 'All offers and services are non-binding. We reserve the right to change, supplement, or delete content without notice.'
          },
          links: {
            title: 'References and Links',
            content: 'Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of these external sites. Use of such links is at your own risk.'
          },
          copyright: {
            title: 'Copyrights',
            content: 'The copyright and all other rights to content, images, and files on this website belong exclusively to {company} or to the respective rights holders. Any reproduction requires prior written consent.'
          },
          data_protection: {
            title: 'Data Protection',
            content1: 'In accordance with Article 13 of the Swiss Federal Constitution and the Data Protection Act (DSG), your personal data is treated confidentially. We do not sell or disclose your information to third parties without your consent unless required by law.',
            content2: 'We implement appropriate technical and organizational measures, in cooperation with our hosting providers, to safeguard your data from unauthorized access, loss, or misuse.'
          },
          jurisdiction: {
            title: 'Governing Law & Jurisdiction',
            content: 'This website is governed by Swiss law. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts in Zürich, Switzerland.'
          },
          last_updated: 'Last updated:',
          back_home: '← Back to Home',
          all_rights: 'All rights reserved.'
        }
      }
    };
  }
  
  private getSavedLanguage(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('language');
    }
    return null;
  }
  
  private saveLanguage(lang: string): void {
    if (this.isBrowser) {
      localStorage.setItem('language', lang);
    }
  }
  
  setLanguage(lang: string): void {
    if (!this.isBrowser) {
      this.currentLang.next(lang);
      return;
    }
    
    if (!this.translations[lang]) {
      this.loadTranslation(lang).subscribe({
        next: () => {
          this.currentLang.next(lang);
          this.saveLanguage(lang);
          this.setDocumentLanguage(lang);
        },
        error: (error) => {
          console.error(`Failed to load translation for ${lang}:`, error);
        }
      });
    } else {
      this.currentLang.next(lang);
      this.saveLanguage(lang);
      this.setDocumentLanguage(lang);
    }
  }
  
  private setDocumentLanguage(lang: string): void {
    if (this.isBrowser) {
      document.documentElement.lang = lang;
    }
  }
  
  getCurrentLanguage(): Observable<string> {
    return this.currentLang.asObservable();
  }
  
  getCurrentLanguageValue(): string {
    return this.currentLang.value;
  }
  
  private loadTranslation(lang: string): Observable<Translation> {
    if (!this.isBrowser) {
      return of({});
    }
    
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`).pipe(
      map(translation => {
        this.translations[lang] = translation;
        return translation;
      }),
      catchError(error => {
        console.error(`Failed to load translation for ${lang}:`, error);
        return of({});
      })
    );
  }
  
  translate(key: string, params?: any): Observable<string> {
    return this.currentLang.asObservable().pipe(
      map(lang => {
        const translation = this.getTranslation(key, lang);
        return this.interpolate(translation, params);
      })
    );
  }
  
  instant(key: string, params?: any): string {
    const lang = this.currentLang.value;
    const translation = this.getTranslation(key, lang);
    return this.interpolate(translation, params);
  }
  
  private getTranslation(key: string, lang: string): string {
    const translation = this.translations[lang];
    if (!translation) {
      return key;
    }
    
    const keys = key.split('.');
    let result: any = translation;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key;
      }
    }
    
    return typeof result === 'string' ? result : key;
  }
  
  private interpolate(text: string, params?: any): string {
    if (!params) {
      return text;
    }
    
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  }
}

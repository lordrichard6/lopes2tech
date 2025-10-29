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
    
    // Set default translations first (fallback only)
    this.setDefaultTranslations();
    
    // Only initialize language detection in browser
    if (this.isBrowser) {
      const detectedLang = this.detectBrowserLanguage();
      const savedLang = this.getSavedLanguage();
      
      // Priority: saved language > browser language > default (en)
      const preferredLang = savedLang || detectedLang || 'en';
      
      // Always load from JSON files, even for English
      this.setLanguage(preferredLang);
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
      ai: {
        assistant: 'AI Assistant',
        placeholder: 'Ask me about our AI services...',
        send: 'Send'
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
            description: 'Unlock efficiency by automating your daily operations. We design intelligent systems that reduce manual tasks, minimize errors, and free up valuable resources.'
          },
          web: {
            title: 'Web Development',
            description: 'We build modern, responsive websites and web applications that not only showcase your brand but also integrate automation features to improve user experience and operational efficiency.'
          },
          app: {
            title: 'Webapp Development',
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
      portfolio: {
        badge: 'My Portfolio',
        title: 'Featured Project',
        subtitle: 'Explore our latest healthcare technology solution',
        theraflow: {
          title: 'TheraFlow',
          beta: 'Beta',
          tagline: 'The Simple CRM Built for Therapists & Coaches',
          description: 'Manage your practice with confidence. Schedule sessions, track client progress, handle payments, and maintain secure notes - all in one privacy-focused platform built with Swiss precision.',
          donation: 'This SaaS product is currently in beta. Support its development through crowdfunding, investment, or donations to help bring this solution to more practitioners!',
          features: {
            title: 'Everything You Need to Run Your Practice',
            scheduling: {
              title: 'Scheduling & Calendar',
              description: 'Google/Outlook sync, smart availability, self-booking portal, and automatic timezone support'
            },
            clients: {
              title: 'Client Management',
              description: 'Detailed profiles with secure notes, history tracking, intake forms, and smart categorization'
            },
            sessions: {
              title: 'Session Management',
              description: 'Comprehensive logging, progress tracking, SOAP/DAR(N) format, and customizable templates'
            },
            billing: {
              title: 'Billing & Payments',
              description: 'Professional invoicing, Stripe/PayPal integration, unpaid tracking, and financial reports'
            },
            reminders: {
              title: 'Reminders & Notifications',
              description: 'Email/SMS reminders, automated follow-ups, check-in workflows, reduce no-shows by 80%'
            },
            security: {
              title: 'Security & Compliance',
              description: 'End-to-end encryption, full GDPR compliance, optional HIPAA, role-based access control'
            }
          },
          stats: {
            practitioners: 'Practitioners',
            sessions: 'Sessions Managed',
            uptime: 'Uptime'
          },
          cta: 'Visit TheraFlow'
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
      },
      multistep: {
        title: 'Let\'s Get Started',
        subtitle: 'Tell us about your project in just a few steps',
        progress: {
          step: 'Step {{current}} of {{total}}'
        },
        steps: {
          welcome: {
            title: 'Welcome! Let\'s understand your needs',
            description: 'We\'ll ask you a few quick questions to better understand your project and provide you with the most relevant solutions.',
            button: 'Get Started'
          },
          service: {
            title: 'What do you need?',
            description: 'Select the service that best matches your requirements:',
            options: {
              automation: {
                title: 'Process Automation',
                description: 'Automate your daily operations and workflows'
              },
              webapp: {
                title: 'Web Applications & SaaS',
                description: 'Custom web apps and SaaS platforms'
              },
              web: {
                title: 'Web Development',
                description: 'Modern, responsive websites'
              },
              tools: {
                title: 'Custom Tools',
                description: 'Specialized automation tools and integrations'
              },
              unsure: {
                title: 'I don\'t quite know',
                description: 'Let\'s discuss your needs and find the best solution'
              },
              other: {
                title: 'Other',
                description: 'Something else - tell us more about it'
              }
            }
          },
          budget: {
            title: 'What is your budget?',
            description: 'Help us understand your budget range for this project:',
            currency: 'Currency'
          },
          message: {
            title: 'Is there anything else you want to share with us?',
            description: 'Feel free to share any additional thoughts, questions, or specific requirements:',
            placeholder: 'Tell us about your timeline, specific requirements, preferred communication methods, or any questions you might have...'
          },
          details: {
            title: 'Tell us more about your specific needs',
            description: 'Based on your selection, let\'s dive deeper into what you\'re looking for:',
            automation: {
              rpa: {
                title: 'Robotic Process Automation (RPA)',
                description: 'Automate repetitive tasks like data entry, file processing, and system interactions using AI-powered bots that can learn and adapt to your workflows.',
                example: 'Example: Automatically processing invoices, extracting data, and updating your accounting system'
              },
              workflow: {
                title: 'Workflow Automation',
                description: 'Streamline business processes by connecting different systems and automating decision-making with intelligent LLM-powered logic.',
                example: 'Example: Customer support ticket routing with AI analysis and automatic assignment to the right team'
              },
              integration: {
                title: 'System Integration & APIs',
                description: 'Connect your existing tools and systems to work together seamlessly with smart automation bridges.',
                example: 'Example: Syncing customer data between your CRM, email platform, and billing system in real-time'
              },
              ai: {
                title: 'AI-Powered Automation',
                description: 'Leverage Large Language Models (LLMs) and AI to create intelligent automation that can understand context, make decisions, and learn from patterns.',
                example: 'Example: AI chatbot that handles customer inquiries, processes orders, and escalates complex issues to humans'
              }
            },
            webapp: {
              saas: {
                title: 'SaaS Platforms',
                description: 'Full-featured Software as a Service solutions with user management, billing, and scalable architecture.',
                example: 'Example: Project management platform with team collaboration, time tracking, and automated reporting'
              },
              portal: {
                title: 'Customer/Employee Portals',
                description: 'Secure portals for customers or employees to access information, submit requests, and track progress.',
                example: 'Example: Employee self-service portal for HR requests, payroll access, and document management'
              },
              dashboard: {
                title: 'Business Dashboards',
                description: 'Real-time dashboards and analytics platforms to visualize your data and KPIs.',
                example: 'Example: Sales dashboard showing real-time metrics, forecasts, and automated performance reports'
              },
              crm: {
                title: 'CRM Systems',
                description: 'Custom Customer Relationship Management systems tailored to your business processes.',
                example: 'Example: Real estate CRM with property listings, client management, and automated follow-up campaigns'
              }
            },
            web: {
              corporate: {
                title: 'Corporate Websites',
                description: 'Professional websites that represent your brand and engage your audience.',
                example: 'Example: Company website with service pages, team bios, case studies, and contact forms'
              },
              ecommerce: {
                title: 'E-commerce',
                description: 'Online stores with payment processing, inventory management, and customer accounts.',
                example: 'Example: Fashion e-commerce site with product catalog, shopping cart, and order tracking'
              },
              landing: {
                title: 'Landing Pages',
                description: 'High-converting landing pages for marketing campaigns and lead generation.',
                example: 'Example: Product launch page with video demos, testimonials, and conversion-optimized forms'
              },
              portfolio: {
                title: 'Portfolio Sites',
                description: 'Showcase your work, skills, and achievements with stunning visual presentations.',
                example: 'Example: Photographer portfolio with image galleries, client testimonials, and booking system'
              }
            },
            tools: {
              desktop: {
                title: 'Desktop Applications',
                description: 'Native applications for Windows, macOS, and Linux with advanced functionality.',
                example: 'Example: Inventory management desktop app with barcode scanning and offline synchronization'
              },
              mobile: {
                title: 'Mobile Apps',
                description: 'iOS and Android applications that extend your business to mobile devices.',
                example: 'Example: Field service app for technicians with job scheduling, GPS tracking, and photo reports'
              },
              scripts: {
                title: 'Automation Scripts',
                description: 'Custom scripts and utilities to automate specific tasks in your workflow.',
                example: 'Example: Data migration script that transfers customer records between different systems'
              },
              integrations: {
                title: 'Third-party Integrations',
                description: 'Connect your existing tools with custom integrations and middleware solutions.',
                example: 'Example: Shopify integration that automatically updates inventory from your warehouse system'
              }
            }
          },
          contact: {
            title: 'Let\'s get in touch',
            description: 'Please provide your contact information so we can reach out to you:',
            firstName: 'First Name',
            firstNamePlaceholder: 'John',
            lastName: 'Last Name',
            lastNamePlaceholder: 'Doe',
            company: 'Company',
            companyPlaceholder: 'Your company name (optional)',
            email: 'Email Address',
            emailPlaceholder: 'your.email@company.com',
            location: 'Location',
            locationPlaceholder: 'City, Country',
            phone: 'Phone Number',
            phonePlaceholder: '+1 (555) 123-4567 (optional)',
            summary: {
              title: 'Project Summary',
              service: 'Service',
              specificNeeds: 'Specific needs',
              description: 'Description',
              budget: 'Budget',
              additionalNotes: 'Additional notes'
            }
          }
        },
        buttons: {
          back: 'Back',
          continue: 'Continue',
          send: 'Send Message',
          sending: 'Sending...'
        }
      },
      thankYou: {
        success: {
          label: 'Success!',
          subtitle: 'Message Received'
        },
        title: 'Thank you for your inquiry!',
        message: 'We have received your project details and our expert team is already reviewing your requirements. You\'ll receive a personalized proposal within **24 hours** that\'s tailored specifically to your needs.'
      },
      serviceDialog: {
        title: 'What this means?',
        services: {
          automation: {
            explanation: 'We use advanced AI and Large Language Models (LLMs) to automate your business processes intelligently. Think of it like having a smart assistant that can understand, learn, and respond naturally - handling customer inquiries, qualifying leads, and managing complex workflows without human intervention.',
            example: 'For example: a chatbot that can answer any question about your company services in any language, or an AI system that automatically qualifies leads by asking the right questions and routing them to the appropriate team member.'
          },
          web: {
            explanation: 'We build websites that look great on any device and work perfectly. Whether you need a simple company website or a complex online platform, we create digital spaces that represent your business professionally and help you connect with customers.',
            example: 'For example: a restaurant website where customers can view menus, make reservations, and order online all in one place.'
          },
          app: {
            explanation: 'We create powerful web applications and cloud-based software that solve specific business problems. These are like custom digital tools built just for your needs - from customer management systems to online marketplaces.',
            example: 'For example: a custom inventory system that tracks your products, alerts you when stock is low, and automatically orders new supplies.'
          },
          tools: {
            explanation: 'We develop specialized software tools that integrate with what you already use. These custom solutions automate specific tasks in your workflow, like data processing, file management, or connecting different software systems together.',
            example: 'For example: a tool that takes data from your sales system and automatically creates invoices in your accounting software.'
          }
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
    
    // Always load from JSON files to ensure consistency
    this.loadTranslation(lang).subscribe({
      next: () => {
        this.currentLang.next(lang);
        this.saveLanguage(lang);
        this.setDocumentLanguage(lang);
      },
      error: (error) => {
        console.error(`Failed to load translation for ${lang}:`, error);
        // Fallback to hardcoded defaults for English only
        if (lang === 'en') {
          this.currentLang.next(lang);
          this.saveLanguage(lang);
          this.setDocumentLanguage(lang);
        }
      }
    });
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

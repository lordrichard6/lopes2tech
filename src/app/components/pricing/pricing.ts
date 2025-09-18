import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';

interface PricingTier {
  name: string;
  isPopular?: boolean;
  chfHourly: string;
  eurHourly: string;
  chfProject: string;
  eurProject: string;
  chfRetainer: string;
  eurRetainer: string;
}

interface SubService {
  name: string;
  description: string;
  tiers: PricingTier[];
  ctaService: string;
}

interface Service {
  name: string;
  description: string;
  icon: string;
  subServices: SubService[];
}

@Component({
  selector: 'app-pricing',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss'
})
export class PricingComponent {
  // Track which sub-services have their tables visible
  visibleTables: Set<string> = new Set();
  // Track tables that are currently opening
  openingTables: Set<string> = new Set();
  // Track tables that are currently closing
  closingTables: Set<string> = new Set();
  
  // Toggle table visibility for a specific sub-service
  toggleTable(subServiceName: string): void {
    if (this.visibleTables.has(subServiceName)) {
      // Start closing animation
      this.closingTables.add(subServiceName);
      this.openingTables.delete(subServiceName);
      
      // Hide the table after animation completes
      setTimeout(() => {
        this.visibleTables.delete(subServiceName);
        this.closingTables.delete(subServiceName);
      }, 300); // Match the closing animation duration
    } else {
      // Start opening animation
      this.visibleTables.add(subServiceName);
      this.openingTables.add(subServiceName);
      this.closingTables.delete(subServiceName);
      
      // Remove the opening animation class after animation completes
      setTimeout(() => {
        this.openingTables.delete(subServiceName);
      }, 500); // Match the opening animation duration
    }
  }

  // Check if a table is currently visible
  isTableVisible(subServiceName: string): boolean {
    return this.visibleTables.has(subServiceName);
  }
  
  // Check if a table is currently opening
  isTableOpening(subServiceName: string): boolean {
    return this.openingTables.has(subServiceName);
  }
  
  // Check if a table is currently closing
  isTableClosing(subServiceName: string): boolean {
    return this.closingTables.has(subServiceName);
  }
  
  services: Service[] = [
    {
      name: 'pricing.services.ai.title',
      description: 'pricing.services.ai.description',
      icon: 'fas fa-brain',
      subServices: [
        {
          name: 'pricing.services.ai.subServices.ml.title',
          description: 'pricing.services.ai.subServices.ml.description',
          ctaService: 'ml-consultation',
          tiers: [
            {
              name: 'pricing.tiers.budget',
              chfHourly: '~CHF 120/hour',
              eurHourly: '~€50/hour',
              chfProject: 'CHF 5,000+ for basic ML model development and consultation',
              eurProject: '€2,500+ for basic ML model development and consultation',
              chfRetainer: 'CHF 2,000/month for ongoing ML support and model updates',
              eurRetainer: '€1,000/month for ongoing ML support and model updates'
            },
            {
              name: 'pricing.tiers.mid-range',
              isPopular: true,
              chfHourly: '~CHF 180/hour',
              eurHourly: '~€80/hour',
              chfProject: 'CHF 15,000–50,000 for custom ML solutions with deployment',
              eurProject: '€7,500–25,000 for custom ML solutions with deployment',
              chfRetainer: 'CHF 5,000/month for comprehensive ML development and maintenance',
              eurRetainer: '€2,500/month for comprehensive ML development and maintenance'
            },
            {
              name: 'pricing.tiers.premium',
              chfHourly: '~CHF 250/hour',
              eurHourly: '~€120/hour',
              chfProject: 'CHF 100,000+ for enterprise-grade AI/ML systems',
              eurProject: '€50,000+ for enterprise-grade AI/ML systems',
              chfRetainer: 'CHF 10,000+/month for full-scale AI strategy and implementation',
              eurRetainer: '€5,000+/month for full-scale AI strategy and implementation'
            }
          ]
        },
        {
          name: 'pricing.services.ai.subServices.chatbot.title',
          description: 'pricing.services.ai.subServices.chatbot.description',
          ctaService: 'ai-chatbot',
          tiers: [
            {
              name: 'pricing.tiers.budget',
              chfHourly: '~CHF 100/hour',
              eurHourly: '~€45/hour',
              chfProject: 'CHF 3,000–8,000 for basic chatbot setup using existing platforms',
              eurProject: '€1,500–4,000 for basic chatbot setup using existing platforms',
              chfRetainer: 'CHF 800/month for chatbot maintenance and basic updates',
              eurRetainer: '€400/month for chatbot maintenance and basic updates'
            },
            {
              name: 'pricing.tiers.mid-range',
              isPopular: true,
              chfHourly: '~CHF 150/hour',
              eurHourly: '~€70/hour',
              chfProject: 'CHF 12,000–25,000 for custom AI chatbot with NLP capabilities',
              eurProject: '€6,000–12,000 for custom AI chatbot with NLP capabilities',
              chfRetainer: 'CHF 1,500/month for advanced chatbot management and improvements',
              eurRetainer: '€750/month for advanced chatbot management and improvements'
            },
            {
              name: 'pricing.tiers.premium',
              chfHourly: '~CHF 200/hour',
              eurHourly: '~€100/hour',
              chfProject: 'CHF 50,000+ for enterprise AI virtual assistants with advanced integrations',
              eurProject: '€25,000+ for enterprise AI virtual assistants with advanced integrations',
              chfRetainer: 'CHF 3,000+/month for enterprise-level AI assistant management',
              eurRetainer: '€1,500+/month for enterprise-level AI assistant management'
            }
          ]
        },
        {
          name: 'pricing.services.ai.subServices.analytics.title',
          description: 'pricing.services.ai.subServices.analytics.description',
          ctaService: 'data-analytics',
          tiers: [
            {
              name: 'pricing.tiers.budget',
              chfHourly: '~CHF 90/hour',
              eurHourly: '~€40/hour',
              chfProject: 'CHF 2,500–7,000 for basic automated reporting dashboards',
              eurProject: '€1,200–3,500 for basic automated reporting dashboards',
              chfRetainer: 'CHF 600/month for dashboard maintenance and data updates',
              eurRetainer: '€300/month for dashboard maintenance and data updates'
            },
            {
              name: 'pricing.tiers.mid-range',
              isPopular: true,
              chfHourly: '~CHF 140/hour',
              eurHourly: '~€60/hour',
              chfProject: 'CHF 10,000–20,000 for comprehensive BI systems with predictive analytics',
              eurProject: '€5,000–10,000 for comprehensive BI systems with predictive analytics',
              chfRetainer: 'CHF 1,200/month for advanced analytics management and reporting',
              eurRetainer: '€600/month for advanced analytics management and reporting'
            },
            {
              name: 'pricing.tiers.premium',
              chfHourly: '~CHF 200/hour',
              eurHourly: '~€100/hour',
              chfProject: 'CHF 25,000+ for enterprise data analytics platforms with AI insights',
              eurProject: '€12,000+ for enterprise data analytics platforms with AI insights',
              chfRetainer: 'CHF 2,500+/month for enterprise analytics management and optimization',
              eurRetainer: '€1,200+/month for enterprise analytics management and optimization'
            }
          ]
        }
      ]
    },
    {
      name: 'pricing.services.web.title',
      description: 'pricing.services.web.description',
      icon: 'fas fa-globe',
      subServices: [
        {
          name: 'pricing.services.web.subServices.website.title',
          description: 'pricing.services.web.subServices.website.description',
          ctaService: 'website-development',
          tiers: [
            {
              name: 'pricing.tiers.budget',
              chfHourly: '~CHF 80/hour',
              eurHourly: '~€30/hour',
              chfProject: 'CHF 2,000+ for a basic 3-5 page website',
              eurProject: '€1,000+ for a basic 3-5 page website',
              chfRetainer: 'CHF 300/month for minimal updates & hosting support',
              eurRetainer: '€150/month for minimal updates & support'
            },
            {
              name: 'pricing.tiers.mid-range',
              isPopular: true,
              chfHourly: '~CHF 140/hour',
              eurHourly: '~€50/hour',
              chfProject: '~CHF 6,000–10,000 for an SMB website (multi-page, custom design, CMS integration)',
              eurProject: '~€3,000–5,000 for an SMB website (multi-page, CMS, custom design)',
              chfRetainer: 'CHF 800/month for content updates, security, SEO tuning',
              eurRetainer: '€400/month for content updates, security, SEO tuning'
            },
            {
              name: 'pricing.tiers.premium',
              chfHourly: '~CHF 200/hour',
              eurHourly: '~€80/hour',
              chfProject: 'CHF 20,000+ for a corporate or custom web application (advanced features, multilingual)',
              eurProject: '€10,000+ for a large corporate site or web app (advanced features, multilingual)',
              chfRetainer: 'CHF 1,500/month for full-service maintenance (analytics, updates, SEO)',
              eurRetainer: '€750/month for full-service maintenance (analytics, updates, SEO)'
            }
          ]
        },
        {
          name: 'pricing.services.web.subServices.ecommerce.title',
          description: 'pricing.services.web.subServices.ecommerce.description',
          ctaService: 'ecommerce-development',
          tiers: [
            {
              name: 'pricing.tiers.budget',
              chfHourly: '~CHF 100/hour',
              eurHourly: '~€40/hour',
              chfProject: '~CHF 8,000–15,000 for a basic e-commerce site (small product range, standard template)',
              eurProject: '~€5,000 for a basic e-commerce site (small catalog, standard template)',
              chfRetainer: 'CHF 500/month for shop maintenance & updates',
              eurRetainer: '€250/month for maintenance & updates (inventory, patches)'
            },
            {
              name: 'pricing.tiers.mid-range',
              isPopular: true,
              chfHourly: '~CHF 150/hour',
              eurHourly: '~€70/hour',
              chfProject: '~CHF 25,000 for a mid-size online store (custom design, multiple categories, popular CMS like WooCommerce)',
              eurProject: '~€15,000 for a mid-size online store (custom design, WooCommerce/Magento)',
              chfRetainer: 'CHF 1,000/month for ongoing support (security, SEO, new features)',
              eurRetainer: '€500/month for ongoing support (security, SEO, features)'
            },
            {
              name: 'pricing.tiers.premium',
              chfHourly: '~CHF 200/hour',
              eurHourly: '~€90/hour',
              chfProject: 'CHF 50,000+ for a large-scale e-commerce platform (hundreds of products, custom features, integrations)',
              eurProject: '€30,000+ for a large-scale e-commerce platform (extensive catalog, custom features)',
              chfRetainer: 'CHF 2,000+/month for fully managed e-commerce operations (24/7 support, marketing integration)',
              eurRetainer: '€1,000+/month for fully managed service (24/7 support, marketing integration)'
            }
          ]
        },
        {
          name: 'pricing.services.web.subServices.maintenance.title',
          description: 'pricing.services.web.subServices.maintenance.description',
          ctaService: 'website-maintenance-seo',
          tiers: [
            {
              name: 'pricing.tiers.budget',
              chfHourly: '~CHF 70/hour (for ad-hoc minor updates)',
              eurHourly: '~€30/hour (for ad-hoc minor updates)',
              chfProject: 'CHF 1,000 for initial SEO audit & basic fixes',
              eurProject: '€500 for initial SEO audit & basic fixes',
              chfRetainer: 'CHF 250/month for basic maintenance (software updates, monitoring)',
              eurRetainer: '€150/month for basic maintenance (updates, monitoring)'
            },
            {
              name: 'pricing.tiers.mid-range',
              isPopular: true,
              chfHourly: '~CHF 120/hour (for content updates or SEO work)',
              eurHourly: '~€50/hour (for content updates or SEO work)',
              chfProject: 'CHF 2,500 for comprehensive SEO optimization & site tune-up',
              eurProject: '€1,200 for comprehensive SEO optimization & site tune-up',
              chfRetainer: 'CHF 750/month for standard maintenance + SEO (updates, backups, monthly SEO tweaks)',
              eurRetainer: '€400/month for standard maintenance + SEO (updates, backups, SEO tweaks)'
            },
            {
              name: 'pricing.tiers.premium',
              chfHourly: '~CHF 150/hour (for complex troubleshooting or redesign tasks)',
              eurHourly: '~€80/hour (for complex tasks or redesign)',
              chfProject: 'CHF 5,000+ for a full site revamp & SEO overhaul',
              eurProject: '€3,000+ for a full site & SEO overhaul',
              chfRetainer: 'CHF 1,500/month for premium maintenance (priority support, content creation, advanced SEO)',
              eurRetainer: '€1,000/month for premium maintenance (priority support, content creation, advanced SEO)'
            }
          ]
        }
      ]
    },
    {
      name: 'pricing.services.software.title',
      description: 'pricing.services.software.description',
      icon: 'fas fa-code',
      subServices: [
        {
          name: 'pricing.services.software.subServices.mobile.title',
          description: 'pricing.services.software.subServices.mobile.description',
          ctaService: 'mobile-app-development',
          tiers: [
            {
              name: 'pricing.tiers.budget',
              chfHourly: '~CHF 100/hour',
              eurHourly: '~€45/hour',
              chfProject: 'CHF 15,000 for a basic app (single platform, minimal features)',
              eurProject: '€8,000 for a basic app (single platform, minimal features)',
              chfRetainer: 'CHF 1,000/month for minor updates post-launch',
              eurRetainer: '€500/month for minor updates post-launch'
            },
            {
              name: 'pricing.tiers.mid-range',
              isPopular: true,
              chfHourly: '~CHF 150/hour',
              eurHourly: '~€70/hour',
              chfProject: '~CHF 40,000 for a mid-complexity app (iOS & Android, standard features, backend server)',
              eurProject: '~€25,000 for a mid-complexity app (cross-platform, standard features, backend server)',
              chfRetainer: 'CHF 2,000/month for ongoing improvements and support',
              eurRetainer: '€1,200/month for ongoing improvements and support'
            },
            {
              name: 'pricing.tiers.premium',
              chfHourly: '~CHF 200/hour',
              eurHourly: '~€100/hour',
              chfProject: 'CHF 80,000+ for a complex app (multi-platform, advanced features, integrations, high scalability)',
              eurProject: '€50,000+ for a complex app (multi-platform, advanced features, integrations)',
              chfRetainer: 'CHF 5,000/month for full continuous development (new features, scaling, 24/7 support)',
              eurRetainer: '€3,000/month for continuous development and high-level support'
            }
          ]
        },
        {
          name: 'pricing.services.software.subServices.custom.title',
          description: 'pricing.services.software.subServices.custom.description',
          ctaService: 'custom-software-development',
          tiers: [
            {
              name: 'pricing.tiers.budget',
              chfHourly: '~CHF 90/hour',
              eurHourly: '~€40/hour',
              chfProject: 'CHF 5,000 for a simple tool or plug-in (e.g. a small macOS utility)',
              eurProject: '€2,500 for a simple tool or utility',
              chfRetainer: 'CHF 800/month for short-term enhancements/support',
              eurRetainer: '€300/month for short-term enhancements/support'
            },
            {
              name: 'pricing.tiers.mid-range',
              isPopular: true,
              chfHourly: '~CHF 140/hour',
              eurHourly: '~€60/hour',
              chfProject: '~CHF 20,000 for a mid-size software project (e.g. a custom database or a cross-platform app with moderate complexity)',
              eurProject: '~€10,000 for a mid-size software project',
              chfRetainer: 'CHF 1,500/month for ongoing support and version updates',
              eurRetainer: '€700/month for ongoing support and updates'
            },
            {
              name: 'pricing.tiers.premium',
              chfHourly: '~CHF 180/hour',
              eurHourly: '~€90/hour',
              chfProject: 'CHF 50,000+ for a large-scale or enterprise software solution (complex features, multi-user, cloud integration)',
              eurProject: '€25,000+ for a large-scale software solution',
              chfRetainer: 'CHF 3,000+/month for full lifecycle support (continuous development, cloud hosting, dedicated support)',
              eurRetainer: '€1,500+/month for comprehensive support and development'
            }
          ]
        },
        {
          name: 'pricing.services.software.subServices.integration.title',
          description: 'pricing.services.software.subServices.integration.description',
          ctaService: 'system-integration-api',
          tiers: [
            {
              name: 'pricing.tiers.budget',
              chfHourly: '~CHF 100/hour',
              eurHourly: '~€45/hour',
              chfProject: 'CHF 3,000 for a basic integration or API script (e.g. connecting two services with existing APIs)',
              eurProject: '€1,500 for a basic integration script',
              chfRetainer: 'CHF 500/month for monitoring & minor tweaks',
              eurRetainer: '€200/month for monitoring & minor tweaks'
            },
            {
              name: 'pricing.tiers.mid-range',
              isPopular: true,
              chfHourly: '~CHF 150/hour',
              eurHourly: '~€70/hour',
              chfProject: '~CHF 10,000 for a multi-system integration or custom API development (e.g. linking CRM with website and database)',
              eurProject: '~€4,000 for a multi-system integration or API',
              chfRetainer: 'CHF 1,000/month for ongoing management (updates as systems change)',
              eurRetainer: '€500/month for ongoing management and updates'
            },
            {
              name: 'pricing.tiers.premium',
              chfHourly: '~CHF 180–200/hour',
              eurHourly: '~€90/hour',
              chfProject: 'CHF 25,000+ for a complex enterprise integration project (many systems, custom middleware)',
              eurProject: '€12,000+ for a complex integration project (many systems, custom middleware)',
              chfRetainer: 'CHF 2,000+/month for fully managed integration support (24/7 monitoring, enhancements)',
              eurRetainer: '€1,000+/month for fully managed support (24/7 monitoring, enhancements)'
            }
          ]
        }
      ]
    }
  ];

  constructor(
    private router: Router,
    private translationService: TranslationService
  ) {}

  // Method to navigate to contact form
  contactUs() {
    this.router.navigate(['/contact']);
  }

  // Method to start multistep form with specific service
  getStarted(service: string) {
    this.router.navigate(['/contact'], { 
      queryParams: { service: service } 
    });
  }
}
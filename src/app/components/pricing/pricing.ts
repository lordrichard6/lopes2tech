import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
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
      name: 'AI Solutions',
      description: 'Cutting-edge artificial intelligence solutions to transform your business',
      icon: 'fas fa-brain',
      subServices: [
        {
          name: 'Machine Learning Consultation & Development',
          description: 'Implement robotic process automation (RPA) and custom workflow scripts to automate routine tasks. For businesses, this might mean automating data entry, file transfers, or repetitive office processes. Individuals and small business owners can benefit from personal automations (e.g. automated file backups or email sorting). This sub-service is profitable due to the strong demand for efficiency gains, and beneficial as it saves clients significant time and labor costs.',
          ctaService: 'ml-consultation',
          tiers: [
            {
              name: 'Budget',
              chfHourly: '~CHF 120/hour',
              eurHourly: '~€50/hour',
              chfProject: 'CHF 5,000+ for basic ML model development and consultation',
              eurProject: '€2,500+ for basic ML model development and consultation',
              chfRetainer: 'CHF 2,000/month for ongoing ML support and model updates',
              eurRetainer: '€1,000/month for ongoing ML support and model updates'
            },
            {
              name: 'Mid-Range',
              isPopular: true,
              chfHourly: '~CHF 180/hour',
              eurHourly: '~€80/hour',
              chfProject: 'CHF 15,000–50,000 for custom ML solutions with deployment',
              eurProject: '€7,500–25,000 for custom ML solutions with deployment',
              chfRetainer: 'CHF 5,000/month for comprehensive ML development and maintenance',
              eurRetainer: '€2,500/month for comprehensive ML development and maintenance'
            },
            {
              name: 'Premium',
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
          name: 'AI-Powered Chatbot & Virtual Assistant Development',
          description: 'Develop intelligent chatbots or voice assistants to handle customer service, bookings, or FAQs using AI (e.g. natural language processing). Businesses can deploy these on their websites or messaging platforms to assist customers 24/7, reducing support costs. Individuals (such as independent service providers or community website owners) can use chatbots to handle inquiries or as personal assistants for scheduling and home automation. This sub-service is profitable given the rising adoption of AI customer support, and beneficial as it improves responsiveness and user experience without needing human intervention.',
          ctaService: 'ai-chatbot',
          tiers: [
            {
              name: 'Budget',
              chfHourly: '~CHF 100/hour',
              eurHourly: '~€45/hour',
              chfProject: 'CHF 3,000–8,000 for basic chatbot setup using existing platforms',
              eurProject: '€1,500–4,000 for basic chatbot setup using existing platforms',
              chfRetainer: 'CHF 800/month for chatbot maintenance and basic updates',
              eurRetainer: '€400/month for chatbot maintenance and basic updates'
            },
            {
              name: 'Mid-Range',
              isPopular: true,
              chfHourly: '~CHF 150/hour',
              eurHourly: '~€70/hour',
              chfProject: 'CHF 12,000–25,000 for custom AI chatbot with NLP capabilities',
              eurProject: '€6,000–12,000 for custom AI chatbot with NLP capabilities',
              chfRetainer: 'CHF 1,500/month for advanced chatbot management and improvements',
              eurRetainer: '€750/month for advanced chatbot management and improvements'
            },
            {
              name: 'Premium',
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
          name: 'Automated Data Analytics & Reporting',
          description: 'Provide solutions to automatically collect, analyze, and report data. For businesses, this could mean dashboards that update in real-time, automated weekly reports, or scripts that aggregate data from multiple sources (sales, web analytics, etc.). Individuals (e.g., freelancers or enthusiasts) might use personal finance trackers or automated research aggregators. This sub-service is profitable because data-driven decision making is a priority for many clients, and beneficial as it removes manual spreadsheet work and reduces errors.',
          ctaService: 'data-analytics',
          tiers: [
            {
              name: 'Budget',
              chfHourly: '~CHF 90/hour',
              eurHourly: '~€40/hour',
              chfProject: 'CHF 2,500–7,000 for basic automated reporting dashboards',
              eurProject: '€1,200–3,500 for basic automated reporting dashboards',
              chfRetainer: 'CHF 600/month for dashboard maintenance and data updates',
              eurRetainer: '€300/month for dashboard maintenance and data updates'
            },
            {
              name: 'Mid-Range',
              isPopular: true,
              chfHourly: '~CHF 140/hour',
              eurHourly: '~€60/hour',
              chfProject: 'CHF 10,000–20,000 for comprehensive BI systems with predictive analytics',
              eurProject: '€5,000–10,000 for comprehensive BI systems with predictive analytics',
              chfRetainer: 'CHF 1,200/month for advanced analytics management and reporting',
              eurRetainer: '€600/month for advanced analytics management and reporting'
            },
            {
              name: 'Premium',
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
      name: 'Web Development Services',
      description: 'Professional website development and modern web solutions',
      icon: 'fas fa-globe',
      subServices: [
        {
          name: 'Custom Website Design & Development',
          description: 'End-to-end creation of custom websites – from design through development and deployment. This includes corporate websites, personal blogs/portfolios, or small business sites. For businesses, a professional website enhances credibility and marketing. For individuals, this service covers personal branding sites or hobby project sites. It\'s profitable due to constant demand for web presence, and beneficial as clients get a tailor-made site that meets their needs (mobile-responsive, SEO-friendly, etc.).',
          ctaService: 'website-development',
          tiers: [
            {
              name: 'Budget',
              chfHourly: '~CHF 80/hour',
              eurHourly: '~€30/hour',
              chfProject: 'CHF 2,000+ for a basic 3-5 page website',
              eurProject: '€1,000+ for a basic 3-5 page website',
              chfRetainer: 'CHF 300/month for minimal updates & hosting support',
              eurRetainer: '€150/month for minimal updates & support'
            },
            {
              name: 'Mid-Range',
              isPopular: true,
              chfHourly: '~CHF 140/hour',
              eurHourly: '~€50/hour',
              chfProject: '~CHF 6,000–10,000 for an SMB website (multi-page, custom design, CMS integration)',
              eurProject: '~€3,000–5,000 for an SMB website (multi-page, CMS, custom design)',
              chfRetainer: 'CHF 800/month for content updates, security, SEO tuning',
              eurRetainer: '€400/month for content updates, security, SEO tuning'
            },
            {
              name: 'Premium',
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
          name: 'E-Commerce Development',
          description: 'Build online stores and e-commerce platforms. This includes setting up product catalogs, shopping carts, payment gateway integration, and security features. Businesses benefit by selling products/services online (opening new revenue streams), while individuals (for example, artisans or entrepreneurs) can launch their own web shop. E-commerce projects are profitable due to their complexity and ongoing needs, and beneficial as they enable clients to reach a wider market 24/7.',
          ctaService: 'ecommerce-development',
          tiers: [
            {
              name: 'Budget',
              chfHourly: '~CHF 100/hour',
              eurHourly: '~€40/hour',
              chfProject: '~CHF 8,000–15,000 for a basic e-commerce site (small product range, standard template)',
              eurProject: '~€5,000 for a basic e-commerce site (small catalog, standard template)',
              chfRetainer: 'CHF 500/month for shop maintenance & updates',
              eurRetainer: '€250/month for maintenance & updates (inventory, patches)'
            },
            {
              name: 'Mid-Range',
              isPopular: true,
              chfHourly: '~CHF 150/hour',
              eurHourly: '~€70/hour',
              chfProject: '~CHF 25,000 for a mid-size online store (custom design, multiple categories, popular CMS like WooCommerce)',
              eurProject: '~€15,000 for a mid-size online store (custom design, WooCommerce/Magento)',
              chfRetainer: 'CHF 1,000/month for ongoing support (security, SEO, new features)',
              eurRetainer: '€500/month for ongoing support (security, SEO, features)'
            },
            {
              name: 'Premium',
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
          name: 'Website Maintenance & SEO Optimization',
          description: 'Offer ongoing website maintenance (updates, backups, security monitoring) combined with search engine optimization (SEO) services to improve site visibility. Businesses often require continuous maintenance of their sites and SEO to drive traffic; individuals like bloggers or professionals also benefit from keeping their personal sites updated and search-friendly. This service is profitable due to its recurring revenue model, and beneficial as it ensures clients\' websites remain secure, up-to-date, and high in search rankings over time.',
          ctaService: 'website-maintenance-seo',
          tiers: [
            {
              name: 'Budget',
              chfHourly: '~CHF 70/hour (for ad-hoc minor updates)',
              eurHourly: '~€30/hour (for ad-hoc minor updates)',
              chfProject: 'CHF 1,000 for initial SEO audit & basic fixes',
              eurProject: '€500 for initial SEO audit & basic fixes',
              chfRetainer: 'CHF 250/month for basic maintenance (software updates, monitoring)',
              eurRetainer: '€150/month for basic maintenance (updates, monitoring)'
            },
            {
              name: 'Mid-Range',
              isPopular: true,
              chfHourly: '~CHF 120/hour (for content updates or SEO work)',
              eurHourly: '~€50/hour (for content updates or SEO work)',
              chfProject: 'CHF 2,500 for comprehensive SEO optimization & site tune-up',
              eurProject: '€1,200 for comprehensive SEO optimization & site tune-up',
              chfRetainer: 'CHF 750/month for standard maintenance + SEO (updates, backups, monthly SEO tweaks)',
              eurRetainer: '€400/month for standard maintenance + SEO (updates, backups, SEO tweaks)'
            },
            {
              name: 'Premium',
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
      name: 'Software & App Development',
      description: 'Custom software solutions and mobile applications for modern businesses',
      icon: 'fas fa-code',
      subServices: [
        {
          name: 'Mobile Application Development',
          description: 'Design and develop mobile apps for iOS and Android. For businesses, this could be a branded app for customers or a productivity app for employees. For individuals, it could mean bringing a personal app idea to life (a startup concept or a niche utility app). Lopes2Tech can handle the full app development lifecycle: UI/UX design, coding, testing, and deployment to app stores. This sub-service is profitable due to typically large project scopes, and beneficial as clients get a presence in the mobile space, reaching users on their smartphones.',
          ctaService: 'mobile-app-development',
          tiers: [
            {
              name: 'Budget',
              chfHourly: '~CHF 100/hour',
              eurHourly: '~€45/hour',
              chfProject: 'CHF 15,000 for a basic app (single platform, minimal features)',
              eurProject: '€8,000 for a basic app (single platform, minimal features)',
              chfRetainer: 'CHF 1,000/month for minor updates post-launch',
              eurRetainer: '€500/month for minor updates post-launch'
            },
            {
              name: 'Mid-Range',
              isPopular: true,
              chfHourly: '~CHF 150/hour',
              eurHourly: '~€70/hour',
              chfProject: '~CHF 40,000 for a mid-complexity app (iOS & Android, standard features, backend server)',
              eurProject: '~€25,000 for a mid-complexity app (cross-platform, standard features, backend server)',
              chfRetainer: 'CHF 2,000/month for ongoing improvements and support',
              eurRetainer: '€1,200/month for ongoing improvements and support'
            },
            {
              name: 'Premium',
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
          name: 'Custom Software Development',
          description: 'Develop tailored software applications for desktop or cloud – for instance, a custom CRM system, a desktop tool for automating internal workflows, or a cross-platform application. Businesses may need custom software to handle specific operations (beyond off-the-shelf solutions), while individuals might commission a custom tool for a unique personal need or as a product to sell. Lopes2Tech\'s background in creating tools for macOS and iOS devices is a strength here. This service is profitable because custom builds often entail substantial projects, and beneficial as clients get software precisely fitting their requirements.',
          ctaService: 'custom-software-development',
          tiers: [
            {
              name: 'Budget',
              chfHourly: '~CHF 90/hour',
              eurHourly: '~€40/hour',
              chfProject: 'CHF 5,000 for a simple tool or plug-in (e.g. a small macOS utility)',
              eurProject: '€2,500 for a simple tool or utility',
              chfRetainer: 'CHF 800/month for short-term enhancements/support',
              eurRetainer: '€300/month for short-term enhancements/support'
            },
            {
              name: 'Mid-Range',
              isPopular: true,
              chfHourly: '~CHF 140/hour',
              eurHourly: '~€60/hour',
              chfProject: '~CHF 20,000 for a mid-size software project (e.g. a custom database or a cross-platform app with moderate complexity)',
              eurProject: '~€10,000 for a mid-size software project',
              chfRetainer: 'CHF 1,500/month for ongoing support and version updates',
              eurRetainer: '€700/month for ongoing support and updates'
            },
            {
              name: 'Premium',
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
          name: 'System Integration & API Development',
          description: 'Connect disparate systems and develop custom APIs. Many businesses use multiple software systems (CRM, ERP, e-commerce, etc.) that need to talk to each other; this service provides custom integration solutions or API endpoints to enable smooth data flow. Individuals with smart home setups or multiple apps might also seek custom integrations (for example, connecting a home database to a web service). It\'s profitable due to the specialized technical skills required, and beneficial as it eliminates manual data transfer and ensures consistency across platforms.',
          ctaService: 'system-integration-api',
          tiers: [
            {
              name: 'Budget',
              chfHourly: '~CHF 100/hour',
              eurHourly: '~€45/hour',
              chfProject: 'CHF 3,000 for a basic integration or API script (e.g. connecting two services with existing APIs)',
              eurProject: '€1,500 for a basic integration script',
              chfRetainer: 'CHF 500/month for monitoring & minor tweaks',
              eurRetainer: '€200/month for monitoring & minor tweaks'
            },
            {
              name: 'Mid-Range',
              isPopular: true,
              chfHourly: '~CHF 150/hour',
              eurHourly: '~€70/hour',
              chfProject: '~CHF 10,000 for a multi-system integration or custom API development (e.g. linking CRM with website and database)',
              eurProject: '~€4,000 for a multi-system integration or API',
              chfRetainer: 'CHF 1,000/month for ongoing management (updates as systems change)',
              eurRetainer: '€500/month for ongoing management and updates'
            },
            {
              name: 'Premium',
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

  constructor(private router: Router) {}

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
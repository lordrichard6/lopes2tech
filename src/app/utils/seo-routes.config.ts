import { SEOData } from '../services/seo.service';

/**
 * SEO configuration for each route
 * Used by route guards or resolvers to update meta tags
 */
export const SEO_ROUTES_CONFIG: Record<string, SEOData> = {
  '': {
    title: 'Swiss IT Solutions & Automation | Zurich',
    description: 'Transform your business with Swiss precision IT solutions. 8+ years automating processes, building web apps & custom software in Zurich. Free consultation: +41 78 798 95 33',
    keywords: 'IT solutions Switzerland, process automation, web development, app development, custom software, business automation, Zurich, Swiss IT services, lopes2tech',
    url: 'https://lopes2tech.ch/',
    type: 'website'
  },
  'services': {
    title: 'Our Services | Mobile, Web & AI Solutions',
    description: 'Explore our comprehensive IT services including Mobile App Development (iOS/Android), AI Consulting, and Custom Software Engineering.',
    keywords: 'mobile app development, detailed services, AI consulting, web development, lopes2tech services',
    url: 'https://lopes2tech.ch/services',
    type: 'website'
  },
  'pricing': {
    title: 'Pricing & Plans | lopes2tech',
    description: 'Transparent pricing for IT solutions and automation services in Switzerland. Custom quotes available. Get started with a free consultation.',
    keywords: 'IT services pricing, automation pricing, web development cost, app development price, Switzerland IT rates',
    url: 'https://lopes2tech.ch/pricing',
    type: 'website'
  },
  'support-theraflow': {
    title: 'Support TheraFlow | Invest & Donate',
    description: 'Support TheraFlow development through investment or donations. Help bring this therapist-focused CRM to more practitioners worldwide.',
    keywords: 'TheraFlow support, therapist CRM, invest in software, donate to software, healthcare technology',
    url: 'https://lopes2tech.ch/support-theraflow',
    type: 'website'
  },
  'ai-solutions': {
    title: 'AI Solutions & Automation Services | lopes2tech',
    description: 'Fast AI automations that solve admin, lead capture, and follow-ups. Fixed scope, one-week delivery. Lead capture, booking automation, chatbots, and more.',
    keywords: 'AI automation, business automation, lead capture automation, chatbot, AI solutions Switzerland, workflow automation, n8n, Make.com',
    url: 'https://lopes2tech.ch/ai-solutions',
    type: 'website'
  },
  'impressum': {
    title: 'Legal Notice | Impressum | lopes2tech',
    description: 'Legal notice and company information for lopes2tech - Swiss IT solutions and automation services.',
    keywords: 'impressum, legal notice, lopes2tech legal',
    url: 'https://lopes2tech.ch/impressum',
    type: 'website'
  },
  'privacy': {
    title: 'Privacy Policy | Data Protection | lopes2tech',
    description: 'Learn how lopes2tech processes and protects personal data according to the Swiss nDSG (FADP) and, where applicable, the GDPR. Transparent privacy practices for Swiss service businesses.',
    keywords: 'privacy policy, data protection, nDSG, FADP, GDPR, lopes2tech, Switzerland',
    url: 'https://lopes2tech.ch/privacy',
    type: 'website'
  },
  'terms': {
    title: 'Terms & Conditions | lopes2tech',
    description: 'General terms and conditions (AGB) for lopes2tech. Scope, services, pricing, liability, AI-specific provisions, and data protection for Swiss service businesses.',
    keywords: 'terms and conditions, AGB, lopes2tech terms, Swiss contract terms, AI services terms',
    url: 'https://lopes2tech.ch/terms',
    type: 'website'
  },
  'client-portal/login': {
    title: 'Client Portal Login | lopes2tech',
    description: 'Secure login for lopes2tech clients to access project dashboards, upload documents, and manage their account.',
    keywords: 'client portal login, customer login, document upload portal, lopes2tech client area',
    url: 'https://lopes2tech.ch/client-portal/login',
    type: 'website'
  }
};

/**
 * Get SEO data for a route
 */
export function getSEOForRoute(route: string): SEOData | undefined {
  // Remove leading slash if present
  const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
  return SEO_ROUTES_CONFIG[cleanRoute] || SEO_ROUTES_CONFIG[''];
}


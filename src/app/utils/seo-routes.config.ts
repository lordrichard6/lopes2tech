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


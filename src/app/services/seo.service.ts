import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { APP_CONSTANTS } from '../config/constants';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'business';
  locale?: string;
  siteName?: string;
  author?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private readonly isBrowser: boolean;
  private readonly defaultImage = 'https://lopes2tech.ch/favicon-512x512.png';
  private readonly defaultSiteName = APP_CONSTANTS.BUSINESS.COMPANY_NAME;
  private readonly defaultUrl = 'https://lopes2tech.ch';

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Update SEO meta tags for a page
   */
  updateSEO(data: SEOData): void {
    if (!this.isBrowser) return;

    const {
      title,
      description,
      keywords,
      image = this.defaultImage,
      url = this.defaultUrl,
      type = 'website',
      locale = 'en_US',
      siteName = this.defaultSiteName,
      author = APP_CONSTANTS.BUSINESS.OWNER_NAME
    } = data;

    // Update title
    if (title) {
      const fullTitle = `${title} | ${this.defaultSiteName}`;
      this.title.setTitle(fullTitle);
      
      // Update meta title
      this.updateOrCreateNameMeta('title', fullTitle);
    }

    // Update description
    if (description) {
      this.updateOrCreateNameMeta('description', description);
    }

    // Update keywords
    if (keywords) {
      this.updateOrCreateNameMeta('keywords', keywords);
    }

    // Update Open Graph tags
    this.updateOrCreateMeta('property', 'og:title', title || this.title.getTitle());
    this.updateOrCreateMeta('property', 'og:description', description || '');
    this.updateOrCreateMeta('property', 'og:image', image);
    this.updateOrCreateMeta('property', 'og:url', url);
    this.updateOrCreateMeta('property', 'og:type', type);
    this.updateOrCreateMeta('property', 'og:site_name', siteName);
    this.updateOrCreateMeta('property', 'og:locale', locale);

    // Update Twitter Card tags
    this.updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    this.updateOrCreateMeta('name', 'twitter:title', title || this.title.getTitle());
    this.updateOrCreateMeta('name', 'twitter:description', description || '');
    this.updateOrCreateMeta('name', 'twitter:image', image);

    // Update canonical URL
    this.updateOrCreateCanonical(url);

    // Update author
    if (author) {
      this.updateOrCreateNameMeta('author', author);
    }
  }

  /**
   * Update page title only
   */
  updateTitle(title: string): void {
    if (!this.isBrowser) return;
    
    const fullTitle = `${title} | ${this.defaultSiteName}`;
    this.title.setTitle(fullTitle);
    this.updateOrCreateMeta('property', 'og:title', fullTitle);
    this.updateOrCreateMeta('name', 'twitter:title', fullTitle);
  }

  /**
   * Update meta description only
   */
  updateDescription(description: string): void {
    if (!this.isBrowser) return;
    
    this.updateOrCreateNameMeta('description', description);
    this.updateOrCreateMeta('property', 'og:description', description);
    this.updateOrCreateMeta('name', 'twitter:description', description);
  }

  /**
   * Update canonical URL
   */
  updateCanonicalUrl(url: string): void {
    if (!this.isBrowser) return;
    this.updateOrCreateCanonical(url);
  }

  /**
   * Add or update structured data (JSON-LD)
   */
  addStructuredData(data: any): void {
    if (!this.isBrowser) return;

    // Remove existing script if it exists
    const existingScript = document.querySelector('script[data-seo="structured-data"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script tag
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'structured-data');
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /**
   * Helper to update or create meta tag
   */
  private updateOrCreateMeta(attr: string, name: string, content: string): void {
    const selector = attr === 'property' 
      ? `property="${name}"` 
      : `name="${name}"`;
    
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({ [attr]: name, content });
    } else {
      this.meta.addTag({ [attr]: name, content });
    }
  }

  /**
   * Helper for simple name-based meta tags
   */
  private updateOrCreateNameMeta(name: string, content: string): void {
    if (this.meta.getTag(`name="${name}"`)) {
      this.meta.updateTag({ name, content });
    } else {
      this.meta.addTag({ name, content });
    }
  }

  /**
   * Update or create canonical link
   */
  private updateOrCreateCanonical(url: string): void {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (canonical) {
      canonical.href = url;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = url;
      document.head.appendChild(canonical);
    }
  }

  /**
   * Get current page title
   */
  getTitle(): string {
    return this.title.getTitle();
  }

  /**
   * Reset to default SEO values
   */
  resetToDefaults(): void {
    this.updateSEO({
      title: 'Swiss IT Solutions & Automation | Zurich',
      description: 'Transform your business with Swiss precision IT solutions. 10+ years automating processes, building web apps & custom software in Zurich. Free consultation: +41 78 798 95 33',
      keywords: 'IT solutions Switzerland, process automation, web development, app development, custom software, business automation, Zurich, Swiss IT services, lopes2tech',
      url: this.defaultUrl,
      image: this.defaultImage
    });
  }
}


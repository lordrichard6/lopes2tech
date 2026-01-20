import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';
import { Subscription } from 'rxjs';

type DialogServiceKey = 'branding' | 'websites' | 'hosting' | 'support' | 'automation' | 'ai_addons' | 'custom_apps' | 'marketing';

interface ServiceCardConfig {
  translationKey: DialogServiceKey;
  image: string;
  navigateTo?: string[];
}

@Component({
  selector: 'app-servicesv2',
  standalone: true,
  imports: [TranslatePipe, ServiceDialogComponent, RouterModule, CommonModule],
  templateUrl: './servicesv2.component.html',
  styleUrl: './servicesv2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesV2Component implements AfterViewInit, OnDestroy {
  @Input() isSummary = false;
  isDialogOpen = false;
  selectedServiceKey: string = '';
  selectedServiceImage: string = ''; // We might not use this for icons, or map it.
  private readonly isBrowser: boolean;
  private intersectionObserver?: IntersectionObserver;
  private cardChangesSub?: Subscription;
  private readonly triggeredElements = new WeakSet<Element>();

  @ViewChildren('serviceCard', { read: ElementRef }) private serviceCardRefs!: QueryList<ElementRef<HTMLButtonElement>>;

  readonly serviceCategories = [
    {
      key: 'mobile',
      icon: 'fas fa-mobile-alt',
      items: [
        { key: 'android', icon: 'fab fa-android', dialogKey: 'custom_apps' },
        { key: 'ios', icon: 'fab fa-apple', dialogKey: 'custom_apps' },
        { key: 'react_native', icon: 'fab fa-react', dialogKey: 'custom_apps' },

        { key: 'iot_app', icon: 'fas fa-wifi', dialogKey: 'custom_apps' }
      ]
    },
    {
      key: 'web',
      icon: 'fas fa-laptop-code',
      items: [
        { key: 'nextjs', icon: 'fas fa-layer-group', dialogKey: 'websites' },
        { key: 'react', icon: 'fab fa-react', dialogKey: 'websites' },
        { key: 'angular', icon: 'fab fa-angular', dialogKey: 'websites' },

      ]
    },
    {
      key: 'ai',
      icon: 'fas fa-brain',
      items: [
        { key: 'ai_consulting', icon: 'fas fa-lightbulb', dialogKey: 'ai_addons' },
        { key: 'knowledge_base', icon: 'fas fa-book-reader', dialogKey: 'ai_addons' },
        { key: 'intelligent_assistants', icon: 'fas fa-magic', dialogKey: 'ai_addons' },
        { key: 'ai_apps', icon: 'fas fa-robot', dialogKey: 'ai_addons' },
        { key: 'voice_agents', icon: 'fas fa-microphone-alt', dialogKey: 'ai_addons' },
        { key: 'workflow_automation', icon: 'fas fa-project-diagram', dialogKey: 'automation' }
      ]
    },
    {
      key: 'ecommerce',
      icon: 'fas fa-shopping-cart',
      items: [
        { key: 'custom_ecommerce', icon: 'fas fa-code-branch', dialogKey: 'websites' },
        { key: 'headless_commerce', icon: 'fas fa-server', dialogKey: 'websites' }
      ]
    },
    {
      key: 'marketing',
      icon: 'fas fa-bullhorn',
      items: [
        { key: 'digital_marketing', icon: 'fas fa-ad', dialogKey: 'marketing' },
        { key: 'programmatic_seo', icon: 'fas fa-search-plus', dialogKey: 'marketing' }
      ]
    },
    {
      key: 'software',
      icon: 'fas fa-code',
      items: [
        { key: 'enterprise_apps', icon: 'fas fa-building', dialogKey: 'custom_apps' },
        { key: 'saas_platform', icon: 'fas fa-cloud', dialogKey: 'custom_apps' },
        { key: 'internal_tools', icon: 'fas fa-tools', dialogKey: 'custom_apps' }
      ]
    },
    {
      key: 'design',
      icon: 'fas fa-paint-brush',
      items: [
        { key: 'product_design', icon: 'fas fa-pencil-ruler', dialogKey: 'branding' },
        { key: 'brand_identity', icon: 'fas fa-fingerprint', dialogKey: 'branding' },
        { key: 'design_systems', icon: 'fas fa-cubes', dialogKey: 'branding' }
      ]
    },
    {
      key: 'other',
      icon: 'fas fa-plus-circle',
      items: [
        { key: 'cloud_devops', icon: 'fas fa-server', dialogKey: 'support' },
        { key: 'api_integration', icon: 'fas fa-network-wired', dialogKey: 'support' },
        { key: 'tech_audits', icon: 'fas fa-clipboard-check', dialogKey: 'support' },
        { key: 'managed_support', icon: 'fas fa-hands-helping', dialogKey: 'support' }
      ]
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private readonly hostRef: ElementRef<HTMLElement>,
    private readonly router: Router,
    private readonly renderer: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  handleServiceSelection(item: any): void {
    // If no dialog Key, maybe just return or show a construction message
    if (!item.dialogKey) return;

    // Use the specific item key (e.g. 'nextjs') for the content
    this.selectedServiceKey = item.key;

    // Use the legacy dialogKey (e.g. 'websites') for the image
    this.selectedServiceImage = this.getLegacyImage(item.dialogKey);
    this.isDialogOpen = true;
  }

  private getLegacyImage(key: string): string {
    const images: Record<string, string> = {
      branding: '/assets/services/branding_identity.png',
      websites: '/assets/services/websites.png',
      hosting: '/assets/services/hosting_domain.png',
      support: '/assets/services/support_plans.png',
      automation: '/assets/services/business_automation.png',
      ai_addons: '/assets/services/ai_addons.png',
      custom_apps: '/assets/services/custom_web_apps.png',
      marketing: '/assets/services/marketing_lead_gen.png'
    };
    return images[key] || '';
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver(): void {
    this.renderer.addClass(this.hostRef.nativeElement, 'js-enabled');

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            this.renderer.addClass(element, 'is-visible');
            this.triggeredElements.add(element);
            this.intersectionObserver?.unobserve(element);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    const observeCards = (refs: QueryList<ElementRef<HTMLButtonElement>>) => {
      refs.forEach((ref) => {
        const element = ref.nativeElement;
        if (!this.triggeredElements.has(element)) {
          this.renderer.removeClass(element, 'is-visible');
          this.intersectionObserver?.observe(element);
        }
      });
    };

    observeCards(this.serviceCardRefs);

    this.cardChangesSub = this.serviceCardRefs.changes.subscribe((refs) => observeCards(refs));
  }

  closeServiceDialog(): void {
    this.isDialogOpen = false;
    this.selectedServiceKey = '';
  }

  openCalBooking(): void {
    if (this.isBrowser) {
      window.open('https://cal.com/lopes2tech/initial-consult', '_blank', 'noopener,noreferrer');
    }
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }

    this.intersectionObserver?.disconnect();
    this.cardChangesSub?.unsubscribe();
  }
}
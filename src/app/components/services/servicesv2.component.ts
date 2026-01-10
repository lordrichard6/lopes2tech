import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';
import { isPlatformBrowser } from '@angular/common';
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
  imports: [TranslatePipe, ServiceDialogComponent],
  templateUrl: './servicesv2.component.html',
  styleUrl: './servicesv2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesV2Component implements AfterViewInit, OnDestroy {
  isDialogOpen = false;
  selectedServiceKey: string = '';
  selectedServiceImage: string = '';
  private readonly isBrowser: boolean;
  private intersectionObserver?: IntersectionObserver;
  private cardChangesSub?: Subscription;
  private readonly triggeredElements = new WeakSet<Element>();

  @ViewChildren('serviceCard', { read: ElementRef }) private serviceCardRefs!: QueryList<ElementRef<HTMLButtonElement>>;

  readonly serviceCards: ServiceCardConfig[] = [
    {
      translationKey: 'branding',
      image: '/assets/services/branding_identity.png'
    },
    {
      translationKey: 'websites',
      image: '/assets/services/websites.png'
    },
    {
      translationKey: 'hosting',
      image: '/assets/services/hosting_domain.png'
    },
    {
      translationKey: 'support',
      image: '/assets/services/support_plans.png'
    },
    {
      translationKey: 'automation',
      image: '/assets/services/business_automation.png'
    },
    {
      translationKey: 'ai_addons',
      image: '/assets/services/ai_addons.png'
    },
    {
      translationKey: 'custom_apps',
      image: '/assets/services/custom_web_apps.png'
    },
    {
      translationKey: 'marketing',
      image: '/assets/services/marketing_lead_gen.png'
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

  handleServiceSelection(card: ServiceCardConfig): void {
    if (card.navigateTo) {
      this.router.navigate(card.navigateTo);
      return;
    }

    this.selectedServiceKey = card.translationKey;
    this.selectedServiceImage = card.image;
    this.isDialogOpen = true;
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
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
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
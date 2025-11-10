import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

type DialogServiceKey = 'ai' | 'web' | 'software';

interface ServiceCardConfig {
  translationKey: 'ai' | 'websites' | 'software';
  dialogKey?: DialogServiceKey;
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
  selectedServiceKey: DialogServiceKey | '' = '';
  private readonly isBrowser: boolean;
  private intersectionObserver?: IntersectionObserver;
  private cardChangesSub?: Subscription;
  private readonly triggeredElements = new WeakSet<Element>();

  @ViewChildren('serviceCard', { read: ElementRef }) private serviceCardRefs!: QueryList<ElementRef<HTMLButtonElement>>;

  readonly serviceCards: ServiceCardConfig[] = [
    {
      translationKey: 'ai',
      dialogKey: 'ai',
      image: '/serv_ai.png',
      navigateTo: ['/ai-solutions']
    },
    {
      translationKey: 'websites',
      dialogKey: 'web',
      image: '/serv_web.png'
    },
    {
      translationKey: 'software',
      dialogKey: 'software',
      image: '/serv_soft.png'
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
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

    if (card.dialogKey) {
      this.selectedServiceKey = card.dialogKey;
      this.isDialogOpen = true;
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

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

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }

    this.intersectionObserver?.disconnect();
    this.cardChangesSub?.unsubscribe();
  }
}
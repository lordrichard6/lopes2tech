import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { BusinessInfoService, BusinessInfo } from '../../services/business-info';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MeetingSectionComponent } from '../meeting-section/meeting-section';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [TranslatePipe, MeetingSectionComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Contact implements AfterViewInit, OnDestroy {
  readonly businessInfo: BusinessInfo;
  private readonly isBrowser: boolean;
  private intersectionObserver?: IntersectionObserver;
  private readonly triggeredElements = new WeakSet<Element>();

  @ViewChildren('revealItem', { read: ElementRef }) private revealItems!: QueryList<ElementRef<HTMLElement>>;

  constructor(
    private businessInfoService: BusinessInfoService,
    @Inject(PLATFORM_ID) platformId: Object,
    private readonly renderer: Renderer2
  ) {
    this.businessInfo = this.businessInfoService.getBusinessInfo();
    this.isBrowser = isPlatformBrowser(platformId);
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

    this.revealItems.forEach((item) => {
      const element = item.nativeElement;
      if (!this.triggeredElements.has(element)) {
        this.renderer.removeClass(element, 'is-visible');
        this.intersectionObserver?.observe(element);
      }
    });
  }

  getPhoneLink(): string {
    return `tel:+41${this.businessInfo.phone.replace(/\s+/g, '')}`;
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }

    this.intersectionObserver?.disconnect();
  }
}

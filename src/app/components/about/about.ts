import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class About implements AfterViewInit, OnDestroy {
  readonly features = [
    { icon: 'fas fa-mountain', translationKey: 'about.features.swiss' },
    { icon: 'fas fa-rocket', translationKey: 'about.features.technology' },
    { icon: 'fas fa-handshake', translationKey: 'about.features.service' },
    { icon: 'fas fa-check-circle', translationKey: 'about.features.delivery' }
  ];

  private readonly isBrowser: boolean;
  private intersectionObserver?: IntersectionObserver;
  private readonly triggeredElements = new WeakSet<Element>();

  @ViewChildren('revealItem', { read: ElementRef }) private revealItems!: QueryList<ElementRef<HTMLElement>>;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private readonly renderer: Renderer2) {
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

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }

    this.intersectionObserver?.disconnect();
  }
}

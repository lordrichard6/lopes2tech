import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ProjectDialogComponent, ProjectData } from './project-dialog/project-dialog.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [TranslatePipe, ProjectDialogComponent],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Portfolio implements AfterViewInit, OnDestroy {
  private readonly isBrowser: boolean;
  private intersectionObserver?: IntersectionObserver;
  private readonly triggeredElements = new WeakSet<Element>();

  isDialogOpen = false;
  currentProject: ProjectData | null = null;

  @ViewChildren('revealItem', { read: ElementRef }) private revealItems!: QueryList<ElementRef<HTMLElement>>;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef
  ) {
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

  openProjectDialog(project: ProjectData): void {
    this.currentProject = project;
    this.isDialogOpen = true;
    this.cdr.markForCheck(); // Ensure UI updates
  }

  closeProjectDialog(): void {
    this.isDialogOpen = false;
    this.currentProject = null;
    this.cdr.markForCheck(); // Ensure UI updates
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }

    this.intersectionObserver?.disconnect();
  }
}

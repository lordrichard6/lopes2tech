import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ProjectDialogComponent, ProjectData } from './project-dialog/project-dialog.component';
import { isPlatformBrowser } from '@angular/common';

export interface Project extends ProjectData {
  type: 'web-app' | 'website';
  isInDevelopment?: boolean;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ProjectDialogComponent],
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
  activeFilter: 'web-app' | 'website' = 'website';

  projects: Project[] = [
    // Web Apps
    {
      titleKey: 'DraftMode CRM',
      descKey: 'Modern CRM platform designed for consultants and small to medium companies. Real answers, streamlined workflows.',
      image: '/proj/draftmode_mockup.png',
      category: 'CRM for Consultants',
      type: 'web-app',
      isInDevelopment: true
    },
    {
      titleKey: 'portfolio.pali.title',
      descKey: 'portfolio.pali.description',
      image: '/proj/pali_mockup.png',
      category: 'AI Application',
      type: 'web-app',
      isInDevelopment: true
    },
    {
      titleKey: 'portfolio.theraflow.title',
      descKey: 'portfolio.theraflow.description',
      image: '/proj/theraflow_mockup.png',
      category: 'HealthTech SaaS',
      type: 'web-app',
      link: 'https://www.theraflow-crm.ch/'
    },
    {
      titleKey: 'portfolio.finito.title',
      descKey: 'portfolio.finito.description',
      image: '/proj/finito_mockup.png',
      category: 'SaaS for Craftsmen',
      type: 'web-app',
      link: 'https://www.finitopro.ch/'
    },
    {
      titleKey: 'portfolio.noff.title',
      descKey: 'portfolio.noff.description',
      image: '/proj/noff_mockup.png',
      category: 'Digital Business Card',
      type: 'web-app',
      link: 'https://noff.ch/'
    },
    // Websites
    {
      titleKey: 'portfolio.costeleta.title',
      descKey: 'portfolio.costeleta.description',
      image: '/proj/costeleta_mockup.png',
      category: 'Gastronomy & Reservations',
      type: 'website',
      link: 'https://costeleta-dourada.vercel.app/'
    },
    {
      titleKey: 'portfolio.forma.title',
      descKey: 'portfolio.forma.description',
      image: '/proj/forma_mockup.png',
      category: 'Architecture & Design',
      type: 'website',
      link: 'https://forma-architects-fawn.vercel.app/'
    },
    {
      titleKey: 'portfolio.ribeiro.title',
      descKey: 'portfolio.ribeiro.description',
      image: '/proj/ribeiro_mockup.png',
      category: 'Business Consulting',
      type: 'website',
      link: 'https://ribeiroconsulting.ch/pt'
    },
    {
      titleKey: 'portfolio.alentseguros.title',
      descKey: 'portfolio.alentseguros.description',
      image: '/proj/alentseguros_mockup.png',
      category: 'Insurance & FinTech',
      type: 'website',
      link: 'https://alenteseguros.vercel.app/'
    },
    {
      titleKey: 'portfolio.silvio.title',
      descKey: 'portfolio.silvio.description',
      image: '/proj/silvio_mockup.png',
      category: 'Photography Portfolio',
      type: 'website',
      link: 'https://silvio-photo.vercel.app/'
    },
    {
      titleKey: 'portfolio.apex.title',
      descKey: 'portfolio.apex.description',
      image: '/proj/apex_consulting_mockup.png',
      category: 'Business Consulting',
      type: 'website',
      link: 'https://apex-consulting-iota.vercel.app/'
    },
    {
      titleKey: 'portfolio.nexus.title',
      descKey: 'portfolio.nexus.description',
      image: '/proj/nexus_accounting_mockup.png',
      category: 'Accounting & Finance',
      type: 'website',
      link: 'https://nexus-accounting-ten.vercel.app/'
    }
  ];

  @ViewChildren('revealItem', { read: ElementRef }) private revealItems!: QueryList<ElementRef<HTMLElement>>;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get filteredProjects(): Project[] {
    return this.projects.filter(p => p.type === this.activeFilter);
  }

  setFilter(filter: 'web-app' | 'website'): void {
    this.activeFilter = filter;
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

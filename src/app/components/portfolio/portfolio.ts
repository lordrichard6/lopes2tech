import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ProjectDialogComponent, ProjectData } from './project-dialog/project-dialog.component';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Project extends ProjectData {
  type: 'web-app' | 'website';
  isInDevelopment?: boolean;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ProjectDialogComponent, RouterModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Portfolio {
  isDialogOpen = false;
  currentProject: ProjectData | null = null;

  // Show all projects in carousel, or a curated subset
  projects: Project[] = [
    {
      titleKey: 'portfolio.mimesa.title',
      descKey: 'portfolio.mimesa.description',
      image: '/proj/mimesa_mockup.png',
      category: 'Gastronomy',
      type: 'web-app',
      link: 'https://website-mimesa.vercel.app/',
      isInDevelopment: true
    },
    {
      titleKey: 'DraftMode CRM',
      descKey: 'Modern CRM platform.',
      image: '/proj/draftmode_mockup.png',
      category: 'SaaS',
      type: 'web-app',
      isInDevelopment: true
    },
    {
      titleKey: 'portfolio.orbitcrm.title',
      descKey: 'portfolio.orbitcrm.description',
      image: '/proj/orbitcrm_mockup.png',
      category: 'CRM',
      type: 'web-app',
      link: 'https://orbitcrm-gilt.vercel.app/',
      isInDevelopment: true
    },
    {
      titleKey: 'portfolio.theraflow.title',
      descKey: 'portfolio.theraflow.description',
      image: '/proj/theraflow_mockup.png',
      category: 'SaaS',
      type: 'web-app',
      link: 'https://theraflow.lopes2.tech'
    },
    {
      titleKey: 'portfolio.finito.title',
      descKey: 'portfolio.finito.description',
      image: '/proj/finito_mockup.png',
      category: 'Management',
      type: 'web-app',
      link: 'https://finito.lopes2.tech'
    },
    {
      titleKey: 'portfolio.noff.title',
      descKey: 'portfolio.noff.description',
      image: '/proj/noff_mockup.png',
      category: 'HR Tech',
      type: 'web-app',
      link: 'https://noff.ch'
    },
    {
      titleKey: 'portfolio.pali.title',
      descKey: 'portfolio.pali.description',
      image: '/proj/pali_mockup.png',
      category: 'AI',
      type: 'web-app'
    },
    {
      titleKey: 'portfolio.ribeiro.title',
      descKey: 'portfolio.ribeiro.description',
      image: '/proj/ribeiro_mockup.png',
      category: 'Consulting',
      type: 'website',
      link: 'https://ribeiroconsulting.ch/pt'
    },
    {
      titleKey: 'portfolio.costeleta.title',
      descKey: 'portfolio.costeleta.description',
      image: '/proj/costeleta_mockup.png',
      category: 'Restaurant',
      type: 'website',
      link: 'https://costeleta-dourada.vercel.app/'
    },
    {
      titleKey: 'portfolio.forma.title',
      descKey: 'portfolio.forma.description',
      image: '/proj/forma_mockup.png',
      category: 'Architecture',
      type: 'website',
      link: 'https://forma-architects-fawn.vercel.app/'
    },
    {
      titleKey: 'portfolio.alentseguros.title',
      descKey: 'portfolio.alentseguros.description',
      image: '/proj/alentseguros_mockup.png',
      category: 'Insurance',
      type: 'website',
      link: 'https://alentseguros.pt'
    },
    {
      titleKey: 'portfolio.silvio.title',
      descKey: 'portfolio.silvio.description',
      image: '/proj/silvio_mockup.png',
      category: 'Photography',
      type: 'website',
      link: 'https://silviophotography.com'
    },
    {
      titleKey: 'portfolio.apex.title',
      descKey: 'portfolio.apex.description',
      image: '/proj/apex_consulting_mockup.png',
      category: 'Consulting',
      type: 'website'
    },
    {
      titleKey: 'portfolio.nexus.title',
      descKey: 'portfolio.nexus.description',
      image: '/proj/nexus_accounting_mockup.png',
      category: 'Accounting',
      type: 'website'
    }
  ];

  get webAppProjects(): Project[] {
    return this.projects.filter(p => p.type === 'web-app');
  }

  get websiteProjects(): Project[] {
    return this.projects.filter(p => p.type === 'website');
  }

  constructor(private readonly cdr: ChangeDetectorRef) { }

  openProjectDialog(project: ProjectData): void {
    this.currentProject = project;
    this.isDialogOpen = true;
    this.cdr.markForCheck();
  }

  closeProjectDialog(): void {
    this.isDialogOpen = false;
    this.currentProject = null;
    this.cdr.markForCheck();
  }
}

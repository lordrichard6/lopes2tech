import { Component, Inject, PLATFORM_ID, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { isPlatformBrowser } from '@angular/common';
import { CountUpDirective } from 'ngx-countup';
import { CountUpOptions } from 'countup.js';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslatePipe, CountUpDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements AfterViewInit {
  readonly features = [
    { icon: 'fas fa-mountain', translationKey: 'about.features.swiss' },
    { icon: 'fas fa-rocket', translationKey: 'about.features.technology' },
    { icon: 'fas fa-handshake', translationKey: 'about.features.service' },
    { icon: 'fas fa-check-circle', translationKey: 'about.features.delivery' }
  ];

  readonly skills = [
    { name: 'Angular', icon: 'fab fa-angular' },
    { name: 'Next.js', icon: 'fas fa-layer-group' },
    { name: 'TypeScript', icon: 'fab fa-js' }, // using js icon as ts generic or search specific
    { name: 'Node.js', icon: 'fab fa-node-js' },
    { name: 'Supabase', icon: 'fas fa-database' },
    { name: 'AI Agents', icon: 'fas fa-robot' },
    { name: 'Three.js', icon: 'fas fa-cube' },
    { name: 'Tailwind', icon: 'fas fa-wind' },
    { name: 'UI/UX', icon: 'fas fa-pen-nib' }
  ];

  countUpOptions: CountUpOptions = {
    enableScrollSpy: true,
    scrollSpyOnce: true,
    duration: 2.5,
    useEasing: true,
  };

  private readonly isBrowser: boolean;

  @ViewChildren('revealItem', { read: ElementRef }) private revealItems!: ElementRef[];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Intersection Observer for the reveal-on-scroll elements (fade up)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    this.revealItems?.forEach((item: any) => {
      observer.observe(item.nativeElement);
    });
  }
}

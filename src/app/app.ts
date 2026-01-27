import { NgIf, isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, inject, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CookieConsentComponent, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnDestroy {
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();
  private readonly minimalRoutes = new Set(['/unsubscribed']);
  private readonly isBrowser: boolean;

  minimalLayout = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Critical Fix: Facebook Link Garbage Removal
    // If the URL contains the Object Replacement Character (encoded or raw), strip it and reload.
    if (this.isBrowser) {
      const href = window.location.href;
      if (href.includes('%EF%BF%BC') || href.includes('\uFFFC')) {
        const newUrl = href.replace(/%EF%BF%BC|\uFFFC/g, '');
        window.location.replace(newUrl);
        return; // Stop further processing
      }
    }

    this.setLayout(this.router.url);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        this.setLayout(event.urlAfterRedirects);
        // Scroll to top on route change
        if (this.isBrowser) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setLayout(url: string): void {
    const cleanUrl = url.split('?')[0];
    this.minimalLayout = this.minimalRoutes.has(cleanUrl);
  }
}

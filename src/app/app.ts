import { NgIf } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
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

  minimalLayout = false;

  constructor() {
    this.setLayout(this.router.url);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        this.setLayout(event.urlAfterRedirects);
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

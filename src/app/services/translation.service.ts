import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import enTranslations from '../../assets/i18n/en.json';
import ptTranslations from '../../assets/i18n/pt.json';
import deTranslations from '../../assets/i18n/de.json';

export interface Translation {
  [key: string]: any;
}

type SupportedLanguage = 'en' | 'pt' | 'de';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly supportedLanguages: SupportedLanguage[] = ['en', 'pt', 'de'];
  private readonly currentLang = new BehaviorSubject<SupportedLanguage>('en');
  private translations: Record<string, Translation> = {
    en: enTranslations as Translation,
    pt: ptTranslations as Translation,
    de: deTranslations as Translation
  };
  private readonly isBrowser: boolean;
  
  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    const savedLang = this.getSavedLanguage();
    const detectedLang = this.detectBrowserLanguage();
    const initialLang = this.resolveLanguage(savedLang ?? detectedLang ?? 'en');

    this.applyLanguage(initialLang, false);

    if (this.isBrowser) {
      void this.fetchTranslation(initialLang).subscribe();
    }
  }

  setLanguage(lang: string): void {
    const resolved = this.resolveLanguage(lang);

    if (resolved === this.currentLang.value) {
      return;
    }

    this.applyLanguage(resolved, true);

    if (this.isBrowser) {
      void this.fetchTranslation(resolved).subscribe();
    }
  }

  getCurrentLanguage(): Observable<SupportedLanguage> {
    return this.currentLang.asObservable();
  }

  getCurrentLanguageValue(): SupportedLanguage {
    return this.currentLang.value;
  }

  translate(key: string, params?: Record<string, any>): Observable<string> {
    return this.currentLang.asObservable().pipe(
      map((lang) => this.interpolate(this.getTranslation(key, lang), params))
    );
  }

  instant(key: string, params?: Record<string, any>): string {
    return this.interpolate(this.getTranslation(key, this.currentLang.value), params);
  }

  private applyLanguage(lang: SupportedLanguage, persist: boolean): void {
    this.currentLang.next(lang);
    this.setDocumentLanguage(lang);

    if (persist) {
      this.saveLanguage(lang);
    }
  }

  private fetchTranslation(lang: SupportedLanguage): Observable<Translation> {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`).pipe(
      tap((translation) => {
        if (translation) {
          this.translations[lang] = translation;
        }
      }),
      catchError(() => of(this.translations[lang] ?? {}))
    );
  }
  
  private detectBrowserLanguage(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    
    const browserLang = navigator.language || (navigator as any).userLanguage;
    
    if (!browserLang) {
      return null;
    }
    
    return browserLang.toLowerCase().split('-')[0] ?? null;
  }
  
  private resolveLanguage(lang: string): SupportedLanguage {
    const normalized = lang?.toLowerCase();

    if (this.supportedLanguages.includes(normalized as SupportedLanguage)) {
      return normalized as SupportedLanguage;
    }

    return 'en';
  }
  
  private getSavedLanguage(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('language');
    }

    return null;
  }
  
  private saveLanguage(lang: SupportedLanguage): void {
    if (this.isBrowser) {
      localStorage.setItem('language', lang);
    }
  }
  
  private setDocumentLanguage(lang: SupportedLanguage): void {
    if (this.isBrowser) {
      document.documentElement.lang = lang;
    }
  }
  
  private getTranslation(key: string, lang: SupportedLanguage): string {
    const segments = key.split('.');

    const localized = this.lookupTranslation(this.translations[lang], segments);
    if (typeof localized === 'string') {
      return localized;
    }

    if (lang !== 'en') {
      const fallback = this.lookupTranslation(this.translations['en'], segments);
      if (typeof fallback === 'string') {
        return fallback;
      }
    }

      return key;
    }
    
  private lookupTranslation(source: Translation | undefined, segments: string[]): unknown {
    return segments.reduce<unknown>((value, segment) => {
      if (value && typeof value === 'object' && segment in (value as Translation)) {
        return (value as Translation)[segment];
      }
      return undefined;
    }, source);
  }
  
  private interpolate(text: string, params?: Record<string, any>): string {
    if (!params) {
      return text;
    }
    
    return text.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param] !== undefined ? params[param] : match;
    });
  }
}

import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private languageSubscription?: Subscription;
  
  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {
    // Subscribe to language changes to trigger updates
    this.languageSubscription = this.translationService.getCurrentLanguage().subscribe(() => {
      this.cdr.markForCheck();
    });
  }
  
  transform(key: string, params?: any): string {
    if (!key) {
      return '';
    }

    // Use the instant method for synchronous translation
    let translation = this.translationService.instant(key);
    
    // Replace parameters if provided
    if (params && typeof params === 'object') {
      Object.keys(params).forEach(param => {
        const placeholder = `{{${param}}}`;
        translation = translation.replace(new RegExp(placeholder, 'g'), params[param]);
      });
    }
    
    return translation;
  }
  
  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}

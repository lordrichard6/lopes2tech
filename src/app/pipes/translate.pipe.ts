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
  
  transform(key: string): string {
    if (!key) {
      return '';
    }

    // Use the instant method for synchronous translation
    return this.translationService.instant(key);
  }
  
  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}

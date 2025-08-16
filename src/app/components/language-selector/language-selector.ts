import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-selector">
      <button class="current-language" 
              (click)="toggleDropdown()"
              [class.active]="isOpen">
        <!-- <span class="flag">{{ currentLanguage.flag }}</span> -->
        <span class="code">{{ currentLanguage.code.toUpperCase() }}</span>
        <i class="fas fa-chevron-down" [class.rotated]="isOpen"></i>
      </button>
      
      <div class="language-dropdown" [class.open]="isOpen">
        <button *ngFor="let lang of languages" 
                class="language-option"
                [class.active]="lang.code === currentLanguage.code"
                (click)="selectLanguage(lang.code)">
          <span class="flag">{{ lang.flag }}</span>
          <span class="name">{{ lang.name }}</span>
        </button>
      </div>
    </div>
    
    <div class="overlay" 
         [class.active]="isOpen" 
         (click)="closeDropdown()"></div>
  `,
  styleUrls: ['./language-selector.scss']
})
export class LanguageSelectorComponent {
  isOpen = false;
  currentLanguage: Language = { code: 'en', name: 'English', flag: '🇬🇧' };
  
  languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];
  
  constructor(private translationService: TranslationService) {
    // Subscribe to current language changes
    this.translationService.getCurrentLanguage().subscribe(lang => {
      this.currentLanguage = this.languages.find(l => l.code === lang) || this.languages[0];
    });
  }
  
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }
  
  closeDropdown(): void {
    this.isOpen = false;
  }
  
  selectLanguage(code: string): void {
    const language = this.languages.find(lang => lang.code === code);
    if (language) {
      this.currentLanguage = language;
      this.translationService.setLanguage(code);
      this.closeDropdown();
    }
  }
}

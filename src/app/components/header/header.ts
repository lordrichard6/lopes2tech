import { ChangeDetectionStrategy, Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router'; // Modified: Added RouterLink, RouterLinkActive
import { LanguageSelectorComponent } from '../language-selector/language-selector';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true, // Added: standalone: true
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslatePipe, LanguageSelectorComponent, NgOptimizedImage], // Modified: Replaced RouterModule with RouterLink, RouterLinkActive, added NgOptimizedImage
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header implements OnInit {
  isMenuOpen = false;
  isScrolled = false;

  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  onWindowScroll() {
    if (this.isBrowser) {
      this.isScrolled = window.pageYOffset > 100;
      if (this.isMenuOpen) {
        this.closeMenu();
      }
    }
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.isScrolled = window.pageYOffset > 100;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}

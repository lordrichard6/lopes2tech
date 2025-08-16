import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit, OnDestroy {
  isMenuOpen = false;
  isScrolled = false;
  isDarkTheme = false; // Default to light theme (original colors)

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.pageYOffset > 100;
    }
  }

  ngOnInit() {
    // Initial scroll check - only in browser
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.pageYOffset > 100;
      
      // Load theme preference from localStorage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkTheme = savedTheme === 'dark';
      }
      
      // Apply theme to document
      this.applyTheme();
    }
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    
    if (isPlatformBrowser(this.platformId)) {
      // Save theme preference
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
      
      // Apply theme
      this.applyTheme();
    }
  }

  private applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const body = document.body;
      if (this.isDarkTheme) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
      } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
      }
    }
  }
}

import { Component, Input, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-service-dialog',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './service-dialog.component.html',
  styleUrl: './service-dialog.component.scss'
})
export class ServiceDialogComponent {
  @Input() isOpen: boolean = false;
  @Input() serviceKey: string = '';
  @Input() serviceImage: string = '';
  @Output() close = new EventEmitter<void>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeDialog();
    }
  }

  closeDialog(): void {
    this.close.emit();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeDialog();
    }
  }

  openBooking(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.open('https://cal.com/lopes2tech/initial-consult', '_blank', 'noopener,noreferrer');
    }
  }
}

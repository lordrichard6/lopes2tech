import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
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
}

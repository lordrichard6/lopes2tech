import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '../../../pipes/translate.pipe';

export interface ProjectData {
    titleKey: string;
    descKey: string;
    image: string;
    category: string;
    link?: string;
}

@Component({
    selector: 'app-project-dialog',
    standalone: true,
    imports: [CommonModule, TranslatePipe],
    templateUrl: './project-dialog.component.html',
    styleUrl: './project-dialog.component.scss'
})
export class ProjectDialogComponent {
    @Input() isOpen: boolean = false;
    @Input() project: ProjectData | null = null;
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

    visitProject(): void {
        if (this.project?.link && isPlatformBrowser(this.platformId)) {
            window.open(this.project.link, '_blank', 'noopener,noreferrer');
        }
    }
}

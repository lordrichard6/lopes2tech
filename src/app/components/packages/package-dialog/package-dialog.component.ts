import { Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { TranslationService } from '../../../services/translation.service';
import { Subscription } from 'rxjs';

export interface PackageData {
    key: string;
    price: string;
    targetKey: string;
    image: string;
    isPopular?: boolean;
}

@Component({
    selector: 'app-package-dialog',
    standalone: true,
    imports: [CommonModule, TranslatePipe],
    templateUrl: './package-dialog.component.html',
    styleUrls: ['./package-dialog.component.scss']
})
export class PackageDialogComponent implements OnChanges, OnInit, OnDestroy {
    @Input() isOpen: boolean = false;
    @Input() package: PackageData | null = null;
    @Output() close = new EventEmitter<void>();

    features: string[] = [];
    private langSub?: Subscription;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private translationService: TranslationService
    ) { }

    ngOnInit(): void {
        this.langSub = this.translationService.getCurrentLanguage().subscribe(() => {
            this.loadFeatures();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['package'] && this.package) {
            this.loadFeatures();
        }
    }

    ngOnDestroy(): void {
        if (this.langSub) {
            this.langSub.unsubscribe();
        }
    }

    loadFeatures(): void {
        if (!this.package) return;

        const key = `packages.items.${this.package.key}.features`;
        // Use getObject from custom TranslationService to retrieve array
        const features = this.translationService.getObject(key);

        if (Array.isArray(features)) {
            this.features = features;
        } else {
            this.features = [];
        }
    }

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

    contactUs(): void {
        this.closeDialog();
        if (isPlatformBrowser(this.platformId)) {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { PackageDialogComponent, PackageData } from './package-dialog/package-dialog.component';

@Component({
    selector: 'app-packages',
    standalone: true,
    imports: [CommonModule, TranslatePipe, PackageDialogComponent, RouterModule],
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.scss']
})
export class PackagesComponent {
    @Input() showBottomWave: boolean = true;
    @Input() isPreview: boolean = false;

    packages: PackageData[] = [
        { key: 'starter', price: '850', targetKey: 'target.starter', image: '/assets/services/packages/starter.png' },
        { key: 'starterPlus', price: '1,400', targetKey: 'target.starterPlus', image: '/assets/services/packages/starter_plus.png', isPopular: true },
        { key: 'businessPro', price: '2,000', targetKey: 'target.businessPro', image: '/assets/services/packages/business_pro.png' },
        { key: 'landingPage', price: '600', targetKey: 'target.landingPage', image: '/assets/services/packages/landing_page.png' },
        { key: 'logoOnly', price: '350', targetKey: 'target.logoOnly', image: '/assets/services/packages/logo_only.png' },
        { key: 'fullBrandKit', price: '650', targetKey: 'target.fullBrandKit', image: '/assets/services/packages/full_brand_kit.png' }
    ];

    get visiblePackages(): PackageData[] {
        if (this.isPreview) {
            // Show only the 3 main packages (Starter, Starter Plus, Business Pro)
            // Or specifically filter for them if the order changes. 
            // Currently they are the first 3.
            return this.packages.slice(0, 3);
        }
        return this.packages;
    }

    isDialogOpen = false;
    selectedPackage: PackageData | null = null;

    openPackageDialog(pkg: PackageData): void {
        this.selectedPackage = pkg;
        this.isDialogOpen = true;
    }

    closePackageDialog(): void {
        this.isDialogOpen = false;
        this.selectedPackage = null;
    }
}

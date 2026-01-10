import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface Package {
    key: string;
    price: string;
    targetKey: string;
    image: string;
    isPopular?: boolean;
}

@Component({
    selector: 'app-packages',
    standalone: true,
    imports: [CommonModule, TranslatePipe],
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.scss']
})
export class PackagesComponent {
    packages: Package[] = [
        { key: 'starter', price: '850', targetKey: 'target.starter', image: '/assets/services/packages/starter.png' },
        { key: 'starterPlus', price: '1,400', targetKey: 'target.starterPlus', image: '/assets/services/packages/starter_plus.png', isPopular: true },
        { key: 'businessPro', price: '2,000', targetKey: 'target.businessPro', image: '/assets/services/packages/business_pro.png' },
        { key: 'landingPage', price: '600', targetKey: 'target.landingPage', image: '/assets/services/packages/landing_page.png' },
        { key: 'logoOnly', price: '350', targetKey: 'target.logoOnly', image: '/assets/services/packages/logo_only.png' },
        { key: 'fullBrandKit', price: '650', targetKey: 'target.fullBrandKit', image: '/assets/services/packages/full_brand_kit.png' }
    ];
}

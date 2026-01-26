import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
    selector: 'app-cta-section',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslatePipe],
    templateUrl: './cta-section.html',
    styleUrl: './cta-section.scss'
})
export class CtaSectionComponent { }

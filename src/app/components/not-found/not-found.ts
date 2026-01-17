import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './not-found.html',
    styleUrls: ['./not-found.scss']
})
export class NotFoundComponent {
    private translate = inject(TranslationService);

    get t() {
        return this.translate.instant.bind(this.translate);
    }
}

import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-services',
  imports: [TranslatePipe],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {
}

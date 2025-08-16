import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {

}

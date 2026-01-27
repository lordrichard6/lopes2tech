import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-unsubscribed',
  standalone: true,
  imports: [TranslatePipe, RouterLink],
  templateUrl: './unsubscribed.html',
  styleUrl: './unsubscribed.scss'
})
export class UnsubscribedComponent {
  constructor() { }
}


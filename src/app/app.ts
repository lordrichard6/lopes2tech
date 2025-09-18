import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CookieConsentComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}

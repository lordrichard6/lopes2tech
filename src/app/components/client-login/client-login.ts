import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-client-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe],
  templateUrl: './client-login.html',
  styleUrls: ['./client-login.scss']
})
export class ClientLoginComponent {
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // TODO: Implement actual authentication logic
    // For now, just simulate a login attempt
    setTimeout(() => {
      this.isLoading = false;
      // This will be replaced with actual authentication
      console.log('Login attempt:', { email: this.email });
    }, 1000);
  }
}


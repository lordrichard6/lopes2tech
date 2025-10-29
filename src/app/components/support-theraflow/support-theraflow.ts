import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface SupportTier {
  id: string;
  amount: number;
  currency: string;
  title: string;
  description: string;
  features: string[];
  popular?: boolean;
  stripeLink?: string;
}

@Component({
  selector: 'app-support-theraflow',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './support-theraflow.html',
  styleUrl: './support-theraflow.scss'
})
export class SupportTheraflowComponent {
  // Live Stripe Payment Link with "Customer chooses price"
  // Configured at: https://dashboard.stripe.com/payment-links
  // Customers can choose any amount they want to donate
  private readonly STRIPE_CUSTOM_LINK = 'https://donate.stripe.com/7sY8wQ8Y2b0ddXXaGK1Nu00';
  
  // Suggested amounts in CHF (these will guide users, but they can enter any amount)
  suggestedAmounts = [10, 25, 50, 100, 250, 500, 1000];
  selectedAmount: number | null = null;

  selectAmount(amount: number): void {
    this.selectedAmount = amount;
  }

  openInvestorForm(): void {
    // Navigate to contact form or open email
    window.location.href = '/#contact';
  }

  supportViaStripe(): void {
    // User can click a suggested amount or the button directly
    // Stripe will allow them to change the amount on the checkout page
    if (this.STRIPE_CUSTOM_LINK.includes('YOUR_CUSTOM_PAYMENT_LINK')) {
      alert('Please configure your Stripe Payment Link first!');
      return;
    }
    
    window.open(this.STRIPE_CUSTOM_LINK, '_blank', 'noopener,noreferrer');
  }
}

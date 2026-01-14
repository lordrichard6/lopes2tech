import { Component } from '@angular/core';

@Component({
    selector: 'app-whatsapp-button',
    standalone: true,
    template: `
    <a href="https://wa.me/41787989533" target="_blank" rel="noopener noreferrer" class="whatsapp-float">
      <i class="fab fa-whatsapp"></i>
    </a>
  `,
    styles: [`
    .whatsapp-float {
      position: fixed;
      width: 60px;
      height: 60px;
      bottom: 2rem;
      right: 2rem;
      background-color: rgba(37, 211, 102, 0.1);
      color: #25d366;
      border: 2px solid #25d366;
      border-radius: 50%;
      text-align: center;
      font-size: 30px;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      text-decoration: none;
      box-shadow: 0 0 10px rgba(37, 211, 102, 0.5), inset 0 0 10px rgba(37, 211, 102, 0.2);
      text-shadow: 0 0 5px rgba(37, 211, 102, 0.8);
      animation: neonPulse 2s infinite;
    }

    .whatsapp-float:hover {
      background-color: rgba(37, 211, 102, 0.2);
      transform: scale(1.1);
      box-shadow: 0 0 20px rgba(37, 211, 102, 0.8), inset 0 0 15px rgba(37, 211, 102, 0.3);
      color: #fff;
      text-shadow: 0 0 10px rgba(37, 211, 102, 1);
      border-color: #25d366;
    }

    @keyframes neonPulse {
      0% {
        box-shadow: 0 0 10px rgba(37, 211, 102, 0.5), inset 0 0 5px rgba(37, 211, 102, 0.2);
      }
      50% {
        box-shadow: 0 0 20px rgba(37, 211, 102, 0.8), 0 0 40px rgba(37, 211, 102, 0.4), inset 0 0 10px rgba(37, 211, 102, 0.3);
      }
      100% {
        box-shadow: 0 0 10px rgba(37, 211, 102, 0.5), inset 0 0 5px rgba(37, 211, 102, 0.2);
      }
    }

    @media (max-width: 768px) {
      .whatsapp-float {
        width: 50px;
        height: 50px;
        bottom: 1rem;
        right: 1rem;
        font-size: 25px;
      }
    }
  `]
})
export class WhatsappButtonComponent { }

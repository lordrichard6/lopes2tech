import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenaiService } from '../../services/openai.service';
import { TranslationService } from '../../services/translation.service';

interface ChatMessage {
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.scss']
})
export class AiChatComponent {
  isOpen = false;
  messages: ChatMessage[] = [];
  currentMessage = '';
  isLoading = false;

  constructor(
    private openaiService: OpenaiService,
    private translationService: TranslationService
  ) {
    // Subscribe to language changes and update welcome message
    this.translationService.getCurrentLanguage().subscribe(lang => {
      this.updateWelcomeMessage(lang);
    });
  }

  private updateWelcomeMessage(language: string): void {
    const welcomeMessages = {
      'en': '👋 Hi there! How can I help you today?',
      'pt': '👋 Olá! Como posso te ajudar hoje?',
      'de': '👋 Hallo! Wie kann ich Ihnen heute helfen?'
    };

    const welcomeMessage = welcomeMessages[language as keyof typeof welcomeMessages] || welcomeMessages['en'];
    
    // If this is the first load or language change, update the welcome message
    if (this.messages.length === 0) {
      this.messages.push({
        sender: 'bot',
        content: welcomeMessage,
        timestamp: new Date()
      });
    } else if (this.messages[0]?.sender === 'bot' && this.messages[0]?.content.includes('👋')) {
      // Update existing welcome message
      this.messages[0].content = welcomeMessage;
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  async sendMessage(): Promise<void> {
    if (!this.currentMessage.trim() || this.isLoading) return;

    const userMessage = this.currentMessage.trim();
    this.currentMessage = '';
    
    // Add user message
    this.messages.push({
      sender: 'user',
      content: userMessage,
      timestamp: new Date()
    });

    this.isLoading = true;

    try {
      // Get AI response from OpenAI (now language-aware)
      const response = await this.openaiService.getChatResponse(userMessage, this.messages);
      
      this.messages.push({
        sender: 'bot',
        content: response,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Language-aware error message
      const currentLang = this.translationService.getCurrentLanguageValue();
      const errorMessages = {
        'en': 'I apologize, but I\'m experiencing technical difficulties. Please contact our team directly for assistance.',
        'pt': 'Peço desculpas, mas estou enfrentando dificuldades técnicas. Por favor, entre em contato com nossa equipe diretamente para obter assistência.',
        'de': 'Entschuldigung, aber ich habe technische Schwierigkeiten. Bitte kontaktieren Sie unser Team direkt für Unterstützung.'
      };
      
      const errorMessage = errorMessages[currentLang as keyof typeof errorMessages] || errorMessages['en'];
      
      this.messages.push({
        sender: 'bot',
        content: errorMessage,
        timestamp: new Date()
      });
    } finally {
      this.isLoading = false;
    }
  }
}
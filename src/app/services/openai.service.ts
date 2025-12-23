import { Injectable } from '@angular/core';
import { TranslationService } from './translation.service';
import { LoggerService } from './logger.service';
import { ConversationHistory } from '../types/chat.types';
import { getFallbackResponse, Language } from '../utils/fallback-responses.util';
import { APP_CONSTANTS } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  constructor(
    private translationService: TranslationService,
    private logger: LoggerService
  ) {}

  async getChatResponse(message: string, conversationHistory: ConversationHistory = []): Promise<string> {
    try {
      // Get current language
      const currentLang = this.translationService.getCurrentLanguageValue() as Language;
      
      // Call our secure API endpoint instead of OpenAI directly.
      // The full system prompt and persona are defined centrally in the backend (api/chat.js)
      // so we don't duplicate or drift prompt logic in the frontend.
      const response = await fetch(APP_CONSTANTS.API.CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          conversationHistory: conversationHistory,
          language: currentLang
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.response || this.getFallbackMessage(currentLang);
      
    } catch (error) {
      this.logger.error('API Error', error, 'OpenaiService');

      // Fallback to predefined responses if API fails
      const currentLang = this.translationService.getCurrentLanguageValue() as Language;
      return getFallbackResponse(message, currentLang);
    }
  }

  private getFallbackMessage(language: Language): string {
    switch (language) {
      case 'pt':
        return 'Peço desculpa, mas estou com dificuldades técnicas neste momento. Por favor, entre em contacto com a nossa equipa directamente para obter assistência.';
      case 'de':
        return 'Entschuldigung, aber ich habe gerade technische Schwierigkeiten. Bitte kontaktieren Sie unser Team direkt für Unterstützung.';
      case 'en':
      default:
        return 'I apologize, but I\'m having trouble processing your request right now. Please contact our team directly for assistance.';
    }
  }
}
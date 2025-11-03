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
      
      // Call our secure API endpoint instead of OpenAI directly
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

  private getSystemPrompt(language: string): string {
    const languageInstructions = this.getLanguageInstructions(language);
    
    return `You are a friendly, casual AI assistant for lopes2tech, a tech company that makes cool stuff:

🤖 What we do:
- AI & Automation: Smart chatbots, workflow automation, data processing
- Web Development: Modern websites, e-commerce, web apps 
- Custom Software: Mobile apps, desktop tools, integrations

🛠️ Tech we love:
Frontend: Angular, React, Vue.js, TypeScript
Backend: Node.js, Python, .NET, PHP  
Databases: PostgreSQL, MongoDB, MySQL
Cloud: AWS, Azure, Google Cloud
AI/ML: OpenAI, TensorFlow, PyTorch

👨‍💻 About the company:
- lopes2tech is run by Paulo, a passionate tech entrepreneur
- It's a solo operation with Paulo as the main developer and business owner
- When bigger projects come up, Paulo brings in trusted collaborators and specialists
- This lean approach means direct communication with the person who actually builds your stuff
- Paulo has years of experience in automation, web development, and custom software solutions
- The company focuses on quality over quantity - personal attention to every project

🏢 Company structure:
- Core team: Just Paulo (owner/developer)
- Extended network: Collaborators brought in for specific expertise when needed
- This means you get personal service and direct access to the person building your solution
- No corporate bureaucracy, just straightforward tech solutions

${languageInstructions}

Your personality:
- Be conversational and friendly, not corporate or stuffy
- Use casual language - contractions, simple words, emojis
- Be enthusiastic about tech and solutions
- Ask follow-up questions to understand needs better
- Make complex tech sound simple and exciting
- Use "we" when talking about the company (Paulo + collaborators when needed)
- Keep responses short and punchy (2-3 sentences max usually)
- Be helpful but not pushy about sales
- When talking about the team, mention it's Paulo-led with collaborators as needed

Examples of your tone:
❌ "We would be delighted to provide you with a comprehensive solution"
✅ "We'd love to build something awesome for you!"

❌ "Our extensive experience enables us to deliver optimal results"  
✅ "Paulo's been doing this for years and knows how to make it work great"

If asked about pricing: Keep it simple - "Pricing depends on what you need, but we're pretty reasonable! Want to chat about your project?"

If asked about the team/owner: "lopes2tech is Paulo's baby - he's the main guy who builds everything. When projects need extra hands, he brings in trusted collaborators. So you get personal service plus expertise!"

Remember: You're like a friendly tech expert at a coffee shop, not a corporate sales rep!`;
  }

  private getLanguageInstructions(language: string): string {
    switch (language) {
      case 'pt':
        return `IMPORTANTE: Responda SEMPRE em português europeu. Use linguagem casual e amigável, mas mantenha o registo mais neutro. Seja natural e descontraído, como um amigo que percebe de tecnologia.`;
      case 'de':
        return `WICHTIG: Antworten Sie IMMER auf Deutsch. Verwenden Sie eine lockere, freundliche Sprache - seien Sie natürlich und entspannt, wie ein technikbegeisterter Freund. Nutzen Sie Umgangssprache und Emojis.`;
      case 'en':
      default:
        return `IMPORTANT: Always respond in English. Use casual, friendly language with contractions and emojis. Be natural and relaxed.`;
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
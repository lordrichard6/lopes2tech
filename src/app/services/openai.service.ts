import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TranslationService } from './translation.service';
import OpenAI from 'openai';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private openai: OpenAI;

  constructor(private translationService: TranslationService) {
    this.openai = new OpenAI({
      apiKey: environment.openai.apiKey,
      dangerouslyAllowBrowser: true // Note: In production, consider using a backend proxy
    });
  }

  async getChatResponse(message: string, conversationHistory: any[] = []): Promise<string> {
    try {
      // Get current language
      const currentLang = this.translationService.getCurrentLanguageValue();
      
      // System prompt with language-specific instructions
      const systemMessage = {
        role: 'system' as const,
        content: this.getSystemPrompt(currentLang)
      };

      // Prepare messages array with system message, conversation history, and current message
      const messages = [
        systemMessage,
        ...conversationHistory.map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        })),
        {
          role: 'user' as const,
          content: message
        }
      ];

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      return completion.choices[0]?.message?.content || this.getFallbackMessage(currentLang);
    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      // Fallback to predefined responses if OpenAI fails
      return this.getFallbackResponse(message);
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
        return `IMPORTANTE: Responda SEMPRE em português europeu. Use linguagem casual e amigável - contrações, gírias leves quando apropriado, emojis. Seja natural e descontraído, como um amigo que entende de tecnologia.`;
      case 'de':
        return `WICHTIG: Antworten Sie IMMER auf Deutsch. Verwenden Sie eine lockere, freundliche Sprache - seien Sie natürlich und entspannt, wie ein technikbegeisterter Freund. Nutzen Sie Umgangssprache und Emojis.`;
      case 'en':
      default:
        return `IMPORTANT: Always respond in English. Use casual, friendly language with contractions and emojis. Be natural and relaxed.`;
    }
  }

  private getFallbackMessage(language: string): string {
    switch (language) {
      case 'pt':
        return 'Desculpe, mas estou com dificuldades técnicas no momento. Por favor, entre em contato com nossa equipe diretamente para obter assistência.';
      case 'de':
        return 'Entschuldigung, aber ich habe gerade technische Schwierigkeiten. Bitte kontaktieren Sie unser Team direkt für Unterstützung.';
      case 'en':
      default:
        return 'I apologize, but I\'m having trouble processing your request right now. Please contact our team directly for assistance.';
    }
  }

  private getFallbackResponse(message: string): string {
    const currentLang = this.translationService.getCurrentLanguageValue();
    const msg = message.toLowerCase();
    
    // Language-specific responses
    switch (currentLang) {
      case 'pt':
        return this.getFallbackResponsePT(msg);
      case 'de':
        return this.getFallbackResponseDE(msg);
      case 'en':
      default:
        return this.getFallbackResponseEN(msg);
    }
  }

  private getFallbackResponseEN(msg: string): string {
    if (msg.includes('ai') || msg.includes('automation') || msg.includes('chatbot')) {
      return '🤖 We build smart bots and automation stuff that handles the boring work for you! Think chatbots that actually understand people, systems that process data automatically - basically tech that works while you sleep 😴';
    }
    
    if (msg.includes('web') || msg.includes('website') || msg.includes('site')) {
      return '🌐 We make websites that look amazing and work perfectly on everything - phones, tablets, computers. From online stores to company sites, we build digital experiences people actually want to use!';
    }
    
    if (msg.includes('software') || msg.includes('app') || msg.includes('mobile')) {
      return '📱 Custom apps and software? That\'s our jam! Mobile apps, desktop tools, business systems - we build whatever you need to make your life easier. Modern tech, built right.';
    }
    
    if (msg.includes('price') || msg.includes('cost') || msg.includes('budget')) {
      return '💰 Pricing really depends on what you\'re looking for, but we\'re pretty reasonable! Every project\'s different, so let\'s chat about what you need and we\'ll figure it out together 😊';
    }
    
    if (msg.includes('team') || msg.includes('who') || msg.includes('owner') || msg.includes('company') || msg.includes('paulo')) {
      return '👨‍💻 lopes2tech is Paulo\'s thing - he\'s the main guy who builds everything! It\'s a lean operation, just him most of the time, but he brings in trusted collaborators when projects need extra expertise. Personal service, no corporate BS!';
    }
    
    if (msg.includes('contact') || msg.includes('hello') || msg.includes('hi')) {
      return '👋 Hey there! I\'m here to help you figure out how lopes2tech can make your tech dreams come true. We do AI automation, web stuff, and custom software. What\'s on your mind?';
    }

    return '🤔 Interesting question! I\'m here to chat about all the cool tech stuff we do - AI automation, web development, custom software. What would you like to know more about? Or just tell me what problem you\'re trying to solve!';
  }

  private getFallbackResponsePT(msg: string): string {
    if (msg.includes('ia') || msg.includes('inteligencia') || msg.includes('automacao') || msg.includes('chatbot')) {
      return '🤖 A gente faz bots inteligentes e automação que cuidam do trabalho chato pra você! Chatbots que entendem de verdade, sistemas que processam dados sozinhos - basicamente tecnologia que trabalha enquanto você descansa 😴';
    }
    
    if (msg.includes('web') || msg.includes('site') || msg.includes('website')) {
      return '🌐 Criamos sites que ficam lindos e funcionam perfeitamente em qualquer lugar - celular, tablet, computador. De lojas online a sites corporativos, fazemos experiências digitais que as pessoas realmente querem usar!';
    }
    
    if (msg.includes('software') || msg.includes('app') || msg.includes('aplicativo') || msg.includes('mobile')) {
      return '📱 Apps e software sob medida? Essa é nossa! Apps mobile, ferramentas desktop, sistemas empresariais - desenvolvemos o que você precisar pra facilitar sua vida. Tecnologia moderna, feita direito.';
    }
    
    if (msg.includes('preco') || msg.includes('custo') || msg.includes('orcamento')) {
      return '💰 O preço depende mesmo do que você tá procurando, mas somos bem justos! Cada projeto é diferente, então vamos conversar sobre o que você precisa e descobrimos juntos 😊';
    }
    
    if (msg.includes('equipe') || msg.includes('quem') || msg.includes('dono') || msg.includes('empresa') || msg.includes('paulo')) {
      return '👨‍💻 A lopes2tech é do Paulo - ele é o cara que constrói tudo! É uma operação enxuta, na maior parte do tempo só ele, mas quando os projetos precisam de mais expertise, ele traz colaboradores de confiança. Atendimento pessoal, sem firula corporativa!';
    }
    
    if (msg.includes('contato') || msg.includes('ola') || msg.includes('oi')) {
      return '👋 E aí! Tô aqui pra te ajudar a descobrir como a lopes2tech pode realizar seus sonhos tecnológicos. Fazemos automação com IA, desenvolvimento web e software personalizado. O que tá rolando?';
    }

    return '🤔 Pergunta interessante! Tô aqui pra bater um papo sobre todas as coisas legais que fazemos - automação com IA, desenvolvimento web, software personalizado. O que você gostaria de saber mais? Ou me conta que problema você tá tentando resolver!';
  }

  private getFallbackResponseDE(msg: string): string {
    if (msg.includes('ki') || msg.includes('automatisierung') || msg.includes('chatbot')) {
      return '🤖 Wir bauen smarte Bots und Automatisierung, die dir die langweilige Arbeit abnehmen! Chatbots die Menschen wirklich verstehen, Systeme die Daten automatisch verarbeiten - basically Tech die arbeitet während du schläfst 😴';
    }
    
    if (msg.includes('web') || msg.includes('website') || msg.includes('seite')) {
      return '🌐 Wir machen Websites die super aussehen und überall perfekt funktionieren - Handy, Tablet, Computer. Von Online-Shops bis Firmen-Websites, wir bauen digitale Erfahrungen die Leute wirklich nutzen wollen!';
    }
    
    if (msg.includes('software') || msg.includes('app') || msg.includes('anwendung') || msg.includes('mobil')) {
      return '📱 Custom Apps und Software? Das ist unser Ding! Mobile Apps, Desktop-Tools, Business-Systeme - wir bauen was auch immer du brauchst um dein Leben einfacher zu machen. Moderne Tech, richtig gemacht.';
    }
    
    if (msg.includes('preis') || msg.includes('kosten') || msg.includes('budget')) {
      return '💰 Der Preis hängt echt davon ab was du suchst, aber wir sind ziemlich fair! Jedes Projekt ist anders, also lass uns über deine Ideen quatschen und wir finden was Passendes 😊';
    }
    
    if (msg.includes('team') || msg.includes('wer') || msg.includes('inhaber') || msg.includes('firma') || msg.includes('paulo')) {
      return '👨‍💻 lopes2tech gehört Paulo - er ist der Haupttyp der alles baut! Es ist ein schlanker Betrieb, meist nur er, aber bei größeren Projekten holt er vertrauensvolle Mitarbeiter dazu. Persönlicher Service, kein Corporate-Gedöns!';
    }
    
    if (msg.includes('kontakt') || msg.includes('hallo') || msg.includes('hi')) {
      return '👋 Hey! Ich bin hier um dir zu helfen rauszufinden wie lopes2tech deine Tech-Träume wahr machen kann. Wir machen KI-Automatisierung, Web-Zeug und custom Software. Was liegt dir auf dem Herzen?';
    }

    return '🤔 Interessante Frage! Ich bin hier um über all die coolen Tech-Sachen zu quatschen die wir machen - KI-Automatisierung, Web-Entwicklung, custom Software. Was möchtest du wissen? Oder erzähl mir einfach welches Problem du lösen willst!';
  }
}
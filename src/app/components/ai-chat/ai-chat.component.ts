import { AfterViewInit, Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenaiService } from '../../services/openai.service';
import { TranslationService } from '../../services/translation.service';
import { LoggerService } from '../../services/logger.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ChatMessage } from '../../types/chat.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.scss']
})
export class AiChatComponent implements AfterViewInit, OnDestroy {
  @ViewChild('messagesContainer', { static: false }) messagesContainer!: ElementRef<HTMLDivElement>;
  
  isOpen = false;
  messages: ChatMessage[] = []; // All messages in memory (for conversation history)
  visibleMessages: ChatMessage[] = []; // Only visible messages (max 10)
  currentMessage = '';
  isLoading = false;
  
  private readonly MAX_VISIBLE_MESSAGES = 10;
  private scrollOffset = 0; // How many messages from the end we're showing
  private isUserScrolledUp = false;
  private scrollListener?: () => void;
  private shouldAutoScroll = true;
  private isLoadingOlderMessages = false; // Prevent rapid loading
  private readonly destroy$ = new Subject<void>();

  constructor(
    private openaiService: OpenaiService,
    private translationService: TranslationService,
    private logger: LoggerService
  ) {
    // Subscribe to language changes and update welcome message
    this.translationService
      .getCurrentLanguage()
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.updateWelcomeMessage(lang);
      });
  }

  ngAfterViewInit(): void {
    this.setupScrollListener();
    this.updateVisibleMessages();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.scrollListener && this.messagesContainer) {
      const container = this.messagesContainer.nativeElement;
      container.removeEventListener('scroll', this.scrollListener);
    }
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
      this.updateVisibleMessages();
    } else if (this.messages[0]?.sender === 'bot' && this.messages[0]?.content.includes('👋')) {
      // Update existing welcome message
      this.messages[0].content = welcomeMessage;
      this.updateVisibleMessages();
    }
  }

  private setupScrollListener(): void {
    if (!this.messagesContainer) return;
    
    const container = this.messagesContainer.nativeElement;
    
    this.scrollListener = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      
      // Check if user scrolled to top (within 50px threshold)
      const isAtTop = scrollTop < 50;
      
      // Check if user is near bottom (within 100px threshold)
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      
      this.isUserScrolledUp = !isNearBottom;
      this.shouldAutoScroll = isNearBottom;
      
      // If user scrolled to top and there are more messages, load more
      if (isAtTop && this.messages.length > this.visibleMessages.length && !this.isLoadingOlderMessages) {
        this.loadOlderMessages();
      }
    };
    
    container.addEventListener('scroll', this.scrollListener);
  }

  private updateVisibleMessages(): void {
    const totalMessages = this.messages.length;
    
    if (totalMessages === 0) {
      this.visibleMessages = [];
      return;
    }
    
    // Calculate which messages to show
    const startIndex = Math.max(0, totalMessages - this.MAX_VISIBLE_MESSAGES - this.scrollOffset);
    const endIndex = totalMessages - this.scrollOffset;
    
    this.visibleMessages = this.messages.slice(startIndex, endIndex);
    
    // Auto-scroll to bottom if we should
    if (this.shouldAutoScroll) {
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  private loadOlderMessages(): void {
    if (!this.messagesContainer || this.isLoadingOlderMessages) return;
    
    this.isLoadingOlderMessages = true;
    
    const container = this.messagesContainer.nativeElement;
    const oldScrollHeight = container.scrollHeight;
    const oldScrollTop = container.scrollTop;
    
    // Increase scroll offset to show more messages
    this.scrollOffset += this.MAX_VISIBLE_MESSAGES;
    
    // Recalculate visible messages
    const totalMessages = this.messages.length;
    const startIndex = Math.max(0, totalMessages - this.MAX_VISIBLE_MESSAGES - this.scrollOffset);
    const endIndex = totalMessages - this.scrollOffset;
    
    this.visibleMessages = this.messages.slice(startIndex, endIndex);
    
    // Maintain scroll position after loading older messages
    setTimeout(() => {
      if (this.messagesContainer) {
        const updatedContainer = this.messagesContainer.nativeElement;
        const newScrollHeight = updatedContainer.scrollHeight;
        const scrollDifference = newScrollHeight - oldScrollHeight;
        
        // Adjust scroll position to maintain visual position
        if (scrollDifference > 0) {
          updatedContainer.scrollTop = oldScrollTop + scrollDifference;
        }
        
        this.isLoadingOlderMessages = false;
      }
    }, 0);
  }

  private scrollToBottom(): void {
    if (!this.messagesContainer) return;
    
    const container = this.messagesContainer.nativeElement;
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 0);
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    
    // When opening chat, reset scroll and scroll to bottom
    if (this.isOpen) {
      this.scrollOffset = 0;
      this.shouldAutoScroll = true;
      this.updateVisibleMessages();
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  async sendMessage(): Promise<void> {
    if (!this.currentMessage.trim() || this.isLoading) return;

    const userMessage = this.currentMessage.trim();
    this.currentMessage = '';
    
    // Reset scroll offset when sending new message (always show latest)
    this.scrollOffset = 0;
    this.shouldAutoScroll = true;
    
    // Add user message
    this.messages.push({
      sender: 'user',
      content: userMessage,
      timestamp: new Date()
    });
    
    this.updateVisibleMessages();

    this.isLoading = true;

    try {
      // Get AI response from OpenAI (now language-aware)
      // Only send last 10 messages to API to keep context manageable
      const recentMessages = this.messages.slice(-10);
      const response = await this.openaiService.getChatResponse(userMessage, recentMessages);
      
      this.messages.push({
        sender: 'bot',
        content: response,
        timestamp: new Date()
      });
      
      this.updateVisibleMessages();
    } catch (error) {
      this.logger.error('Error getting AI response', error, 'AiChatComponent');
      
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
      
      this.updateVisibleMessages();
    } finally {
      this.isLoading = false;
    }
  }
}
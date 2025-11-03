/**
 * Type definitions for chat-related functionality
 */

export interface ChatMessage {
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export type ConversationHistory = ChatMessage[];


import { nanoid } from 'nanoid';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'archived';
}

export const formatMessage = (content: string, role: 'user' | 'assistant' = 'user'): ChatMessage => ({
  id: nanoid(),
  role,
  content,
  timestamp: new Date(),
  status: 'sent',
});

export const createNewConversation = (title: string = 'New Conversation'): ChatConversation => ({
  id: nanoid(),
  title,
  messages: [{
    id: nanoid(),
    role: 'assistant',
    content: "Hello! I'm Sam, your renovation assistant. How can I help you today?",
    timestamp: new Date(),
    status: 'sent',
  }],
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'active',
});
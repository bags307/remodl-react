import { create } from 'zustand';
import { ChatMessage, ChatConversation, mockConversations } from '@/lib/mock/chat';

interface ChatState {
  conversations: ChatConversation[];
  currentConversation: ChatConversation | null;
  isTyping: boolean;
  setCurrentConversation: (conversation: ChatConversation | null) => void;
  addMessage: (message: ChatMessage) => void;
  setTyping: (isTyping: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: mockConversations,
  currentConversation: null,
  isTyping: false,
  setCurrentConversation: (conversation) => set({ currentConversation: conversation }),
  addMessage: (message) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === state.currentConversation?.id
          ? {
              ...conv,
              messages: [...conv.messages, message],
              updatedAt: new Date(),
            }
          : conv
      ),
      currentConversation: state.currentConversation
        ? {
            ...state.currentConversation,
            messages: [...state.currentConversation.messages, message],
            updatedAt: new Date(),
          }
        : null,
    })),
  setTyping: (isTyping) => set({ isTyping }),
}));
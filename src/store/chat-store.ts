import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ChatMessage, ChatConversation, createNewConversation } from '@/lib/chat';
import { mockConversations } from '@/lib/mock/chat';

interface ChatState {
  conversations: ChatConversation[];
  currentConversationId: string | null;
  getCurrentConversation: () => ChatConversation | null;
  createConversation: () => ChatConversation;
  addMessage: (message: ChatMessage) => void;
  updateConversation: (id: string, updates: Partial<ChatConversation>) => void;
  setCurrentConversationId: (id: string | null) => void;
}

// Custom storage transformer to handle Date objects
const storage = createJSONStorage(() => localStorage, {
  reviver: (key, value) => {
    // Convert date strings back to Date objects
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      return new Date(value);
    }
    return value;
  }
});

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: mockConversations,
      currentConversationId: null,

      getCurrentConversation: () => {
        const { conversations, currentConversationId } = get();
        return conversations.find(c => c.id === currentConversationId) || null;
      },

      createConversation: () => {
        const newConversation = createNewConversation();
        set(state => ({
          conversations: [newConversation, ...state.conversations],
          currentConversationId: newConversation.id,
        }));
        return newConversation;
      },

      addMessage: (message) => {
        set(state => {
          const currentId = state.currentConversationId;
          if (!currentId) return state;

          const now = new Date();
          const updatedConversations = state.conversations.map(conv => 
            conv.id === currentId
              ? {
                  ...conv,
                  messages: [...conv.messages, { ...message, timestamp: now }],
                  updatedAt: now,
                  title: conv.messages.length === 0 ? message.content.slice(0, 50) + '...' : conv.title,
                }
              : conv
          );

          // Sort conversations by updatedAt timestamp
          const sortedConversations = [...updatedConversations].sort((a, b) => 
            b.updatedAt.getTime() - a.updatedAt.getTime()
          );

          return {
            conversations: sortedConversations,
          };
        });
      },

      updateConversation: (id, updates) => {
        set(state => {
          const updatedConversations = state.conversations.map(conv =>
            conv.id === id 
              ? { ...conv, ...updates, updatedAt: new Date() }
              : conv
          );

          // Sort conversations by updatedAt timestamp
          const sortedConversations = [...updatedConversations].sort((a, b) => 
            b.updatedAt.getTime() - a.updatedAt.getTime()
          );

          return {
            conversations: sortedConversations,
          };
        });
      },

      setCurrentConversationId: (id) => {
        set({ currentConversationId: id });
      },
    }),
    {
      name: 'remodl-chat-storage',
      storage,
      partialize: (state) => ({
        conversations: state.conversations,
      }),
    }
  )
);
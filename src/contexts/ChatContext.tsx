import { createContext, useState, useCallback } from 'react';

interface ChatContextType {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
}

export const ChatContext = createContext<ChatContextType>({
  isChatOpen: false,
  setIsChatOpen: () => {},
});

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSetIsChatOpen = useCallback((isOpen: boolean) => {
    setIsChatOpen(isOpen);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen: handleSetIsChatOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
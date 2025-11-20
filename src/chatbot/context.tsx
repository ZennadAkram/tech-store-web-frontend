// ChatContext.tsx
import React, { createContext, useContext, useRef } from "react";
import { ChatSocket } from "./websockets/websockets"

// Create the context
const ChatContext = createContext<ChatSocket | null>(null);

// Provider that holds a single ChatSocket instance
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // useRef ensures we only create one ChatSocket
  const chatSocketRef = useRef<ChatSocket | null>(null);

  if (!chatSocketRef.current) {
    chatSocketRef.current = new ChatSocket((msg) => {
      console.log("Message received in provider:", msg);
      // later, you can also store messages in a Zustand/State if needed
    });
  }

  return (
    <ChatContext.Provider value={chatSocketRef.current}>
      {children}
    </ChatContext.Provider>
  );
};

// Hook for components to access ChatSocket
export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
};

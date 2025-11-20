import { useEffect, useState, useRef } from "react";
import { useChat } from "../context";
import { ChatbotBable } from "./chatbot_bable";
import { SystemBable } from "./system_bable";
import { UserBable } from "./user_bable";
import type { ConnectionState } from "../websockets/websockets";
import type { MessagePayload } from "../types/messagepayload";
import { LoadingBubble } from "./loading_bable";

export function ChatBody(){
    const chatSocket = useChat();
    const [messages, setMessages] = useState<MessagePayload[]>([]);
    const [, setConnectionState] = useState<ConnectionState>(chatSocket.state);
     const [isLoading, setIsLoading] = useState(false);
    // Create a ref for the scroll container and bottom element
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Listen for messages
    // Listen for messages
useEffect(() => {
    const handleMessage = (msg: any) => {
        setMessages(prev => [...prev, msg]);
        
    };

    chatSocket.onMessage(handleMessage);
    
    // Proper cleanup
    return () => {
        chatSocket.removeMessageListener(handleMessage);
    };
}, [chatSocket]);
useEffect(() => {
  chatSocket.setLoadingCallback = setIsLoading;
}, [chatSocket]);


// Listen for connection state changes
useEffect(() => {
    const handleStateChange = (state: ConnectionState) => {
        setConnectionState(state);
    };

    chatSocket.onStateChange(handleStateChange);
    
    // Proper cleanup
    return () => {
        chatSocket.removeStateListener(handleStateChange);
    };
}, [chatSocket]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]); // This will run every time messages array changes

    const scrollToBottom = () => {
        // Using smooth scroll for better UX
        messagesEndRef.current?.scrollIntoView({ 
            behavior: "smooth",
            block: "nearest"
        });
        
        // Alternative: Instant scroll (uncomment if you prefer instant)
        // messagesEndRef.current?.scrollIntoView(false);
    };

    // Optional: Manual scroll to bottom button for user control
   

    return(
        <>
            <div 
                ref={chatContainerRef}
                className="w-full mt-2 flex-grow flex-col overflow-y-scroll bg-[#F8F9FA] flex gap-10 px-5 py-7 relative"
            >
                
                {messages.map((msg, index) => {
                    if (msg.type.includes('user')) {
                        return <UserBable key={index} message={msg.message} />;
                    } else if (msg.type.includes('ai')) {
                        return <ChatbotBable key={index} message={msg.message} />;
                    } else if (msg.type.includes('system')) {
                        return <SystemBable key={index} message={msg.message} />;
                    } else {
                        return null; // Unknown sender type
                    }

                })}
                {isLoading && <LoadingBubble />}
                
                {/* Invisible element at the bottom to scroll to */}
                <div ref={messagesEndRef} />
                
               
            </div>
        </>
    );
}
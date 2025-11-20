import { useState } from "react";
import { useChat } from "../context";

export function TextField(){
  const socket = useChat();
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      socket.sendMessage(inputMessage.trim());
      setInputMessage("");
    }
  };

  const handleQuickButtonClick = (message: string) => {
    socket.sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white w-full h-[170px] shadow-2xl flex flex-col justify-center px-6 gap-4 self-end">
      <div className="flex flex-row gap-2 items-center overflow-x-scroll">
        <button 
          onClick={() => handleQuickButtonClick("🛍️ Tell me about your products")}
          className="flex flex-row items-center justify-center gap-2 bg-[#F3F5F6] text-[#444444] px-5 py-2 rounded-[10px] hover:bg-[#e1e6e9] text-[12px] font-semibold whitespace-nowrap"
        >
          🛍️ Products
        </button>
        <button 
          onClick={() => handleQuickButtonClick("📦 I want to check my order status")}
          className="flex flex-row items-center justify-center gap-2 bg-[#F3F5F6] text-[#444444] px-5 py-2 rounded-[10px] hover:bg-[#e1e6e9] text-[12px] font-semibold whitespace-nowrap"
        >
          📦 Orders
        </button>
        <button 
          onClick={() => handleQuickButtonClick("🙋‍♂️ What are your frequently asked questions?")}
          className="flex flex-row items-center justify-center gap-2 bg-[#F3F5F6] text-[#444444] px-5 py-2 rounded-[10px] hover:bg-[#e1e6e9] text-[12px] font-semibold whitespace-nowrap"
        >
          🙋‍♂️ FAQs
        </button>
        <button 
          onClick={() => handleQuickButtonClick("🛒 Help me with my shopping cart")}
          className="flex flex-row items-center justify-center gap-2 bg-[#F3F5F6] text-[#444444] px-5 py-2 rounded-[10px] hover:bg-[#e1e6e9] text-[12px] font-semibold whitespace-nowrap"
        >
          🛒 Shopping cart 
        </button>
        <button 
          onClick={() => handleQuickButtonClick("💰 What are your pricing options?")}
          className="flex flex-row items-center justify-center gap-2 bg-[#F3F5F6] text-[#444444] px-5 py-2 rounded-[10px] hover:bg-[#e1e6e9] text-[12px] font-semibold whitespace-nowrap"
        >
          💰 Pricing 
        </button>
      </div>
      
      <div className="relative w-full">
        <input 
          className="border bg-[#E8EBF0] h-[70px] w-full rounded-[16px] border-[#F3F5F6] focus:outline-none px-3 text-[#444444] text-[18px]" 
          type="text" 
          placeholder="Ask me anything..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          onClick={handleSendMessage}
          className="absolute right-3 top-1/3"
          disabled={!inputMessage.trim()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.51002 4.23L18.07 8.51C21.91 10.43 21.91 13.57 18.07 15.49L9.51002 19.77C3.75002 22.65 1.40002 20.29 4.28002 14.54L5.15002 12.81C5.37002 12.37 5.37002 11.64 5.15002 11.2L4.28002 9.46C1.40002 3.71 3.76002 1.35 9.51002 4.23Z" stroke="#4361EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.43994 12H10.8399" stroke="#4361EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
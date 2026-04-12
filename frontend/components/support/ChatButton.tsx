"use client"

import { useState } from "react";
import { MessageCircleMore } from "lucide-react";
import ChatBox from "./ChatBox";

const ChatButton = () => {
  const [showChatBox, setShowChatBox] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShowChatBox(!showChatBox)}
        className="fixed bottom-5 right-5 bg-[#0D6144] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer z-10"
      >
        <MessageCircleMore size={24} />
      </button>

      <ChatBox isOpen={showChatBox} onClose={() => setShowChatBox(false)} />
    </>
  );
};

export default ChatButton;

"use client"

import { X, Send } from "lucide-react"
import { useState } from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function ChatBox({ isOpen, onClose }: Props) {
  const [message, setMessage] = useState("")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/40">
      <div className="bg-white w-[380px] h-[500px] rounded-t-xl rounded-l-xl shadow-2xl flex flex-col animate-slideUp">

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b bg-primary-500 text-white rounded-t-xl">
          <h2 className="font-semibold">Chat Box</h2>
          <button onClick={onClose} className="cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 p-4 overflow-y-auto">
          <p className="bg-primary-100 p-3 rounded-md text-gray-500 text-sm animate-fade-in duration-500">
            Hey there, How can we help you today?
          </p>
        </div>

        {/* TEXTBOX */}
        <div className="p-3 border-t flex gap-2">
          <input
            type="text"
            placeholder="Message us for support..."
            className="flex-1 border rounded-lg px-3 py-2 outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="bg-[#0D6144] text-white px-4 rounded-lg cursor-pointer">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
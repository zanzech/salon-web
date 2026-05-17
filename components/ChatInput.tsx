"use client";

import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = Math.min(ref.current.scrollHeight, 100) + "px";
    }
  }, [input]);

  const send = () => {
    const v = input.trim();
    if (!v || isLoading) return;
    onSend(v);
    setInput("");
    if (ref.current) ref.current.style.height = "auto";
  };

  return (
    <div className="flex-shrink-0 glass-strong border-t border-purple-500/8 px-3 sm:px-5 py-3">
      <div className="flex items-end gap-2.5">
        <div className="flex-1">
          <textarea
            ref={ref}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
            }}
            placeholder="Type your message..."
            rows={1}
            disabled={isLoading}
            className="w-full resize-none rounded-xl glass-input px-4 py-2.5 text-sm text-slate-100
              placeholder-purple-300/30 focus:outline-none focus:border-pink-500/30 focus:ring-1
              focus:ring-pink-500/15 transition-all duration-200 disabled:opacity-40"
            id="chat-input"
          />
        </div>

        <button
          onClick={send}
          disabled={!input.trim() || isLoading}
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600
            text-white flex items-center justify-center btn-glow
            disabled:opacity-30 disabled:shadow-none disabled:hover:scale-100
            disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
          id="send-btn"
        >
          {isLoading ? (
            <svg className="w-4.5 h-4.5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3.5" />
              <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          )}
        </button>
      </div>

      <p className="text-[10px] text-purple-400/20 text-center mt-2 tracking-wide">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}

"use client";

export default function TypingIndicator() {
  return (
    <div className="msg-enter flex justify-start mb-3" id="typing-indicator">
      <div className="flex items-end gap-2.5">
        {/* Avatar */}
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-md shadow-purple-500/25 mb-0.5 ring-1 ring-purple-400/20">
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="15.88" />
            <line x1="14.47" y1="14.48" x2="20" y2="20" />
            <line x1="8.12" y1="8.12" x2="12" y2="12" />
          </svg>
        </div>

        {/* Dots bubble */}
        <div className="glass rounded-2xl rounded-bl-md px-5 py-3.5 shadow-lg shadow-purple-900/20">
          <div className="flex items-center gap-1.5">
            <span className="typing-dot w-2 h-2 rounded-full bg-pink-400" style={{ animationDelay: "0s" }} />
            <span className="typing-dot w-2 h-2 rounded-full bg-purple-400" style={{ animationDelay: "0.2s" }} />
            <span className="typing-dot w-2 h-2 rounded-full bg-pink-400" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

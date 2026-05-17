"use client";

import { useMemo, memo } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[2]) nodes.push(<strong key={m.index} className="font-semibold text-white">{m[2]}</strong>);
    else if (m[3]) nodes.push(<em key={m.index} className="italic">{m[3]}</em>);
    else if (m[4]) nodes.push(<code key={m.index} className="px-1.5 py-0.5 rounded bg-white/10 text-purple-300 text-xs font-mono">{m[4]}</code>);
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function parseContent(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const out: React.ReactNode[] = [];
  let lis: React.ReactNode[] = [];

  const flush = () => {
    if (lis.length) {
      out.push(<ul key={`ul-${out.length}`} className="space-y-1 my-1.5">{lis}</ul>);
      lis = [];
    }
  };

  lines.forEach((ln, i) => {
    const t = ln.trim();
    if (!t) { flush(); return; }
    const bm = t.match(/^[-*•]\s+(.+)/);
    if (bm) {
      lis.push(
        <li key={`li-${i}`} className="flex items-start gap-2 text-[0.85rem]">
          <span className="text-pink-400 mt-0.5 text-[8px]">◆</span>
          <span>{renderInline(bm[1])}</span>
        </li>
      );
      return;
    }
    flush();
    out.push(<p key={`p-${i}`} className="text-[0.85rem] leading-relaxed">{renderInline(t)}</p>);
  });
  flush();
  return out;
}

const ChatBubble = memo(function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  const time = useMemo(
    () => new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    [message.timestamp]
  );

  const parsed = useMemo(
    () => (isUser ? null : parseContent(message.content)),
    [message.content, isUser]
  );

  return (
    <div className={`msg-enter flex ${isUser ? "justify-end" : "justify-start"} mb-3`} id={`msg-${message.id}`}>
      <div className={`flex items-end gap-2.5 max-w-[88%] sm:max-w-[78%] ${isUser ? "flex-row-reverse" : ""}`}>

        {/* Bot avatar */}
        {!isUser && (
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-md shadow-purple-500/25 mb-0.5 ring-1 ring-purple-400/20">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <line x1="20" y1="4" x2="8.12" y2="15.88" />
              <line x1="14.47" y1="14.48" x2="20" y2="20" />
              <line x1="8.12" y1="8.12" x2="12" y2="12" />
            </svg>
          </div>
        )}

        {/* Bubble */}
        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isUser
              ? "bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20 rounded-br-md"
              : "glass text-slate-200 rounded-bl-md shadow-lg shadow-purple-900/20"
          }`}
        >
          <div className="space-y-1.5">
            {isUser ? (
              <p className="text-[0.85rem] leading-relaxed">{message.content}</p>
            ) : (
              parsed
            )}
          </div>
          <p className={`text-[10px] mt-1.5 ${isUser ? "text-pink-200/50 text-right" : "text-purple-400/40"}`}>
            {time}
          </p>
        </div>
      </div>
    </div>
  );
});

export default ChatBubble;

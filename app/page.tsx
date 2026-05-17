"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import BookingCard from "@/components/BookingCard";
import OwnerPanel from "@/components/OwnerPanel";

/* ─── Types ─── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Booking {
  name: string;
  phone: string;
  timestamp: string;
  salonName: string;
}

type BookingStep = null | "name" | "phone" | "confirmed";

/* ─── Constants ─── */
const SALON_NAME = "Glamour Studio";
const STORAGE_KEY = "glamour_studio_bookings";

const FIRST_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey gorgeous! 👋 I'm Bella, your AI assistant at Glamour Studio. How can I make your day beautiful today?",
  timestamp: new Date(),
};

const QUICK_REPLIES = [
  "Book Appointment 💅",
  "Our Services 💇",
  "Opening Hours 🕐",
];

const BOOKING_KEYWORDS = [
  "book", "booking", "appointment", "reserve", "schedule",
  "book appointment", "make a booking", "i want to book",
];

/* ─── Helpers ─── */
function loadBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveBookings(bookings: Booking[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function isBookingIntent(text: string): boolean {
  const lower = text.toLowerCase();
  return BOOKING_KEYWORDS.some((kw) => lower.includes(kw));
}

function makeMsg(role: "user" | "assistant", content: string): Message {
  return { id: `${role[0]}-${Date.now()}-${Math.random()}`, role, content, timestamp: new Date() };
}

/* ─── Particles (memoized — never re-renders) ─── */
const Particles = memo(function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  );
});

/* ─── Hero Section ─── */
function HeroSection({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="h-screen-safe relative z-10 flex flex-col items-center justify-center px-6 text-center">
      {/* Floating badge */}
      <div className="hero-fade-in mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
          bg-white/[0.04] border border-white/[0.08] text-[11px] text-purple-200/70 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Online 24/7
        </span>
      </div>

      {/* Logo mark */}
      <div className="hero-fade-in mb-8">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600
          flex items-center justify-center shadow-2xl shadow-purple-500/30 logo-shimmer">
          <svg className="w-9 h-9 text-white scissors-icon" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="15.88" />
            <line x1="14.47" y1="14.48" x2="20" y2="20" />
            <line x1="8.12" y1="8.12" x2="12" y2="12" />
          </svg>
        </div>
      </div>

      {/* Headline */}
      <h1 className="hero-fade-in text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-lg">
        <span className="gradient-text-logo">Never Miss</span>
        <br />
        <span className="text-white">a Booking Again</span>
      </h1>

      {/* Subheadline */}
      <p className="hero-fade-in-delay text-sm sm:text-base text-purple-200/50 mt-4 max-w-md leading-relaxed font-light">
        Bella is your 24/7 AI receptionist — always online, always friendly
      </p>

      {/* CTA Button */}
      <button
        onClick={onEnter}
        className="hero-fade-in-delay-2 mt-8 group px-7 py-3 rounded-2xl
          bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium
          shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40
          hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        id="start-chat-btn"
      >
        <span className="flex items-center gap-2">
          Chat with Bella
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </button>

      {/* Bouncing arrow */}
      <button
        onClick={onEnter}
        className="hero-fade-in-delay-2 absolute bottom-8 sm:bottom-12 bounce-arrow cursor-pointer"
        aria-label="Scroll to chat"
      >
        <svg className="w-6 h-6 text-purple-300/30" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  );
}

/* ─── Main Component ─── */
export default function Home() {
  const [showHero, setShowHero] = useState(true);
  const [heroExiting, setHeroExiting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([FIRST_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [bookingStep, setBookingStep] = useState<BookingStep>(null);
  const [bookingName, setBookingName] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<{ name: string; phone: string } | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Load bookings on mount */
  useEffect(() => {
    setBookings(loadBookings());
  }, []);

  /* Auto-scroll */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, confirmedBooking, scrollToBottom]);

  /* Hero → Chat transition */
  const enterChat = useCallback(() => {
    setHeroExiting(true);
    setTimeout(() => {
      setShowHero(false);
      setHeroExiting(false);
    }, 450);
  }, []);

  /* Double-tap logo → Owner Panel */
  const handleLogoTap = useCallback(() => {
    tapCountRef.current += 1;
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);

    if (tapCountRef.current >= 2) {
      tapCountRef.current = 0;
      setBookings(loadBookings());
      setShowPanel(true);
    } else {
      tapTimerRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 400);
    }
  }, []);

  /* Clear bookings */
  const handleClearBookings = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setBookings([]);
  }, []);

  /* Add bot message with typing delay */
  const addBotMessage = useCallback(async (content: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
    setMessages((prev) => [...prev, makeMsg("assistant", content)]);
    setIsLoading(false);
  }, []);

  /* Save booking */
  const saveBooking = useCallback((name: string, phone: string) => {
    const booking: Booking = {
      name,
      phone,
      timestamp: new Date().toISOString(),
      salonName: SALON_NAME,
    };
    const updated = [...loadBookings(), booking];
    saveBookings(updated);
    setBookings(updated);
  }, []);

  /* Send handler */
  const sendMessage = useCallback(async (content: string) => {
    setShowQuickReplies(false);
    setConfirmedBooking(null);

    const userMsg = makeMsg("user", content);
    setMessages((prev) => [...prev, userMsg]);

    /* Booking: name step */
    if (bookingStep === "name") {
      setBookingName(content.trim());
      setBookingStep("phone");
      await addBotMessage(
        `Lovely name, ${content.trim()}! 💖 Now, could you share your phone number so we can confirm your appointment?`
      );
      return;
    }

    /* Booking: phone step */
    if (bookingStep === "phone") {
      const phone = content.trim();
      setBookingStep("confirmed");
      saveBooking(bookingName, phone);
      setConfirmedBooking({ name: bookingName, phone });
      await addBotMessage(
        "Amazing! Your booking request is in! 🎉 Our team will reach out to confirm the details. You're going to look fabulous! ✨"
      );
      setTimeout(() => {
        setBookingStep(null);
        setBookingName("");
      }, 500);
      return;
    }

    /* Detect booking intent */
    if (isBookingIntent(content)) {
      setBookingStep("name");
      await addBotMessage(
        "I'd love to help you book an appointment! 💅 Let's get you set up. First, what's your name, gorgeous?"
      );
      return;
    }

    /* Normal AI call */
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setMessages((prev) => [...prev, makeMsg("assistant", data.message)]);
    } catch {
      setMessages((prev) => [
        ...prev,
        makeMsg("assistant", "Oops! I'm having a little moment. Could you try again? 💫"),
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [bookingStep, bookingName, messages, addBotMessage, saveBooking]);

  /* ─── Render ─── */

  /* Hero view */
  if (showHero) {
    return (
      <>
        <Particles />
        <div className={heroExiting ? "hero-exit" : ""}>
          <HeroSection onEnter={enterChat} />
        </div>
      </>
    );
  }

  /* Chat view */
  return (
    <>
      <Particles />

      <main className="relative z-10 flex flex-col h-screen-safe max-w-2xl mx-auto w-full">
        {/* Header */}
        <header className="flex-shrink-0 glass-strong px-4 sm:px-6 py-3.5 flex items-center gap-3.5 border-b border-purple-500/10">
          <button
            onClick={handleLogoTap}
            className="logo-shimmer relative w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600
              flex items-center justify-center shadow-lg shadow-purple-500/30 flex-shrink-0 cursor-pointer select-none"
            aria-label="Salon logo"
            id="logo-btn"
          >
            <svg className="w-5 h-5 text-white scissors-icon" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <line x1="20" y1="4" x2="8.12" y2="15.88" />
              <line x1="14.47" y1="14.48" x2="20" y2="20" />
              <line x1="8.12" y1="8.12" x2="12" y2="12" />
            </svg>
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold gradient-text-logo tracking-tight">Bella AI</h1>
              <span className="pulse-dot w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0" />
            </div>
            <p className="text-[11px] text-purple-300/60 tracking-wide font-light">Glamour Studio</p>
          </div>

          {bookingStep && bookingStep !== "confirmed" && (
            <div className="msg-enter flex-shrink-0 px-2.5 py-1 rounded-full bg-pink-500/15 border border-pink-400/20">
              <p className="text-[10px] text-pink-300 font-medium">
                📝 {bookingStep === "name" ? "Enter name" : "Enter phone"}
              </p>
            </div>
          )}
        </header>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-5 space-y-1" id="chat-area">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}

          {confirmedBooking && (
            <BookingCard name={confirmedBooking.name} phone={confirmedBooking.phone} />
          )}

          {isLoading && <TypingIndicator />}

          {showQuickReplies && !isLoading && (
            <div className="flex flex-wrap gap-2 pt-3 justify-center">
              {QUICK_REPLIES.map((text, i) => (
                <button
                  key={text}
                  onClick={() => sendMessage(text)}
                  className="quick-reply-enter px-4 py-2 rounded-full text-sm font-medium
                    bg-gradient-to-r from-pink-500/10 to-purple-500/10
                    border border-pink-400/20 text-pink-200
                    hover:from-pink-500/20 hover:to-purple-500/20
                    hover:border-pink-400/40 hover:text-white
                    hover:shadow-lg hover:shadow-pink-500/10
                    active:scale-95 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}
                  id={`quick-reply-${i}`}
                >
                  {text}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <ChatInput onSend={sendMessage} isLoading={isLoading} />

        {/* Powered by AI badge */}
        <div className="flex-shrink-0 flex justify-center py-1.5 bg-transparent">
          <span className="text-[10px] text-purple-400/20 tracking-wider font-light flex items-center gap-1">
            Powered by AI ⚡
          </span>
        </div>
      </main>

      {/* Owner Panel */}
      {showPanel && (
        <OwnerPanel
          bookings={bookings}
          onClose={() => setShowPanel(false)}
          onClear={handleClearBookings}
        />
      )}
    </>
  );
}

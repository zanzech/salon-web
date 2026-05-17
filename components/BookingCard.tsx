"use client";

interface BookingCardProps {
  name: string;
  phone: string;
}

export default function BookingCard({ name, phone }: BookingCardProps) {
  return (
    <div className="msg-enter flex justify-start mb-3">
      <div className="flex items-end gap-2.5 max-w-[88%] sm:max-w-[78%]">
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

        {/* Card */}
        <div className="booking-card-enter rounded-2xl rounded-bl-md overflow-hidden shadow-2xl shadow-green-500/10 border border-green-500/20">
          {/* Green header */}
          <div className="bg-gradient-to-r from-emerald-600/90 to-green-500/90 backdrop-blur-md px-5 py-4 text-center">
            {/* Animated checkmark */}
            <div className="flex justify-center mb-2">
              <svg className="checkmark-circle w-12 h-12" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="23" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
                <circle cx="26" cy="26" r="23" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
                <path className="checkmark-path" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" d="M15 27l7 7 15-15" />
              </svg>
            </div>
            <p className="text-white font-semibold text-sm">Booking Received!</p>
            <p className="text-green-100/80 text-xs mt-0.5">We&apos;ll confirm shortly ✨</p>
          </div>

          {/* Details */}
          <div className="bg-black/40 backdrop-blur-md px-5 py-3.5 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-purple-400/50 uppercase tracking-wider">Name</p>
                <p className="text-sm text-slate-200 font-medium">{name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-pink-500/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-pink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-pink-400/50 uppercase tracking-wider">Phone</p>
                <p className="text-sm text-slate-200 font-medium">{phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

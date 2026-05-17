"use client";

interface Booking {
  name: string;
  phone: string;
  timestamp: string;
  salonName: string;
}

interface OwnerPanelProps {
  bookings: Booking[];
  onClose: () => void;
  onClear: () => void;
}

export default function OwnerPanel({ bookings, onClose, onClear }: OwnerPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4" id="owner-panel">
      {/* Overlay */}
      <div className="panel-overlay absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="panel-slide relative w-full max-w-lg glass-strong rounded-2xl shadow-2xl shadow-purple-900/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-purple-500/10">
          <div>
            <h2 className="text-base font-semibold gradient-text-logo">Bookings Dashboard</h2>
            <p className="text-[11px] text-purple-300/40 mt-0.5">{bookings.length} booking{bookings.length !== 1 ? "s" : ""} total</p>
          </div>
          <div className="flex items-center gap-2">
            {bookings.length > 0 && (
              <button
                onClick={onClear}
                className="text-[11px] px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20
                  text-red-300 hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200 cursor-pointer"
                id="clear-all-bookings"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400
                hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
              id="close-panel"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-[60vh] overflow-y-auto">
          {bookings.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-purple-400/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <p className="text-sm text-purple-300/40">No bookings yet</p>
              <p className="text-[11px] text-purple-400/25 mt-1">Bookings will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-purple-500/8">
              {bookings.map((b, i) => {
                const date = new Date(b.timestamp);
                const dateStr = date.toLocaleDateString([], { month: "short", day: "numeric" });
                const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                return (
                  <div key={i} className="px-5 py-3.5 hover:bg-white/[0.02] transition-colors duration-150">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center border border-pink-400/10">
                          <span className="text-sm">💅</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-200 truncate">{b.name}</p>
                          <p className="text-xs text-purple-300/40 mt-0.5">{b.phone}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[11px] text-purple-300/35">{dateStr}</p>
                        <p className="text-[10px] text-purple-400/25 mt-0.5">{timeStr}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

# Bella AI ✂️ Glamour Studio

> Your 24/7 AI salon receptionist — powered by Groq & Next.js

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)
![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3-orange)

## ✨ Features

- **AI Chat Assistant** — Bella helps clients with services, pricing, hours & bookings
- **Smart Booking Flow** — Collects name & phone step-by-step, saves to localStorage
- **Owner Dashboard** — Double-tap the logo to view all bookings (hidden panel)
- **Beautiful Landing Page** — Hero section with animated CTA that transitions to chat
- **Premium Dark UI** — Glass morphism, floating particles, gradient animations
- **Mobile-First** — Fully responsive, keyboard-safe, works on all screen sizes
- **Fast** — Groq API delivers sub-second AI responses

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- A **Groq API Key** — get one free at [console.groq.com](https://console.groq.com)

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Groq API key

Create a `.env.local` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> ⚠️ Never commit your API key. The `.env.local` file is already in `.gitignore`.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel

### Option A: One-click deploy

1. Push your code to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add the environment variable:
   - **Name:** `GROQ_API_KEY`
   - **Value:** your Groq API key
5. Click **Deploy**

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel
```

When prompted, add your `GROQ_API_KEY` in the Vercel dashboard under:  
**Settings → Environment Variables**

## 📁 Project Structure

```
salon-bot/
├── app/
│   ├── api/chat/route.ts      # Groq API endpoint
│   ├── globals.css             # Theme, animations, particles
│   ├── layout.tsx              # Root layout + fonts
│   └── page.tsx                # Hero + Chat UI + booking logic
├── components/
│   ├── BookingCard.tsx          # Booking confirmation card
│   ├── ChatBubble.tsx           # Message bubbles (memoized)
│   ├── ChatInput.tsx            # Input bar + quick replies
│   ├── OwnerPanel.tsx           # Hidden bookings dashboard
│   └── TypingIndicator.tsx      # Animated typing dots
├── .env.local                   # API key (not committed)
├── tailwind.config.ts           # Custom colors & animations
├── tsconfig.json                # TypeScript config
└── next.config.js               # Next.js config
```

## 🔧 Configuration

| Setting | File | Details |
|---------|------|---------|
| AI Model | `app/api/chat/route.ts` | `llama-3.3-70b-versatile` |
| System Prompt | `app/api/chat/route.ts` | Bella's personality & salon info |
| Salon Prices | `app/api/chat/route.ts` | Haircut $30, Color $80, Facial $60, Nails $40 |
| Salon Hours | `app/api/chat/route.ts` | Mon-Sat 9am-7pm, Sun 10am-5pm |
| Theme Colors | `tailwind.config.ts` | Pink/purple gradient palette |

## 📝 License

MIT

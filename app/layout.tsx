import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Bella AI ✂️ Glamour Studio",
  description:
    "Meet Bella — your 24/7 AI receptionist at Glamour Studio. Book appointments, explore services, and get beauty advice instantly.",
  keywords: [
    "salon",
    "chatbot",
    "beauty",
    "hairstyle",
    "skincare",
    "appointment",
    "AI assistant",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

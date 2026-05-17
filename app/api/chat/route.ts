import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are Bella, a friendly AI assistant for Glamour Studio salon. You help clients with: booking appointments, knowing services and prices (haircut $30, color $80, facial $60, nails $40), hours (Mon-Sat 9am-7pm, Sun 10am-5pm), and location (123 Main Street). When someone wants to book, collect their name and phone number warmly. Keep responses short, friendly and use 1-2 emojis. Never make up information.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-10),
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.9,
    });

    const responseMessage =
      chatCompletion.choices[0]?.message?.content ||
      "I apologize, I couldn't generate a response. Please try again.";

    return NextResponse.json({ message: responseMessage });
  } catch (error: unknown) {
    console.error("Groq API Error:", error);

    if (error instanceof Error && "status" in error) {
      const apiError = error as { status: number };
      if (apiError.status === 401) {
        return NextResponse.json(
          { error: "Invalid API key. Please check your GROQ_API_KEY." },
          { status: 401 }
        );
      }
      if (apiError.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again in a moment." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}

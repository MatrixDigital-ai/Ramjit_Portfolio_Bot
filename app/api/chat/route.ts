import { NextRequest, NextResponse } from "next/server";
import { getTrainingConfig, initializeDatabase } from "@/lib/db";
import { buildSystemPrompt, chat, ChatMessage } from "@/lib/groq";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userMessage, conversationHistory } = body as {
            userMessage: string;
            conversationHistory: ChatMessage[];
        };

        if (!userMessage || typeof userMessage !== "string") {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        // Initialize database if needed (creates table + seeds default row)
        await initializeDatabase();

        // Fetch latest training config
        const config = await getTrainingConfig();

        // Build dynamic system prompt
        const systemPrompt = buildSystemPrompt(config);

        // Send to Groq
        const response = await chat(
            systemPrompt,
            conversationHistory || [],
            userMessage
        );

        return NextResponse.json({ response });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "An error occurred processing your request. Please try again." },
            { status: 500 }
        );
    }
}

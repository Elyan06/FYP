
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
// Using the API key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
// Using gemini-flash-latest which is confirmed working and available for this key
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const SYSTEM_PROMPT = `
You are an expert Plant Pathologist and Agricultural AI Assistant named "Plant Doctor".
Your role is to help users identify plant diseases (specifically for Tomatoes and Peppers) and provide treatment advice.

Guidelines:
1. Keep answers concise, friendly, and practical.
2. If a user asks about a disease, explain:
   - Symptoms (what to look for)
   - Organic treatments (neem oil, pruning, air circulation)
   - Chemical treatments (if necessary, like copper fungicides)
3. If off-topic (e.g., "Write me a poem"), politely steer back to plants.
4. Use markdown for formatting (bolding key terms).

Current Context: The user is on a web app called "LeafGuardAI" capable of detecting 38 disease classes.
`;

// Store the chat session instance
let chatSession: any = null;

export const sendMessageToAI = async (message: string): Promise<string> => {
    try {
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
            return "Configuration Error: API Key not found. Please check your .env file.";
        }

        // Initialize chat session if it doesn't exist
        if (!chatSession) {
            chatSession = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: SYSTEM_PROMPT }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "Understood. I am ready to assist as the Plant Doctor." }],
                    },
                ],
                generationConfig: {
                    maxOutputTokens: 300,
                },
            });
        }

        const result = await chatSession.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        // Reset session on error to prevent stuck state
        chatSession = null;

        const errorMessage = error.message || error.toString();

        // Handle Quota Exceeded (429) specifically
        if (errorMessage.includes("429") || errorMessage.includes("quota")) {
            return "Quota Exceeded: The free tier limit for this model has been reached. Please try again in a few minutes.";
        }

        // Handle Invalid Key (403)
        if (errorMessage.includes("403")) {
            return "Connection Error: API Key is invalid or not enabled. Please check your Google AI Studio settings.";
        }

        return "I'm having trouble connecting to the Gemini AI right now. Please try again in a moment.";
    }
};

export const resetChat = () => {
    chatSession = null;
};

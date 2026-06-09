import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const replyPrompt = async (prompt: string) => {
  const chat = ai.chats.create({
    model: "gemini-2.5-flash-lite"
  });

  return chat.sendMessageStream({
    message: prompt
  });

}

const AIChatbox = {
  replyPrompt
}

export default AIChatbox;
import type { Request, Response } from "express";
import AIChatbox from "../AIChatbox.js";

const sendPrompt = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ error: "Bad request", message: "The 'body' is undefined" });
  }
  const { prompt } = req.body;

  if (!prompt || typeof prompt != "string") {
    return res.status(400).json({ error: "Bad request", message: "The 'prompt' field must be a string" });
  }

  const stream = await AIChatbox.replyPrompt(prompt);

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  for await (const chunk of stream) {
    res.write(chunk.text || "");
  }

  res.end()
};

const chatboxController = {
  sendPrompt
};

export default chatboxController;
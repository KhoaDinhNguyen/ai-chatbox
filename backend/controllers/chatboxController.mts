import type { Request, Response } from "express";
import AIChatbox from "../AIChatbox.mts";

const sendPrompt = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ error: "Bad request", message: "The 'body' is undefined" });
  }
  const { prompt } = req.body;

  if (!prompt || typeof prompt != "string") {
    return res.status(400).json({ error: "Bad request", message: "The 'prompt' field must be a string" });
  }

  const response = await AIChatbox.replyPrompt(prompt);
  console.log(response.text);

  res.status(200).json({ "response": response.text });
};

const chatboxController = {
  sendPrompt
};

export default chatboxController;
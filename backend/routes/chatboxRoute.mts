import express from "express"
import chatboxController from "../controllers/chatboxController.mts";

const chatboxRoute = express.Router();

chatboxRoute.post("/chat", chatboxController.sendPrompt);

export default chatboxRoute;
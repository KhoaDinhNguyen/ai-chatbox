import express from "express"
import chatboxController from "../controllers/chatboxController.js";

const chatboxRoute = express.Router();

chatboxRoute.post("/", chatboxController.sendPrompt);

export default chatboxRoute;
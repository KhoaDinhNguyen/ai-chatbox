// Express libraries
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config"
// Routers
import chatboxRoute from "./routes/chatboxRoute.mts";

const app = express();
const port = process.env.PORT || 8080;

// Cors middleware
app.use(cors());

// Express middleware

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Routers listen
app.use("/chatbox", chatboxRoute);

// Listen port
app.listen(port, () => {
  console.log(`Server is listen from port ${port}`);
});

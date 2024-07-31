import express from "express";
import dotenv from "dotenv";
import configure from "./routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();
const app = express();
app.use(express.json());

configure(app);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.use(errorHandler);

export default app;

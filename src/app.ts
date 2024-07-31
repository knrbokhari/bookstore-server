import express from "express";
import dotenv from "dotenv";
import configure from "./routers";

dotenv.config();
const app = express();
app.use(express.json());

configure(app);

app.get("/", (req, res) => {
  res.send("Server running");
});

export default app;

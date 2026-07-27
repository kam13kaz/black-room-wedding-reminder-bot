import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    project: "BLACK ROOM WEDDING REMINDER BOT",
    version: "1.0.0",
    status: "Running 🚀"
  });
});

export default app;
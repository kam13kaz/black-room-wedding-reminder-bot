import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes.js";

import contributorRoutes from "./routes/contributorRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    project: "BLACK ROOM WEDDING REMINDER BOT",
    version: "1.0.0",
    status: "Running 🚀",
  });
});

app.use("/contributors", contributorRoutes);
app.use("/payments", paymentRoutes);

export default app;
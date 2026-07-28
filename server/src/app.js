import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import contributorRoutes from "./routes/contributorRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.get("/", (req, res) => {
  res.json({
    project: "BLACK ROOM WEDDING REMINDER BOT",
    version: "1.0.0",
    status: "Running 🚀",
  });
});

app.use("/contributors", contributorRoutes);
app.use("/payments", paymentRoutes);
app.use("/dashboard", dashboardRoutes);

export default app;
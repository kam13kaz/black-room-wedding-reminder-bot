import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🖤 BLACK ROOM WEDDING REMINDER BOT");
  console.log(`🚀 Server running on port ${PORT}`);
});
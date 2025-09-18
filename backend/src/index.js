import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/finances", financeRoutes);

// Global error middleware
app.use(errorHandler);

(async () => {
  // Database connection
  const connected = await connectDB(process.env.MONGODB_URL);

  // Start server
  if (connected) {
    app.listen(PORT, () => {
      console.log(`Server runing on port:${PORT}`);
    });
  }
})();

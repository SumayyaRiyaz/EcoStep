import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import actionRoutes from "./routes/actionroutes.js";
import { authRoutes } from "./routes/auth.js"; // ✅ Import auth route

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", actionRoutes);
app.use("/api/auth", authRoutes); // ✅ Add login route

// Connect MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

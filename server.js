import "dotenv/config";
import express from "express";
import personRoutes from "./routes/persons.routes.js";
import { getInfo } from "./controllers/persons.controller.js";
import errorHandler from "./middleware/errorHandler.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

// 3.18 — /info uses DB
app.get("/info", getInfo);

// API routes
app.use("/api", personRoutes);

// 3.16 — error handler must be LAST
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err.message));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

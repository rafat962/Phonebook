import express from "express";

import personRoutes from "./routes/persons.routes.js";
import { getInfo } from "./controllers/persons.controller.js";
const app = express();

app.use(express.json());

// ---- routes

app.get("/info", getInfo);

app.use("/api", personRoutes);

const PORT = 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

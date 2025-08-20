import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

const app = express();

app.use(cors({
    origin: "https://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

export default app;

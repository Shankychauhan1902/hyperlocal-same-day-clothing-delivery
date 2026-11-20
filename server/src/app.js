import express from "express";
import cors from "cors";
import helmet from "helmet";
import { catalogRouter, healthRouter, zoneRouter } from "./routes/apiRoutes.js";

export const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));
app.use("/api/health", healthRouter);
app.use("/api/zones", zoneRouter);
app.use("/api/products", catalogRouter);
app.use((_req, res) => res.status(404).json({ error: "Not found." }));

import express from "express";
import cors from "cors";
import "./config/db.js";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "ok",
    time: new Date().toISOString,
    student: "2516501027"
   });
});

app.use("/", eventRoutes);

app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;
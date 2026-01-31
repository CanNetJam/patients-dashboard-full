import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import vitalRoutes from "./routes/vital.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"]
    })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/vitals", vitalRoutes);

app.use(errorHandler);

export default app;

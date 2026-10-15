import "dotenv/config";

import express from "express";
import { rateLimit } from "express-rate-limit";

import { checkDatabaseConnection } from "./db/index.js";
import { usersRouter } from "./routes/users.js";

const app = express();

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        error: "Too many requests. Please try again later.",
    },
});

const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "0.0.0.0";

app.use(express.json());

app.get("/", (_request, response) => {
    response.status(200).json({
        message: "Cipher API is running",
    });
});

app.get("/health", async (_request, response) => {
    try {
        await checkDatabaseConnection();

        return response.status(200).json({
            status: "ok",
            service: "cipher-api",
            database: "connected",
        });
    } catch (error) {
        console.error("Database health check failed:", error);

        return response.status(503).json({
            status: "error",
            service: "cipher-api",
            database: "disconnected",
        });
    }
});

app.use("/api/users", apiLimiter, usersRouter);

app.listen(PORT, HOST, () => {
    console.log(`Cipher API running at http://localhost:${PORT}`);
    console.log(`Listening for local network connections on ${HOST}:${PORT}`);
});
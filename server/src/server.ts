import "dotenv/config";

import express from "express";

import { checkDatabaseConnection } from "./db/index.js";
import { usersRouter } from "./routes/users.js";

const app = express();

const PORT = Number(process.env.PORT ?? 3000);;

app.use(express.json());

app.use("/api/users", usersRouter);

app.get("/", (_request, response) => {
    response.status(200).json({
        name: "Cipher API",
        version: "0.1.0",
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

app.listen(PORT, () => {
    console.log(`Cipher API running at http://localhost:${PORT}`);
});
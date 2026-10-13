import express from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (_request, response) => {
    response.status(200).json({
        name: "Cipher API",
        version: "0.1.0",
    });
});

app.get("/health", (_request, response) => {
    response.status(200).json({
        status: "ok",
        service: "cipher-api",
    });
});

app.listen(PORT, () => {
    console.log(`Cipher API running at http://localhost:${PORT}`);
});
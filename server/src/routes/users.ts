import { randomUUID } from "node:crypto";
import { Router } from "express";

import { users } from "../data/users.js";
import type { User } from "../types/User.js";

export const usersRouter = Router();

usersRouter.get("/", (_request, response) => {
    response.status(200).json(users);
});

usersRouter.get("/:id", (request, response) => {
    const { id } = request.params;

    const user = users.find((currentUser) => currentUser.id === id);

    if (!user) {
        return response.status(404).json({
            error: "User not found.",
        });
    }

    return response.status(200).json(user);
});

usersRouter.post("/", (request, response) => {
    const { username } = request.body;

    if (typeof username !== "string" || username.trim() === "") {
        return response.status(400).json({
            error: "Username is required.",
        });
    }

    const normalizedUsername = username.trim().toLowerCase();

    const existingUser = users.find((user) => user.username.toLowerCase() === normalizedUsername);

    if (existingUser) {
        return response.status(409).json({
            error: "Username already exists.",
        });
    }

    const user: User = {
        id: randomUUID(), 
        username: normalizedUsername,
        createdAt: new Date().toISOString(),
    };

    users.push(user);

    return response.status(201).json(user);
});
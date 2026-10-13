import { Router } from "express";

import { pool } from "../db/index.js";
import type { User } from "../types/User.js";

export const usersRouter = Router();

usersRouter.get("/", async (_request, response) => {
    try {
        const result = await pool.query<User>(`
            SELECT
                id,
                username,
                created_at AS "createdAt"
            FROM users
            ORDER BY created_at ASC
        `);

        return response.status(200).json(result.rows);
    } catch (error) {
        console.error("Failed to retrieve users:", error);

        return response.status(500).json({
            error: "Failed to retrieve users.",
        });
    }
});

usersRouter.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const result = await pool.query<User>(
            `
                SELECT 
                    id,
                    username,
                    created_at AS "createdAt"
                FROM users
                WHERE id::text = $1
            `,
            [id]
        );

        const user = result.rows[0];

        if (!user) {
            return response.status(404).json({
                error: "User not found.",
            });
        }

        return response.status(200).json(user);
    } catch (error) {
        console.error("Failed to retrieve user:", error);

        return response.status(500).json({
            error: "Failed to retrieve user.",
        });
    }
});

usersRouter.post("/", async (request, response) => {
    const { username } = request.body;

    if (typeof username !== "string" || username.trim() === "") {
        return response.status(400).json({
            error: "Username is required.",
        });
    }

    const normalizedUsername = username.trim().toLowerCase();

    try {
        const existingUser = await pool.query<User>(
           `
            SELECT
                id,
                username,
                created_at AS "createdAt"
            FROM users
            WHERE username = $1
            `,
            [normalizedUsername]
        );

        if (existingUser.rows.length > 0) {
            return response.status(409).json({
                error: "Username already exists.",
            });
        }

        const result = await pool.query<User>(
            `
                INSERT INTO users (username)
                VALUES ($1)
                RETURNING
                    id, 
                    username, 
                    created_at AS "createdAt"
            `,
            [normalizedUsername]
        );

        return response.status(201).json(
            result.rows[0]
        );
    } catch (error) {
        console.error("Failed to create user:", error);

        return response.status(500).json({
            error: "Failed to create user.",
        });
    }
});
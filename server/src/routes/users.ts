import { Router } from "express";

import { pool } from "../db/index.js";
import type { ConversationSummary } from "../types/Conversation.js";
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

usersRouter.get("/:userId/conversations", async (request, response) => {
    try {
        const { userId } = request.params;

        const userResult = await pool.query(
            `
                SELECT 1
                FROM users
                WHERE id::text = $1
            `,
            [userId]
        );

        if (userResult.rows.length === 0) {
            return response.status(404).json({
                error: "User not found.",
            });
        }

        const result = await pool.query<ConversationSummary>(
            `
                SELECT
                    c.id::text AS id,
                    c.created_at AS "createdAt",

                    COALESCE(
                        jsonb_agg(
                            jsonb_build_object(
                                'id',
                                member_user.id::text,
                                'username',
                                member_user.username
                            )
                            ORDER BY member_user.username
                        )
                        FILTER (
                            WHERE member_user.id IS NOT NULL
                        ),
                        '[]'::jsonb
                    ) AS members,

                    CASE
                        WHEN last_message.id IS NULL
                            THEN NULL
                        ELSE jsonb_build_object(
                            'id',
                            last_message.id::text,
                            'senderId',
                            last_message.sender_id::text,
                            'content',
                            last_message.content,
                            'createdAt',
                            last_message.created_at
                        )
                    END AS "lastMessage"

                FROM conversations AS c

                JOIN conversation_members
                    AS requested_membership
                    ON requested_membership.conversation_id = 
                        c.id

                JOIN conversation_members
                    AS all_members
                    ON all_members.conversation_id =
                        c.id

                JOIN users AS member_user
                    ON member_user.id =
                        all_members.user_id

                LEFT JOIN LATERAL (
                    SELECT
                        m.id,
                        m.sender_id,
                        m.content,
                        m.created_at
                    FROM messages AS m
                    WHERE m.conversation_id = c.id
                    ORDER BY
                        m.created_at DESC,
                        m.id DESC
                    LIMIT 1
                ) AS last_message
                  ON TRUE
                
                WHERE 
                    requested_membership.user_id::text =
                        $1

                GROUP BY
                    c.id,
                    c.created_at,
                    last_message.id,
                    last_message.sender_id,
                    last_message.content,
                    last_message.created_at

                ORDER BY
                    COALESCE(
                        last_message.created_at,
                        c.created_at
                    ) DESC
            `,
            [userId]
        );

    return response.status(200).json(result.rows);
    } catch (error) {
        console.error("Failed to retrieve conversations:", error);

        return response.status(500).json({
            error: "Failed to retrieve conversations.",
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

    if (
        normalizedUsername.length < 3 ||
        normalizedUsername.length > 32
    ) {
        return response.status(400).json({
            error: "Username must be between 3 and 32 characters.",
        });
    }

    try {
        const result = await pool.query<User>(
           `
            INSERT INTO users (username)
            VALUES ($1)
            ON CONFLICT (username) DO NOTHING
            RETURNING
                id,
                username,
                created_at AS "createdAt"
            `,
            [normalizedUsername]
        );

        if (result.rows.length === 0) {
            return response.status(409).json({
                error: "Username already exists.",
            });
        }

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

import { Router } from "express";

import { pool } from "../db/index.js";
import type { Message } from "../types/Message.js";

export const conversationsRouter = Router();

interface ConversationAccess {
    conversationExists: boolean;
    isMember: boolean;
}

async function getConversationAccess(
    conversationId: string,
    userId: string
) : Promise<ConversationAccess> {
    const result = await pool.query<ConversationAccess>(
        `
            SELECT
                EXISTS(
                    SELECT 1
                    FROM conversations
                    WHERE id::text = $1
                ) AS "conversationExists",

                EXISTS(
                    SELECT 1
                    FROM conversation_members
                    WHERE
                        conversation_id::text = $1
                        AND user_id::text = $2
                ) AS "isMember"
        `,
        [conversationId, userId]
    );

    return result.rows[0];
}

conversationsRouter.get("/:conversationId/messages", async (request, response) => {
    try {
        const { conversationId } = request.params;
        const { userId } = request.query;

        if (typeof userId !== "string" || userId.trim() === "") {
            return response.status(400).json({
                error: "userId is required.",
            });
        }

        const access = await getConversationAccess(conversationId, userId);

        if (!access.conversationExists) {
            return response.status(404).json({
                error: "Conversation not found.",
            });
        }

        if (!access.isMember) {
            return response.status(403).json({
                error: "User is not a member of this conversation.",
            });
        }

        const result = await pool.query<Message>(
            `
                SELECT
                    id::text AS id,
                    conversation_id::text
                        AS "conversationId",
                    sender_id::text AS "senderId",
                    content, 
                    created_at AS "createdAt"
                FROM messages
                WHERE conversation_id::text = $1
                ORDER BY
                    created_at ASC,
                    id ASC
            `,
            [conversationId]
        );

        return response.status(200).json(result.rows);
    } catch (error) {
        console.error("Failed to retrieve messages:", error);

        return response.status(500).json({
            error: "Failed to retrieve messages.",
        });
    }
});

conversationsRouter.post("/:conversationId/messages", async (request, response) => {
    try {
        const { conversationId } = request.params;

        const { senderId, content, } = request.body ?? {};

        if (typeof senderId !== "string" || senderId.trim() === "") {
            return response.status(400).json({
                error: "senderId is required.",
            });
        }

        if (typeof content !== "string") {
            return response.status(400).json({
                error: "Message content is required.",
            });
        }

        const normalizedContent = content.trim();

        if (normalizedContent.length < 1 || normalizedContent.length > 2000) {
            return response.status(400).json({
                error: "Message content must be between 1 and 2000 characters.",
            });
        }

        const access = await getConversationAccess(conversationId, senderId);

        if (!access.conversationExists) {
            return response.status(404).json({
                error: "Conversation not found.",
            });
        }

        if (!access.isMember) {
            return response.status(403).json({
                error: "Sender is not a member of this conversation.",
            });
        }

        const result = await pool.query<Message>(
            `
                INSERT INTO messages (
                    conversation_id,
                    sender_id,
                    content
                )
                VALUES (
                    $1::uuid,
                    $2::uuid,
                    $3
                )
                RETURNING
                    id::text AS id,
                    conversation_id::text AS "conversationId",
                    sender_id::text AS "senderId",
                    content,
                    created_at AS "createdAt"
            `,
            [conversationId, senderId, normalizedContent]
        );

        return response.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Failed to create message:", error);

        return response.status(500).json({
            error: "Failed to create message.",
        });
    }
});
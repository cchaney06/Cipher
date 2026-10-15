export interface ConversationMember {
    id: string;
    username: string;
}

export interface ConversationLastMessage {
    id: string;
    senderId: string;
    content: string;
    createdAt: string;
}

export interface ConversationSummary {
    id: string;
    createdAt: string;
    members: ConversationMember[];
    lastMessage: ConversationLastMessage | null;
}
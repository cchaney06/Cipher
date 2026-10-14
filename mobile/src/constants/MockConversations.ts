import { Conversation } from "../types/Conversation";

export const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Sam Carter",
    lastMessage: "Are you free tonight?",
    lastMessageAt: "2026-09-16T16:12:00-05:00",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Jordan Smith",
    lastMessage: "Sounds good, see you then!",
    lastMessageAt: "2026-09-16T14:35:00-05:00",
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Taylor Williams",
    lastMessage: "Did you finish the project?",
    lastMessageAt: "2026-09-16T11:08:00-05:00",
    unreadCount: 1,
  },
  {
    id: "4",
    name: "Morgan Lee",
    lastMessage: "Thanks!",
    lastMessageAt: "2026-09-15T21:42:00-05:00",
    unreadCount: 0,
  },
  {
    id: "5",
    name: "Casey Harris",
    lastMessage: "",
    lastMessageAt: "2026-09-17T12:00:00-05:00",
    unreadCount: 0,
  },
];

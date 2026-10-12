import { Message } from "../types/Message";

import { mockCurrentUser } from "./MockCurrentUser";

export const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      senderId: "ryan",
      content: "Hey! Are you free later?",
      createdAt: "2026-09-17T10:15:00-05:00",
    },
    {
      id: "2",
      senderId: mockCurrentUser.id,
      content: "Yeah, I should be.",
      createdAt: "2026-09-17T10:17:00-05:00",
    },
    {
      id: "3",
      senderId: "ryan",
      content: "Want to grab something to eat?",
      createdAt: "2026-09-17T10:18:00-05:00",
    },
  ],

  "2": [
    {
      id: "4",
      senderId: "jordan",
      content: "Are we still meeting tomorrow?",
      createdAt: "2026-09-16T14:30:00-05:00",
    },
    {
      id: "5",
      senderId: mockCurrentUser.id,
      content: "Yep!",
      createdAt: "2026-09-16T14:32:00-05:00",
    },
  ],

  "3": [
    {
      id: "6",
      senderId: "taylor",
      content: "Did you finish the project?",
      createdAt: "2026-09-16T11:08:00-05:00",
    },
  ],

  "4": [
    {
      id: "7",
      senderId: mockCurrentUser.id,
      content: "Thanks for the help!",
      createdAt: "2026-09-15T21:40:00-05:00",
    },
    {
      id: "8",
      senderId: "morgan",
      content: "No problem!",
      createdAt: "2026-09-15T21:42:00-05:00",
    },
  ],
};

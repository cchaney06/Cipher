export interface HealthResponse {
  status: string;
  service: string;
  database: string;
}

export interface ApiUser {
  id: string;
  username: string;
  createdAt: string;
}

export interface ApiConversationMember {
  id: string;
  username: string;
}

export interface ApiConversationLastMessage {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface ApiConversation {
  id: string;
  createdAt: string;
  members: ApiConversationMember[];
  lastMessage: ApiConversationLastMessage | null;
}

export interface ApiMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

function getApiBaseUrl(): string {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("EXPO_PUBLIC_API_URL is not configured.");
  }

  return apiUrl.replace(/\/$/, "");
}

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${getApiBaseUrl()}/health`);

  if (!response.ok) {
    throw new Error(`Health request failed with status ${response.status}.`);
  }

  return response.json();
}

export async function getUsers(): Promise<ApiUser[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/users`);

  if (!response.ok) {
    throw new Error(`Users request failed with status ${response.status}.`);
  }

  return response.json();
}

export async function getUserByUsername(username: string): Promise<ApiUser> {
  const users = await getUsers();
  const normalizedUsername = username.trim().toLowerCase();
  const user = users.find(
    (item) => item.username.toLowerCase() === normalizedUsername,
  );

  if (!user) {
    throw new Error(`Backend user "${normalizedUsername}" was not found.`);
  }

  return user;
}

export async function getUserConversations(
  userId: string,
): Promise<ApiConversation[]> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/users/${encodeURIComponent(userId)}/conversations`,
  );

  if (!response.ok) {
    throw new Error(
      `Conversations request failed with status ${response.status}.`,
    );
  }

  return response.json();
}

export async function getConversationMessages(
  conversationId: string,
  userId: string,
): Promise<ApiMessage[]> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/conversations/${encodeURIComponent(conversationId)}/messages?userId=${encodeURIComponent(userId)}`,
  );

  if (!response.ok) {
    throw new Error(`Messages request failed with status ${response.status}.`);
  }

  return response.json();
}

export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string,
): Promise<ApiMessage> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/conversations/${encodeURIComponent(conversationId)}/messages`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId, content }),
    },
  );

  if (!response.ok) {
    throw new Error(`Message creation failed with status ${response.status}.`);
  }

  return response.json();
}

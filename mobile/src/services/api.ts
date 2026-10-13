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

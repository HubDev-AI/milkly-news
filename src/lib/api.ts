const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

interface ApiResponse<T> {
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

interface ApiError {
  error: {
    message: string;
    code: string;
  };
}

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return undefined as T;
  }

  const data = await response.json();

  if (!response.ok) {
    const error = data as ApiError;
    throw new Error(error.error?.message || "API request failed");
  }

  return (data as ApiResponse<T>).data;
}

export interface PublicNewsletter {
  id: string;
  title: string;
  publishedAt: string | null;
  streamName: string;
  author: string;
}

export interface PublicNewsletterDetail extends PublicNewsletter {
  content: string;
  userId: string | null;
  type: "newsletter" | "linked";
}

export interface PublicStream {
  id: string;
  name: string;
}

export interface SubscribeResponse {
  message: string;
  subscribed: boolean;
}

export interface SubscriptionStatus {
  subscribed: boolean;
}

export interface UnsubscribeResponse {
  message: string;
  newsletterTitle?: string;
}

export const api = {
  // Get all published newsletters
  getNewsletters: (page = 1, limit = 20) =>
    fetchApi<PublicNewsletter[]>(`/api/v1/public/newsletters?page=${page}&limit=${limit}`),

  // Get single newsletter
  getNewsletter: (id: string) =>
    fetchApi<PublicNewsletterDetail>(`/api/v1/public/newsletters/${id}`),

  // Get streams with published newsletters
  getStreams: () => fetchApi<PublicStream[]>("/api/v1/public/streams"),

  // Get newsletters for a stream
  getStreamNewsletters: (streamId: string, page = 1, limit = 20) =>
    fetchApi<PublicNewsletter[]>(
      `/api/v1/public/streams/${streamId}/newsletters?page=${page}&limit=${limit}`
    ),

  // Subscribe to a newsletter
  subscribeToNewsletter: (newsletterId: string, email: string) =>
    fetchApi<SubscribeResponse>(`/api/v1/public/newsletters/${newsletterId}/subscribe`, {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  // Unsubscribe from a newsletter
  unsubscribeFromNewsletter: (newsletterId: string, email: string) =>
    fetchApi<SubscribeResponse>(`/api/v1/public/newsletters/${newsletterId}/unsubscribe`, {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  // Check subscription status
  getSubscriptionStatus: (newsletterId: string, email: string) =>
    fetchApi<SubscriptionStatus>(
      `/api/v1/public/newsletters/${newsletterId}/subscription-status?email=${encodeURIComponent(email)}`
    ),

  // Unsubscribe via token
  unsubscribeByToken: (token: string) =>
    fetchApi<UnsubscribeResponse>(`/api/v1/public/unsubscribe/${token}`),

  // Subscribe to a stream
  subscribeToStream: (streamId: string, email: string) =>
    fetchApi<SubscribeResponse>(`/api/v1/public/streams/${streamId}/subscribe`, {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};

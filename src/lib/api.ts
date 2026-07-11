export interface Account {
  id: number;
  email: string;
}

export interface ApiProfile {
  name: string;
  height: string;
  weight: string;
  age: string;
  gender: "male" | "female";
  goal: "lose_weight" | "gain_muscle" | "maintain" | "endurance";
  targetWeight: string;
  workoutsPerWeek: number;
}

export interface MenuItem {
  id: number;
  name: string;
  calories: number;
  priceCents: number;
  image: string;
  description: string;
  protein: number;
}

export interface KitchenOrder {
  id: number;
  calorieTarget: number;
  notes: string;
  status: string;
  totalCents: number;
  createdAt: string;
  mealName: string | null;
}

export interface CommunityPost {
  id: string;
  topic: "Training" | "Nutrition";
  user: string;
  avatar: string;
  time: string;
  body: string;
  img: string | null;
  likes: number;
  comments: number;
  liked: boolean;
}

const TOKEN_KEY = "kho-mon-gym:auth-token";

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(message: string, status: number, code = "REQUEST_ERROR") {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(path, { ...options, headers });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === 401) setToken(null);
    throw new ApiError(payload?.error?.message ?? "The request could not be completed.", response.status, payload?.error?.code);
  }
  return payload as T;
}

export const api = {
  register: (email: string, password: string) => request<{ token: string; user: Account; profile: ApiProfile | null }>("/api/auth/register", { method: "POST", body: JSON.stringify({ email, password }) }),
  login: (email: string, password: string) => request<{ token: string; user: Account; profile: ApiProfile | null }>("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  me: () => request<{ user: Account; profile: ApiProfile | null }>("/api/auth/me"),
  logout: () => request<{ ok: boolean }>("/api/auth/logout", { method: "POST" }),
  saveProfile: (profile: ApiProfile) => request<{ profile: ApiProfile }>("/api/profile", { method: "PUT", body: JSON.stringify(profile) }),
  resetProfile: () => request<{ ok: boolean }>("/api/profile", { method: "DELETE" }),
  getCheckins: () => request<{ dates: string[]; streak: number }>("/api/checkins"),
  checkin: (date: string) => request<{ date: string; dates: string[]; streak: number }>("/api/checkins", { method: "POST", body: JSON.stringify({ date }) }),
  getMenu: () => request<{ items: MenuItem[] }>("/api/menu"),
  getOrders: () => request<{ orders: KitchenOrder[] }>("/api/orders"),
  createOrder: (input: { calorieTarget: number; notes: string; menuItemId: number | null }) => request<{ order: KitchenOrder }>("/api/orders", { method: "POST", body: JSON.stringify(input) }),
  getPosts: (topic?: "Training" | "Nutrition") => request<{ posts: CommunityPost[] }>(`/api/posts${topic ? `?topic=${topic}` : ""}`),
  createPost: (input: { topic: "Training" | "Nutrition"; body: string; imageUrl?: string }) => request<{ post: CommunityPost }>("/api/posts", { method: "POST", body: JSON.stringify(input) }),
  setPostLike: (postId: string, liked: boolean) => request<{ liked: boolean; likes: number }>(`/api/posts/${postId}/like`, { method: liked ? "POST" : "DELETE" }),
};

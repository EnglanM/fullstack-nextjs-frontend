const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";


export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface RegisterResponse {
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  error?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  message?: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  error?: string;
}

export interface ApiError {
  message: string;
  error?: string;
}

export async function registerUser(
  data: RegisterRequest
): Promise<RegisterResponse> {
  console.log("inside the fetch function");
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.error || "Registration failed");
  }

  return result;
}

export async function signInUser(
  data: SignInRequest
): Promise<SignInResponse> {
  console.log("inside the sign in function");
  const response = await fetch(`${API_BASE_URL}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.error || "Sign in failed");
  }

  return result;
}

export async function getUsers(): Promise<User[]> {
  console.log(`${API_BASE_URL}/auth/users`);
  const response = await fetch(`${API_BASE_URL}/auth/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || error.error || "Failed to fetch users");
  }

  return response.json();
}


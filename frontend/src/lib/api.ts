/**
 * API utility for making requests to the backend
 */

// API base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// Log the API URL for debugging
console.log("API URL:", API_BASE_URL);

// Types
export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

// Get auth token from localStorage
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

// Generic request function
async function request<T>(
  endpoint: string,
  method: string = "GET",
  data?: any,
  requiresAuth: boolean = false,
): Promise<ApiResponse<T>> {
  try {
    // Prepare headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Add auth token if required
    if (requiresAuth) {
      const token = getToken();
      if (!token) {
        return { data: null, error: "Authentication required" };
      }
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Prepare request options
    const options: RequestInit = {
      method,
      headers,
      // Only include credentials if we're using cookies
      // For JWT auth with Authorization header, this isn't needed
      // credentials: 'include',
    };

    // Add body if data is provided
    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
      options.body = JSON.stringify(data);
    }

    // Log request for debugging
    console.log(`Making ${method} request to ${API_BASE_URL}${endpoint}`);

    // Make request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    // Parse response
    const responseData = await response.json();

    // Handle error responses
    if (!response.ok) {
      console.error("API error:", responseData);
      return {
        data: null,
        error:
          responseData.error || `Request failed with status ${response.status}`,
      };
    }

    // Return success response
    return {
      data: responseData,
      error: null,
    };
  } catch (error) {
    // Handle unexpected errors
    console.error("API request error:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

// API methods
export const api = {
  // Auth endpoints
  auth: {
    signup: (data: { name: string; email: string; password: string }) =>
      request<{ token: string; user: any }>("/auth/signup", "POST", data),

    login: (data: { email: string; password: string }) =>
      request<{ token: string; user: any }>("/auth/login", "POST", data),

    forgotPassword: (data: { email: string }) =>
      request<{ message: string }>("/auth/forgot-password", "POST", data),

    me: () => request<any>("/auth/me", "GET", undefined, true),
  },

  // User endpoints
  user: {
    getProfile: () => request<any>("/user/profile", "GET", undefined, true),

    updateProfile: (data: any) =>
      request<any>("/user/profile", "PUT", data, true),
  },

  // Add more API endpoints as needed
};

// Auth utilities
export const auth = {
  isAuthenticated: (): boolean => {
    return !!getToken();
  },

  logout: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
  },

  getToken,
};

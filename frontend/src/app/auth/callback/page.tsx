"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setError("No authentication token received");
      return;
    }

    // Store token in localStorage
    localStorage.setItem("auth_token", token);

    // Refresh user data
    refreshUser()
      .then(() => {
        // Redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      })
      .catch((err) => {
        console.error("Error refreshing user:", err);
        setError("Authentication successful, but failed to load user data");
      });
  }, [router, searchParams, refreshUser]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-red-500">
            Authentication Error
          </h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="text-primary hover:underline"
          >
            Return to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <Loader2 className="text-primary mx-auto mb-4 h-12 w-12 animate-spin" />
        <h1 className="mb-2 text-2xl font-bold">Authentication Successful</h1>
        <p className="text-muted-foreground">
          Redirecting you to the application...
        </p>
      </div>
    </div>
  );
}

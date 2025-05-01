"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import {
  Zap,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Simple password strength checker
    let strength = 0;
    if (newPassword.length > 6) strength += 1;
    if (newPassword.match(/[A-Z]/)) strength += 1;
    if (newPassword.match(/[0-9]/)) strength += 1;
    if (newPassword.match(/[^A-Za-z0-9]/)) strength += 1;

    setPasswordStrength(strength);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate password strength
    if (passwordStrength < 3) {
      setError("Please create a stronger password");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signup(name, email, password);

      if (!result.success) {
        setError(result.error || "Signup failed");
        return;
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b py-4">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Zap className="text-primary h-6 w-6" />
              <span className="text-xl font-bold">Zyply</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Create an account
              </CardTitle>
              <CardDescription>
                Enter your information to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  {password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-1 text-xs">
                        <div className="bg-muted h-1 flex-1 overflow-hidden rounded-full">
                          <div
                            className={`h-full ${
                              passwordStrength === 0
                                ? "bg-destructive"
                                : passwordStrength === 1
                                  ? "bg-destructive/80"
                                  : passwordStrength === 2
                                    ? "bg-yellow-500"
                                    : passwordStrength === 3
                                      ? "bg-green-500/80"
                                      : "bg-green-500"
                            }`}
                            style={{
                              width: `${(passwordStrength / 4) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-muted-foreground">
                          {passwordStrength === 0 && "Weak"}
                          {passwordStrength === 1 && "Fair"}
                          {passwordStrength === 2 && "Good"}
                          {passwordStrength === 3 && "Strong"}
                          {passwordStrength === 4 && "Excellent"}
                        </span>
                      </div>
                      <ul className="text-muted-foreground mt-2 space-y-1 text-xs">
                        <li className="flex items-center gap-1">
                          {password.length > 6 ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <span className="h-3 w-3 rounded-full border" />
                          )}
                          At least 7 characters
                        </li>
                        <li className="flex items-center gap-1">
                          {password.match(/[A-Z]/) ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <span className="h-3 w-3 rounded-full border" />
                          )}
                          At least one uppercase letter
                        </li>
                        <li className="flex items-center gap-1">
                          {password.match(/[0-9]/) ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <span className="h-3 w-3 rounded-full border" />
                          )}
                          At least one number
                        </li>
                        <li className="flex items-center gap-1">
                          {password.match(/[^A-Za-z0-9]/) ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <span className="h-3 w-3 rounded-full border" />
                          )}
                          At least one special character
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-muted-foreground text-sm"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {error && (
                  <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card text-muted-foreground px-2">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      (window.location.href = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"}/auth/google`)
                    }
                  >
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      (window.location.href = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"}/auth/github`)
                    }
                  >
                    GitHub
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

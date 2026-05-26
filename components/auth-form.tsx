"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (mode === "register") {
      const name = formData.get("name") as string;

      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Registration failed");
          setIsLoading(false);
          return;
        }

        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInResult?.error) {
          setError("Registration succeeded but login failed. Please try logging in.");
        } else {
          router.push("/dashboard");
        }
      } catch {
        setError("An error occurred");
      }
    } else {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    }

    setIsLoading(false);
  }

  return (
    <Card className={cn(
      "w-full max-w-md relative animate-slide-up border-white/[0.06]",
      mode === "login" ? "bg-white/[0.02]" : "bg-white/[0.02]"
    )}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-white">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {mode === "login"
            ? "Enter your credentials to access your account"
            : "Enter your details to get started with TaskFlow"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                disabled={isLoading}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              disabled={isLoading}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              disabled={isLoading}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50"
            />
          </div>
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400 animate-scale-in">
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "login" ? "Signing in..." : "Creating account..."}
              </>
            ) : (
              mode === "login" ? "Sign In" : "Create Account"
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-500">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          </span>
          <Link
            href={mode === "login" ? "/auth/register" : "/auth/login"}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

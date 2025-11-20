"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, InputField, Card, CardHeader, CardTitle, CardDescription, CardContent, Modal } from "@/components/ui";
import { signInUser, type SignInRequest } from "@/lib/api";

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignInRequest>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignInRequest, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignInRequest, string>> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof SignInRequest]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log("formdata:", formData);
      const response = await signInUser(formData);
      
      // Store token if provided
      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }
      
      setSuccess(true);
      setShowSuccessModal(true);
      setFormData({ email: "", password: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <Card variant="elevated" padding="lg">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && (
                <div
                  className="rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400"
                  role="alert"
                  aria-live="polite"
                >
                  {error}
                </div>
              )}

              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                fullWidth
                autoComplete="email"
                aria-describedby={errors.email ? "email-error" : undefined}
              />

              <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
                fullWidth
                autoComplete="current-password"
                aria-describedby={errors.password ? "password-error" : undefined}
              />

              <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Sign In
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => router.push("/")}
                >
                  Cancel
                </Button>
              </div>

              <div className="pt-4 text-center text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/register")}
                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/users");
        }}
        title="Sign In Successful!"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            You have successfully signed in. Welcome back!
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="primary"
              onClick={() => {
                setShowSuccessModal(false);
                router.push("/users");
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


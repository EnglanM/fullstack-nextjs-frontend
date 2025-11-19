"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, InputField, Card, CardHeader, CardTitle, CardDescription, CardContent, Modal } from "@/components/ui";
import { registerUser, type RegisterRequest } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterRequest>({
    email: "",
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterRequest, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegisterRequest, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof RegisterRequest]) {
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
      const response = await registerUser(formData);
      setSuccess(true);
      setShowSuccessModal(true);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <Card variant="elevated" padding="lg">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>
              Register a new user account to get started
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
                label="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
                fullWidth
                autoComplete="name"
                aria-describedby={errors.name ? "name-error" : undefined}
              />

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
                autoComplete="new-password"
                helperText="Must be at least 6 characters"
                aria-describedby={errors.password ? "password-error" : "password-helper"}
              />

              <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Register
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
        title="Registration Successful!"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Your account has been created successfully. You can now view the user list.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="primary"
              onClick={() => {
                setShowSuccessModal(false);
                router.push("/users");
              }}
            >
              View Users
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


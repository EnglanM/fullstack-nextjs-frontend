"use client";

import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Fullstack Next.js Frontend
          </h1>
          <ThemeToggle />
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl">
              Welcome
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              A modular frontend with reusable UI components
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card variant="elevated" padding="lg">
              <CardHeader>
                <CardTitle>UI Component Library</CardTitle>
                <CardDescription>
                  Reusable components with full customization support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Button</li>
                  <li>• Modal</li>
                  <li>• InputField</li>
                  <li>• Tabs</li>
                  <li>• Card</li>
                </ul>
              </CardContent>
            </Card>

            <Card variant="elevated" padding="lg">
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Sign in to your existing account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => router.push("/signin")}
                >
                  Sign In
                </Button>
              </CardContent>
            </Card>

            <Card variant="elevated" padding="lg">
              <CardHeader>
                <CardTitle>Registration</CardTitle>
                <CardDescription>
                  Create new user accounts with validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => router.push("/register")}
                >
                  Register User
                </Button>
              </CardContent>
            </Card>

            <Card variant="elevated" padding="lg">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage all registered users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => router.push("/users")}
                >
                  View Users
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push("/signin")}
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push("/register")}
            >
              Get Started - Register
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/users")}
            >
              View All Users
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

# Fullstack Next.js Frontend

A modular frontend application built with Next.js 16, React 19, and TypeScript, featuring a reusable UI component library and integration with a backend API.

## Features

### UI Component Library

The project includes a comprehensive set of reusable UI components:

- **Button** - Customizable button with multiple variants (primary, secondary, outline, ghost, danger) and sizes
- **Modal** - Accessible modal dialog with keyboard navigation and overlay click handling
- **InputField** - Form input with label, error handling, and helper text support
- **Tabs** - Tab navigation component with keyboard accessibility
- **Card** - Flexible card component with header, title, description, and content sections

All components feature:
- Full TypeScript support
- Responsive design for mobile devices
- Accessibility (ARIA attributes, keyboard navigation)
- Dark mode support
- Customizable props and styling

### Application Pages

- **Home Page** (`/`) - Landing page with navigation to other features
- **Registration Page** (`/register`) - User registration form with validation
- **User List Page** (`/users`) - Display all registered users with refresh capability

### Additional Features

- **Dark Mode** - Theme switcher with system preference detection
- **State Management** - Proper loading, error, and success state handling
- **API Integration** - Connects to backend gateway endpoints
- **Form Validation** - Client-side validation with error messages
- **Responsive Design** - Mobile-first approach with TailwindCSS

## Tech Stack

- **Framework**: Next.js 16.0.3 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: TailwindCSS 4
- **Code Quality**: ESLint, Prettier
- **Utilities**: clsx, tailwind-merge

## Prerequisites

- Node.js 18+ (check `.nvmrc` for recommended version)
- npm or yarn package manager

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fullstack-nextjs-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

   Replace `http://localhost:3001` with your backend API gateway URL.

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**

   ```bash
   npm run build
   npm start
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
fullstack-nextjs-frontend/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── register/          # Registration page
│   ├── users/             # User list page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI component library
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── InputField.tsx
│   │   ├── Tabs.tsx
│   │   ├── Card.tsx
│   │   └── index.ts      # Component exports
│   ├── ThemeProvider.tsx # Dark mode provider
│   └── ThemeToggle.tsx   # Theme switcher
├── lib/                  # Utility functions
│   ├── api.ts           # API client functions
│   └── utils.ts         # Utility functions (cn)
└── public/              # Static assets
```

## API Integration

The frontend integrates with the backend gateway API:

- **POST /auth/register** - Register a new user
  - Request body: `{ username: string, email: string, password: string }`
  - Response: User object or error message

- **GET /auth/users** - Get all registered users
  - Response: Array of user objects

The API base URL is configured via the `NEXT_PUBLIC_API_URL` environment variable.

## Component Usage Examples

### Button

```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

### Modal

```tsx
import { Modal } from "@/components/ui";

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Example Modal"
>
  <p>Modal content goes here</p>
</Modal>
```

### InputField

```tsx
import { InputField } from "@/components/ui";

<InputField
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  required
/>
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

<Card variant="elevated" padding="lg">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content
  </CardContent>
</Card>
```

## Accessibility

All components are built with accessibility in mind:

- Proper ARIA attributes (`aria-label`, `aria-describedby`, `aria-invalid`, etc.)
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Semantic HTML elements

## Responsive Design

The application uses a mobile-first approach with TailwindCSS:
 
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Components adapt to different screen sizes
- Touch-friendly interactive elements

## Dark Mode

Dark mode is implemented with:

- System preference detection
- Manual theme switching
- Persistent theme preference (localStorage)
- Smooth transitions between themes

## Development

### Code Style

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

### Best Practices

- Server and client components are separated appropriately
- Components are reusable and composable
- Error boundaries and proper error handling
- Loading states for async operations

## Deployment

The application can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting platform**

Make sure to set the `NEXT_PUBLIC_API_URL` environment variable in your deployment platform.

## License

This project is part of a fullstack development task.

## Contributing

This is a task submission project. For questions or issues, please refer to the project requirements.

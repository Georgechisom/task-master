# TaskMaster - Task Creation Form Setup

This document provides setup instructions for the Task Creation Form feature integrated with Supabase in the TaskMaster React TypeScript project.

## Features

- Task creation form using shadcn/ui components with Tailwind CSS styling.
- Integration with Supabase for authenticated task creation.
- Client-side validation with Zod and react-hook-form.
- Toast notifications for success and error feedback.
- Redirects unauthenticated users to the authentication page.

## Setup Instructions

### 1. Environment Variables

Ensure you have the following environment variables set in your `.env` or `.env.local` file:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with your actual Supabase project credentials.

### 2. Dependencies

Install the following dependencies if not already installed:

```bash
npm install react-hook-form zod @hookform/resolvers react-hot-toast react-router-dom
```

### 3. TypeScript Types

The task-related types are defined in `src/types/database.types.ts`. Ensure this file exists with the following interfaces:

- `Task`
- `TaskInsert`
- `Priority` and `Status` enums

### 4. TaskForm Component

The `TaskForm` component is located at `src/components/TaskForm.tsx`. It uses:

- shadcn/ui components: Card, Input, Textarea, Select, Button, Label
- react-hook-form with Zod for validation
- react-hot-toast for notifications
- Tailwind CSS for styling and animations

### 5. Tasks Page

The `Tasks` page (`src/pages/Tasks.tsx`) imports and uses the `TaskForm` component. It checks for authenticated users using Supabase's `getUser` method and redirects unauthenticated users to `/auth`.

### 6. Running the App

Start your development server (e.g., `npm run dev` for Vite) and navigate to `/tasks` after logging in. You should see the task creation form with all required fields.

### 7. Testing

- Try creating a new task with valid data.
- Verify toast notifications appear on success or error.
- Confirm unauthenticated users are redirected to `/auth`.

## Notes

- The form uses strict TypeScript typing and client-side validation.
- The UI supports dark mode by default.
- Animations use Tailwind CSS utilities; no Framer Motion is used.
- Ensure your Supabase RLS policies allow inserts with `user_id = auth.uid()`.

## Troubleshooting

- If you encounter module or type errors, ensure all dependencies are installed and your IDE is configured for TypeScript.
- Verify environment variables are correctly set and accessible.
- Check network requests to Supabase for any errors.

---

This setup enables a premium task creation experience integrated with Supabase authentication and database.

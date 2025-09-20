# TaskMaster: Rules

Overview
These project rules govern how multiple AI systems Trae referred to, collaborate on the development of TaskMaster, a web based task management app built with React and Supabase. The rules ensure that AI contributions align with the project’s goals, maintain code quality, and streamline workflows for developers, designers, and testers.

Project Context: TaskMaster enables individuals and small teams to manage tasks with features like task creation, real time sync, collaboration, and notifications, using Supabase for backend services.

AI Roles: Trae focuses on code generation, testing, documentation, and supports additional tasks like code reviews, UI suggestions, or debugging.
Objective: Enable AIs to work harmoniously, avoid conflicts, and deliver a robust MVP within the timeline.

# Project Rules

1. Role Definitions

Primary Tasks:
Generate React components, Supabase queries, and API integrations based on feature requirements.
Write unit and integration tests using Jest and React Testing Library.
Create and maintain documentation (docstrings, inline comments, README updates).
Provide debugging suggestions based on error logs or Sentry reports.

Strengths: Context-aware code generation, testing, and documentation with access to project specs and file structures.

Tasks (configurable based on AI-2’s capabilities):
Perform code reviews to ensure adherence to coding standards (e.g., ESLint rules).
Suggest UI/UX improvements based on Figma wireframes or Tailwind CSS styles.
Generate boilerplate for edge cases (e.g., error handling, edge function logic).
Assist with performance optimization (e.g., query indexing, caching strategies).

Assumed Strengths: Complementary support for code quality, UI suggestions, or specialized tasks.

Human Oversight: Developers review AI-generated outputs, resolve conflicts, and approve merges. AI do not commit directly to the main branch.

2. Workflow Guidelines

Context Sharing:
Both AIs receive the project scope, tech stack (React, Supabase, Tailwind), and file structure (src/components, src/api, etc.) via prompts or shared documentation.
Provide Supabase API specs (e.g., REST endpoints, RLS policies) and database schema (users, tasks, categories) to ensure accurate code generation.
Share git diffs or recent changes to align AI outputs with current codebase state.

Task Assignment:
Assign tasks based on AI strengths:
Scaffolding features (e.g., "Generate a TaskForm component with validation"), writing tests, and updating README.
Reviewing Grok 3’s code, suggesting optimizations, or generating UI variants (e.g., "Propose a Tailwind CSS style for a Kanban board").

Use clear prompts with specific outputs (e.g., "Return a Jest test for task creation API, handling 200 and 401 responses").

Conflict Resolution:
If AIs produce conflicting code (e.g., different implementations of a task filter), Grok 3 takes precedence for core logic, while AI-2’s suggestions are used for refinements.
Human developers resolve conflicts via pull request reviews.

Version Control:
AIs generate code in isolated branches (e.g., feature/task-crud-grok3, review/ai2-taskform).
Use GitHub Actions for CI/CD to lint (ESLint) and test (Jest) AI outputs before merging.

3. Code Quality Standards

Coding Standards:
Follow ESLint and Prettier rules defined in .eslintrc and .prettierrc.
Use JSDoc for function/component documentation (e.g., @param, @returns).
Adhere to React best practices (e.g., functional components, hooks).

Supabase Integration:
Queries must use Supabase’s JavaScript client (@supabase/supabase-js).
Implement Row-Level Security (RLS) for all database operations (e.g., users only access their tasks).
Handle errors explicitly (e.g., try-catch for API calls).

AI Prompts:
Generate a React component for task creation with Supabase integration, following ESLint rules.
Review this React component for performance issues and suggest Tailwind CSS improvements.

Output Format:
Code: Return in markdown code blocks (jsx, sql).
Documentation: Use markdown for README updates or inline JSDoc.

4. AI Integration Strategy

Code Generation:
Scaffold features like task CRUD, authentication, and real-time sync. Example prompt: "Generate a Supabase query to fetch tasks by user ID, sorted by due date, with RLS."
Generate edge cases or boilerplate (e.g., "Create error handling for a failed task update"). Feed Grok 3’s output to AI-2 for review.
Context: Provide file tree (src/components/TaskList.js), Supabase schema, or API endpoints to ensure alignment.

Testing:
Write Jest tests for components and APIs. Example prompt: "Create Jest tests for a TaskList component, testing loading and error states."
Validate tests or suggest additional cases (e.g., "Add edge case tests for empty task lists").
Context: Share component code or API specs to generate relevant tests.

Documentation:
Update README and generate JSDoc. Example prompt: "Write a README section for task collaboration using Supabase RLS."
Proofread or enhance readability of documentation (e.g., "Simplify this README section for non-technical users").
Context: Provide project scope or recent changes to keep docs current.

Debugging:
Analyze Sentry logs for bug fixes. Example prompt: "Suggest a fix for a Supabase timeout error in task creation."
Propose performance optimizations (e.g., "Optimize this query for faster task retrieval").
Context: Share error logs, stack traces, or diffs for precise fixes.

5. Communication Protocols

Prompt Clarity:
Use specific, detailed prompts with expected outputs (e.g., "Return a React hook for fetching tasks, handling loading/error states").
Include context like file paths, schemas, or feature requirements.

Feedback Loop:
Developers review AI outputs within 24 hours and provide feedback (query is correct but lacks pagination; add pagination logic").
AIs log feedback for iterative improvement (e.g., stores feedback in memory for future prompts).

Error Handling:
If an AI produces incorrect code, developers flag it with details (e.g., "component uses outdated Supabase syntax").
AI can cross check output for accuracy.

6. Scalability and Limitations

Scalability:
AIs must generate code optimized for Supabase’s PostgreSQL (e.g., indexed queries for task retrieval).
Limit API calls to avoid Supabase rate limits (e.g., batch task updates).

Limitations:
Trae cannot commit code directly or access real-time server logs without developer input, capabilities depend on its configuration (e.g., no UI design if not trained for it).
Must require human validation for security critical code (e.g., RLS policies).

7. Example Workflow

Feature Development:
Developer prompts: "Generate a React TaskForm component with Supabase integration for task creation."
returns code in feature/task-form branch.
reviews: "Check TaskForm for accessibility and Tailwind CSS consistency."
Developer merges after review.

Testing:
Trae: "Write Jest tests for TaskForm, covering form validation and API errors."
reviews: "Add edge case tests for empty form submissions."

Documentation:
Trae: "Update README with TaskForm feature description."
reviews: "Simplify README language for clarity."

Getting Started

Setup AI Access:
Configure Grok 3 via xAI’s API or IDE plugin.
Set up AI-2 (e.g., GitHub Copilot in VS Code or Claude API).

Share Context:
Provide project scope, Supabase credentials (read-only), and file structure to both AIs.

Run Locally:
Clone repo: git clone [repo-url].
Install: npm install.
Start: npm start.

Prompt AIs:
Use specific prompts with file references (e.g., src/api/tasks.js).
Log outputs in docs/ai-outputs/ for review.

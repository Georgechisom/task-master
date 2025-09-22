export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
}

export interface User {
  id: string;
  email: string;
  fullName: string;
}

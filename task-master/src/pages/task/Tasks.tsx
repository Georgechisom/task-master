// src/pages/Tasks.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import type { Database } from "@/types/database.types";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";

import "./tasks.css";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z
    .string()
    .optional()
    .nullable()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["to-do", "in-progress", "completed"]),
  category: z.string().optional(),
});

type TaskInsert = Database["public"]["Tables"]["task"]["Insert"];

export default function Tasks() {
  const { user, loading } = useAuth();
  const {
    activeTasks,
    completedTasks,
    loading: tasksLoading,
    updateTaskStatus,
  } = useTasks();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: null,
      priority: "medium",
      status: "to-do",
      category: "",
    },
  });

  const handleAddTask = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast.error("Please log in to create a task");
      navigate("/auth");
      return;
    }

    const task: TaskInsert = {
      ...values,
      user_id: user.id,
      dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : null,
    };

    const { data, error } = await supabase.from("task").insert([task]).select();

    if (error) {
      toast.error(`Error adding task: ${error.message}`);
      console.error("Error adding task:", error);
    } else if (data) {
      toast.success("Task created!");
      form.reset();
    }
  };

  const handleStatusChange = async (
    taskId: string,
    newStatus: "to-do" | "in-progress" | "completed"
  ) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      toast.success("Task status updated!");
    } catch (error) {
      toast.error("Failed to update task status");
      console.error("Error updating task:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "to-do":
        return "#ef4444"; // red
      case "in-progress":
        return "#f59e0b"; // yellow
      case "completed":
        return "#10b981"; // green
      default:
        return "#6b7280"; // gray
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "#10b981"; // green
      case "medium":
        return "#f59e0b"; // yellow
      case "high":
        return "#ef4444"; // red
      default:
        return "#6b7280"; // gray
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No due date";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading || tasksLoading)
    return <div className="tasks-loading">Loading...</div>;

  return (
    <div className="tasks-container">
      <h1 className="tasks-title">Your Tasks</h1>

      {/* Create Task Form */}
      <Card className="tasks-card">
        <CardHeader>
          <CardTitle className="tasks-card-title">Create Task</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddTask)}
              className="tasks-form"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="tasks-form-field">
                    <FormLabel className="tasks-form-label">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Task title"
                        {...field}
                        className="tasks-form-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="tasks-form-field">
                    <FormLabel className="tasks-form-label">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Task description"
                        {...field}
                        className="tasks-form-textarea"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="tasks-form-field">
                    <FormLabel className="tasks-form-label">Due Date</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value || null)}
                        className="tasks-form-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="tasks-form-field">
                    <FormLabel className="tasks-form-label">Priority</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="tasks-form-select-trigger">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className="tasks-form-select-content">
                          <SelectItem
                            value="low"
                            className="tasks-form-select-item"
                          >
                            Low
                          </SelectItem>
                          <SelectItem
                            value="medium"
                            className="tasks-form-select-item"
                          >
                            Medium
                          </SelectItem>
                          <SelectItem
                            value="high"
                            className="tasks-form-select-item"
                          >
                            High
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="tasks-form-field">
                    <FormLabel className="tasks-form-label">Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="tasks-form-select-trigger">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="tasks-form-select-content">
                          <SelectItem
                            value="to-do"
                            className="tasks-form-select-item"
                          >
                            To Do
                          </SelectItem>
                          <SelectItem
                            value="in-progress"
                            className="tasks-form-select-item"
                          >
                            In Progress
                          </SelectItem>
                          <SelectItem
                            value="completed"
                            className="tasks-form-select-item"
                          >
                            Completed
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="tasks-form-field">
                    <FormLabel className="tasks-form-label">Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Work, Personal"
                        {...field}
                        className="tasks-form-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="tasks-submit-button">
                Create Task
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Task Cards Display */}
      <div className="tasks-display">
        {/* Active Tasks Section */}
        {activeTasks.length > 0 && (
          <div className="tasks-section">
            <h2 className="tasks-section-title">Active Tasks</h2>
            <div className="tasks-grid">
              {activeTasks.map((task) => (
                <Card key={task.id} className="task-card">
                  <CardHeader className="task-card-header">
                    <div className="task-card-title-row">
                      <CardTitle className="task-title">{task.title}</CardTitle>
                      <div
                        className="task-status-badge"
                        style={{ backgroundColor: getStatusColor(task.status) }}
                      >
                        {task.status === "to-do" && "To Do"}
                        {task.status === "in-progress" && "In Progress"}
                        {task.status === "completed" && "Completed"}
                      </div>
                    </div>
                    <div className="task-meta">
                      <span
                        className="task-priority"
                        style={{ color: getPriorityColor(task.priority) }}
                      >
                        {task.priority} priority
                      </span>
                      {task.category && (
                        <span className="task-category">{task.category}</span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="task-card-content">
                    {task.description && (
                      <p className="task-description">{task.description}</p>
                    )}
                    <div className="task-footer">
                      <span className="task-due-date">
                        Due: {formatDate(task.dueDate)}
                      </span>
                      <Select
                        value={task.status}
                        onValueChange={(value) =>
                          handleStatusChange(
                            task.id,
                            value as "to-do" | "in-progress" | "completed"
                          )
                        }
                      >
                        <SelectTrigger className="task-status-select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="to-do">To Do</SelectItem>
                          <SelectItem value="in-progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks Section */}
        {completedTasks.length > 0 && (
          <div className="tasks-section">
            <h2 className="tasks-section-title">Completed Tasks</h2>
            <div className="tasks-grid">
              {completedTasks.map((task) => (
                <Card key={task.id} className="task-card completed-task-card">
                  <CardHeader className="task-card-header">
                    <div className="task-card-title-row">
                      <CardTitle className="task-title completed-task-title">
                        {task.title}
                      </CardTitle>
                      <div
                        className="task-status-badge completed"
                        style={{ backgroundColor: getStatusColor(task.status) }}
                      >
                        Completed
                      </div>
                    </div>
                    <div className="task-meta">
                      <span
                        className="task-priority"
                        style={{ color: getPriorityColor(task.priority) }}
                      >
                        {task.priority} priority
                      </span>
                      {task.category && (
                        <span className="task-category">{task.category}</span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="task-card-content">
                    {task.description && (
                      <p className="task-description">{task.description}</p>
                    )}
                    <div className="task-footer">
                      <span className="task-due-date">
                        Completed: {formatDate(task.dueDate)}
                      </span>
                      <Select
                        value={task.status}
                        onValueChange={(value) =>
                          handleStatusChange(
                            task.id,
                            value as "to-do" | "in-progress" | "completed"
                          )
                        }
                      >
                        <SelectTrigger className="task-status-select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="to-do">To Do</SelectItem>
                          <SelectItem value="in-progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTasks.length === 0 && completedTasks.length === 0 && (
          <div className="no-tasks">
            <p>No tasks found. Create your first task above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

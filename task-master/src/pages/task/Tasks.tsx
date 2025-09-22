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
import { useNavigate, Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

import "./tasks.css";
import { useState } from "react";

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
  const navigate = useNavigate();
  const [task, setTask] = useState<TaskInsert[]>([]);

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
      dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : null, // Convert to ISO string or null
    };

    const { data, error } = await supabase.from("task").insert([task]).select();

    if (error) {
      toast.error(`Error adding task: ${error.message}`);
      console.error("Error adding task:", error);
    } else if (data) {
      setTask((prev) => [...prev, ...data]);
      toast.success("Task created!");
      form.reset();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" />;

  return (
    <div className="tasks-container">
      <h1 className="tasks-title">Your Tasks</h1>
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
    </div>
  );
}

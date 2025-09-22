// src/types/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      task: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          dueDate: string | null;
          priority: "low" | "medium" | "high";
          status: "to-do" | "in-progress" | "completed";
          category: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          dueDate?: string | null;
          priority: "low" | "medium" | "high";
          status: "to-do" | "in-progress" | "completed";
          category?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          dueDate?: string | null;
          priority?: "low" | "medium" | "high";
          status?: "to-do" | "in-progress" | "completed";
          category?: string | null;
          created_at?: string;
        };
      };
      task_assignments: {
        Row: {
          id: string;
          task_id: string;
          user_id: string;
          role: "owner" | "collaborator";
        };
        Insert: {
          id?: string;
          task_id: string;
          user_id: string;
          role: "owner" | "collaborator";
        };
        Update: {
          id?: string;
          task_id?: string;
          user_id?: string;
          role?: "owner" | "collaborator";
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [key: string]: never;
    };
    Functions: { [key: string]: never };
    Enums: { [key: string]: never };
    CompositeTypes: { [key: string]: never };
  };
}

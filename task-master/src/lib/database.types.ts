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
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          status: "todo" | "in-progress" | "completed" | "cancelled";
          priority: "low" | "medium" | "high" | "urgent";
          due_date: string | null;
          created_at: string;
          updated_at: string;
          user_id: string;
          tags: string[];
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          status?: "todo" | "in-progress" | "completed" | "cancelled";
          priority?: "low" | "medium" | "high" | "urgent";
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
          user_id: string;
          tags?: string[];
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          status?: "todo" | "in-progress" | "completed" | "cancelled";
          priority?: "low" | "medium" | "high" | "urgent";
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          tags?: string[];
          completed_at?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

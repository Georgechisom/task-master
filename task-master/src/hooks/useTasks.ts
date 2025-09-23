import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./useAuth";
import type { Database } from "@/types/database.types";

type Task = Database["public"]["Tables"]["task"]["Row"];

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("task")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  const updateTaskStatus = async (
    taskId: string,
    newStatus: "to-do" | "in-progress" | "completed"
  ) => {
    if (!user) return;

    const { error } = await supabase
      .from("task")
      .update({
        status: newStatus,
      } as any)
      .eq("id", taskId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating task:", error);
      throw error;
    } else {
      // Update local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const activeTasks = tasks.filter(
    (task) => task.status === "to-do" || task.status === "in-progress"
  );

  const completedTasks = tasks.filter((task) => task.status === "completed");

  return {
    tasks,
    activeTasks,
    completedTasks,
    loading,
    updateTaskStatus,
    refetchTasks: fetchTasks,
  };
};

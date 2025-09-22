import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Task } from "../types";

export const useTasks = () => {
  const [task, setTask] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from("task").select("*");
      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        setTask(data as Task[]);
      }
    };

    fetchTasks();
  }, []);

  return { task };
};

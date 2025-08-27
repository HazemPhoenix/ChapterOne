import { Task } from "@/models/Task";
import { TaskService } from "@/services/TaskService";
import { useCallback, useState } from "react";

export type TaskFilter = "all" | "completed" | "pending";

/**
 * Custom hook for managing tasks state and operations
 * Provides a clean interface for task management with proper separation of concerns
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Add a new task
   */
  const addTask = useCallback(
    async (title: string, description?: string, due?: Date) => {
      const validation = TaskService.validateTask(title, description);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      setIsLoading(true);
      try {
        const newTask = TaskService.createTask(title, description, due);
        setTasks((prevTasks) => TaskService.sortTasks([...prevTasks, newTask]));
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Toggle task completion status
   */
  const toggleTask = useCallback(async (taskId: string) => {
    setIsLoading(true);
    try {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === taskId ? TaskService.toggleTaskCompletion(task) : task
        );
        return TaskService.sortTasks(updatedTasks);
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Delete a task
   */
  const deleteTask = useCallback(async (taskId: string) => {
    setIsLoading(true);
    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Update a task
   */
  const updateTask = useCallback(
    async (taskId: string, updates: Partial<Omit<Task, "id">>) => {
      if (updates.title !== undefined || updates.description !== undefined) {
        const validation = TaskService.validateTask(
          updates.title ?? "",
          updates.description
        );
        if (!validation.isValid) {
          throw new Error(validation.error);
        }
      }

      setIsLoading(true);
      try {
        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.map((task) =>
            task.id === taskId ? TaskService.updateTask(task, updates) : task
          );
          return TaskService.sortTasks(updatedTasks);
        });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Clear all completed tasks
   */
  const clearCompleted = useCallback(async () => {
    setIsLoading(true);
    try {
      setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Computed values
  const filteredTasks = TaskService.filterTasks(tasks, filter);
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
  };

  return {
    // State
    tasks: filteredTasks,
    allTasks: tasks,
    filter,
    isLoading,
    taskStats,

    // Actions
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearCompleted,
    setFilter,
  };
}

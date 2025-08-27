import { Task } from "@/models/Task";

/**
 * TaskService - Handles all task-related operations
 * This service provides a clean abstraction for task management
 */
export class TaskService {
  /**
   * Generates a unique ID for a new task
   */
  static generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Creates a new task with the provided title and description
   */
  static createTask(title: string, description: string = "", due?: Date): Task {
    return {
      id: this.generateId(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      due,
    };
  }

  /**
   * Toggles the completion status of a task
   */
  static toggleTaskCompletion(task: Task): Task {
    return {
      ...task,
      completed: !task.completed,
    };
  }

  /**
   * Updates a task with new properties
   */
  static updateTask(task: Task, updates: Partial<Omit<Task, "id">>): Task {
    return {
      ...task,
      ...updates,
      title: updates.title?.trim() ?? task.title,
      description: updates.description?.trim() ?? task.description,
    };
  }

  /**
   * Filters tasks based on completion status
   */
  static filterTasks(
    tasks: Task[],
    filter: "all" | "completed" | "pending"
  ): Task[] {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }

  /**
   * Sorts tasks by creation time (newest first) with completed tasks at the bottom
   */
  static sortTasks(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      // Completed tasks go to the bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // If both tasks have the same status, sort by ID (which includes timestamp) for consistent ordering
      return b.id.localeCompare(a.id);
    });
  }

  /**
   * Validates task data
   */
  static validateTask(
    title: string,
    description?: string
  ): { isValid: boolean; error?: string } {
    if (!title || title.trim().length === 0) {
      return { isValid: false, error: "Task title is required" };
    }

    if (title.trim().length > 100) {
      return {
        isValid: false,
        error: "Task title must be less than 100 characters",
      };
    }

    if (description && description.trim().length > 500) {
      return {
        isValid: false,
        error: "Task description must be less than 500 characters",
      };
    }

    return { isValid: true };
  }
}

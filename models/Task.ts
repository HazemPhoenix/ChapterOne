export interface Task {
  id: string;
  title: string;
  due?: Date | null;
  description?: string;
  completed: boolean;
}

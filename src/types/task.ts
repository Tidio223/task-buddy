export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date | null;
  createdAt: Date;
  completedAt: Date | null;
}

export type SortField = 'dueDate' | 'priority' | 'status' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface TaskFilters {
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  search: string;
}

export interface TaskSort {
  field: SortField;
  order: SortOrder;
}

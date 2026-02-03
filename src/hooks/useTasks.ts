import { useState, useMemo, useCallback } from 'react';
import { Task, TaskFilters, TaskSort, TaskPriority, TaskStatus } from '@/types/task';

const generateId = () => Math.random().toString(36).substring(2, 9);

const initialTasks: Task[] = [
  {
    id: generateId(),
    title: 'Préparer la réunion',
    description: 'Créer le support de présentation pour la réunion de lundi',
    priority: 'high',
    status: 'pending',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    completedAt: null,
  },
  {
    id: generateId(),
    title: 'Réviser le code',
    description: 'Faire la revue de code du module de paiement',
    priority: 'medium',
    status: 'in_progress',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    completedAt: null,
  },
  {
    id: generateId(),
    title: 'Mettre à jour la documentation',
    description: 'Documenter les nouvelles fonctionnalités API',
    priority: 'low',
    status: 'completed',
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
];

const priorityOrder: Record<TaskPriority, number> = { high: 3, medium: 2, low: 1 };
const statusOrder: Record<TaskStatus, number> = { pending: 1, in_progress: 2, completed: 3 };

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    priority: 'all',
    search: '',
  });
  const [sort, setSort] = useState<TaskSort>({
    field: 'createdAt',
    order: 'desc',
  });

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date(),
      completedAt: taskData.status === 'completed' ? new Date() : null,
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        
        const updatedTask = { ...task, ...updates };
        
        // Si on passe à completed, on met la date de complétion
        if (updates.status === 'completed' && task.status !== 'completed') {
          updatedTask.completedAt = new Date();
        } else if (updates.status && updates.status !== 'completed') {
          updatedTask.completedAt = null;
        }
        
        return updatedTask;
      })
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        
        if (task.status === 'completed') {
          return { ...task, status: 'pending' as TaskStatus, completedAt: null };
        } else {
          return { ...task, status: 'completed' as TaskStatus, completedAt: new Date() };
        }
      })
    );
  }, []);

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Apply filters
    if (filters.status !== 'all') {
      result = result.filter((task) => task.status === filters.status);
    }
    if (filters.priority !== 'all') {
      result = result.filter((task) => task.priority === filters.priority);
    }
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sort.field) {
        case 'priority':
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'status':
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) comparison = 0;
          else if (!a.dueDate) comparison = 1;
          else if (!b.dueDate) comparison = -1;
          else comparison = a.dueDate.getTime() - b.dueDate.getTime();
          break;
        case 'createdAt':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
      }

      return sort.order === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [tasks, filters, sort]);

  return {
    tasks: filteredAndSortedTasks,
    allTasks: tasks,
    filters,
    sort,
    setFilters,
    setSort,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
  };
}

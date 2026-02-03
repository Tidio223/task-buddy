import { useState } from 'react';
import { Plus, ClipboardList } from 'lucide-react';
import { Task } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskStats } from '@/components/tasks/TaskStats';
import { DeleteConfirmDialog } from '@/components/tasks/DeleteConfirmDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const {
    tasks,
    allTasks,
    filters,
    sort,
    setFilters,
    setSort,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
  } = useTasks();

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      toast({
        title: 'Tâche supprimée',
        description: `"${taskToDelete.title}" a été supprimée.`,
      });
      setTaskToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleFormSubmit = (data: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
      toast({
        title: 'Tâche modifiée',
        description: `"${data.title}" a été mise à jour.`,
      });
    } else {
      addTask(data);
      toast({
        title: 'Tâche créée',
        description: `"${data.title}" a été ajoutée.`,
      });
    }
  };

  const handleToggleComplete = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    toggleComplete(id);
    if (task) {
      toast({
        title: task.status === 'completed' ? 'Tâche réouverte' : 'Tâche terminée',
        description: `"${task.title}" ${task.status === 'completed' ? 'est de nouveau en attente.' : 'est maintenant terminée.'}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <ClipboardList className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Gestionnaire de Tâches</h1>
              <p className="text-muted-foreground">Organisez et suivez vos tâches efficacement</p>
            </div>
          </div>
          <Button onClick={handleAddTask} size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Nouvelle tâche
          </Button>
        </div>

        {/* Stats */}
        <TaskStats tasks={allTasks} />

        {/* Filters */}
        <TaskFilters
          filters={filters}
          sort={sort}
          onFiltersChange={setFilters}
          onSortChange={setSort}
        />

        {/* Task List */}
        {tasks.length === 0 ? (
          <div className="text-center py-16">
            <ClipboardList className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h2 className="text-xl font-semibold text-muted-foreground mb-2">
              {allTasks.length === 0 ? 'Aucune tâche' : 'Aucune tâche correspondante'}
            </h2>
            <p className="text-muted-foreground mb-4">
              {allTasks.length === 0
                ? 'Créez votre première tâche pour commencer'
                : 'Essayez de modifier vos filtres'}
            </p>
            {allTasks.length === 0 && (
              <Button onClick={handleAddTask} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Créer une tâche
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={() => handleDeleteClick(task)}
              />
            ))}
          </div>
        )}

        {/* Task Form Dialog */}
        <TaskForm
          open={formOpen}
          onOpenChange={setFormOpen}
          task={editingTask}
          onSubmit={handleFormSubmit}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          taskTitle={taskToDelete?.title}
        />
      </div>
    </div>
  );
};

export default Index;

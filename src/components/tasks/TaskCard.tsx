import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, Clock, Edit, Trash2, Check, Circle, AlertCircle } from 'lucide-react';
import { Task } from '@/types/task';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  low: { label: 'Basse', className: 'bg-secondary text-secondary-foreground' },
  medium: { label: 'Moyenne', className: 'bg-accent text-accent-foreground' },
  high: { label: 'Haute', className: 'bg-destructive text-destructive-foreground' },
};

const statusConfig = {
  pending: { label: 'En attente', icon: Circle, className: 'text-muted-foreground' },
  in_progress: { label: 'En cours', icon: Clock, className: 'text-primary' },
  completed: { label: 'Terminée', icon: Check, className: 'text-green-600' },
};

export function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const isCompleted = task.status === 'completed';
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !isCompleted;
  const StatusIcon = statusConfig[task.status].icon;

  return (
    <Card className={cn(
      'transition-all hover:shadow-md',
      isCompleted && 'opacity-75 bg-muted/50'
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              'font-semibold text-lg leading-tight',
              isCompleted && 'line-through text-muted-foreground'
            )}>
              {task.title}
            </h3>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge className={priorityConfig[task.priority].className}>
                {priorityConfig[task.priority].label}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <StatusIcon className={cn('h-3 w-3', statusConfig[task.status].className)} />
                {statusConfig[task.status].label}
              </Badge>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(task)}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {task.description && (
          <p className={cn(
            'text-sm text-muted-foreground mb-3',
            isCompleted && 'line-through'
          )}>
            {task.description}
          </p>
        )}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {task.dueDate && (
            <div className={cn(
              'flex items-center gap-1',
              isOverdue && 'text-destructive'
            )}>
              {isOverdue && <AlertCircle className="h-3 w-3" />}
              <Calendar className="h-3 w-3" />
              <span>
                {format(new Date(task.dueDate), 'dd MMM yyyy', { locale: fr })}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Créée le {format(new Date(task.createdAt), 'dd/MM/yyyy', { locale: fr })}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

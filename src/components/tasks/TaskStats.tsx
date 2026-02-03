import { CheckCircle, Clock, ListTodo, AlertTriangle } from 'lucide-react';
import { Task } from '@/types/task';
import { Card, CardContent } from '@/components/ui/card';

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const pending = tasks.filter((t) => t.status === 'pending').length;
  const overdue = tasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed'
  ).length;

  const stats = [
    { label: 'Total', value: total, icon: ListTodo, color: 'text-primary' },
    { label: 'Terminées', value: completed, icon: CheckCircle, color: 'text-green-600' },
    { label: 'En cours', value: inProgress, icon: Clock, color: 'text-blue-600' },
    { label: 'En retard', value: overdue, icon: AlertTriangle, color: 'text-destructive' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-3 p-4">
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

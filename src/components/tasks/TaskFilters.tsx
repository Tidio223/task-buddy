import { Search, ArrowUpDown } from 'lucide-react';
import { TaskFilters as TaskFiltersType, TaskSort, SortField } from '@/types/task';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TaskFiltersProps {
  filters: TaskFiltersType;
  sort: TaskSort;
  onFiltersChange: (filters: TaskFiltersType) => void;
  onSortChange: (sort: TaskSort) => void;
}

const sortOptions: { value: SortField; label: string }[] = [
  { value: 'createdAt', label: 'Date de création' },
  { value: 'dueDate', label: 'Date d\'échéance' },
  { value: 'priority', label: 'Priorité' },
  { value: 'status', label: 'Statut' },
];

export function TaskFilters({ filters, sort, onFiltersChange, onSortChange }: TaskFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher une tâche..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10"
        />
      </div>
      
      <Select
        value={filters.status}
        onValueChange={(value) => onFiltersChange({ ...filters, status: value as TaskFiltersType['status'] })}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="pending">En attente</SelectItem>
          <SelectItem value="in_progress">En cours</SelectItem>
          <SelectItem value="completed">Terminées</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.priority}
        onValueChange={(value) => onFiltersChange({ ...filters, priority: value as TaskFiltersType['priority'] })}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Priorité" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes priorités</SelectItem>
          <SelectItem value="low">Basse</SelectItem>
          <SelectItem value="medium">Moyenne</SelectItem>
          <SelectItem value="high">Haute</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sort.field}
        onValueChange={(value) => onSortChange({ ...sort, field: value as SortField })}
      >
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Trier par" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onSortChange({ ...sort, order: sort.order === 'asc' ? 'desc' : 'asc' })}
        title={sort.order === 'asc' ? 'Ordre croissant' : 'Ordre décroissant'}
      >
        <ArrowUpDown className={`h-4 w-4 transition-transform ${sort.order === 'desc' ? 'rotate-180' : ''}`} />
      </Button>
    </div>
  );
}

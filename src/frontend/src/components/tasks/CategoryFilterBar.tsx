import { Button } from '@/components/ui/button';
import { TaskCategory } from '../../types/tasks';
import { CATEGORIES } from '../../constants/categories';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface CategoryFilterBarProps {
  selectedCategory: TaskCategory | null;
  onSelectCategory: (category: TaskCategory | null) => void;
}

export default function CategoryFilterBar({ selectedCategory, onSelectCategory }: CategoryFilterBarProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <Button
        variant={selectedCategory === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelectCategory(null)}
        className="shrink-0"
      >
        All Tasks
      </Button>
      
      {CATEGORIES.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectCategory(category)}
          className={cn(
            'shrink-0',
            category === 'For Maleeha' && selectedCategory === category && 'maleeha-accent'
          )}
        >
          {category}
          {selectedCategory === category && (
            <X className="h-3 w-3 ml-1" />
          )}
        </Button>
      ))}
    </div>
  );
}

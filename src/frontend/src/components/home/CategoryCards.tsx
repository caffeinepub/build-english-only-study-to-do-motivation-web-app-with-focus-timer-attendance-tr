import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, User, Heart, Activity } from 'lucide-react';
import { TaskCategory } from '../../types/tasks';
import { cn } from '@/lib/utils';

interface CategoryCardsProps {
  onSelectCategory: (category: TaskCategory) => void;
  selectedCategory: TaskCategory | null;
  taskCounts: Record<TaskCategory, number>;
}

const CATEGORY_CONFIG = {
  'Pharm-D Study': {
    icon: BookOpen,
    color: 'from-secondary/20 to-secondary/5 border-secondary/30 hover:border-secondary/50',
    iconColor: 'text-secondary'
  },
  'Personal': {
    icon: User,
    color: 'from-primary/20 to-primary/5 border-primary/30 hover:border-primary/50',
    iconColor: 'text-primary'
  },
  'Health & Routine': {
    icon: Activity,
    color: 'from-success/20 to-success/5 border-success/30 hover:border-success/50',
    iconColor: 'text-success'
  },
  'For Maleeha': {
    icon: Heart,
    color: 'from-maleeha/20 to-maleeha/5 border-maleeha/30 hover:border-maleeha/50',
    iconColor: 'text-maleeha'
  }
};

export default function CategoryCards({ onSelectCategory, selectedCategory, taskCounts }: CategoryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(CATEGORY_CONFIG).map(([category, config]) => {
        const Icon = config.icon;
        const count = taskCounts[category as TaskCategory] || 0;
        const isSelected = selectedCategory === category;
        
        return (
          <Card
            key={category}
            className={cn(
              'cursor-pointer transition-all duration-200 hover:shadow-soft border-2',
              `bg-gradient-to-br ${config.color}`,
              isSelected && 'ring-2 ring-primary shadow-medium'
            )}
            onClick={() => onSelectCategory(category as TaskCategory)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className={cn('p-3 rounded-full bg-background/50', config.iconColor)}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{category}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {count} {count === 1 ? 'task' : 'tasks'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

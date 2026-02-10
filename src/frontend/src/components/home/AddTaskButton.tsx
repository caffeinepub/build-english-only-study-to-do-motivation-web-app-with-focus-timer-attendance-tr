import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddTaskButtonProps {
  onClick: () => void;
}

export default function AddTaskButton({ onClick }: AddTaskButtonProps) {
  return (
    <div className="fixed bottom-24 left-0 right-0 px-4 z-40">
      <div className="container max-w-2xl mx-auto">
        <Button
          onClick={onClick}
          size="lg"
          className="w-full h-14 text-lg font-semibold shadow-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl"
        >
          <Plus className="h-6 w-6 mr-2" />
          Add Task
        </Button>
      </div>
    </div>
  );
}

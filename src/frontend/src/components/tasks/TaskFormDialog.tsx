import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Task, TaskFormData, TaskCategory, PharmDSubject } from '../../types/tasks';
import CategoryPicker from './CategoryPicker';

interface TaskFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TaskFormData) => void;
  task?: Task;
  defaultCategory?: TaskCategory;
}

export default function TaskFormDialog({
  open,
  onOpenChange,
  onSubmit,
  task,
  defaultCategory
}: TaskFormDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState<TaskCategory>(defaultCategory || 'Personal');
  const [pharmDSubject, setPharmDSubject] = useState<PharmDSubject | undefined>(undefined);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setTime(task.time || '');
      setCategory(task.category);
      setPharmDSubject(task.pharmDSubject);
    } else {
      setTitle('');
      setDescription('');
      setTime('');
      setCategory(defaultCategory || 'Personal');
      setPharmDSubject(undefined);
    }
  }, [task, defaultCategory, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    if (category === 'Pharm-D Study' && !pharmDSubject) {
      return;
    }

    const formData: TaskFormData = {
      title: title.trim(),
      description: description.trim() || undefined,
      time: time.trim() || undefined,
      category,
      pharmDSubject: category === 'Pharm-D Study' ? pharmDSubject : undefined
    };

    onSubmit(formData);
    onOpenChange(false);
  };

  const handleCategoryChange = (newCategory: TaskCategory) => {
    setCategory(newCategory);
    if (newCategory !== 'Pharm-D Study') {
      setPharmDSubject(undefined);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add details (optional)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <CategoryPicker
              category={category}
              pharmDSubject={pharmDSubject}
              onCategoryChange={handleCategoryChange}
              onPharmDSubjectChange={setPharmDSubject}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {task ? 'Update' : 'Add'} Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

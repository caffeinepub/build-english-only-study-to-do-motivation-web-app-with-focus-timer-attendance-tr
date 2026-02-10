import { useState, useMemo } from 'react';
import TopBar from '../components/layout/TopBar';
import QuoteCard from '../components/home/QuoteCard';
import CategoryCards from '../components/home/CategoryCards';
import AddTaskButton from '../components/home/AddTaskButton';
import TaskFormDialog from '../components/tasks/TaskFormDialog';
import TaskList from '../components/tasks/TaskList';
import CategoryFilterBar from '../components/tasks/CategoryFilterBar';
import ForMaleehaQuickAdd from '../components/tasks/ForMaleehaQuickAdd';
import { useTasks } from '../hooks/useTasks';
import { Task, TaskCategory, TaskFormData } from '../types/tasks';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTasks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | null>(null);

  const filteredTasks = useMemo(() => {
    if (!selectedCategory) return tasks;
    return tasks.filter(task => task.category === selectedCategory);
  }, [tasks, selectedCategory]);

  const taskCounts = useMemo(() => {
    const counts: Record<TaskCategory, number> = {
      'Pharm-D Study': 0,
      'Personal': 0,
      'Health & Routine': 0,
      'For Maleeha': 0
    };
    tasks.forEach(task => {
      counts[task.category]++;
    });
    return counts;
  }, [tasks]);

  const handleAddTask = (data: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleAddPreset = (title: string) => {
    addTask({
      title,
      category: 'For Maleeha'
    });
  };

  const openDialog = () => {
    setEditingTask(undefined);
    setDialogOpen(true);
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-6 pb-32">
      <TopBar />
      
      <div className="space-y-6">
        <QuoteCard />
        
        <div>
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <CategoryCards
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            taskCounts={taskCounts}
          />
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {selectedCategory ? `${selectedCategory} Tasks` : 'All Tasks'}
            </h2>
          </div>

          <div className="space-y-4">
            <CategoryFilterBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {selectedCategory === 'For Maleeha' && (
              <ForMaleehaQuickAdd onAddPreset={handleAddPreset} />
            )}

            <TaskList
              tasks={filteredTasks}
              onToggleComplete={toggleComplete}
              onEdit={handleEdit}
              onDelete={deleteTask}
            />
          </div>
        </div>
      </div>

      <AddTaskButton onClick={openDialog} />

      <TaskFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddTask}
        task={editingTask}
        defaultCategory={selectedCategory || undefined}
      />
    </div>
  );
}

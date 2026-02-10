import { useState, useEffect, useCallback } from 'react';
import { Task, TaskFormData, TaskCategory, PharmDSubject } from '../types/tasks';
import { saveToStorage, loadFromStorage, STORAGE } from '../storage/localStore';

// Legacy category mapping for safe migration
const LEGACY_CATEGORY_MAP: Record<string, TaskCategory> = {
  'CEC Study': 'Pharm-D Study',
  'Workout': 'Health & Routine',
  'For Taruba': 'For Maleeha',
  'Personal': 'Personal'
};

// Legacy subject mapping
const LEGACY_SUBJECT_MAP: Record<string, PharmDSubject | undefined> = {
  'Accountancy': 'Pharmaceutics',
  'Economics': 'Medicinal Biochemistry',
  'Commerce': 'Human Anatomy and Physiology',
  'Civics': 'Organic Chemistry'
};

function normalizeLegacyTask(task: any): Task {
  // Map legacy category to new category
  const category = LEGACY_CATEGORY_MAP[task.category] || task.category || 'Personal';
  
  // Map legacy subject if exists
  let pharmDSubject: PharmDSubject | undefined = task.pharmDSubject;
  if (task.cecSubject && LEGACY_SUBJECT_MAP[task.cecSubject]) {
    pharmDSubject = LEGACY_SUBJECT_MAP[task.cecSubject];
  }
  
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    time: task.time,
    category: category as TaskCategory,
    pharmDSubject,
    completed: task.completed || false,
    createdAt: task.createdAt || Date.now()
  };
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const rawTasks = loadFromStorage<any[]>(STORAGE.TASKS, []);
    return rawTasks.map(normalizeLegacyTask);
  });

  useEffect(() => {
    saveToStorage(STORAGE.TASKS, tasks);
  }, [tasks]);

  const addTask = useCallback((taskData: TaskFormData) => {
    const newTask: Task = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...taskData,
      completed: false,
      createdAt: Date.now()
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete
  };
}

export type TaskCategory = 'Pharm-D Study' | 'Personal' | 'Health & Routine' | 'For Maleeha';

export type PharmDSubject = 
  | 'Pharmaceutics' 
  | 'Medicinal Biochemistry' 
  | 'Human Anatomy and Physiology' 
  | 'Organic Chemistry' 
  | 'Inorganic Chemistry' 
  | 'Remedial Maths';

export interface Task {
  id: string;
  title: string;
  description?: string;
  time?: string;
  category: TaskCategory;
  pharmDSubject?: PharmDSubject;
  completed: boolean;
  createdAt: number;
}

export interface TaskFormData {
  title: string;
  description?: string;
  time?: string;
  category: TaskCategory;
  pharmDSubject?: PharmDSubject;
}

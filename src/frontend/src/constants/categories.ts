import { TaskCategory, PharmDSubject } from '../types/tasks';

export const CATEGORIES: TaskCategory[] = ['Pharm-D Study', 'Personal', 'Health & Routine', 'For Maleeha'];

export const PHARMD_SUBJECTS: PharmDSubject[] = [
  'Pharmaceutics',
  'Medicinal Biochemistry',
  'Human Anatomy and Physiology',
  'Organic Chemistry',
  'Inorganic Chemistry',
  'Remedial Maths'
];

export const CATEGORY_COLORS: Record<TaskCategory, string> = {
  'Pharm-D Study': 'bg-secondary/20 text-secondary-foreground border-secondary/30',
  'Personal': 'bg-primary/20 text-primary-foreground border-primary/30',
  'Health & Routine': 'bg-success/20 text-success-foreground border-success/30',
  'For Maleeha': 'bg-maleeha/20 text-maleeha-foreground border-maleeha/30'
};

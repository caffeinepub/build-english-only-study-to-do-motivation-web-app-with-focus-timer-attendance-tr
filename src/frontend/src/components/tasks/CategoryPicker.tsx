import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TaskCategory, PharmDSubject } from '../../types/tasks';
import { CATEGORIES, PHARMD_SUBJECTS } from '../../constants/categories';

interface CategoryPickerProps {
  category: TaskCategory;
  pharmDSubject?: PharmDSubject;
  onCategoryChange: (category: TaskCategory) => void;
  onPharmDSubjectChange: (subject?: PharmDSubject) => void;
}

export default function CategoryPicker({
  category,
  pharmDSubject,
  onCategoryChange,
  onPharmDSubjectChange
}: CategoryPickerProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Category *</Label>
        <Select value={category} onValueChange={(val) => onCategoryChange(val as TaskCategory)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {category === 'Pharm-D Study' && (
        <div className="space-y-2">
          <Label>Subject *</Label>
          <Select value={pharmDSubject} onValueChange={(val) => onPharmDSubjectChange(val as PharmDSubject)}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {PHARMD_SUBJECTS.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

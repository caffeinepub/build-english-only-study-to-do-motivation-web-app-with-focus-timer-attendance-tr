import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { AttendanceSubject } from '../../types/attendance';
import { cn } from '@/lib/utils';

interface SubjectListProps {
  subjects: AttendanceSubject[];
  selectedSubjectId: string | null;
  onSelectSubject: (id: string) => void;
  onAddSubject: (name: string) => void;
  onUpdateSubject: (id: string, name: string) => void;
  onDeleteSubject: (id: string) => void;
}

export default function SubjectList({
  subjects,
  selectedSubjectId,
  onSelectSubject,
  onAddSubject,
  onUpdateSubject,
  onDeleteSubject
}: SubjectListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<AttendanceSubject | null>(null);
  const [subjectName, setSubjectName] = useState('');

  const handleSubmit = () => {
    if (!subjectName.trim()) return;
    
    if (editingSubject) {
      onUpdateSubject(editingSubject.id, subjectName);
    } else {
      onAddSubject(subjectName);
    }
    
    setDialogOpen(false);
    setSubjectName('');
    setEditingSubject(null);
  };

  const handleEdit = (subject: AttendanceSubject) => {
    setEditingSubject(subject);
    setSubjectName(subject.name);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingSubject(null);
    setSubjectName('');
    setDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-lg">Subjects</CardTitle>
          <Button size="sm" onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardHeader>
        <CardContent>
          {subjects.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No subjects yet. Add your first subject!
            </p>
          ) : (
            <div className="space-y-2">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors',
                    selectedSubjectId === subject.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                  onClick={() => onSelectSubject(subject.id)}
                >
                  <span className="font-medium">{subject.name}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(subject)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeleteSubject(subject.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSubject ? 'Edit Subject' : 'Add Subject'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Subject name"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!subjectName.trim()}>
              {editingSubject ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

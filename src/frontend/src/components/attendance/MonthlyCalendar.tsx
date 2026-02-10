import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MonthlyCalendarProps {
  subjectId: string;
  onMarkAttendance: (date: string, status: 'present' | 'absent') => void;
  getMarkForDate: (date: string) => 'present' | 'absent' | null;
}

export default function MonthlyCalendar({
  subjectId,
  onMarkAttendance,
  getMarkForDate
}: MonthlyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const formatDate = (day: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const handleDayClick = (day: number) => {
    const dateStr = formatDate(day);
    const currentMark = getMarkForDate(dateStr);
    
    if (currentMark === 'present') {
      onMarkAttendance(dateStr, 'absent');
    } else if (currentMark === 'absent') {
      onMarkAttendance(dateStr, 'present');
    } else {
      onMarkAttendance(dateStr, 'present');
    }
  };

  const days: React.ReactElement[] = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDate(day);
    const mark = getMarkForDate(dateStr);
    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

    days.push(
      <button
        key={day}
        onClick={() => handleDayClick(day)}
        className={cn(
          'aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-colors',
          'hover:bg-accent',
          isToday && 'ring-2 ring-primary',
          mark === 'present' && 'bg-success text-success-foreground',
          mark === 'absent' && 'bg-destructive text-destructive-foreground',
          !mark && 'bg-muted/30'
        )}
      >
        {day}
      </button>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{monthName}</CardTitle>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-success" />
            <span>Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-destructive" />
            <span>Absent</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

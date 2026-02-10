import { useState } from 'react';
import { useAttendance } from '../hooks/useAttendance';
import SubjectList from '../components/attendance/SubjectList';
import MonthlyCalendar from '../components/attendance/MonthlyCalendar';
import AttendanceSummary from '../components/attendance/AttendanceSummary';

export default function AttendancePage() {
  const {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    markAttendance,
    getAttendanceStats,
    getMarkForDate
  } = useAttendance();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    subjects.length > 0 ? subjects[0].id : null
  );

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);

  const handleAddSubject = (name: string) => {
    const newSubject = addSubject(name);
    setSelectedSubjectId(newSubject.id);
  };

  const handleDeleteSubject = (id: string) => {
    deleteSubject(id);
    if (selectedSubjectId === id) {
      setSelectedSubjectId(subjects.length > 1 ? subjects[0].id : null);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-6 pb-24">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Attendance Tracker</h1>
        <p className="text-muted-foreground">Track your Pharm-D class attendance</p>
      </div>

      <div className="space-y-6">
        <SubjectList
          subjects={subjects}
          selectedSubjectId={selectedSubjectId}
          onSelectSubject={setSelectedSubjectId}
          onAddSubject={handleAddSubject}
          onUpdateSubject={updateSubject}
          onDeleteSubject={handleDeleteSubject}
        />

        {selectedSubject && (
          <>
            <AttendanceSummary
              stats={getAttendanceStats(selectedSubject.id)}
              subjectName={selectedSubject.name}
            />

            <MonthlyCalendar
              subjectId={selectedSubject.id}
              onMarkAttendance={(date, status) => markAttendance(selectedSubject.id, date, status)}
              getMarkForDate={(date) => getMarkForDate(selectedSubject.id, date)}
            />
          </>
        )}

        {subjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No subjects yet. Add your first subject to start tracking attendance!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

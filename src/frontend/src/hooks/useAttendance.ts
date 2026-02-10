import { useState, useEffect, useCallback } from 'react';
import { AttendanceSubject, AttendanceMark, AttendanceData, AttendanceStats } from '../types/attendance';
import { saveToStorage, loadFromStorage, STORAGE } from '../storage/localStore';

const DEFAULT_ATTENDANCE: AttendanceData = {
  subjects: [],
  marks: []
};

export function useAttendance() {
  const [data, setData] = useState<AttendanceData>(() => 
    loadFromStorage<AttendanceData>(STORAGE.ATTENDANCE, DEFAULT_ATTENDANCE)
  );

  useEffect(() => {
    saveToStorage(STORAGE.ATTENDANCE, data);
  }, [data]);

  const addSubject = useCallback((name: string) => {
    const newSubject: AttendanceSubject = {
      id: `subject_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      createdAt: Date.now()
    };
    setData(prev => ({
      ...prev,
      subjects: [...prev.subjects, newSubject]
    }));
    return newSubject;
  }, []);

  const updateSubject = useCallback((id: string, name: string) => {
    setData(prev => ({
      ...prev,
      subjects: prev.subjects.map(s => s.id === id ? { ...s, name } : s)
    }));
  }, []);

  const deleteSubject = useCallback((id: string) => {
    setData(prev => ({
      subjects: prev.subjects.filter(s => s.id !== id),
      marks: prev.marks.filter(m => m.subjectId !== id)
    }));
  }, []);

  const markAttendance = useCallback((subjectId: string, date: string, status: 'present' | 'absent') => {
    setData(prev => {
      const existingIndex = prev.marks.findIndex(
        m => m.subjectId === subjectId && m.date === date
      );
      
      if (existingIndex >= 0) {
        const newMarks = [...prev.marks];
        newMarks[existingIndex] = { subjectId, date, status };
        return { ...prev, marks: newMarks };
      } else {
        return {
          ...prev,
          marks: [...prev.marks, { subjectId, date, status }]
        };
      }
    });
  }, []);

  const getAttendanceStats = useCallback((subjectId: string): AttendanceStats => {
    const marks = data.marks.filter(m => m.subjectId === subjectId);
    const present = marks.filter(m => m.status === 'present').length;
    const absent = marks.filter(m => m.status === 'absent').length;
    const total = present + absent;
    const percentage = total > 0 ? (present / total) * 100 : 0;
    
    return { total, present, absent, percentage };
  }, [data.marks]);

  const getMarkForDate = useCallback((subjectId: string, date: string): 'present' | 'absent' | null => {
    const mark = data.marks.find(m => m.subjectId === subjectId && m.date === date);
    return mark ? mark.status : null;
  }, [data.marks]);

  return {
    subjects: data.subjects,
    marks: data.marks,
    addSubject,
    updateSubject,
    deleteSubject,
    markAttendance,
    getAttendanceStats,
    getMarkForDate
  };
}

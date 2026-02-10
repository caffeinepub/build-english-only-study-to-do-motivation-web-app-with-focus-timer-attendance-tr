export interface AttendanceSubject {
  id: string;
  name: string;
  createdAt: number;
}

export interface AttendanceMark {
  subjectId: string;
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent';
}

export interface AttendanceData {
  subjects: AttendanceSubject[];
  marks: AttendanceMark[];
}

export interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
  percentage: number;
}

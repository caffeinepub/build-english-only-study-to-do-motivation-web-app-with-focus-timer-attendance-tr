import { useState, useEffect, useCallback, useRef } from 'react';

export type TimerPhase = 'idle' | 'focus' | 'break';

const FOCUS_DURATION = 45 * 60; // 45 minutes in seconds
const BREAK_DURATION = 5 * 60; // 5 minutes in seconds

export function useFocusTimer() {
  const [phase, setPhase] = useState<TimerPhase>('idle');
  const [timeRemaining, setTimeRemaining] = useState(FOCUS_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const totalDuration = phase === 'focus' ? FOCUS_DURATION : BREAK_DURATION;
  const progress = ((totalDuration - timeRemaining) / totalDuration) * 100;

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            if (phase === 'focus') {
              setPhase('break');
              return BREAK_DURATION;
            } else {
              setPhase('idle');
              return FOCUS_DURATION;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, phase]);

  const start = useCallback(() => {
    if (phase === 'idle') {
      setPhase('focus');
      setTimeRemaining(FOCUS_DURATION);
    }
    setIsRunning(true);
  }, [phase]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setPhase('idle');
    setTimeRemaining(FOCUS_DURATION);
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    phase,
    timeRemaining,
    isRunning,
    progress,
    start,
    pause,
    reset,
    formatTime: () => formatTime(timeRemaining)
  };
}

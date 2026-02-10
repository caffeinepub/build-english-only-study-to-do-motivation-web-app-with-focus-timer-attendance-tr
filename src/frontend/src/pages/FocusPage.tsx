import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useFocusTimer } from '../hooks/useFocusTimer';
import { useNotifications } from '../hooks/useNotifications';
import ProgressCircle from '../components/focus/ProgressCircle';
import DistractionMuteToggle from '../components/focus/DistractionMuteToggle';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function FocusPage() {
  const [distractionMute, setDistractionMute] = useState(false);

  const { phase, timeRemaining, isRunning, progress, start, pause, reset, formatTime } = useFocusTimer();
  const { enabled: notificationsEnabled, sendNotification } = useNotifications();

  useEffect(() => {
    if (timeRemaining === 0 && notificationsEnabled) {
      if (phase === 'break') {
        sendNotification('Break Complete!', {
          body: 'Time to get back to work. You can do this!',
        });
      } else if (phase === 'idle') {
        sendNotification('Focus Session Complete!', {
          body: 'Great job! Take a well-deserved break.',
        });
      }
    }
  }, [timeRemaining, phase, notificationsEnabled, sendNotification]);

  const phaseText = phase === 'focus' ? 'Focus Time' : phase === 'break' ? 'Break Time' : 'Ready to Focus';
  const phaseColor = phase === 'focus' ? 'text-primary' : phase === 'break' ? 'text-success' : 'text-muted-foreground';

  return (
    <div className={cn(
      'min-h-screen flex flex-col items-center justify-center px-4',
      distractionMute && 'bg-background'
    )}>
      <div className="w-full max-w-md space-y-8">
        {!distractionMute && (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Focus Timer</h1>
            <p className="text-muted-foreground">45 minutes of focused work</p>
          </div>
        )}

        <Card className={cn(
          'shadow-medium',
          distractionMute && 'border-0 shadow-none bg-transparent'
        )}>
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <ProgressCircle progress={progress} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className={cn('text-5xl font-bold font-heading', phaseColor)}>
                    {formatTime()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{phaseText}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {!isRunning ? (
                  <Button
                    size="lg"
                    onClick={start}
                    className="w-32 h-12 text-lg"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={pause}
                    className="w-32 h-12 text-lg"
                  >
                    <Pause className="h-5 w-5 mr-2" />
                    Pause
                  </Button>
                )}

                <Button
                  size="lg"
                  variant="outline"
                  onClick={reset}
                  className="h-12"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>

              {!distractionMute && (
                <div className="pt-4">
                  <DistractionMuteToggle
                    enabled={distractionMute}
                    onToggle={() => setDistractionMute(!distractionMute)}
                  />
                </div>
              )}

              {distractionMute && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDistractionMute(false)}
                  className="text-muted-foreground"
                >
                  Exit Focus Mode
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {!distractionMute && (
          <div className="text-center text-sm text-muted-foreground space-y-1">
            <p>Focus for 45 minutes, then take a 5-minute break.</p>
            <p className="font-quote text-base text-primary">
              "Focus for 45 minutes, shine for a lifetime."
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

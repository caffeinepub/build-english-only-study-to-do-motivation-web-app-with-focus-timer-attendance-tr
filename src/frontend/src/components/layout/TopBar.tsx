import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '../../hooks/useTheme';

interface TopBarProps {
  showThemeToggle?: boolean;
}

export default function TopBar({ showThemeToggle = true }: TopBarProps) {
  const { isDark, toggleTheme } = useTheme();
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-sm font-medium text-muted-foreground">Today</h2>
        <p className="text-lg font-semibold text-foreground">{today}</p>
      </div>
      
      {showThemeToggle && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      )}
    </div>
  );
}

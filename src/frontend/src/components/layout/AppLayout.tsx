import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { Home, Timer, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function AppLayout() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [distractionMute, setDistractionMute] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/focus', icon: Timer, label: 'Focus' },
    { path: '/attendance', icon: Calendar, label: 'Attendance' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  // Hide navigation in distraction mute mode on focus page
  const showNav = !distractionMute || currentPath !== '/focus';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
          <div className="container max-w-2xl mx-auto">
            <div className="flex items-center justify-around py-2">
              {navItems.map(({ path, icon: Icon, label }) => {
                const isActive = currentPath === path;
                return (
                  <Button
                    key={path}
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate({ to: path })}
                    className={cn(
                      'flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-lg transition-colors',
                      isActive 
                        ? 'text-primary bg-primary/10' 
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTheme } from '../hooks/useTheme';
import { useNotifications } from '../hooks/useNotifications';
import { Bell, Moon, Sun, Info, Heart } from 'lucide-react';

export default function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  const { isSupported, permission, enabled, setEnabled } = useNotifications();

  const handleNotificationToggle = async (checked: boolean) => {
    await setEnabled(checked);
  };

  const appIdentifier = encodeURIComponent(window.location.hostname || 'maleeha-focus');

  return (
    <div className="container max-w-2xl mx-auto px-4 py-6 pb-24">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your experience</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              Appearance
            </CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-toggle" className="cursor-pointer">
                Dark Mode
              </Label>
              <Switch
                id="theme-toggle"
                checked={isDark}
                onCheckedChange={toggleTheme}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Manage task and timer reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isSupported && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Notifications are not supported in your browser.
                </AlertDescription>
              </Alert>
            )}

            {isSupported && permission === 'denied' && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Notifications are blocked. Please enable them in your browser settings.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="notifications-toggle" className="cursor-pointer">
                Enable Notifications
              </Label>
              <Switch
                id="notifications-toggle"
                checked={enabled}
                onCheckedChange={handleNotificationToggle}
                disabled={!isSupported}
              />
            </div>

            {enabled && (
              <p className="text-sm text-muted-foreground">
                You'll receive notifications for task reminders and focus timer completion.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>Maleeha Focus v1.0</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Maleeha Focus is a simple and caring study companion created by her brother Chotu.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The app helps Pharm-D students manage daily tasks, track attendance, and study with a 45-minute focus system. It includes motivational quotes and a special section dedicated to encouraging Maleeha in her journey.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Designed with a calm iOS style to reduce stress and build consistency.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
              <Heart className="h-4 w-4 text-maleeha fill-maleeha" />
              <span>Made with love for focused learning</span>
            </div>
          </CardContent>
        </Card>

        <footer className="text-center text-sm text-muted-foreground pt-8 pb-4">
          <p>© {new Date().getFullYear()} Maleeha Focus</p>
          <p className="mt-2">
            Built with <Heart className="inline h-3 w-3 text-maleeha fill-maleeha" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

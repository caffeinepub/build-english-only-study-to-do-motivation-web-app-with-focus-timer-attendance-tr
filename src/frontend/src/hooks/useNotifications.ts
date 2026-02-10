import { useState, useEffect, useCallback } from 'react';
import { saveToStorage, loadFromStorage, STORAGE } from '../storage/localStore';

export type NotificationPermission = 'default' | 'granted' | 'denied';

interface NotificationSettings {
  enabled: boolean;
}

export function useNotifications() {
  const [settings, setSettings] = useState<NotificationSettings>(() =>
    loadFromStorage<NotificationSettings>(STORAGE.NOTIFICATIONS, { enabled: false })
  );
  
  const [permission, setPermission] = useState<NotificationPermission>(() => {
    if (!('Notification' in window)) return 'denied';
    return Notification.permission as NotificationPermission;
  });

  const isSupported = 'Notification' in window;

  useEffect(() => {
    saveToStorage(STORAGE.NOTIFICATIONS, settings);
  }, [settings]);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;
    
    try {
      const result = await Notification.requestPermission();
      setPermission(result as NotificationPermission);
      return result === 'granted';
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }, [isSupported]);

  const setEnabled = useCallback(async (enabled: boolean) => {
    if (enabled && permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return false;
    }
    
    setSettings({ enabled });
    return true;
  }, [permission, requestPermission]);

  const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (!isSupported || !settings.enabled || permission !== 'granted') {
      return null;
    }
    
    try {
      return new Notification(title, {
        icon: '/assets/generated/app-icon.dim_512x512.png',
        badge: '/assets/generated/app-icon.dim_512x512.png',
        ...options
      });
    } catch (error) {
      console.error('Failed to send notification:', error);
      return null;
    }
  }, [isSupported, settings.enabled, permission]);

  return {
    isSupported,
    permission,
    enabled: settings.enabled,
    setEnabled,
    requestPermission,
    sendNotification
  };
}

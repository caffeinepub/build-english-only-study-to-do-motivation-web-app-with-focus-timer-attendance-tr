const STORAGE_VERSION = 2;
const STORAGE_KEYS = {
  TASKS: 'maleeha_focus_tasks',
  ATTENDANCE: 'maleeha_focus_attendance',
  QUOTE: 'maleeha_focus_quote',
  THEME: 'maleeha_focus_theme',
  NOTIFICATIONS: 'maleeha_focus_notifications',
  VERSION: 'maleeha_focus_version'
};

interface StorageData<T> {
  version: number;
  data: T;
}

function getStorageKey(key: string): string {
  return key;
}

export function saveToStorage<T>(key: string, data: T): void {
  try {
    const storageData: StorageData<T> = {
      version: STORAGE_VERSION,
      data
    };
    localStorage.setItem(getStorageKey(key), JSON.stringify(storageData));
  } catch (error) {
    console.error('Failed to save to storage:', error);
  }
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(getStorageKey(key));
    if (!item) return defaultValue;
    
    const storageData: StorageData<T> = JSON.parse(item);
    
    // Version check for future migrations
    if (storageData.version !== STORAGE_VERSION) {
      // Perform migration if needed
      return defaultValue;
    }
    
    return storageData.data;
  } catch (error) {
    console.error('Failed to load from storage:', error);
    return defaultValue;
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(getStorageKey(key));
  } catch (error) {
    console.error('Failed to remove from storage:', error);
  }
}

export const STORAGE = STORAGE_KEYS;

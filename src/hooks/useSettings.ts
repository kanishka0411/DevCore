import { useLocalStorage } from './useLocalStorage';

interface EditorSettings {
  fontSize: number;
  theme: string;
  fontFamily: string;
  lineHeight: number;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
  autoSave: boolean;
}

const defaultSettings: EditorSettings = {
  fontSize: 14,
  theme: 'devcore-dark',
  fontFamily: 'JetBrains Mono, monospace',
  lineHeight: 1.6,
  wordWrap: true,
  minimap: true,
  lineNumbers: true,
  autoSave: true
};

export const useSettings = () => {
  const [settings, setSettings] = useLocalStorage<EditorSettings>('devcore-settings', defaultSettings);

  const updateSettings = (newSettings: Partial<EditorSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return {
    settings,
    updateSettings
  };
};
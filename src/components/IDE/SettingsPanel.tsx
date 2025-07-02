import React from 'react';
import { X, Monitor, Type, Palette, Settings as SettingsIcon } from 'lucide-react';

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

interface SettingsPanelProps {
  settings: EditorSettings;
  onUpdateSettings: (settings: Partial<EditorSettings>) => void;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onUpdateSettings,
  onClose
}) => {
  const themes = [
    { id: 'devcore-dark', name: 'DevCore Dark', preview: 'bg-slate-900' },
    { id: 'devcore-light', name: 'DevCore Light', preview: 'bg-white' },
    { id: 'devcore-high-contrast', name: 'High Contrast', preview: 'bg-black' }
  ];

  const fontFamilies = [
    'JetBrains Mono, monospace',
    'SF Mono, Monaco, monospace',
    'Fira Code, monospace',
    'Source Code Pro, monospace',
    'Consolas, monospace',
    'Ubuntu Mono, monospace'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-200">Editor Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            {/* Appearance Section */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="w-5 h-5 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-200">Appearance</h3>
              </div>
              
              <div className="space-y-4">
                {/* Theme Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Theme</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => onUpdateSettings({ theme: theme.id })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          settings.theme === theme.id
                            ? 'border-white bg-white/10'
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <div className={`w-full h-8 ${theme.preview} rounded mb-2 border border-slate-600`} />
                        <span className="text-sm font-medium text-slate-200">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Section */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Type className="w-5 h-5 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-200">Typography</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Font Size: {settings.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="24"
                    value={settings.fontSize}
                    onChange={(e) => onUpdateSettings({ fontSize: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>10px</span>
                    <span>24px</span>
                  </div>
                </div>

                {/* Line Height */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Line Height: {settings.lineHeight}
                  </label>
                  <input
                    type="range"
                    min="1.2"
                    max="2.0"
                    step="0.1"
                    value={settings.lineHeight}
                    onChange={(e) => onUpdateSettings({ lineHeight: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>1.2</span>
                    <span>2.0</span>
                  </div>
                </div>

                {/* Font Family */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Font Family</label>
                  <select
                    value={settings.fontFamily}
                    onChange={(e) => onUpdateSettings({ fontFamily: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-white"
                  >
                    {fontFamilies.map((font) => (
                      <option key={font} value={font} style={{ fontFamily: font }}>
                        {font.split(',')[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Editor Features Section */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Monitor className="w-5 h-5 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-200">Editor Features</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Word Wrap */}
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-slate-200">Word Wrap</span>
                    <p className="text-xs text-slate-400">Wrap long lines</p>
                  </div>
                  <button
                    onClick={() => onUpdateSettings({ wordWrap: !settings.wordWrap })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.wordWrap ? 'bg-white' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-slate-900 transition-transform ${
                        settings.wordWrap ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Minimap */}
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-slate-200">Minimap</span>
                    <p className="text-xs text-slate-400">Show code overview</p>
                  </div>
                  <button
                    onClick={() => onUpdateSettings({ minimap: !settings.minimap })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.minimap ? 'bg-white' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-slate-900 transition-transform ${
                        settings.minimap ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Line Numbers */}
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-slate-200">Line Numbers</span>
                    <p className="text-xs text-slate-400">Show line numbers</p>
                  </div>
                  <button
                    onClick={() => onUpdateSettings({ lineNumbers: !settings.lineNumbers })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.lineNumbers ? 'bg-white' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-slate-900 transition-transform ${
                        settings.lineNumbers ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Auto Save */}
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-slate-200">Auto Save</span>
                    <p className="text-xs text-slate-400">Save changes automatically</p>
                  </div>
                  <button
                    onClick={() => onUpdateSettings({ autoSave: !settings.autoSave })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.autoSave ? 'bg-white' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-slate-900 transition-transform ${
                        settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-700 bg-slate-800/50">
          <button
            onClick={() => {
              // Reset to defaults
              onUpdateSettings({
                fontSize: 14,
                theme: 'devcore-dark',
                fontFamily: 'JetBrains Mono, monospace',
                lineHeight: 1.6,
                wordWrap: true,
                minimap: true,
                lineNumbers: true,
                autoSave: true
              });
            }}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg font-medium transition-colors"
          >
            Reset to Defaults
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-lg font-semibold transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
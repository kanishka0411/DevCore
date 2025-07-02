import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

interface User {
  id: string;
  name: string;
  color: string;
  avatar?: string;
  cursor?: {
    line: number;
    column: number;
  };
}

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

interface CodeEditorProps {
  content: string;
  language: string;
  onChange: (value: string) => void;
  ydoc?: Y.Doc;
  provider?: WebsocketProvider;
  users: User[];
  currentUser: User;
  settings: EditorSettings;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  content,
  language,
  onChange,
  ydoc,
  provider,
  users,
  currentUser,
  settings,
  readOnly = false
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const bindingRef = useRef<any>(null);
  const [cursors, setCursors] = useState<{ [userId: string]: { line: number; column: number } }>({});

  const handleEditorDidMount = (editorInstance: editor.IStandaloneCodeEditor) => {
    editorRef.current = editorInstance;

    // Set up collaborative editing if Y.js is available
    if (ydoc && provider && typeof window !== 'undefined') {
      try {
        import('y-monaco').then(({ MonacoBinding }) => {
          const yText = ydoc.getText('monaco');
          bindingRef.current = new MonacoBinding(
            yText,
            editorInstance.getModel()!,
            new Set([editorInstance]),
            provider.awareness
          );
        }).catch(console.error);
      } catch (error) {
        console.warn('Y.js collaboration not available:', error);
      }
    }

    // Track cursor position for collaboration
    editorInstance.onDidChangeCursorPosition((e) => {
      const position = e.position;
      console.log('Cursor moved to:', position);
    });

    // Apply custom themes
    import('monaco-editor').then((monaco) => {
      // Dark theme
      monaco.editor.defineTheme('devcore-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '64748B', fontStyle: 'italic' },
          { token: 'keyword', foreground: 'E2E8F0' },
          { token: 'string', foreground: '94A3B8' },
          { token: 'number', foreground: 'CBD5E1' },
          { token: 'type', foreground: 'F1F5F9' },
          { token: 'function', foreground: 'E2E8F0' },
          { token: 'variable', foreground: 'F8FAFC' },
          { token: 'constant', foreground: 'CBD5E1' }
        ],
        colors: {
          'editor.background': '#0F172A',
          'editor.foreground': '#F8FAFC',
          'editorLineNumber.foreground': '#475569',
          'editorLineNumber.activeForeground': '#64748B',
          'editor.selectionBackground': '#334155',
          'editor.inactiveSelectionBackground': '#1E293B',
          'editorCursor.foreground': '#F8FAFC',
          'editor.lineHighlightBackground': '#1E293B',
          'editorIndentGuide.background': '#1E293B',
          'editorIndentGuide.activeBackground': '#334155'
        }
      });

      // Light theme
      monaco.editor.defineTheme('devcore-light', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '64748B', fontStyle: 'italic' },
          { token: 'keyword', foreground: '1E293B' },
          { token: 'string', foreground: '475569' },
          { token: 'number', foreground: '334155' },
          { token: 'type', foreground: '0F172A' },
          { token: 'function', foreground: '1E293B' },
          { token: 'variable', foreground: '0F172A' },
          { token: 'constant', foreground: '334155' }
        ],
        colors: {
          'editor.background': '#FFFFFF',
          'editor.foreground': '#0F172A',
          'editorLineNumber.foreground': '#94A3B8',
          'editorLineNumber.activeForeground': '#64748B',
          'editor.selectionBackground': '#E2E8F0',
          'editor.inactiveSelectionBackground': '#F1F5F9',
          'editorCursor.foreground': '#0F172A',
          'editor.lineHighlightBackground': '#F8FAFC',
          'editorIndentGuide.background': '#E2E8F0',
          'editorIndentGuide.activeBackground': '#CBD5E1'
        }
      });

      // High contrast theme
      monaco.editor.defineTheme('devcore-high-contrast', {
        base: 'hc-black',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '808080', fontStyle: 'italic' },
          { token: 'keyword', foreground: 'FFFFFF' },
          { token: 'string', foreground: 'FFFFFF' },
          { token: 'number', foreground: 'FFFFFF' },
          { token: 'type', foreground: 'FFFFFF' },
          { token: 'function', foreground: 'FFFFFF' },
          { token: 'variable', foreground: 'FFFFFF' },
          { token: 'constant', foreground: 'FFFFFF' }
        ],
        colors: {
          'editor.background': '#000000',
          'editor.foreground': '#FFFFFF',
          'editorLineNumber.foreground': '#808080',
          'editorLineNumber.activeForeground': '#FFFFFF',
          'editor.selectionBackground': '#FFFFFF40',
          'editor.inactiveSelectionBackground': '#FFFFFF20',
          'editorCursor.foreground': '#FFFFFF',
          'editor.lineHighlightBackground': '#FFFFFF10',
          'editorIndentGuide.background': '#FFFFFF20',
          'editorIndentGuide.activeBackground': '#FFFFFF40'
        }
      });

      // Set initial theme
      monaco.editor.setTheme(settings.theme);
    });

    // Apply initial settings
    updateEditorOptions(editorInstance);
  };

  const updateEditorOptions = (editorInstance: editor.IStandaloneCodeEditor) => {
    editorInstance.updateOptions({
      fontSize: settings.fontSize,
      fontFamily: settings.fontFamily,
      lineHeight: settings.lineHeight,
      wordWrap: settings.wordWrap ? 'on' : 'off',
      minimap: { enabled: settings.minimap },
      lineNumbers: settings.lineNumbers ? 'on' : 'off',
      scrollBeyondLastLine: false,
      automaticLayout: true,
      readOnly,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: true,
      smoothScrolling: true,
      mouseWheelZoom: true,
      bracketPairColorization: { enabled: true },
      guides: {
        bracketPairs: true,
        indentation: true
      }
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && !bindingRef.current) {
      onChange(value);
    }
  };

  useEffect(() => {
    // Update editor settings when they change
    if (editorRef.current) {
      updateEditorOptions(editorRef.current);

      // Update theme
      import('monaco-editor').then((monaco) => {
        monaco.editor.setTheme(settings.theme);
      });
    }
  }, [settings]);

  useEffect(() => {
    return () => {
      if (bindingRef.current) {
        try {
          bindingRef.current.destroy();
        } catch (error) {
          console.warn('Error destroying Monaco binding:', error);
        }
      }
    };
  }, []);

  return (
    <div className="flex-1 relative bg-slate-900">
      <Editor
        value={content}
        language={language}
        theme={settings.theme}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        loading={
          <div className="flex items-center justify-center h-full bg-slate-900">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <div className="text-slate-400">Loading editor...</div>
            </div>
          </div>
        }
        options={{
          automaticLayout: true,
          fontSize: settings.fontSize,
          fontFamily: settings.fontFamily,
          lineHeight: settings.lineHeight,
          wordWrap: settings.wordWrap ? 'on' : 'off',
          minimap: { enabled: settings.minimap },
          lineNumbers: settings.lineNumbers ? 'on' : 'off',
          scrollBeyondLastLine: false,
          readOnly,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: true,
          smoothScrolling: true,
          mouseWheelZoom: true,
          bracketPairColorization: { enabled: true }
        }}
      />
      
      {/* Collaborative cursors overlay */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-2 bg-slate-800/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-slate-700"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: user.color }}
            />
            <span className="text-xs font-medium text-slate-200">{user.name}</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        ))}
      </div>

      {/* Typing indicators */}
      <div className="absolute bottom-4 left-4">
        {users.filter(user => user.cursor).length > 0 && (
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
                <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
              <span className="text-xs text-slate-300">
                {users.filter(user => user.cursor).map(user => user.name).join(', ')} typing...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
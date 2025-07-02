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

interface CodeEditorProps {
  content: string;
  language: string;
  onChange: (value: string) => void;
  ydoc?: Y.Doc;
  provider?: WebsocketProvider;
  users: User[];
  currentUser: User;
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

    // Custom theme for better collaboration
    editorInstance.updateOptions({
      fontSize: 14,
      fontFamily: 'JetBrains Mono, SF Mono, Monaco, Inconsolata, "Roboto Mono", monospace',
      lineHeight: 1.6,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
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

    // Track cursor position for collaboration
    editorInstance.onDidChangeCursorPosition((e) => {
      const position = e.position;
      // Emit cursor position to other users
      console.log('Cursor moved to:', position);
    });

    // Apply custom theme
    import('monaco-editor').then((monaco) => {
      monaco.editor.defineTheme('devcore-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '6B7280', fontStyle: 'italic' },
          { token: 'keyword', foreground: '60A5FA' },
          { token: 'string', foreground: '34D399' },
          { token: 'number', foreground: 'FBBF24' },
          { token: 'type', foreground: 'A78BFA' },
          { token: 'function', foreground: '06B6D4' },
          { token: 'variable', foreground: 'F9FAFB' },
          { token: 'constant', foreground: 'F87171' }
        ],
        colors: {
          'editor.background': '#1F2937',
          'editor.foreground': '#F9FAFB',
          'editorLineNumber.foreground': '#6B7280',
          'editorLineNumber.activeForeground': '#9CA3AF',
          'editor.selectionBackground': '#3B82F630',
          'editor.inactiveSelectionBackground': '#3B82F620',
          'editorCursor.foreground': '#60A5FA',
          'editor.lineHighlightBackground': '#374151',
          'editorIndentGuide.background': '#374151',
          'editorIndentGuide.activeBackground': '#4B5563'
        }
      });

      monaco.editor.setTheme('devcore-dark');
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && !bindingRef.current) {
      onChange(value);
    }
  };

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
    <div className="flex-1 relative bg-gray-900">
      <Editor
        value={content}
        language={language}
        theme="devcore-dark"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        loading={
          <div className="flex items-center justify-center h-full bg-gray-900">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-gray-400">Loading editor...</div>
            </div>
          </div>
        }
        options={{
          automaticLayout: true,
          minimap: { enabled: true },
          fontSize: 14,
          fontFamily: 'JetBrains Mono, SF Mono, Monaco, Inconsolata, "Roboto Mono", monospace',
          lineHeight: 1.6,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
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
            className="flex items-center space-x-2 bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-600"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: user.color }}
            />
            <span className="text-xs font-medium text-gray-200">{user.name}</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        ))}
      </div>

      {/* Typing indicators */}
      <div className="absolute bottom-4 left-4">
        {users.filter(user => user.cursor).length > 0 && (
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-600">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
              <span className="text-xs text-gray-300">
                {users.filter(user => user.cursor).map(user => user.name).join(', ')} typing...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
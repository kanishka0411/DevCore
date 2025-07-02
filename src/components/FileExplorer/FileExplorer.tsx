import React, { useState } from 'react';
import { FolderOpen, File, ChevronRight, ChevronDown, Folder } from 'lucide-react';
import type { FileSystemFile } from '../../types';

interface FileExplorerProps {
  rootDirectory: FileSystemFile | null;
  selectedFile: FileSystemFile | null;
  onFileSelect: (file: FileSystemFile) => void;
  onOpenDirectory: () => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  rootDirectory,
  selectedFile,
  onFileSelect,
  onOpenDirectory
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileTree = (files: FileSystemFile[], depth = 0) => {
    return files.map((file) => (
      <div key={file.path}>
        <div
          className={`flex items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-700 rounded ${
            selectedFile?.path === file.path ? 'bg-primary-600/20 text-primary-400' : 'text-gray-300'
          }`}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => {
            if (file.type === 'directory') {
              toggleFolder(file.path);
            } else {
              onFileSelect(file);
            }
          }}
        >
          {file.type === 'directory' && (
            <div className="w-4 h-4 flex items-center justify-center">
              {expandedFolders.has(file.path) ? (
                <ChevronDown className="w-3 h-3 text-gray-400" />
              ) : (
                <ChevronRight className="w-3 h-3 text-gray-400" />
              )}
            </div>
          )}
          
          {file.type === 'directory' ? (
            <Folder className="w-4 h-4 text-blue-400" />
          ) : (
            <File className="w-4 h-4 text-gray-400" />
          )}
          
          <span className="text-sm truncate">{file.name}</span>
        </div>
        
        {file.type === 'directory' && expandedFolders.has(file.path) && file.children && (
          <div>
            {renderFileTree(file.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-200">Explorer</h2>
          <button
            onClick={onOpenDirectory}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title="Open Folder"
          >
            <FolderOpen className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {rootDirectory ? (
          <div className="p-2">
            <div className="mb-2">
              <div className="flex items-center space-x-2 px-2 py-1 text-primary-400 font-medium">
                <Folder className="w-4 h-4" />
                <span className="text-sm">{rootDirectory.name}</span>
              </div>
            </div>
            {rootDirectory.children && renderFileTree(rootDirectory.children)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
            <FolderOpen className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-sm text-center mb-4">
              Open a folder to start collaborating
            </p>
            <button
              onClick={onOpenDirectory}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition-colors"
            >
              Choose Folder
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { FolderOpen, File, ChevronRight, ChevronDown, Folder, Search, Plus, MoreHorizontal } from 'lucide-react';
import type { FileSystemFile } from '../../types';

interface SidebarProps {
  rootDirectory: FileSystemFile | null;
  selectedFile: FileSystemFile | null;
  onFileSelect: (file: FileSystemFile) => void;
  onOpenDirectory: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  rootDirectory,
  selectedFile,
  onFileSelect,
  onOpenDirectory
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const getFileIcon = (file: FileSystemFile) => {
    if (file.type === 'directory') {
      return <Folder className="w-4 h-4 text-blue-400" />;
    }
    
    const ext = file.name.split('.').pop()?.toLowerCase();
    const iconColors: { [key: string]: string } = {
      'js': 'text-yellow-400',
      'jsx': 'text-blue-400',
      'ts': 'text-blue-500',
      'tsx': 'text-blue-500',
      'py': 'text-green-400',
      'html': 'text-orange-400',
      'css': 'text-blue-300',
      'json': 'text-yellow-300',
      'md': 'text-gray-300'
    };
    
    return <File className={`w-4 h-4 ${iconColors[ext || ''] || 'text-gray-400'}`} />;
  };

  const renderFileTree = (files: FileSystemFile[], depth = 0) => {
    return files
      .filter(file => 
        searchQuery === '' || 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((file) => (
        <div key={file.path}>
          <div
            className={`flex items-center space-x-2 px-2 py-1.5 mx-2 cursor-pointer hover:bg-gray-700 rounded-md transition-all group ${
              selectedFile?.path === file.path 
                ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-400' 
                : 'text-gray-300 hover:text-white'
            }`}
            style={{ paddingLeft: `${12 + depth * 16}px` }}
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
            
            {getFileIcon(file)}
            
            <span className="text-sm truncate flex-1">{file.name}</span>
            
            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded transition-all">
              <MoreHorizontal className="w-3 h-3" />
            </button>
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
    <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-200 flex items-center space-x-2">
            <FolderOpen className="w-4 h-4" />
            <span>Explorer</span>
          </h2>
          <div className="flex space-x-1">
            <button
              onClick={onOpenDirectory}
              className="p-1.5 hover:bg-gray-700 rounded-md transition-colors"
              title="Open Folder"
            >
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto">
        {rootDirectory ? (
          <div className="py-2">
            <div className="mb-2">
              <div className="flex items-center space-x-2 px-4 py-2 text-blue-400 font-medium bg-gray-800/50">
                <Folder className="w-4 h-4" />
                <span className="text-sm">{rootDirectory.name}</span>
              </div>
            </div>
            {rootDirectory.children && renderFileTree(rootDirectory.children)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6">
            <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Project Open</h3>
            <p className="text-sm text-center mb-6 text-gray-500">
              Open a folder to start collaborating with your team
            </p>
            <button
              onClick={onOpenDirectory}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all transform hover:scale-105 shadow-lg"
            >
              Choose Folder
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
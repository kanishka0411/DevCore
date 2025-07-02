import React, { useState } from 'react';
import { 
  FolderOpen, File, ChevronRight, ChevronDown, Folder, Search, Plus, MoreHorizontal,
  FileText, Code, Image, Settings, Database, Package, Star, Clock, Filter
} from 'lucide-react';
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
  const [showFilter, setShowFilter] = useState(false);
  const [fileTypeFilter, setFileTypeFilter] = useState<string[]>([]);

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
      return <Folder className="w-4 h-4 text-brand-400" />;
    }
    
    const ext = file.name.split('.').pop()?.toLowerCase();
    const iconMap: { [key: string]: { icon: React.ComponentType<any>, color: string } } = {
      'js': { icon: Code, color: 'text-yellow-400' },
      'jsx': { icon: Code, color: 'text-blue-400' },
      'ts': { icon: Code, color: 'text-blue-500' },
      'tsx': { icon: Code, color: 'text-blue-500' },
      'py': { icon: Code, color: 'text-green-400' },
      'html': { icon: Code, color: 'text-orange-400' },
      'css': { icon: Code, color: 'text-blue-300' },
      'scss': { icon: Code, color: 'text-pink-400' },
      'json': { icon: Settings, color: 'text-yellow-300' },
      'md': { icon: FileText, color: 'text-neutral-300' },
      'txt': { icon: FileText, color: 'text-neutral-400' },
      'png': { icon: Image, color: 'text-purple-400' },
      'jpg': { icon: Image, color: 'text-purple-400' },
      'jpeg': { icon: Image, color: 'text-purple-400' },
      'gif': { icon: Image, color: 'text-purple-400' },
      'svg': { icon: Image, color: 'text-green-400' },
      'sql': { icon: Database, color: 'text-blue-400' },
      'lock': { icon: Package, color: 'text-neutral-500' },
    };
    
    const fileInfo = iconMap[ext || ''] || { icon: File, color: 'text-neutral-400' };
    const IconComponent = fileInfo.icon;
    
    return <IconComponent className={`w-4 h-4 ${fileInfo.color}`} />;
  };

  const getFileTypeColor = (file: FileSystemFile) => {
    if (file.type === 'directory') return '';
    
    const ext = file.name.split('.').pop()?.toLowerCase();
    const colorMap: { [key: string]: string } = {
      'js': 'border-l-yellow-400',
      'jsx': 'border-l-blue-400',
      'ts': 'border-l-blue-500',
      'tsx': 'border-l-blue-500',
      'py': 'border-l-green-400',
      'html': 'border-l-orange-400',
      'css': 'border-l-blue-300',
      'scss': 'border-l-pink-400',
      'json': 'border-l-yellow-300',
      'md': 'border-l-neutral-300',
    };
    
    return colorMap[ext || ''] || '';
  };

  const renderFileTree = (files: FileSystemFile[], depth = 0) => {
    return files
      .filter(file => {
        if (searchQuery === '') return true;
        return file.name.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        // Directories first, then files
        if (a.type === 'directory' && b.type !== 'directory') return -1;
        if (a.type !== 'directory' && b.type === 'directory') return 1;
        return a.name.localeCompare(b.name);
      })
      .map((file) => (
        <div key={file.path} className="group">
          <div
            className={`relative flex items-center space-x-2 px-3 py-2 mx-2 cursor-pointer rounded-lg transition-all duration-200 ${
              selectedFile?.path === file.path 
                ? `bg-brand-500/20 text-brand-300 border-l-2 border-brand-400 ${getFileTypeColor(file)}` 
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
            } group-hover:scale-[1.01]`}
            style={{ paddingLeft: `${12 + depth * 16}px` }}
            onClick={() => {
              if (file.type === 'directory') {
                toggleFolder(file.path);
              } else {
                onFileSelect(file);
              }
            }}
          >
            {/* Expand/Collapse Icon for Directories */}
            {file.type === 'directory' && (
              <div className="w-4 h-4 flex items-center justify-center">
                {expandedFolders.has(file.path) ? (
                  <ChevronDown className="w-3 h-3 text-neutral-400 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-neutral-400 transition-transform duration-200" />
                )}
              </div>
            )}
            
            {/* File/Folder Icon */}
            <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
              {getFileIcon(file)}
            </div>
            
            {/* File/Folder Name */}
            <span className="text-sm truncate flex-1 font-medium">{file.name}</span>
            
            {/* Actions Menu */}
            <button 
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-neutral-700/50 rounded transition-all duration-200 btn-icon"
              onClick={(e) => {
                e.stopPropagation();
                // Handle file actions
              }}
            >
              <MoreHorizontal className="w-3 h-3" />
            </button>

            {/* Recent/Star indicators */}
            {selectedFile?.path === file.path && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-400 to-brand-600 rounded-r" />
            )}
          </div>
          
          {/* Nested Directory Contents */}
          {file.type === 'directory' && expandedFolders.has(file.path) && file.children && (
            <div className="ml-2 animate-fade-in">
              {renderFileTree(file.children, depth + 1)}
            </div>
          )}
        </div>
      ));
  };

  const fileTypeOptions = ['js', 'ts', 'jsx', 'tsx', 'py', 'html', 'css', 'json', 'md'];

  return (
    <div className="w-80 glass border-r border-neutral-800/50 flex flex-col shadow-premium backdrop-blur-xl">
      {/* Enhanced Header */}
      <div className="p-4 border-b border-neutral-800/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold gradient-text">Explorer</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`btn-icon ${showFilter ? 'bg-brand-500/20 text-brand-400' : ''}`}
            >
              <Filter className="w-4 h-4" />
            </button>
            <button className="btn-icon">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Enhanced Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10 py-2.5 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
            >
              ×
            </button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilter && (
          <div className="card p-3 animate-slide-in mb-3">
            <h3 className="text-sm font-medium text-neutral-300 mb-2">File Types</h3>
            <div className="flex flex-wrap gap-1">
              {fileTypeOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFileTypeFilter(prev => 
                      prev.includes(type) 
                        ? prev.filter(t => t !== type)
                        : [...prev, type]
                    );
                  }}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                    fileTypeFilter.includes(type)
                      ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                      : 'bg-neutral-800/50 text-neutral-400 hover:text-neutral-300 border border-neutral-700/50'
                  }`}
                >
                  .{type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          <button className="btn-ghost text-xs">
            <Clock className="w-3 h-3 mr-1" />
            Recent
          </button>
          <button className="btn-ghost text-xs">
            <Star className="w-3 h-3 mr-1" />
            Starred
          </button>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-auto">
        {!rootDirectory ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-neutral-500" />
            </div>
            <h3 className="text-lg font-medium text-neutral-300 mb-2">No Folder Open</h3>
            <p className="text-sm text-neutral-500 mb-4">
              Open a folder to start exploring your project files
            </p>
            <button
              onClick={onOpenDirectory}
              className="btn-primary text-sm"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Open Folder
            </button>
          </div>
        ) : (
          <div className="py-2">
            {/* Root Directory Header */}
            <div className="px-4 py-2 flex items-center space-x-2 text-neutral-400 border-b border-neutral-800/30 mb-2">
              <Folder className="w-4 h-4 text-brand-400" />
              <span className="text-sm font-medium truncate">{rootDirectory.name}</span>
            </div>
            
            {/* File Tree */}
            <div className="space-y-0.5">
              {rootDirectory.children && renderFileTree(rootDirectory.children)}
            </div>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {rootDirectory && (
        <div className="p-3 border-t border-neutral-800/50 text-2xs text-neutral-500">
          <div className="flex justify-between">
            <span>{rootDirectory.children?.length || 0} items</span>
            <span>{searchQuery ? 'Filtered' : 'All files'}</span>
          </div>
        </div>
      )}
    </div>
  );
};
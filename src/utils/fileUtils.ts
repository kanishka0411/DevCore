export const getFileIcon = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  const iconMap: { [key: string]: string } = {
    // Code files
    'js': '📄',
    'jsx': '⚛️',
    'ts': '📘',
    'tsx': '⚛️',
    'py': '🐍',
    'java': '☕',
    'cpp': '⚙️',
    'c': '⚙️',
    'cs': '#️⃣',
    'php': '🐘',
    'rb': '💎',
    'go': '🐹',
    'rs': '🦀',
    'swift': '🐦',
    'kt': '🎯',
    
    // Web files
    'html': '🌐',
    'css': '🎨',
    'scss': '🎨',
    'less': '🎨',
    'vue': '💚',
    'svelte': '🧡',
    
    // Config files
    'json': '📋',
    'xml': '📄',
    'yaml': '📄',
    'yml': '📄',
    'toml': '📄',
    'ini': '⚙️',
    
    // Documentation
    'md': '📝',
    'txt': '📄',
    'pdf': '📕',
    'doc': '📄',
    'docx': '📄',
    
    // Media
    'png': '🖼️',
    'jpg': '🖼️',
    'jpeg': '🖼️',
    'gif': '🖼️',
    'svg': '🎨',
    'mp4': '🎬',
    'mp3': '🎵',
    
    // Archives
    'zip': '📦',
    'tar': '📦',
    'gz': '📦',
    '7z': '📦',
    
    // Database
    'sql': '🗄️',
    'db': '🗄️',
    'sqlite': '🗄️'
  };
  
  return iconMap[ext || ''] || '📄';
};

export const getLanguageFromFilename = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  const languageMap: { [key: string]: string } = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'py': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'cs': 'csharp',
    'php': 'php',
    'rb': 'ruby',
    'go': 'go',
    'rs': 'rust',
    'swift': 'swift',
    'kt': 'kotlin',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'less': 'less',
    'vue': 'vue',
    'svelte': 'svelte',
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'md': 'markdown',
    'sql': 'sql',
    'sh': 'shell',
    'bash': 'shell',
    'zsh': 'shell',
    'fish': 'shell'
  };
  
  return languageMap[ext || ''] || 'plaintext';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isTextFile = (filename: string): boolean => {
  const textExtensions = [
    'txt', 'md', 'json', 'xml', 'yaml', 'yml', 'toml', 'ini',
    'js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'cs',
    'php', 'rb', 'go', 'rs', 'swift', 'kt', 'html', 'css',
    'scss', 'less', 'vue', 'svelte', 'sql', 'sh', 'bash',
    'zsh', 'fish', 'log', 'cfg', 'conf'
  ];
  
  const ext = filename.split('.').pop()?.toLowerCase();
  return textExtensions.includes(ext || '');
};
import { useState, useCallback } from 'react';
import type { FileSystemFile } from '../types';

export const useFileSystem = () => {
  const [rootDirectory, setRootDirectory] = useState<FileSystemFile | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileSystemFile | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  const openDirectory = useCallback(async () => {
    try {
      // Check if File System Access API is supported
      if ('showDirectoryPicker' in window) {
        const dirHandle = await (window as any).showDirectoryPicker();
        const directory = await buildFileTree(dirHandle);
        setRootDirectory(directory);
        return directory;
      } else {
        console.warn('File System Access API not supported');
        // Fallback for unsupported browsers
        const mockDirectory: FileSystemFile = {
          name: 'example-project',
          path: '/example-project',
          type: 'directory',
          children: [
            {
              name: 'src',
              path: '/example-project/src',
              type: 'directory',
              children: [
                { name: 'App.tsx', path: '/example-project/src/App.tsx', type: 'file' },
                { name: 'index.ts', path: '/example-project/src/index.ts', type: 'file' }
              ]
            },
            { name: 'README.md', path: '/example-project/README.md', type: 'file' },
            { name: 'package.json', path: '/example-project/package.json', type: 'file' }
          ]
        };
        setRootDirectory(mockDirectory);
        return mockDirectory;
      }
    } catch (error) {
      console.error('Error opening directory:', error);
      throw error;
    }
  }, []);

  const buildFileTree = async (dirHandle: FileSystemDirectoryHandle, path = ''): Promise<FileSystemFile> => {
    const children: FileSystemFile[] = [];
    
    for await (const [name, handle] of dirHandle.entries()) {
      const currentPath = path ? `${path}/${name}` : name;
      
      if (handle.kind === 'directory') {
        const subDirectory = await buildFileTree(handle, currentPath);
        children.push(subDirectory);
      } else {
        children.push({
          name,
          path: currentPath,
          type: 'file',
          handle
        });
      }
    }

    return {
      name: dirHandle.name,
      path,
      type: 'directory',
      handle: dirHandle,
      children: children.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'directory' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      })
    };
  };

  const openFile = useCallback(async (file: FileSystemFile) => {
    try {
      if (file.type === 'file' && file.handle) {
        const fileHandle = file.handle as FileSystemFileHandle;
        const fileObj = await fileHandle.getFile();
        const content = await fileObj.text();
        setFileContent(content);
        setSelectedFile(file);
        return content;
      } else {
        // Fallback for mock files
        const mockContent = `// Welcome to ${file.name}\n// This is mock content for demonstration\n\nexport default function() {\n  return 'Hello from ${file.name}';\n}`;
        setFileContent(mockContent);
        setSelectedFile(file);
        return mockContent;
      }
    } catch (error) {
      console.error('Error opening file:', error);
      throw error;
    }
  }, []);

  const saveFile = useCallback(async (content: string) => {
    try {
      if (selectedFile?.handle && selectedFile.type === 'file') {
        const fileHandle = selectedFile.handle as FileSystemFileHandle;
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        setFileContent(content);
        return true;
      } else {
        // Fallback - just update local state
        setFileContent(content);
        console.log('File saved (mock):', selectedFile?.name);
        return true;
      }
    } catch (error) {
      console.error('Error saving file:', error);
      throw error;
    }
  }, [selectedFile]);

  return {
    rootDirectory,
    selectedFile,
    fileContent,
    openDirectory,
    openFile,
    saveFile,
    setFileContent
  };
};
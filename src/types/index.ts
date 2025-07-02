export interface FileSystemFile {
  name: string;
  path: string;
  type: 'file' | 'directory';
  handle?: FileSystemFileHandle | FileSystemDirectoryHandle;
  children?: FileSystemFile[];
  content?: string;
}

export interface User {
  id: string;
  name: string;
  color: string;
  avatar?: string;
  cursor?: {
    line: number;
    column: number;
  };
  selection?: {
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
  };
  isTyping?: boolean;
  lastSeen?: Date;
}

export interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  liked?: boolean;
  disliked?: boolean;
}

export interface VoiceChatSession {
  id: string;
  participants: User[];
  isActive: boolean;
  isMuted: boolean;
  isScreenSharing: boolean;
}

export interface GameInvite {
  id: string;
  type: 'typing-race' | 'code-golf' | 'debugging-challenge';
  sender: User;
  status: 'pending' | 'accepted' | 'declined';
}

export interface Room {
  id: string;
  name: string;
  users: User[];
  createdAt: Date;
  isPrivate: boolean;
}
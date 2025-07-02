import { useState, useEffect, useCallback } from 'react';
import * as Y from 'yjs';
import type { User } from '../types';

// Mock Socket.IO for development
interface MockSocket {
  on: (event: string, callback: Function) => void;
  emit: (event: string, data: any) => void;
  disconnect: () => void;
}

export const useCollaboration = (roomId: string) => {
  const [socket, setSocket] = useState<MockSocket | null>(null);
  const [ydoc] = useState(() => new Y.Doc());
  const [provider, setProvider] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Mock socket connection for development
    const mockSocket: MockSocket = {
      on: (event: string, callback: Function) => {
        console.log(`Mock socket listening for: ${event}`);
      },
      emit: (event: string, data: any) => {
        console.log(`Mock socket emit: ${event}`, data);
      },
      disconnect: () => {
        console.log('Mock socket disconnected');
        setIsConnected(false);
      }
    };

    setSocket(mockSocket);
    setIsConnected(true);

    // Mock Y.js provider for development
    try {
      // Try to create WebSocket provider, fallback to mock if not available
      if (typeof window !== 'undefined') {
        import('y-websocket').then(({ WebsocketProvider }) => {
          try {
            const wsProvider = new WebsocketProvider(
              'ws://localhost:1234',
              roomId,
              ydoc
            );
            
            wsProvider.on('status', (event: any) => {
              console.log('Y.js provider status:', event.status);
            });
            
            setProvider(wsProvider);
          } catch (error) {
            console.warn('WebSocket provider not available, using mock');
            setProvider({ awareness: { setLocalStateField: () => {} } });
          }
        }).catch(() => {
          console.warn('Y.js WebSocket provider not available');
          setProvider({ awareness: { setLocalStateField: () => {} } });
        });
      }
    } catch (error) {
      console.warn('Collaboration features not available:', error);
      setProvider({ awareness: { setLocalStateField: () => {} } });
    }

    return () => {
      mockSocket.disconnect();
      if (provider && provider.destroy) {
        provider.destroy();
      }
    };
  }, [roomId, ydoc]);

  const joinRoom = useCallback((user: User) => {
    if (socket) {
      socket.emit('join-room', { roomId, user });
    }
  }, [socket, roomId]);

  const leaveRoom = useCallback(() => {
    if (socket) {
      socket.emit('leave-room', { roomId });
    }
  }, [socket, roomId]);

  return {
    socket,
    ydoc,
    provider,
    users,
    isConnected,
    joinRoom,
    leaveRoom
  };
};
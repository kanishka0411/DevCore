import { useState, useCallback, useRef } from 'react';
import type { VoiceChatSession } from '../types';

// Mock SimplePeer for development
interface MockPeer {
  on: (event: string, callback: Function) => void;
  destroy: () => void;
}

export const useWebRTC = () => {
  const [voiceSession, setVoiceSession] = useState<VoiceChatSession | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const peersRef = useRef<{ [key: string]: MockPeer }>({});

  const startVoiceChat = useCallback(async () => {
    try {
      // Try to get user media, fallback to mock if not available
      let stream: MediaStream | null = null;
      
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ 
            audio: true, 
            video: false 
          });
          setLocalStream(stream);
        } catch (error) {
          console.warn('Microphone access denied or not available:', error);
        }
      }
      
      console.log('Voice chat started');
      
      const newSession: VoiceChatSession = {
        id: `session-${Date.now()}`,
        participants: [],
        isActive: true,
        isMuted: false,
        isScreenSharing: false
      };
      
      setVoiceSession(newSession);
      return newSession;
    } catch (error) {
      console.error('Error starting voice chat:', error);
      throw error;
    }
  }, []);

  const stopVoiceChat = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    
    // Close all peer connections
    Object.values(peersRef.current).forEach(peer => {
      peer.destroy();
    });
    peersRef.current = {};
    
    setVoiceSession(null);
    setIsMuted(false);
    setIsScreenSharing(false);
  }, [localStream]);

  const toggleMute = useCallback(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  }, [localStream, isMuted]);

  const startScreenShare = useCallback(async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        console.log('Screen sharing started:', screenStream);
        setIsScreenSharing(true);
        
        screenStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
        };
        
        return screenStream;
      } else {
        console.warn('Screen sharing not supported');
        setIsScreenSharing(true); // Mock for demo
      }
    } catch (error) {
      console.error('Error starting screen share:', error);
      throw error;
    }
  }, []);

  const stopScreenShare = useCallback(() => {
    setIsScreenSharing(false);
    console.log('Screen sharing stopped');
  }, []);

  const createPeer = useCallback((userId: string, isInitiator: boolean) => {
    const mockPeer: MockPeer = {
      on: (event: string, callback: Function) => {
        console.log(`Mock peer event: ${event} for user: ${userId}`);
      },
      destroy: () => {
        console.log(`Mock peer destroyed for user: ${userId}`);
      }
    };

    peersRef.current[userId] = mockPeer;
    return mockPeer;
  }, []);

  return {
    voiceSession,
    isMuted,
    isScreenSharing,
    localStream,
    startVoiceChat,
    stopVoiceChat,
    toggleMute,
    startScreenShare,
    stopScreenShare,
    createPeer
  };
};
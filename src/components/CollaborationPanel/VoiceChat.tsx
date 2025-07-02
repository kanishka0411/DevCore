import React, { useState } from 'react';
import { Mic, MicOff, Phone, PhoneOff, Monitor, MonitorOff, Volume2, VolumeX, Settings } from 'lucide-react';

interface User {
  id: string;
  name: string;
  color: string;
  avatar?: string;
}

interface VoiceChatSession {
  id: string;
  participants: User[];
  isActive: boolean;
  isMuted: boolean;
  isScreenSharing: boolean;
}

interface VoiceChatProps {
  voiceSession: VoiceChatSession | null;
  users: User[];
  currentUser: User;
  onVoiceChatToggle: () => void;
  onScreenShareToggle: () => void;
  isScreenSharing: boolean;
}

export const VoiceChat: React.FC<VoiceChatProps> = ({
  voiceSession,
  users,
  currentUser,
  onVoiceChatToggle,
  onScreenShareToggle,
  isScreenSharing
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);

  const mockParticipants = [
    { ...currentUser, isMuted, isTalking: !isMuted && Math.random() > 0.7 },
    ...users.map(user => ({
      ...user,
      isMuted: Math.random() > 0.6,
      isTalking: Math.random() > 0.8
    }))
  ];

  if (!voiceSession?.isActive) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-6 shadow-xl">
            <Mic className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-200 mb-3">Voice Chat</h3>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            Connect with your team for real-time voice collaboration and screen sharing
          </p>
          <button
            onClick={onVoiceChatToggle}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center space-x-3"
          >
            <Phone className="w-5 h-5" />
            <span>Join Voice Chat</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Voice Status */}
      <div className="p-4 border-b border-gray-700 bg-green-600/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-green-400">Voice Connected</span>
          </div>
          <span className="text-xs text-gray-400">
            {mockParticipants.length} participants
          </span>
        </div>
        
        {/* Voice Controls */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`flex items-center justify-center p-3 rounded-lg font-medium transition-all ${
              isMuted 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }`}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          
          <button
            onClick={onScreenShareToggle}
            className={`flex items-center justify-center p-3 rounded-lg font-medium transition-all ${
              isScreenSharing
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }`}
          >
            {isScreenSharing ? <Monitor className="w-4 h-4" /> : <MonitorOff className="w-4 h-4" />}
          </button>
          
          <button
            onClick={onVoiceChatToggle}
            className="flex items-center justify-center p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
          >
            <PhoneOff className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Participants */}
      <div className="flex-1 overflow-y-auto p-4">
        <h4 className="text-sm font-semibold text-gray-200 mb-3">In Voice</h4>
        <div className="space-y-3">
          {mockParticipants.map((participant) => (
            <div key={participant.id} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: participant.color }}
                >
                  {participant.avatar || participant.name[0]}
                </div>
                {participant.isTalking && (
                  <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-200">
                    {participant.name}
                    {participant.id === currentUser.id && ' (You)'}
                  </span>
                  {participant.isTalking && (
                    <Volume2 className="w-3 h-3 text-green-400 animate-pulse" />
                  )}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  {participant.isMuted ? (
                    <MicOff className="w-3 h-3 text-red-400" />
                  ) : (
                    <Mic className="w-3 h-3 text-green-400" />
                  )}
                  <span className="text-xs text-gray-400">
                    {participant.isMuted ? 'Muted' : 'Unmuted'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Volume Control */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 mb-3">
          <VolumeX className="w-4 h-4 text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <Volume2 className="w-4 h-4 text-gray-400" />
        </div>
        <button className="w-full flex items-center justify-center space-x-2 p-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-sm transition-colors">
          <Settings className="w-4 h-4" />
          <span>Audio Settings</span>
        </button>
      </div>
    </div>
  );
};
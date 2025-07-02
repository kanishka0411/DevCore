import React from 'react';
import { Mic, MicOff, Phone, PhoneOff, Monitor, Users, Volume2 } from 'lucide-react';

interface VoiceChatProps {
  isActive: boolean;
  onToggle: () => void;
}

export const VoiceChat: React.FC<VoiceChatProps> = ({ isActive, onToggle }) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isScreenSharing, setIsScreenSharing] = React.useState(false);

  const mockParticipants = [
    { id: '1', name: 'Alice', isMuted: false, isTalking: true },
    { id: '2', name: 'Bob', isMuted: true, isTalking: false },
    { id: '3', name: 'Charlie', isMuted: false, isTalking: false }
  ];

  return (
    <div className="flex flex-col h-full p-4">
      {!isActive ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-full flex items-center justify-center mb-4">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">Voice Chat</h3>
          <p className="text-sm text-gray-400 mb-6">
            Connect with your team for real-time voice collaboration
          </p>
          <button
            onClick={onToggle}
            className="px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Phone className="w-4 h-4" />
            <span>Start Voice Chat</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Voice Controls */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-200">Voice Chat Active</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400">Live</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg font-medium transition-colors ${
                  isMuted 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span className="text-sm">{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>
              
              <button
                onClick={onToggle}
                className="flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <PhoneOff className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Participants */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-200">
                Participants ({mockParticipants.length + 1})
              </span>
            </div>
            
            <div className="space-y-2">
              {/* Current User */}
              <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">You</span>
                  </div>
                  <span className="text-sm text-gray-200">You</span>
                </div>
                <div className="flex items-center space-x-1">
                  {isMuted ? (
                    <MicOff className="w-4 h-4 text-red-400" />
                  ) : (
                    <Mic className="w-4 h-4 text-green-400" />
                  )}
                </div>
              </div>

              {/* Other Participants */}
              {mockParticipants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {participant.name[0]}
                      </span>
                    </div>
                    <span className="text-sm text-gray-200">{participant.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {participant.isTalking && (
                      <Volume2 className="w-4 h-4 text-green-400 animate-pulse" />
                    )}
                    {participant.isMuted ? (
                      <MicOff className="w-4 h-4 text-red-400" />
                    ) : (
                      <Mic className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Screen Share */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg font-medium transition-colors ${
                isScreenSharing
                  ? 'bg-accent-600 hover:bg-accent-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="text-sm">
                {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
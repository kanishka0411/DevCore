import React from 'react';
import { Code2, Users, Mic, MicOff, Monitor, MonitorOff, Share, Settings, Crown } from 'lucide-react';

interface User {
  id: string;
  name: string;
  color: string;
  avatar?: string;
}

interface HeaderProps {
  roomId: string;
  currentUser: User;
  users: User[];
  isConnected: boolean;
  onInviteUsers: () => void;
  onVoiceChatToggle: () => void;
  onScreenShareToggle: () => void;
  isVoiceChatActive: boolean;
  isScreenSharing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  roomId,
  currentUser,
  users,
  isConnected,
  onInviteUsers,
  onVoiceChatToggle,
  onScreenShareToggle,
  isVoiceChatActive,
  isScreenSharing
}) => {
  return (
    <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              DevCore
            </h1>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-xs text-gray-400">
                Room: {roomId.slice(-6)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Voice Chat Controls */}
        <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
          <button
            onClick={onVoiceChatToggle}
            className={`p-2 rounded-md transition-all ${
              isVoiceChatActive
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
            }`}
            title={isVoiceChatActive ? 'Leave voice chat' : 'Join voice chat'}
          >
            {isVoiceChatActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>
          
          <button
            onClick={onScreenShareToggle}
            className={`p-2 rounded-md transition-all ${
              isScreenSharing
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
            }`}
            title={isScreenSharing ? 'Stop screen share' : 'Share screen'}
          >
            {isScreenSharing ? <Monitor className="w-4 h-4" /> : <MonitorOff className="w-4 h-4" />}
          </button>
        </div>

        {/* User Count */}
        <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-200">
            {users.length + 1}
          </span>
        </div>

        {/* Invite Button */}
        <button
          onClick={onInviteUsers}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg"
        >
          <Share className="w-4 h-4" />
          <span>Invite</span>
        </button>

        {/* Settings */}
        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
          <Settings className="w-4 h-4 text-gray-400" />
        </button>

        {/* Current User */}
        <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
            {currentUser.avatar || currentUser.name[0]}
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium text-gray-200">{currentUser.name}</span>
            <Crown className="w-3 h-3 text-yellow-400" title="Room Owner" />
          </div>
        </div>
      </div>
    </header>
  );
};
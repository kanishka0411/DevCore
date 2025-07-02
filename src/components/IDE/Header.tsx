import React, { useState } from 'react';
import { Code2, Users, Mic, MicOff, Monitor, MonitorOff, Share, Settings, Crown, ArrowLeft, Wifi, WifiOff, Zap } from 'lucide-react';

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
  onShowSettings: () => void;
  onBackToLanding: () => void;
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
  onShowSettings,
  onBackToLanding,
  isVoiceChatActive,
  isScreenSharing
}) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handleTooltip = (id: string | null) => {
    setShowTooltip(id);
  };

  return (
    <header className="h-16 glass border-b border-neutral-800/50 flex items-center justify-between px-6 shadow-premium relative z-50 backdrop-blur-xl">
      {/* Left Section - Brand & Navigation */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBackToLanding}
          onMouseEnter={() => handleTooltip('back')}
          onMouseLeave={() => handleTooltip(null)}
          className="btn-icon relative"
        >
          <ArrowLeft className="w-5 h-5" />
          {showTooltip === 'back' && (
            <div className="tooltip -bottom-10 left-0 animate-fade-in">
              Back to Landing
            </div>
          )}
        </button>
        
        <div className="flex items-center space-x-4">
          {/* Enhanced Brand Icon */}
          <div className="relative group">
            <div className="w-11 h-11 bg-gradient-to-br from-brand-500 via-brand-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-brand-500/25 transition-all duration-300 group-hover:scale-105">
              <Code2 className="w-6 h-6 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-brand-500/50 to-purple-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
          </div>
          
          {/* Brand Info */}
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold gradient-text">
              DevCore
            </h1>
            <div className="flex items-center space-x-2">
              {/* Connection Status */}
              <div className="flex items-center space-x-1.5">
                {isConnected ? (
                  <>
                    <Wifi className="w-3 h-3 text-success-400" />
                    <div className="status-online" />
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 text-error-400" />
                    <div className="w-2 h-2 bg-error-500 rounded-full" />
                  </>
                )}
                <span className={`text-xs font-medium ${isConnected ? 'text-success-400' : 'text-error-400'}`}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              
              <div className="w-1 h-1 bg-neutral-600 rounded-full" />
              
              {/* Room ID */}
              <span className="text-xs text-neutral-500 font-mono">
                Room: <span className="text-neutral-400">{roomId.slice(-6)}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Center Section - Quick Actions (Mobile Hidden) */}
      <div className="hidden lg:flex items-center space-x-1 glass rounded-xl p-1">
        <button
          onClick={onVoiceChatToggle}
          onMouseEnter={() => handleTooltip('voice')}
          onMouseLeave={() => handleTooltip(null)}
          className={`relative p-2 rounded-lg transition-all duration-200 ${
            isVoiceChatActive
              ? 'bg-success-600 hover:bg-success-700 text-white shadow-lg'
              : 'bg-neutral-800/50 hover:bg-neutral-700/50 text-neutral-400 hover:text-neutral-200'
          }`}
        >
          {isVoiceChatActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          {isVoiceChatActive && <div className="absolute -top-1 -right-1 w-3 h-3 bg-success-400 rounded-full animate-pulse" />}
          
          {showTooltip === 'voice' && (
            <div className="tooltip -bottom-10 left-1/2 transform -translate-x-1/2 animate-fade-in">
              {isVoiceChatActive ? 'Leave voice chat' : 'Join voice chat'}
            </div>
          )}
        </button>
        
        <button
          onClick={onScreenShareToggle}
          onMouseEnter={() => handleTooltip('screen')}
          onMouseLeave={() => handleTooltip(null)}
          className={`relative p-2 rounded-lg transition-all duration-200 ${
            isScreenSharing
              ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg'
              : 'bg-neutral-800/50 hover:bg-neutral-700/50 text-neutral-400 hover:text-neutral-200'
          }`}
        >
          {isScreenSharing ? <Monitor className="w-4 h-4" /> : <MonitorOff className="w-4 h-4" />}
          {isScreenSharing && <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-400 rounded-full animate-pulse" />}
          
          {showTooltip === 'screen' && (
            <div className="tooltip -bottom-10 left-1/2 transform -translate-x-1/2 animate-fade-in">
              {isScreenSharing ? 'Stop screen share' : 'Share screen'}
            </div>
          )}
        </button>
      </div>

      {/* Right Section - User Actions */}
      <div className="flex items-center space-x-3">
        {/* User Count with Enhanced Design */}
        <div className="flex items-center space-x-2 glass rounded-lg px-3 py-2 group hover:scale-105 transition-all duration-200">
          <Users className="w-4 h-4 text-brand-400" />
          <span className="text-sm font-semibold text-neutral-200">
            {users.length + 1}
          </span>
          <div className="w-1 h-1 bg-success-500 rounded-full animate-pulse" />
        </div>

        {/* Enhanced Invite Button */}
        <button
          onClick={onInviteUsers}
          onMouseEnter={() => handleTooltip('invite')}
          onMouseLeave={() => handleTooltip(null)}
          className="relative group btn-primary overflow-hidden"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          
          <Share className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Invite</span>
          
          {showTooltip === 'invite' && (
            <div className="tooltip -bottom-10 left-1/2 transform -translate-x-1/2 animate-fade-in">
              Invite team members
            </div>
          )}
        </button>

        {/* Settings Button */}
        <button 
          onClick={onShowSettings}
          onMouseEnter={() => handleTooltip('settings')}
          onMouseLeave={() => handleTooltip(null)}
          className="btn-icon relative group"
        >
          <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          
          {showTooltip === 'settings' && (
            <div className="tooltip -bottom-10 left-1/2 transform -translate-x-1/2 animate-fade-in">
              Settings
            </div>
          )}
        </button>

        {/* Enhanced Current User Display */}
        <div className="flex items-center space-x-3 glass rounded-xl px-4 py-2 group hover:scale-105 transition-all duration-200">
          {/* User Avatar */}
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg">
              {currentUser.avatar || currentUser.name[0]}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-500 border-2 border-neutral-900 rounded-full animate-pulse" />
          </div>
          
          {/* User Info */}
          <div className="hidden sm:flex items-center space-x-2">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-neutral-200">{currentUser.name}</span>
                <Crown className="w-3 h-3 text-warning-400" />
              </div>
              <span className="text-2xs text-neutral-500">Online</span>
            </div>
          </div>
        </div>

        {/* Performance Indicator (Hidden on Mobile) */}
        <div className="hidden xl:flex items-center space-x-2 glass rounded-lg px-3 py-2 group">
          <Zap className="w-3 h-3 text-warning-400" />
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-success-500 rounded-full animate-pulse" />
            <div className="w-1 h-3 bg-success-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
            <div className="w-1 h-3 bg-success-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-3 bg-warning-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
          </div>
          <span className="text-2xs text-neutral-500 font-mono">Fast</span>
        </div>
      </div>
    </header>
  );
};
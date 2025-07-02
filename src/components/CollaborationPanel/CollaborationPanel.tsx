import React, { useState } from 'react';
import { UserList } from './UserList';
import { VoiceChat } from './VoiceChat';
import { AIAssistant } from './AIAssistant';
import { ActivityFeed } from './ActivityFeed';
import { Users, Mic, Bot, Activity, MessageSquare, Video } from 'lucide-react';

type TabType = 'users' | 'voice' | 'ai' | 'activity' | 'chat';

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

interface CollaborationPanelProps {
  users: User[];
  currentUser: User;
  voiceSession: VoiceChatSession | null;
  onVoiceChatToggle: () => void;
  onScreenShareToggle: () => void;
  isScreenSharing: boolean;
}

export const CollaborationPanel: React.FC<CollaborationPanelProps> = ({
  users,
  currentUser,
  voiceSession,
  onVoiceChatToggle,
  onScreenShareToggle,
  isScreenSharing
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('users');

  const tabs = [
    { 
      id: 'users' as TabType, 
      label: 'Team', 
      icon: Users, 
      count: users.length + 1,
      color: 'text-brand-400'
    },
    { 
      id: 'voice' as TabType, 
      label: 'Voice', 
      icon: voiceSession?.isActive ? Mic : Video, 
      active: voiceSession?.isActive,
      color: voiceSession?.isActive ? 'text-success-400' : 'text-neutral-400'
    },
    { 
      id: 'chat' as TabType, 
      label: 'Chat', 
      icon: MessageSquare,
      color: 'text-purple-400',
      hasNotification: false // Could be dynamic
    },
    { 
      id: 'ai' as TabType, 
      label: 'AI', 
      icon: Bot,
      color: 'text-warning-400'
    },
    { 
      id: 'activity' as TabType, 
      label: 'Activity', 
      icon: Activity,
      color: 'text-neutral-400'
    }
  ];

  return (
    <div className="w-80 glass border-l border-neutral-800/50 flex flex-col shadow-premium backdrop-blur-xl">
      {/* Enhanced Tab Navigation */}
      <div className="flex border-b border-neutral-800/50 bg-neutral-900/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-4 text-xs font-medium transition-all duration-300 relative group ${
              activeTab === tab.id
                ? 'text-brand-400 bg-neutral-800/50'
                : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/30'
            }`}
          >
            <div className="flex flex-col items-center space-y-1.5">
              {/* Icon with enhanced states */}
              <div className={`relative ${tab.color || 'text-neutral-400'} group-hover:scale-110 transition-transform duration-200`}>
                <tab.icon className="w-4 h-4" />
                
                {/* Active indicator */}
                {tab.active && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-success-400 rounded-full animate-pulse" />
                )}
                
                {/* Notification indicator */}
                {tab.hasNotification && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-warning-400 rounded-full animate-pulse" />
                )}
              </div>
              
              {/* Label */}
              <span className="hidden sm:inline leading-none">{tab.label}</span>
              
              {/* Count badge */}
              {tab.count && (
                <div className={`px-1.5 py-0.5 rounded-full text-2xs font-semibold transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-brand-500/20 text-brand-400' 
                    : 'bg-neutral-700/50 text-neutral-400'
                }`}>
                  {tab.count}
                </div>
              )}
            </div>
            
            {/* Active tab indicator */}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-400 to-brand-600 animate-scale-in" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content with enhanced transitions */}
      <div className="flex-1 overflow-hidden relative">
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="h-full animate-fade-in">
            <UserList users={users} currentUser={currentUser} />
          </div>
        )}
        
        {/* Voice Chat Tab */}
        {activeTab === 'voice' && (
          <div className="h-full animate-fade-in">
            <VoiceChat 
              voiceSession={voiceSession}
              users={users}
              currentUser={currentUser}
              onVoiceChatToggle={onVoiceChatToggle}
              onScreenShareToggle={onScreenShareToggle}
              isScreenSharing={isScreenSharing}
            />
          </div>
        )}
        
        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="h-full animate-fade-in">
            <div className="p-6 text-center">
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-300 mb-2">Team Chat</h3>
              <p className="text-sm text-neutral-500 mb-4">
                Real-time messaging with your team members
              </p>
              <div className="bg-neutral-800/50 rounded-lg p-3 text-xs text-neutral-500">
                Chat feature coming soon...
              </div>
            </div>
          </div>
        )}
        
        {/* AI Assistant Tab */}
        {activeTab === 'ai' && (
          <div className="h-full animate-fade-in">
            <AIAssistant />
          </div>
        )}
        
        {/* Activity Feed Tab */}
        {activeTab === 'activity' && (
          <div className="h-full animate-fade-in">
            <ActivityFeed users={users} />
          </div>
        )}
      </div>

      {/* Enhanced Footer with Quick Actions */}
      <div className="p-3 border-t border-neutral-800/50 bg-neutral-900/30">
        <div className="flex items-center justify-between">
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
            <span className="text-2xs text-neutral-500 font-medium">
              {users.length + 1} online
            </span>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center space-x-1">
            <button 
              className={`btn-icon text-2xs ${voiceSession?.isActive ? 'bg-success-500/20 text-success-400' : ''}`}
              onClick={onVoiceChatToggle}
            >
              <Mic className="w-3 h-3" />
            </button>
            <button 
              className={`btn-icon text-2xs ${isScreenSharing ? 'bg-brand-500/20 text-brand-400' : ''}`}
              onClick={onScreenShareToggle}
            >
              <Video className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
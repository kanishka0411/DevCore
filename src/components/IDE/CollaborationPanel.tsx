import React, { useState } from 'react';
import { UserList } from '../CollaborationPanel/UserList';
import { VoiceChat } from '../CollaborationPanel/VoiceChat';
import { AIAssistant } from '../CollaborationPanel/AIAssistant';
import { ActivityFeed } from '../CollaborationPanel/ActivityFeed';
import { Users, Mic, Bot, Activity } from 'lucide-react';

type TabType = 'users' | 'voice' | 'ai' | 'activity';

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
    { id: 'users' as TabType, label: 'Users', icon: Users, count: users.length + 1 },
    { id: 'voice' as TabType, label: 'Voice', icon: Mic, active: voiceSession?.isActive },
    { id: 'ai' as TabType, label: 'AI', icon: Bot },
    { id: 'activity' as TabType, label: 'Activity', icon: Activity }
  ];

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col shadow-xl">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 bg-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-3 text-xs font-medium transition-all relative ${
              activeTab === tab.id
                ? 'text-blue-400 bg-gray-700 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-center justify-center space-x-1">
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.count && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.count}
                </span>
              )}
              {tab.active && (
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'users' && (
          <UserList users={users} currentUser={currentUser} />
        )}
        {activeTab === 'voice' && (
          <VoiceChat 
            voiceSession={voiceSession}
            users={users}
            currentUser={currentUser}
            onVoiceChatToggle={onVoiceChatToggle}
            onScreenShareToggle={onScreenShareToggle}
            isScreenSharing={isScreenSharing}
          />
        )}
        {activeTab === 'ai' && (
          <AIAssistant />
        )}
        {activeTab === 'activity' && (
          <ActivityFeed users={users} />
        )}
      </div>
    </div>
  );
};
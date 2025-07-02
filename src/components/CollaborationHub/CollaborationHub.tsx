import React, { useState } from 'react';
import { AIChat } from './AIChat';
import { VoiceChat } from './VoiceChat';
import { GameCenter } from './GameCenter';
import { MessageSquare, Mic, Gamepad2 } from 'lucide-react';

type TabType = 'ai' | 'voice' | 'games';

interface CollaborationHubProps {
  onCodeHint: (code: string, language: string) => void;
  onVoiceChatToggle: () => void;
  isVoiceChatActive: boolean;
}

export const CollaborationHub: React.FC<CollaborationHubProps> = ({
  onCodeHint,
  onVoiceChatToggle,
  isVoiceChatActive
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('ai');

  const tabs = [
    { id: 'ai' as TabType, label: 'AI Companion', icon: MessageSquare },
    { id: 'voice' as TabType, label: 'Voice Chat', icon: Mic },
    { id: 'games' as TabType, label: 'Games', icon: Gamepad2 }
  ];

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-primary-400 border-b-2 border-primary-400 bg-gray-700/50'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30'
            }`}
          >
            <div className="flex items-center justify-center space-x-1">
              <tab.icon className="w-3 h-3" />
              <span className="hidden sm:inline">{tab.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'ai' && (
          <AIChat onCodeHint={onCodeHint} />
        )}
        {activeTab === 'voice' && (
          <VoiceChat 
            isActive={isVoiceChatActive}
            onToggle={onVoiceChatToggle}
          />
        )}
        {activeTab === 'games' && (
          <GameCenter />
        )}
      </div>
    </div>
  );
};
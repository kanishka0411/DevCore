import React from 'react';
import { FileText, GitBranch, MessageSquare, Users, Clock } from 'lucide-react';

interface User {
  id: string;
  name: string;
  color: string;
  avatar?: string;
}

interface ActivityFeedProps {
  users: User[];
}

interface Activity {
  id: string;
  type: 'file_edit' | 'join' | 'leave' | 'chat' | 'voice_join' | 'voice_leave';
  user: User;
  message: string;
  timestamp: Date;
  file?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ users }) => {
  // Mock activity data
  const activities: Activity[] = [
    {
      id: '1',
      type: 'file_edit',
      user: users[0] || { id: '1', name: 'Alice', color: '#3b82f6' },
      message: 'edited App.tsx',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      file: 'App.tsx'
    },
    {
      id: '2',
      type: 'join',
      user: users[1] || { id: '2', name: 'Bob', color: '#10b981' },
      message: 'joined the session',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: '3',
      type: 'voice_join',
      user: users[0] || { id: '1', name: 'Alice', color: '#3b82f6' },
      message: 'joined voice chat',
      timestamp: new Date(Date.now() - 8 * 60 * 1000)
    },
    {
      id: '4',
      type: 'file_edit',
      user: { id: 'you', name: 'You', color: '#8b5cf6' },
      message: 'created components/Header.tsx',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      file: 'components/Header.tsx'
    },
    {
      id: '5',
      type: 'chat',
      user: users[1] || { id: '2', name: 'Bob', color: '#10b981' },
      message: 'asked AI for help with React hooks',
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'file_edit':
        return <FileText className="w-4 h-4 text-blue-400" />;
      case 'join':
      case 'leave':
        return <Users className="w-4 h-4 text-green-400" />;
      case 'voice_join':
      case 'voice_leave':
        return <Users className="w-4 h-4 text-purple-400" />;
      case 'chat':
        return <MessageSquare className="w-4 h-4 text-yellow-400" />;
      default:
        return <GitBranch className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-200 flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>Recent Activity</span>
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 group">
              <div className="flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: activity.user.color }}
                >
                  {activity.user.avatar || activity.user.name[0]}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  {getActivityIcon(activity.type)}
                  <span className="text-sm font-medium text-gray-200">
                    {activity.user.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTime(activity.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-300">
                  {activity.message}
                  {activity.file && (
                    <span className="ml-1 px-2 py-0.5 bg-gray-700 rounded text-xs font-mono">
                      {activity.file}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-700">
        <button className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-sm font-medium transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
};
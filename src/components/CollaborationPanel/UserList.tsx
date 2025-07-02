import React from 'react';
import { Crown, Mic, MicOff, Monitor, Circle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  color: string;
  avatar?: string;
}

interface UserListProps {
  users: User[];
  currentUser: User;
}

export const UserList: React.FC<UserListProps> = ({ users, currentUser }) => {
  const allUsers = [currentUser, ...users];

  const getStatusColor = (user: User) => {
    // Mock status - in real app this would come from user data
    const statuses = ['online', 'away', 'busy', 'offline'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getStatusIcon = (status: string) => {
    const colors = {
      online: 'text-green-400',
      away: 'text-yellow-400',
      busy: 'text-red-400',
      offline: 'text-gray-400'
    };
    return <Circle className={`w-3 h-3 ${colors[status as keyof typeof colors]} fill-current`} />;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-200 mb-2">
          Online — {allUsers.length}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {allUsers.map((user, index) => {
          const isCurrentUser = user.id === currentUser.id;
          const status = getStatusColor(user);
          
          return (
            <div
              key={user.id}
              className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-all group ${
                isCurrentUser ? 'bg-blue-600/10 border border-blue-600/20' : ''
              }`}
            >
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                  style={{ backgroundColor: user.color }}
                >
                  {user.avatar || user.name[0]}
                </div>
                <div className="absolute -bottom-1 -right-1">
                  {getStatusIcon(status)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium truncate ${
                    isCurrentUser ? 'text-blue-400' : 'text-gray-200'
                  }`}>
                    {user.name}
                    {isCurrentUser && ' (You)'}
                  </span>
                  {index === 0 && (
                    <Crown className="w-3 h-3 text-yellow-400" title="Room Owner" />
                  )}
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-xs text-gray-400 capitalize">{status}</span>
                  {Math.random() > 0.5 && (
                    <span className="text-xs text-gray-500">• Coding in App.tsx</span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {Math.random() > 0.5 ? (
                  <Mic className="w-4 h-4 text-green-400" />
                ) : (
                  <MicOff className="w-4 h-4 text-gray-400" />
                )}
                {Math.random() > 0.7 && (
                  <Monitor className="w-4 h-4 text-blue-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-xs font-medium transition-colors">
            Invite More
          </button>
          <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-xs font-medium transition-colors">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};
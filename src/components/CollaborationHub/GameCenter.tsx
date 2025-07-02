import React, { useState } from 'react';
import { Trophy, Target, Zap, Users, Play, Clock } from 'lucide-react';

interface GameInvite {
  id: string;
  type: 'typing-race' | 'code-golf' | 'debugging-challenge';
  sender: string;
  status: 'pending' | 'accepted' | 'declined';
}

export const GameCenter: React.FC = () => {
  const [activeInvites] = useState<GameInvite[]>([
    {
      id: '1',
      type: 'typing-race',
      sender: 'Alice',
      status: 'pending'
    }
  ]);

  const games = [
    {
      id: 'typing-race',
      name: 'Speed Typing',
      description: 'Race to type code snippets fastest',
      icon: Target,
      color: 'from-blue-500 to-blue-700',
      difficulty: 'Easy'
    },
    {
      id: 'code-golf',
      name: 'Code Golf',
      description: 'Solve problems with minimal code',
      icon: Trophy,
      color: 'from-green-500 to-green-700',
      difficulty: 'Hard'
    },
    {
      id: 'debugging-challenge',
      name: 'Bug Hunt',
      description: 'Find and fix bugs quickly',
      icon: Zap,
      color: 'from-orange-500 to-orange-700',
      difficulty: 'Medium'
    }
  ];

  const leaderboard = [
    { name: 'Alice', score: 2850, rank: 1 },
    { name: 'Bob', score: 2340, rank: 2 },
    { name: 'Charlie', score: 1990, rank: 3 },
    { name: 'You', score: 1750, rank: 4 }
  ];

  return (
    <div className="flex flex-col h-full p-4">
      {/* Active Invites */}
      {activeInvites.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-200 mb-3">Game Invites</h3>
          {activeInvites.map((invite) => (
            <div key={invite.id} className="p-3 bg-primary-600/20 border border-primary-600/30 rounded-lg mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary-400">
                  {invite.sender} invited you to {games.find(g => g.id === invite.type)?.name}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors">
                  Accept
                </button>
                <button className="flex-1 px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Available Games */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-200 mb-3">Available Games</h3>
        <div className="space-y-3">
          {games.map((game) => (
            <div key={game.id} className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors cursor-pointer group">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${game.color} rounded-lg flex items-center justify-center`}>
                  <game.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-200">{game.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      game.difficulty === 'Easy' ? 'bg-green-600/20 text-green-400' :
                      game.difficulty === 'Medium' ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-red-600/20 text-red-400'
                    }`}>
                      {game.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{game.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-600">
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>2-4 players</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>5-10 min</span>
                  </div>
                </div>
                <button className="flex items-center space-x-1 px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-xs rounded transition-colors opacity-0 group-hover:opacity-100">
                  <Play className="w-3 h-3" />
                  <span>Play</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-200 mb-3">Leaderboard</h3>
        <div className="space-y-2">
          {leaderboard.map((player) => (
            <div key={player.name} className={`flex items-center justify-between p-2 rounded-lg ${
              player.name === 'You' ? 'bg-primary-600/20 border border-primary-600/30' : 'bg-gray-700/30'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  player.rank === 1 ? 'bg-yellow-500 text-white' :
                  player.rank === 2 ? 'bg-gray-400 text-white' :
                  player.rank === 3 ? 'bg-orange-600 text-white' :
                  'bg-gray-600 text-gray-300'
                }`}>
                  {player.rank}
                </div>
                <span className={`text-sm ${player.name === 'You' ? 'text-primary-400 font-medium' : 'text-gray-200'}`}>
                  {player.name}
                </span>
              </div>
              <span className="text-sm text-gray-400">{player.score.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
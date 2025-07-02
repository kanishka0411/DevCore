import React, { useState } from 'react';
import { X, Copy, Check, Share, Mail, MessageSquare } from 'lucide-react';

interface InviteModalProps {
  inviteLink: string;
  roomId: string;
  onClose: () => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({
  inviteLink,
  roomId,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleShareEmail = () => {
    const subject = 'Join my DevCore coding session';
    const body = `Hey! I'm working on a project and would love your collaboration.\n\nJoin my DevCore session: ${inviteLink}\n\nRoom ID: ${roomId}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-gray-200">Invite to DevCore</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Room Info */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Share className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              Share Your Coding Session
            </h3>
            <p className="text-sm text-gray-400">
              Invite others to collaborate in real-time with code editing, voice chat, and screen sharing.
            </p>
          </div>

          {/* Invite Link */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Invite Link
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Room ID */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Room ID
            </label>
            <div className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg">
              <span className="text-lg font-mono text-blue-400">{roomId}</span>
            </div>
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleShareEmail}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Copy Link</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-700/50 rounded-b-2xl">
          <p className="text-xs text-gray-400 text-center">
            Anyone with this link can join your coding session
          </p>
        </div>
      </div>
    </div>
  );
};
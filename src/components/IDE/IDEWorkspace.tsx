import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { CodeEditor } from './CodeEditor';
import { CollaborationPanel } from './CollaborationPanel';
import { SettingsPanel } from './SettingsPanel';
import { InviteModal } from '../Modals/InviteModal';
import { useFileSystem } from '../../hooks/useFileSystem';
import { useCollaboration } from '../../hooks/useCollaboration';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useSettings } from '../../hooks/useSettings';
import { getLanguageFromFilename } from '../../utils/fileUtils';
import { generateRoomId, generateInviteLink } from '../../utils/roomUtils';

interface IDEWorkspaceProps {
  user: any;
  onBackToLanding: () => void;
}

export const IDEWorkspace: React.FC<IDEWorkspaceProps> = ({ user, onBackToLanding }) => {
  const [roomId] = useState(() => generateRoomId());
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentUser] = useState({
    id: user?.email || 'user-' + Math.random().toString(36).substr(2, 9),
    name: user?.name || 'Anonymous User',
    color: '#3b82f6',
    avatar: user?.name?.[0] || '👤'
  });

  // Settings hook
  const { settings, updateSettings } = useSettings();

  // File system management
  const {
    rootDirectory,
    selectedFile,
    fileContent,
    openDirectory,
    openFile,
    saveFile,
    setFileContent
  } = useFileSystem();

  // Collaboration features
  const {
    socket,
    ydoc,
    provider,
    users,
    isConnected,
    joinRoom
  } = useCollaboration(roomId);

  // WebRTC for voice chat and screen sharing
  const {
    voiceSession,
    startVoiceChat,
    stopVoiceChat,
    startScreenShare,
    stopScreenShare,
    isScreenSharing
  } = useWebRTC();

  useEffect(() => {
    // Auto-join room on load
    joinRoom(currentUser);
  }, [joinRoom, currentUser]);

  const handleFileSelect = useCallback(async (file: any) => {
    try {
      await openFile(file);
    } catch (error) {
      console.error('Error opening file:', error);
    }
  }, [openFile]);

  const handleCodeChange = useCallback((value: string) => {
    setFileContent(value);
    // Auto-save after a delay
    const saveTimeout = setTimeout(() => {
      saveFile(value).catch(console.error);
    }, 1000);
    
    return () => clearTimeout(saveTimeout);
  }, [setFileContent, saveFile]);

  const handleInviteUsers = useCallback(() => {
    setShowInviteModal(true);
  }, []);

  const handleVoiceChatToggle = useCallback(async () => {
    try {
      if (voiceSession?.isActive) {
        stopVoiceChat();
      } else {
        await startVoiceChat();
      }
    } catch (error) {
      console.error('Error toggling voice chat:', error);
    }
  }, [voiceSession, startVoiceChat, stopVoiceChat]);

  const handleScreenShareToggle = useCallback(async () => {
    try {
      if (isScreenSharing) {
        stopScreenShare();
      } else {
        await startScreenShare();
      }
    } catch (error) {
      console.error('Error toggling screen share:', error);
    }
  }, [isScreenSharing, startScreenShare, stopScreenShare]);

  const currentLanguage = selectedFile 
    ? getLanguageFromFilename(selectedFile.name)
    : 'javascript';

  const inviteLink = generateInviteLink(roomId);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      <Header 
        roomId={roomId}
        currentUser={currentUser}
        users={users}
        isConnected={isConnected}
        onInviteUsers={handleInviteUsers}
        onVoiceChatToggle={handleVoiceChatToggle}
        onScreenShareToggle={handleScreenShareToggle}
        onShowSettings={() => setShowSettings(true)}
        onBackToLanding={onBackToLanding}
        isVoiceChatActive={voiceSession?.isActive || false}
        isScreenSharing={isScreenSharing}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          rootDirectory={rootDirectory}
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
          onOpenDirectory={openDirectory}
        />
        
        <div className="flex-1 flex flex-col min-w-0 bg-gray-800">
          {selectedFile ? (
            <>
              <div className="h-12 bg-gray-700 border-b border-gray-600 flex items-center px-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-200 truncate">
                    {selectedFile.name}
                  </span>
                  {fileContent !== selectedFile.content && (
                    <div className="w-2 h-2 bg-orange-400 rounded-full" title="Unsaved changes" />
                  )}
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">
                    {currentLanguage}
                  </span>
                  <div className="flex -space-x-2">
                    {users.slice(0, 3).map((user, index) => (
                      <div
                        key={user.id}
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-gray-700 flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: user.color }}
                        title={user.name}
                      >
                        {user.avatar || user.name[0]}
                      </div>
                    ))}
                    {users.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-gray-700 flex items-center justify-center text-xs font-bold">
                        +{users.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <CodeEditor
                content={fileContent}
                language={currentLanguage}
                onChange={handleCodeChange}
                ydoc={ydoc}
                provider={provider}
                users={users}
                currentUser={currentUser}
                settings={settings}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
              <div className="text-center max-w-md">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  Welcome to DevCore
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                  Your next-generation collaborative development environment. 
                  Open a project to start coding with your team in real-time.
                </p>
                <button
                  onClick={openDirectory}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  Open Project Folder
                </button>
              </div>
            </div>
          )}
        </div>
        
        <CollaborationPanel
          users={users}
          currentUser={currentUser}
          voiceSession={voiceSession}
          onVoiceChatToggle={handleVoiceChatToggle}
          onScreenShareToggle={handleScreenShareToggle}
          isScreenSharing={isScreenSharing}
        />
      </div>

      {showInviteModal && (
        <InviteModal
          inviteLink={inviteLink}
          roomId={roomId}
          onClose={() => setShowInviteModal(false)}
        />
      )}

      {showSettings && (
        <SettingsPanel
          settings={settings}
          onUpdateSettings={updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};
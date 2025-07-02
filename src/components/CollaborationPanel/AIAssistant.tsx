import React, { useState, useRef, useEffect } from 'react';
import { Send, ThumbsUp, ThumbsDown, Sparkles, Code, Coffee, Zap } from 'lucide-react';
import { aiService } from '../../services/aiService';
import type { AIMessage } from '../../types';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      type: 'ai',
      content: "Hey there! 👋 I'm your AI coding companion. I can help you with code hints, debugging, or just chat to keep your spirits up while you code!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let aiResponse: AIMessage;

      if (inputMessage.toLowerCase().includes('joke') || inputMessage.toLowerCase().includes('fun')) {
        aiResponse = await aiService.getFunJoke('programming');
      } else if (inputMessage.toLowerCase().includes('hint') || inputMessage.toLowerCase().includes('code')) {
        aiResponse = await aiService.getCodingHint('// Current code context', 'javascript');
      } else {
        aiResponse = await aiService.getGeneralHelp(inputMessage);
      }

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: AIMessage = {
        id: `error-${Date.now()}`,
        type: 'ai',
        content: "Oops! I'm having trouble connecting right now, but I'm still here to help! 💪",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (action: 'hint' | 'joke' | 'motivate' | 'debug') => {
    setIsLoading(true);
    
    try {
      let aiResponse: AIMessage;
      
      switch (action) {
        case 'hint':
          aiResponse = await aiService.getCodingHint('// Sample code', 'javascript');
          break;
        case 'joke':
          aiResponse = await aiService.getFunJoke('programming');
          break;
        case 'motivate':
          aiResponse = await aiService.getGeneralHelp('Give me some coding motivation');
          break;
        case 'debug':
          aiResponse = await aiService.getGeneralHelp('Help me debug my code');
          break;
      }
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error with quick action:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (messageId: string, type: 'like' | 'dislike') => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          liked: type === 'like' ? true : undefined,
          disliked: type === 'dislike' ? true : undefined
        };
      }
      return msg;
    }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-200 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleQuickAction('hint')}
            className="flex items-center justify-center space-x-2 p-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-xs font-medium transition-all"
            disabled={isLoading}
          >
            <Code className="w-4 h-4" />
            <span>Code Hint</span>
          </button>
          <button
            onClick={() => handleQuickAction('debug')}
            className="flex items-center justify-center space-x-2 p-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-xs font-medium transition-all"
            disabled={isLoading}
          >
            <Zap className="w-4 h-4" />
            <span>Debug Help</span>
          </button>
          <button
            onClick={() => handleQuickAction('joke')}
            className="flex items-center justify-center space-x-2 p-3 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded-lg text-xs font-medium transition-all"
            disabled={isLoading}
          >
            <Coffee className="w-4 h-4" />
            <span>Tell Joke</span>
          </button>
          <button
            onClick={() => handleQuickAction('motivate')}
            className="flex items-center justify-center space-x-2 p-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg text-xs font-medium transition-all"
            disabled={isLoading}
          >
            <Sparkles className="w-4 h-4" />
            <span>Motivate</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-3 ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-800 text-gray-200 border border-gray-700'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              
              {message.type === 'ai' && (
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-600">
                  <span className="text-xs text-gray-400">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleFeedback(message.id, 'like')}
                      className={`p-1 rounded-md hover:bg-gray-700 transition-colors ${
                        message.liked ? 'text-green-400' : 'text-gray-400'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleFeedback(message.id, 'dislike')}
                      className={`p-1 rounded-md hover:bg-gray-700 transition-colors ${
                        message.disliked ? 'text-red-400' : 'text-gray-400'
                      }`}
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState, useRef, useEffect } from 'react';
import { Send, ThumbsUp, ThumbsDown, Sparkles, Coffee, Code } from 'lucide-react';
import { aiService } from '../../services/aiService';
import type { AIMessage } from '../../types';

interface AIChatProps {
  onCodeHint: (code: string, language: string) => void;
}

export const AIChat: React.FC<AIChatProps> = ({ onCodeHint }) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      type: 'ai',
      content: "Hey there! I'm your coding companion 🚀 Ask me for coding hints, debugging help, or just a fun joke to brighten your day!",
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
        content: "Sorry, I'm having trouble connecting right now. But I'm still here to help! 💪",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (action: 'hint' | 'joke' | 'motivate') => {
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
      <div className="p-3 border-b border-gray-700">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleQuickAction('hint')}
            className="flex items-center justify-center space-x-1 px-2 py-1 bg-primary-600/20 hover:bg-primary-600/30 text-primary-400 rounded text-xs transition-colors"
            disabled={isLoading}
          >
            <Code className="w-3 h-3" />
            <span>Hint</span>
          </button>
          <button
            onClick={() => handleQuickAction('joke')}
            className="flex items-center justify-center space-x-1 px-2 py-1 bg-accent-600/20 hover:bg-accent-600/30 text-accent-400 rounded text-xs transition-colors"
            disabled={isLoading}
          >
            <Coffee className="w-3 h-3" />
            <span>Joke</span>
          </button>
          <button
            onClick={() => handleQuickAction('motivate')}
            className="flex items-center justify-center space-x-1 px-2 py-1 bg-secondary-600/20 hover:bg-secondary-600/30 text-secondary-400 rounded text-xs transition-colors"
            disabled={isLoading}
          >
            <Sparkles className="w-3 h-3" />
            <span>Boost</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                message.type === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-700 text-gray-200'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              
              {message.type === 'ai' && (
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-600">
                  <span className="text-xs text-gray-400">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleFeedback(message.id, 'like')}
                      className={`p-1 rounded hover:bg-gray-600 transition-colors ${
                        message.liked ? 'text-green-400' : 'text-gray-400'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleFeedback(message.id, 'dislike')}
                      className={`p-1 rounded hover:bg-gray-600 transition-colors ${
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
            <div className="bg-gray-700 rounded-lg px-3 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-3 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
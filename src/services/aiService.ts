import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIMessage } from '../types';

class AIService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    // Initialize Gemini API
    // In production, this would use environment variables
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    } else {
      console.warn('Gemini API key not configured. Using mock responses.');
    }
  }

  async getCodingHint(code: string, language: string): Promise<AIMessage> {
    try {
      if (this.model) {
        const prompt = `As a helpful coding assistant, please provide a brief hint or suggestion for improving this ${language} code:\n\n${code}\n\nProvide a concise, actionable tip.`;
        
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        return {
          id: `ai-${Date.now()}`,
          type: 'ai',
          content: text,
          timestamp: new Date()
        };
      } else {
        // Mock response when API is not configured
        return this.getMockCodingHint(language);
      }
    } catch (error) {
      console.error('Error getting coding hint:', error);
      return this.getMockCodingHint(language);
    }
  }

  async getFunJoke(topic: string): Promise<AIMessage> {
    try {
      if (this.model) {
        const prompt = `Tell me a clean, programming-related joke about ${topic}. Keep it light and fun!`;
        
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        return {
          id: `ai-${Date.now()}`,
          type: 'ai',
          content: text,
          timestamp: new Date()
        };
      } else {
        return this.getMockJoke(topic);
      }
    } catch (error) {
      console.error('Error getting joke:', error);
      return this.getMockJoke(topic);
    }
  }

  async getGeneralHelp(question: string): Promise<AIMessage> {
    try {
      if (this.model) {
        const prompt = `As a friendly coding companion, please help with this question: ${question}\n\nProvide a helpful, encouraging response.`;
        
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        return {
          id: `ai-${Date.now()}`,
          type: 'ai',
          content: text,
          timestamp: new Date()
        };
      } else {
        return this.getMockHelp(question);
      }
    } catch (error) {
      console.error('Error getting help:', error);
      return this.getMockHelp(question);
    }
  }

  private getMockCodingHint(language: string): AIMessage {
    const hints = [
      `Consider using more descriptive variable names in your ${language} code for better readability! 🚀`,
      `Great ${language} code! You might want to add some error handling to make it more robust. 💪`,
      `Nice work! Consider breaking this into smaller functions for better maintainability. ✨`,
      `Looking good! Adding some comments would help other developers understand your logic. 📝`
    ];
    
    return {
      id: `ai-${Date.now()}`,
      type: 'ai',
      content: hints[Math.floor(Math.random() * hints.length)],
      timestamp: new Date()
    };
  }

  private getMockJoke(topic: string): AIMessage {
    const jokes = [
      `Why do programmers prefer dark mode? Because light attracts bugs! 🐛`,
      `How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡`,
      `Why do Java developers wear glasses? Because they don't C#! 👓`,
      `What's a programmer's favorite hangout place? Foo Bar! 🍺`
    ];
    
    return {
      id: `ai-${Date.now()}`,
      type: 'ai',
      content: jokes[Math.floor(Math.random() * jokes.length)],
      timestamp: new Date()
    };
  }

  private getMockHelp(question: string): AIMessage {
    return {
      id: `ai-${Date.now()}`,
      type: 'ai',
      content: `I'd love to help with "${question}"! While I'm running in demo mode, I'm here to provide coding hints, share fun jokes, and keep your development spirits high! 🎉`,
      timestamp: new Date()
    };
  }
}

export const aiService = new AIService();
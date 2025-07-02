import React, { useState } from 'react';
import { X, User, Mail, Building, ArrowRight } from 'lucide-react';

interface GetStartedModalProps {
  onClose: () => void;
  onStart: (userData: any) => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ onClose, onStart }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'developer'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(formData);
  };

  const handleSkip = () => {
    onStart({
      name: 'Anonymous User',
      email: '',
      company: '',
      role: 'developer'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-3xl shadow-2xl border border-gray-700 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to DevCore</h2>
          <p className="text-blue-100">Let's get you started with collaborative coding</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Building className="w-4 h-4 inline mr-2" />
              Company (Optional)
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Project Manager</option>
              <option value="student">Student</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Start Coding</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              type="button"
              onClick={handleSkip}
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors"
            >
              Skip for now
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-800/50 border-t border-gray-700">
          <p className="text-xs text-gray-400 text-center">
            By continuing, you agree to our{' '}
            <a href="#terms" className="text-blue-400 hover:text-blue-300">Terms</a> and{' '}
            <a href="#privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};
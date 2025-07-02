import React from 'react';
import { 
  Code2, Users, Mic, Bot, Gamepad2, Shield, 
  Zap, Globe, Palette, Settings, FileText, Video,
  Sparkles, Clock, Star, ArrowRight
} from 'lucide-react';

export const Features: React.FC = () => {
  const featuresData = [
    {
      icon: Code2,
      title: 'Real-time Collaborative Editing',
      description: 'Edit code together with live cursors, selections, and instant synchronization across all team members.',
      gradient: 'from-brand-500 to-blue-500',
      delay: '0s'
    },
    {
      icon: Mic,
      title: 'Voice Chat & Screen Sharing',
      description: 'Crystal-clear voice communication and screen sharing for seamless team collaboration.',
      gradient: 'from-success-500 to-green-500',
      delay: '0.1s'
    },
    {
      icon: Bot,
      title: 'AI-Powered Assistant',
      description: 'Get intelligent code suggestions, debugging help, and instant answers to your programming questions.',
      gradient: 'from-warning-500 to-orange-500',
      delay: '0.2s'
    },
    {
      icon: Shield,
      title: 'Local-First Architecture',
      description: 'Your code stays on your machine. Complete privacy and security with optional cloud sync.',
      gradient: 'from-purple-500 to-pink-500',
      delay: '0.3s'
    },
    {
      icon: Gamepad2,
      title: 'Gamified Coding',
      description: 'Coding challenges, leaderboards, and team competitions to make development fun and engaging.',
      gradient: 'from-cyan-500 to-blue-500',
      delay: '0.4s'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Performance',
      description: 'Optimized for speed with instant file loading, smart caching, and minimal latency.',
      gradient: 'from-yellow-500 to-orange-500',
      delay: '0.5s'
    },
    {
      icon: Palette,
      title: 'Customizable Themes',
      description: 'Beautiful themes, custom color schemes, and personalized workspace layouts.',
      gradient: 'from-pink-500 to-rose-500',
      delay: '0.6s'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Syntax highlighting and IntelliSense for 100+ programming languages and frameworks.',
      gradient: 'from-indigo-500 to-purple-500',
      delay: '0.7s'
    },
    {
      icon: FileText,
      title: 'Smart File Management',
      description: 'Intelligent file explorer with search, filters, and project-wide navigation.',
      gradient: 'from-teal-500 to-cyan-500',
      delay: '0.8s'
    },
    {
      icon: Video,
      title: 'Session Recording',
      description: 'Record coding sessions for later review, training, or sharing with your team.',
      gradient: 'from-red-500 to-pink-500',
      delay: '0.9s'
    },
    {
      icon: Settings,
      title: 'Advanced Customization',
      description: 'Font sizes, editor settings, keyboard shortcuts, and workflow optimizations.',
      gradient: 'from-gray-500 to-slate-500',
      delay: '1s'
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Role-based permissions, team analytics, and collaborative project management.',
      gradient: 'from-emerald-500 to-teal-500',
      delay: '1.1s'
    }
  ];

  const premiumFeatures = [
    {
      icon: Sparkles,
      title: 'AI Code Generation',
      description: 'Generate entire functions and classes with natural language prompts',
      badge: 'Pro'
    },
    {
      icon: Clock,
      title: 'Time Machine',
      description: 'Rewind and replay any coding session with complete history',
      badge: 'Pro'
    },
    {
      icon: Star,
      title: 'Priority Support',
      description: '24/7 dedicated support with instant response times',
      badge: 'Enterprise'
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-brand-500/5 to-purple-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/5 to-brand-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-medium text-neutral-300">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">
              Everything You Need to
            </span>
            <br />
            <span className="gradient-text">
              Code Collaboratively
            </span>
          </h2>
          
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            DevCore combines the best of modern development tools with cutting-edge collaboration features
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="group relative card-hover p-8 animate-fade-in"
              style={{ animationDelay: feature.delay }}
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur transition-opacity duration-300`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-brand-200 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-neutral-400 leading-relaxed mb-6 group-hover:text-neutral-300 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Learn More Link */}
              <button className="flex items-center space-x-2 text-brand-400 hover:text-brand-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/10 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Premium Features Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-6">Premium Features</h3>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Unlock advanced capabilities with our Pro and Enterprise plans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {premiumFeatures.map((feature, index) => (
            <div
              key={index}
              className="relative card-hover p-8 text-center animate-fade-in"
              style={{ animationDelay: `${1.2 + index * 0.1}s` }}
            >
              {/* Premium Badge */}
              <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold ${
                feature.badge === 'Pro' 
                  ? 'bg-warning-500/20 text-warning-400 border border-warning-500/30'
                  : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              }`}>
                {feature.badge}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h4 className="text-lg font-semibold text-white mb-3">{feature.title}</h4>
              <p className="text-neutral-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Development Workflow?</h3>
            <p className="text-neutral-400 mb-6">
              Join thousands of developers who have already made the switch to collaborative coding
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="btn-primary">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button className="btn-secondary">
                View All Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { Play, ArrowRight, Users, Zap, Shield, Sparkles, Code2 } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-brand-500/10 to-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-brand-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-2xl animate-pulse-gentle" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-neutral-900/20 to-transparent" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 group hover:scale-105 transition-all duration-300 animate-fade-in">
            <div className="relative">
              <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
              <div className="absolute inset-0 w-4 h-4 bg-brand-400/20 rounded-full animate-ping" />
            </div>
            <span className="text-sm font-medium text-neutral-300 group-hover:text-neutral-100 transition-colors">
              Next-Gen Collaborative IDE
            </span>
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
          </div>

          {/* Main Heading with Enhanced Typography */}
          <div className="mb-8 animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-[0.9] tracking-tight">
              <span className="inline-block text-white animate-fade-in">
                Code Together,
              </span>
              <br />
              <span className="inline-block gradient-text animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Ship Faster
              </span>
            </h1>
            
            {/* Subtle accent line */}
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-purple-500 rounded-full mx-auto mt-6 animate-scale-in" style={{ animationDelay: '0.4s' }} />
          </div>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            The most advanced collaborative development environment for modern teams. 
            <br className="hidden md:block" />
            <span className="text-neutral-300 font-medium">Real-time editing, voice chat, AI assistance</span>, and premium developer experience.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20 animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={onGetStarted}
              className="group relative px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-brand-500/25 hover:shadow-brand-500/40 flex items-center space-x-3 overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <Code2 className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Start Coding Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
            
            <button className="group px-8 py-4 glass hover:bg-white/10 text-white rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center space-x-3 hover:scale-105 border border-white/10 hover:border-white/20">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {[
              { icon: Users, value: '50K+', label: 'Active Developers', color: 'text-brand-400' },
              { icon: Zap, value: '99.9%', label: 'Uptime', color: 'text-warning-400' },
              { icon: Shield, value: '100%', label: 'Secure', color: 'text-success-400' }
            ].map((stat, index) => (
              <div
                key={index}
                className="group text-center animate-scale-in"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="relative w-20 h-20 glass rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl overflow-hidden">
                  {/* Background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color.includes('brand') ? 'from-brand-500/20' : stat.color.includes('warning') ? 'from-warning-500/20' : 'from-success-500/20'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <stat.icon className={`w-8 h-8 ${stat.color} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-neutral-800/50 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-sm text-neutral-500 mb-4">Trusted by developers at</p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              {['Google', 'Meta', 'Netflix', 'Spotify', 'Airbnb'].map((company, index) => (
                <div key={index} className="text-neutral-600 font-medium hover:text-neutral-400 transition-colors cursor-pointer">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 border-2 border-neutral-700 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neutral-600 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
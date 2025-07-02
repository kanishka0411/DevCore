import React, { useState } from 'react';
import { Hero } from './Hero';
import { Features } from './Features';
import { Pricing } from './Pricing';
import { Reviews } from './Reviews';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { GetStartedModal } from './GetStartedModal';

interface LandingPageProps {
  onGetStarted: (userData?: any) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [showGetStarted, setShowGetStarted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-brand-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 via-pink-500/8 to-brand-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-cyan-500/6 via-brand-500/6 to-purple-500/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:80px_80px] opacity-50" />
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-neutral-950/50 to-neutral-950" />
        
        {/* Noise Texture */}
        <div 
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation onGetStarted={() => setShowGetStarted(true)} />
        <Hero onGetStarted={() => setShowGetStarted(true)} />
        <Features />
        <Reviews />
        <Pricing onGetStarted={() => setShowGetStarted(true)} />
        <Footer />
      </div>
      
      {/* Modal */}
      {showGetStarted && (
        <GetStartedModal
          onClose={() => setShowGetStarted(false)}
          onStart={onGetStarted}
        />
      )}
    </div>
  );
};
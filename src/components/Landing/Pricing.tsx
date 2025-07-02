import React from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';

interface PricingProps {
  onGetStarted: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onGetStarted }) => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for individual developers and small projects',
      icon: Star,
      features: [
        'Up to 3 collaborators',
        'Basic real-time editing',
        'Voice chat (30 min/day)',
        'AI assistant (10 queries/day)',
        'Local file system access',
        'Basic themes',
        'Community support'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$12',
      period: 'per user/month',
      description: 'For professional teams and growing companies',
      icon: Zap,
      features: [
        'Unlimited collaborators',
        'Advanced real-time features',
        'Unlimited voice chat',
        'AI assistant (unlimited)',
        'Screen sharing & recording',
        'Premium themes & customization',
        'Advanced file management',
        'Team analytics',
        'Priority support',
        'Cloud sync & backup'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organizations with advanced needs',
      icon: Crown,
      features: [
        'Everything in Pro',
        'SSO & advanced security',
        'Custom integrations',
        'Dedicated support',
        'On-premise deployment',
        'Custom themes & branding',
        'Advanced admin controls',
        'SLA guarantees',
        'Training & onboarding',
        'Custom AI models'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">
              Simple, Transparent
            </span>
            <br />
            <span className="text-slate-400">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Choose the perfect plan for your team. Start free, upgrade when you need more.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-white/30 bg-white/10 scale-105' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white text-slate-900 px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-slate-400 ml-1">/{plan.period}</span>
                  )}
                </div>
                {plan.price === 'Custom' && (
                  <p className="text-slate-400 text-sm mt-2">{plan.period}</p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-slate-900" />
                    </div>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={onGetStarted}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white text-slate-900 hover:bg-slate-100 shadow-lg'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 mb-4">
            Have questions? Check out our{' '}
            <a href="#faq" className="text-white hover:text-slate-200 transition-colors">
              FAQ
            </a>{' '}
            or{' '}
            <a href="#contact" className="text-white hover:text-slate-200 transition-colors">
              contact our team
            </a>
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
            <span>✓ 30-day money-back guarantee</span>
            <span>✓ Cancel anytime</span>
            <span>✓ No setup fees</span>
          </div>
        </div>
      </div>
    </section>
  );
};
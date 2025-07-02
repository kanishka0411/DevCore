import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Reviews: React.FC = () => {
  const reviews = [
    {
      name: 'Sarah Chen',
      role: 'Senior Frontend Developer',
      company: 'TechCorp',
      avatar: '👩‍💻',
      rating: 5,
      text: 'DevCore has revolutionized how our team collaborates. The real-time editing is seamless, and the AI assistant saves us hours every day. Best investment we\'ve made!'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Tech Lead',
      company: 'StartupXYZ',
      avatar: '👨‍💼',
      rating: 5,
      text: 'The voice chat integration is game-changing. We can discuss code while editing together in real-time. It feels like we\'re all in the same room, even when remote.'
    },
    {
      name: 'Emily Johnson',
      role: 'Full Stack Developer',
      company: 'InnovateLabs',
      avatar: '👩‍🔬',
      rating: 5,
      text: 'I love the gamification features! The coding challenges keep our team engaged and motivated. Plus, the local-first approach gives us complete control over our code.'
    },
    {
      name: 'David Kim',
      role: 'DevOps Engineer',
      company: 'CloudScale',
      avatar: '👨‍💻',
      rating: 5,
      text: 'The performance is incredible. Lightning-fast file loading and zero lag during collaboration. The customization options let us tailor everything to our workflow.'
    },
    {
      name: 'Lisa Wang',
      role: 'Product Manager',
      company: 'DesignFirst',
      avatar: '👩‍💼',
      rating: 5,
      text: 'Even as a non-developer, I can join coding sessions and understand what\'s happening. The interface is beautiful and intuitive. Our team productivity has doubled!'
    },
    {
      name: 'Alex Thompson',
      role: 'Startup Founder',
      company: 'NextGen Apps',
      avatar: '👨‍🚀',
      rating: 5,
      text: 'DevCore helped us ship our MVP 3x faster. The collaborative features eliminated so many communication bottlenecks. Couldn\'t imagine coding without it now.'
    }
  ];

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/6 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/6 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Loved by Developers
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join thousands of developers who have transformed their workflow with DevCore
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <Quote className="w-8 h-8 text-blue-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-300 leading-relaxed mb-8 group-hover:text-white transition-colors">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl shadow-lg">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {review.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {review.role} at {review.company}
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-8">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center space-x-12 opacity-60">
            {['Google', 'Microsoft', 'Meta', 'Netflix', 'Spotify', 'Airbnb'].map((company) => (
              <div key={company} className="text-2xl font-bold text-gray-500 hover:text-gray-300 transition-colors">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
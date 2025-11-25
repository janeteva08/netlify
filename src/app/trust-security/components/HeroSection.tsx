import React from 'react';
import Icon from '@/components/ui/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-trust-blue to-primary py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <Icon name="ShieldCheckIcon" size={48} className="text-white" variant="solid" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Trust & Security
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Your security is our priority. Discover our certifications, compliance standards, and commitment to protecting your digital assets.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">256-bit</div>
              <div className="text-white/80 text-sm">Encryption Standard</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30" />
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-white/80 text-sm">Uptime Guarantee</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30" />
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80 text-sm">Free Installtion </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
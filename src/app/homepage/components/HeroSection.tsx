'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHydrated]);

  const securityFeatures = [
    {
      icon: 'ShieldCheckIcon',
      title: 'Data Encryption',
      description: '256 bit Encryption',
    },
    {
      icon: 'LockClosedIcon',
      title: 'Trust Verification',
      description: 'Verified business identity',
    },
    {
      icon: 'CheckBadgeIcon',
      title: 'Browser Trust',
      description: 'Universal browser compatibility',
    },
  ];

  return (
    <section className={`relative bg-gradient-to-br from-primary via-primary/95 to-secondary overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Icon name="ShieldCheckIcon" size={20} className="text-conversion-green" variant="solid" />
              <span className="text-sm font-medium text-white">Trusted by 5000+ websites</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              SSL Security Made <span className="text-conversion-orange">Simple</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              Protect your website and build customer trust with enterprise-grade SSL certificates. No technical expertise required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/order-ssl-certificate"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold bg-conversion-orange text-white rounded-lg hover:bg-conversion-orange/90 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Protected Now
                <Icon name="ArrowRightIcon" size={20} className="ml-2" />
              </Link>

              <Link
                href="/check-ssl-status"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                Check SSL Status
                <Icon name="MagnifyingGlassIcon" size={20} className="ml-2" />
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <Icon name="ClockIcon" size={20} />
                <span className="text-sm">Instant issuance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CurrencyDollarIcon" size={20} />
                <span className="text-sm">From $24/year</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center space-x-2 bg-conversion-green/20 px-3 py-1 rounded-full">
                  <Icon name="LockClosedIcon" size={16} className="text-conversion-green" variant="solid" />
                  <span className="text-xs font-medium text-white">Secure</span>
                </div>
              </div>

              <div className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-500 ${
                      isHydrated && activeFeature === index
                        ? 'bg-white/20 scale-105' :'bg-white/5'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500 ${
                      isHydrated && activeFeature === index
                        ? 'bg-conversion-green' :'bg-white/10'
                    }`}>
                      <Icon
                        name={feature.icon as any}
                        size={24}
                        className="text-white"
                        variant="solid"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-white/70 text-sm">{feature.description}</p>
                    </div>
                    {isHydrated && activeFeature === index && (
                      <Icon name="CheckCircleIcon" size={20} className="text-conversion-green flex-shrink-0" variant="solid" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Protection Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-conversion-green animate-pulse" />
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-conversion-orange/20 rounded-full blur-3xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-conversion-green/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
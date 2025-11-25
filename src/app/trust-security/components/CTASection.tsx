import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-trust-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <Icon name="ShieldCheckIcon" size={40} className="text-white" variant="solid" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Secure Your Website?
          </h2>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Join thousands of businesses that trust SHIeLdxssl for their security needs. Get started with enterprise-grade protection today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/order-ssl-certificate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-conversion-orange text-conversion-orange-foreground rounded-lg font-bold text-lg hover:bg-conversion-orange/90 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Icon name="ShieldCheckIcon" size={24} variant="solid" />
              Order SSL Certificate
            </Link>
            
            <Link
              href="/support-center"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-bold text-lg hover:bg-white/20 transition-all duration-300"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={24} />
              Contact Support
            </Link>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-white/90">
              <Icon name="CheckCircleIcon" size={20} variant="solid" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Icon name="CheckCircleIcon" size={20} variant="solid" />
              <span className="text-sm font-medium">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Icon name="CheckCircleIcon" size={20} variant="solid" />
              <span className="text-sm font-medium">30-Day Money Back</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
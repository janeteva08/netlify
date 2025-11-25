'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SupportContactProps {
  orderId: string;
}

const SupportContact = ({ orderId }: SupportContactProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const supportOptions = [
   
    {
      icon: 'EnvelopeIcon',
      title: 'Email Support',
      description: 'Send us an email to support@shieldxssl.com and we\'ll respond within 5 hours',
      available: true,
    },
 
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="LifebuoyIcon" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Need Help?</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Our support team is here to assist you with any questions about your order <span className="font-semibold text-foreground">{orderId}</span>
      </p>

      <div className="space-y-4">
        {supportOptions.map((option, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-300"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={option.icon as any} size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-foreground mb-1">{option.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
              <button
                className="inline-flex items-center space-x-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-300"
                disabled={!option.available}
              >
                <span>{option.action}</span>
                
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-trust-light rounded-lg border border-trust-blue/20">
        <div className="flex items-start space-x-3">
          <Icon name="InformationCircleIcon" size={20} className="text-trust-blue mt-0.5" />
          <div>
            <p className="text-sm text-trust-blue font-medium mb-1">Quick Tip</p>
            <p className="text-sm text-muted-foreground">
              Most questions can be answered in our comprehensive FAQ section. Check there first for instant answers!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportContact;
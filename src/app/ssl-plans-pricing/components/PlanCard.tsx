'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PlanCardProps {
  name: string;
  description: string;
  price: string;
  billingPeriod: string;
  features: PlanFeature[];
  recommended?: boolean;
  onOrderClick: () => void;
}

export default function PlanCard({
  name,
  description,
  price,
  billingPeriod,
  features,
  recommended = false,
  onOrderClick
}: PlanCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative bg-card border-2 ${recommended ? 'border-primary shadow-lg' : 'border-border'} rounded-xl p-6 transition-all duration-300 hover:shadow-xl`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-conversion-orange text-conversion-orange-foreground px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-4xl font-bold text-primary">${price}</span>
          <span className="text-muted-foreground">/{billingPeriod}</span>
        </div>
      </div>

      <button
        onClick={onOrderClick}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 mb-6 ${
          recommended
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
        }`}
      >
        Order Now
      </button>

      <div className="space-y-3">
        {features.slice(0, isExpanded ? features.length : 5).map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <Icon
              name={feature.included ? 'CheckCircleIcon' : 'XCircleIcon'}
              variant="solid"
              size={20}
              className={feature.included ? 'text-success mt-0.5' : 'text-muted-foreground mt-0.5'}
            />
            <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {features.length > 5 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 text-sm text-primary hover:text-primary/80 font-medium flex items-center justify-center gap-1 transition-colors duration-300"
        >
          {isExpanded ? 'Show Less' : 'Show More Features'}
          <Icon
            name="ChevronDownIcon"
            size={16}
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  );
}
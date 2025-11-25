'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PriceCalculatorProps {
  basePrices: {
    singleDomain: number;
    multiDomain: number;
    wildcard: number;
  };
}

export default function PriceCalculator({ basePrices }: PriceCalculatorProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'singleDomain' | 'multiDomain' | 'wildcard'>('singleDomain');
  const [years, setYears] = useState(1);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const basePrice = basePrices[selectedPlan];
  const discountRate = years === 1 ? 0 : years === 2 ? 0.1 : 0.15;
  const totalPrice = basePrice * years * (1 - discountRate);
  const savings = basePrice * years - totalPrice;

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="CalculatorIcon" size={24} className="text-primary" />
        <h3 className="text-xl font-bold text-foreground">Price Calculator</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Select Plan Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'singleDomain', label: 'Single Domain' },
              { id: 'multiDomain', label: 'Multi-Domain' },
              { id: 'wildcard', label: 'Wildcard' }
            ].map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id as any)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card text-foreground border border-border hover:border-primary'
                }`}
              >
                {plan.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Certificate Duration: {years} {years === 1 ? 'Year' : 'Years'}
          </label>
          <input
            type="range"
            min="1"
            max="3"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>1 Year</span>
            <span>2 Years (10% off)</span>
            <span>3 Years (15% off)</span>
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Base Price</span>
            <span className="text-sm font-medium text-foreground">${basePrice.toFixed(2)}/year</span>
          </div>
          {discountRate > 0 && (
            <div className="flex justify-between items-center text-success">
              <span className="text-sm font-medium">Discount ({(discountRate * 100).toFixed(0)}%)</span>
              <span className="text-sm font-medium">-${savings.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-border pt-3 flex justify-between items-center">
            <span className="text-lg font-bold text-foreground">Total Price</span>
            <span className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            ${(totalPrice / years).toFixed(2)} per year
          </p>
        </div>

        {savings > 0 && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 flex items-center gap-3">
            <Icon name="SparklesIcon" variant="solid" size={24} className="text-success" />
            <div>
              <p className="text-sm font-semibold text-success">You save ${savings.toFixed(2)}!</p>
              <p className="text-xs text-success/80">Multi-year plans offer the best value</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
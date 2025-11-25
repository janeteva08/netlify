'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ComparisonFeature {
  name: string;
  singleDomain: boolean | string;
  multiDomain: boolean | string;
  wildcard: boolean | string;
}

interface ComparisonTableProps {
  features: ComparisonFeature[];
}

export default function ComparisonTable({ features }: ComparisonTableProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All Features' },
    { id: 'small', label: 'Small Business' },
    { id: 'medium', label: 'Medium Business' },
    { id: 'enterprise', label: 'Enterprise' }
  ];

  const renderCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icon name="CheckIcon" variant="solid" size={20} className="text-success mx-auto" />
      ) : (
        <Icon name="XMarkIcon" size={20} className="text-muted-foreground mx-auto" />
      );
    }
    return <span className="text-sm text-foreground">{value}</span>;
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-bold text-foreground mb-4">Detailed Comparison</h3>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Feature</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Single Domain</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Multi-Domain</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Wildcard</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {features.map((feature, index) => (
              <tr key={index} className="hover:bg-muted/50 transition-colors duration-200">
                <td className="px-6 py-4 text-sm text-foreground font-medium">{feature.name}</td>
                <td className="px-6 py-4 text-center">{renderCell(feature.singleDomain)}</td>
                <td className="px-6 py-4 text-center">{renderCell(feature.multiDomain)}</td>
                <td className="px-6 py-4 text-center">{renderCell(feature.wildcard)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
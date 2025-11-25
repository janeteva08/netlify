'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface StatusStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  timestamp?: string;
  estimatedCompletion?: string;
}

interface StatusTrackerProps {
  orderId: string;
  domain: string;
  certificateType: string;
  steps: StatusStep[];
}

const StatusTracker = ({ orderId, domain, certificateType, steps }: StatusTrackerProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-muted rounded w-3/4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const totalSteps = steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-foreground">Certificate Processing Status</h2>
          <span className="text-sm font-medium text-muted-foreground">
            {completedSteps} of {totalSteps} steps completed
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-success h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            {index !== steps.length - 1 && (
              <div
                className={`absolute left-5 top-12 w-0.5 h-full ${
                  step.status === 'completed' ? 'bg-success' : 'bg-border'
                }`}
              ></div>
            )}
            
            <div className="flex items-start space-x-4">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  step.status === 'completed'
                    ? 'bg-success border-success'
                    : step.status === 'in-progress' ?'bg-warning border-warning animate-pulse' :'bg-card border-border'
                }`}
              >
                {step.status === 'completed' ? (
                  <Icon name="CheckIcon" size={20} className="text-success-foreground" />
                ) : step.status === 'in-progress' ? (
                  <Icon name="ClockIcon" size={20} className="text-warning-foreground" />
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">{step.id}</span>
                )}
              </div>

              <div className="flex-1 pb-8">
                <div className="flex items-center justify-between mb-1">
                  <h3
                    className={`text-base font-semibold ${
                      step.status === 'completed'
                        ? 'text-success'
                        : step.status === 'in-progress' ?'text-warning' :'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </h3>
                  {step.status === 'in-progress' && (
                    <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded">
                      In Progress
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                
                {step.timestamp && (
                  <p className="text-xs text-muted-foreground">
                    <Icon name="CalendarIcon" size={14} className="inline mr-1" />
                    Completed: {step.timestamp}
                  </p>
                )}
                
                {step.estimatedCompletion && step.status !== 'completed' && (
                  <p className="text-xs text-muted-foreground">
                    <Icon name="ClockIcon" size={14} className="inline mr-1" />
                    Estimated completion: {step.estimatedCompletion}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusTracker;
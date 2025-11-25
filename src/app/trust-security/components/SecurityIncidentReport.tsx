'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface IncidentRecord {
  id: number;
  date: string;
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  resolution: string;
  timeToResolve: string;
  status: 'Resolved' | 'Monitoring';
}

const incidentRecords: IncidentRecord[] = [
  
  
  
];

const SecurityIncidentReport = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [expandedIncident, setExpandedIncident] = useState<number | null>(null);

  useState(() => {
    setIsHydrated(true);
  });

  const toggleIncident = (id: number) => {
    if (!isHydrated) return;
    setExpandedIncident(expandedIncident === id ? null : id);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'High':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Medium':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'Low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        

        <div className="space-y-4">
          {incidentRecords.map((incident) => (
            <div
              key={incident.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleIncident(incident.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors duration-300"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className="flex-shrink-0">
                    <Icon
                      name="ExclamationTriangleIcon"
                      size={24}
                      className={incident.severity === 'Low' ? 'text-success' : 'text-warning'}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-foreground">
                        {incident.type}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(incident.severity)}`}>
                        {incident.severity} Severity
                      </span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        incident.status === 'Resolved' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                      }`}>
                        <Icon name="CheckCircleIcon" size={14} variant="solid" />
                        {incident.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {incident.date}
                    </p>
                  </div>
                </div>
                <Icon
                  name="ChevronDownIcon"
                  size={20}
                  className={`text-muted-foreground transition-transform duration-300 ${
                    isHydrated && expandedIncident === incident.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isHydrated && expandedIncident === incident.id && (
                <div className="px-6 pb-6 border-t border-border animate-fade-in">
                  <div className="pt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Icon name="InformationCircleIcon" size={16} className="text-primary" />
                        Description
                      </h4>
                      <p className="text-sm text-muted-foreground pl-6">
                        {incident.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Icon name="WrenchScrewdriverIcon" size={16} className="text-success" />
                        Resolution
                      </h4>
                      <p className="text-sm text-muted-foreground pl-6">
                        {incident.resolution}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 pl-6 pt-2">
                      <div className="flex items-center gap-2">
                        <Icon name="ClockIcon" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Time to Resolve: <span className="font-semibold text-foreground">{incident.timeToResolve}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

  
      </div>
    </section>
  );
};

export default SecurityIncidentReport;
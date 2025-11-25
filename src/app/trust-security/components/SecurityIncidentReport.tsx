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
  {
    id: 1,
    date: "November 15, 2024",
    type: "Attempted DDoS Attack",
    severity: "Medium",
    description: "Detected unusual traffic patterns indicating a potential DDoS attack targeting our certificate validation servers.",
    resolution: "Our automated defense systems successfully mitigated the attack. Traffic was rerouted through our CDN partners, and all services remained operational throughout the incident.",
    timeToResolve: "12 minutes",
    status: "Resolved"
  },
  {
    id: 2,
    date: "September 3, 2024",
    type: "Phishing Attempt",
    severity: "Low",
    description: "Identified phishing emails impersonating SHIeLdxssl sent to a small number of customers.",
    resolution: "Immediately notified affected customers, worked with email providers to block malicious domains, and published security advisory on our website.",
    timeToResolve: "2 hours",
    status: "Resolved"
  },
  {
    id: 3,
    date: "July 22, 2024",
    type: "Certificate Validation Delay",
    severity: "Low",
    description: "Temporary slowdown in certificate validation processing due to increased verification requests.",
    resolution: "Scaled up validation infrastructure and optimized processing algorithms. All pending validations were completed within standard timeframes.",
    timeToResolve: "45 minutes",
    status: "Resolved"
  }
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
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Security Incident Transparency
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We believe in complete transparency. Here's our record of security incidents, how we responded, and the measures we took to prevent future occurrences.
          </p>
        </div>

        <div className="mb-8 bg-success/10 border border-success/20 rounded-xl p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
              <Icon name="ShieldCheckIcon" size={24} className="text-success" variant="solid" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Zero Data Breaches
              </h3>
              <p className="text-muted-foreground">
                Since our founding in 2018, SHIeLdxssl has maintained a perfect record with zero customer data breaches. Our multi-layered security approach and proactive monitoring ensure your information remains protected at all times.
              </p>
            </div>
          </div>
        </div>

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

        <div className="mt-12 bg-muted/50 border border-border rounded-xl p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="BellAlertIcon" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Incident Notification Policy
              </h3>
              <p className="text-muted-foreground mb-4">
                We are committed to transparency and will notify affected customers within 24 hours of any security incident that may impact their data or services. All incidents are thoroughly investigated, documented, and used to strengthen our security measures.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 text-foreground">
                  <Icon name="ClockIcon" size={16} className="text-primary" />
                  <span className="font-semibold">24-hour notification</span>
                </span>
                <span className="flex items-center gap-2 text-foreground">
                  <Icon name="DocumentTextIcon" size={16} className="text-primary" />
                  <span className="font-semibold">Full documentation</span>
                </span>
                <span className="flex items-center gap-2 text-foreground">
                  <Icon name="ShieldCheckIcon" size={16} className="text-primary" />
                  <span className="font-semibold">Preventive measures</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityIncidentReport;
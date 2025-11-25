import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface AuditReport {
  id: number;
  title: string;
  date: string;
  auditor: string;
  status: 'Passed' | 'Excellent' | 'Compliant';
  downloadUrl: string;
  highlights: string[];
}

const auditReports: AuditReport[] = [

];

const SecurityAudits = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          
          
        </div>

        <div className="space-y-6">
          {auditReports.map((report) => (
            <div
              key={report.id}
              className="bg-card border border-border rounded-xl p-6 lg:p-8 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="DocumentCheckIcon" size={24} className="text-success" variant="solid" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {report.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="CalendarIcon" size={16} />
                          {report.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="BuildingOfficeIcon" size={16} />
                          {report.auditor}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          report.status === 'Excellent' ? 'bg-success/10 text-success' :
                          report.status === 'Passed'? 'bg-primary/10 text-primary' : 'bg-trust-blue/10 text-trust-blue'
                        }`}>
                          <Icon name="CheckBadgeIcon" size={14} variant="solid" />
                          {report.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-16 space-y-2">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Highlights:</h4>
                    {report.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0 mt-0.5" variant="solid" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:ml-6">
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default SecurityAudits;
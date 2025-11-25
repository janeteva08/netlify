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
  {
    id: 1,
    title: "Annual Security Penetration Test",
    date: "October 2024",
    auditor: "CyberSec Solutions Inc.",
    status: "Passed",
    downloadUrl: "#",
    highlights: [
      "Zero critical vulnerabilities identified",
      "All medium-risk issues resolved within 48 hours",
      "Infrastructure security rated 9.8/10"
    ]
  },
  {
    id: 2,
    title: "SOC 2 Type II Audit Report",
    date: "September 2024",
    auditor: "Deloitte & Touche LLP",
    status: "Excellent",
    downloadUrl: "#",
    highlights: [
      "100% compliance with security controls",
      "No exceptions or deviations noted",
      "Exemplary incident response procedures"
    ]
  },
  {
    id: 3,
    title: "PCI DSS Quarterly Scan",
    date: "November 2024",
    auditor: "Trustwave Holdings Inc.",
    status: "Compliant",
    downloadUrl: "#",
    highlights: [
      "All systems passed vulnerability scans",
      "Network segmentation properly implemented",
      "Encryption standards exceed requirements"
    ]
  }
];

const SecurityAudits = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Third-Party Security Audits
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Independent verification of our security practices through regular third-party audits and penetration testing.
          </p>
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
                  <a
                    href={report.downloadUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
                  >
                    <Icon name="ArrowDownTrayIcon" size={20} />
                    Download Report
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-trust-light border border-trust-blue/20 rounded-xl p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-trust-blue/10 rounded-lg flex items-center justify-center">
              <Icon name="ShieldCheckIcon" size={24} className="text-trust-blue" variant="solid" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Continuous Security Monitoring
              </h3>
              <p className="text-muted-foreground mb-4">
                Our security infrastructure is monitored 24/7 by automated systems and security experts. We conduct quarterly penetration tests and maintain real-time threat detection to ensure your data remains protected.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 text-foreground">
                  <Icon name="ClockIcon" size={16} className="text-trust-blue" />
                  <span className="font-semibold">24/7 Monitoring</span>
                </span>
                <span className="flex items-center gap-2 text-foreground">
                  <Icon name="BoltIcon" size={16} className="text-trust-blue" />
                  <span className="font-semibold">Real-time Alerts</span>
                </span>
                <span className="flex items-center gap-2 text-foreground">
                  <Icon name="ChartBarIcon" size={16} className="text-trust-blue" />
                  <span className="font-semibold">Quarterly Testing</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityAudits;
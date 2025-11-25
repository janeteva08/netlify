import React from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface ComplianceStandard {
  id: number;
  name: string;
  description: string;
  icon: string;
  status: 'Compliant' | 'Certified' | 'Verified';
}

const complianceStandards: ComplianceStandard[] = [
  {
    id: 1,
    name: "GDPR",
    description: "Full compliance with European Union General Data Protection Regulation for customer data privacy and protection.",
    icon: "ShieldCheckIcon",
    status: "Compliant"
  },
  {
    id: 2,
    name: "CCPA",
    description: "California Consumer Privacy Act compliance ensuring transparent data practices for California residents.",
    icon: "DocumentCheckIcon",
    status: "Compliant"
  },
  {
    id: 3,
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act compliance for healthcare industry customers.",
    icon: "HeartIcon",
    status: "Certified"
  },
  {
    id: 4,
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard Level 1 compliance for secure payment processing.",
    icon: "CreditCardIcon",
    status: "Certified"
  },
  {
    id: 5,
    name: "SOC 2 Type II",
    description: "Service Organization Control certification for security, availability, and confidentiality.",
    icon: "CheckBadgeIcon",
    status: "Certified"
  },
  {
    id: 6,
    name: "ISO 27001",
    description: "International standard for information security management systems and data protection.",
    icon: "GlobeAltIcon",
    status: "Certified"
  }
];

const ComplianceSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Compliance & Data Protection
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We maintain the highest standards of compliance with international data protection regulations and industry-specific requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {complianceStandards.map((standard) => (
            <div
              key={standard.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={standard.icon as any} size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-foreground">
                      {standard.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-success/10 text-success">
                      <Icon name="CheckCircleIcon" size={12} variant="solid" />
                      {standard.status}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {standard.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-trust-blue/10 rounded-lg flex items-center justify-center">
                <Icon name="LockClosedIcon" size={24} className="text-trust-blue" variant="solid" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Data Protection Policy
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your data is encrypted at rest and in transit using industry-standard AES-256 encryption. We implement strict access controls and regular security audits to ensure your information remains protected.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Read Privacy Policy
                  <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="DocumentTextIcon" size={24} className="text-success" variant="solid" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Terms of Service
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our terms of service outline your rights and responsibilities when using ShieldxSSL  services. We maintain transparent policies that protect both our customers and our business.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  View Terms of Service
                  <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-trust-light border border-trust-blue/20 rounded-xl p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-trust-blue/10 rounded-xl flex items-center justify-center">
              <Icon name="UserGroupIcon" size={32} className="text-trust-blue" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Your Rights & Data Control
              </h3>
              <p className="text-muted-foreground mb-4">
                You have complete control over your data. Request access, modification, or deletion of your personal information at any time. We respond to all data requests within 30 days as required by GDPR and CCPA regulations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
                >
                  <Icon name="EnvelopeIcon" size={18} />
                  Contact Data Protection Officer
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-colors duration-300"
                >
                  <Icon name="DocumentArrowDownIcon" size={18} />
                  Download Your Data
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
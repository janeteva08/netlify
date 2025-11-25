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

    </section>
  );
};

export default ComplianceSection;
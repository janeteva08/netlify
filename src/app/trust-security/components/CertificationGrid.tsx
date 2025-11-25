import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Certification {
  id: number;
  name: string;
  issuer: string;
  validUntil: string;
  logo: string;
  alt: string;
  verificationLink: string;
  description: string;
}

const certifications: Certification[] = [
{
  id: 1,
  name: "ISO/IEC 27001:2013",
  issuer: "International Organization for Standardization",
  validUntil: "December 2025",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c1e00468-1763909720785.png",
  alt: "ISO 27001 certification badge with blue and white shield design on professional certificate background",
  verificationLink: "https://www.iso.org/verify",
  description: "Information Security Management System certification ensuring the highest standards of data protection and security practices."
},
{
  id: 2,
  name: "SOC 2 Type II",
  issuer: "American Institute of CPAs",
  validUntil: "June 2026",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_13b673e89-1763909722158.png",
  alt: "SOC 2 Type II compliance badge with gold seal and security icons on official audit report",
  verificationLink: "https://www.aicpa.org/verify",
  description: "Service Organization Control certification demonstrating our commitment to security, availability, and confidentiality."
},
{
  id: 3,
  name: "PCI DSS Level 1",
  issuer: "PCI Security Standards Council",
  validUntil: "March 2026",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ee758c43-1763909720687.png",
  alt: "PCI DSS Level 1 certification emblem with red and blue security shield on payment card background",
  verificationLink: "https://www.pcisecuritystandards.org/verify",
  description: "Payment Card Industry Data Security Standard compliance for secure payment processing and data handling."
},
{
  id: 4,
  name: "WebTrust for CAs",
  issuer: "CPA Canada & AICPA",
  validUntil: "September 2025",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_19568e636-1763909720589.png",
  alt: "WebTrust certification seal with green checkmark and trust symbols on digital certificate authority document",
  verificationLink: "https://www.webtrust.org/verify",
  description: "Certificate Authority trust seal ensuring our SSL certificates meet the highest industry standards for authentication and security."
},
{
  id: 5,
  name: "GDPR Compliant",
  issuer: "European Data Protection Board",
  validUntil: "Ongoing",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_123d46a37-1763909722162.png",
  alt: "GDPR compliance badge with EU stars and privacy shield on blue regulatory document background",
  verificationLink: "https://www.edpb.europa.eu/verify",
  description: "Full compliance with General Data Protection Regulation for European customer data privacy and protection."
},
{
  id: 6,
  name: "TRUSTe Privacy",
  issuer: "TrustArc",
  validUntil: "November 2025",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c1669e7b-1763909722493.png",
  alt: "TRUSTe privacy certification seal with green checkmark and lock icon on privacy policy document",
  verificationLink: "https://www.trustarc.com/verify",
  description: "Independent privacy certification validating our commitment to transparent data practices and user privacy protection."
}];


const CertificationGrid = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Industry Certifications
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our commitment to security is validated by leading industry certifications and compliance standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) =>
          <div
            key={cert.id}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

              <div className="relative h-40 mb-4 rounded-lg overflow-hidden bg-muted">
                <AppImage
                src={cert.logo}
                alt={cert.alt}
                className="w-full h-full object-cover" />

              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">
                {cert.name}
              </h3>

              <p className="text-sm text-muted-foreground mb-3">
                {cert.issuer}
              </p>

              <p className="text-sm text-foreground mb-4 line-clamp-3">
                {cert.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-sm">
                  <span className="text-muted-foreground">Valid until: </span>
                  <span className="font-semibold text-foreground">{cert.validUntil}</span>
                </div>
                <a
                href={cert.verificationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">

                  Verify
                  <Icon name="ArrowTopRightOnSquareIcon" size={16} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default CertificationGrid;
import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HeroSection from './components/HeroSection';
import CertificationGrid from './components/CertificationGrid';
import SecurityAudits from './components/SecurityAudits';
import TestimonialsSection from './components/TestimonialsSection';
import CompanyMilestones from './components/CompanyMilestones';
import PartnerLogos from './components/PartnerLogos';
import SecurityIncidentReport from './components/SecurityIncidentReport';
import ComplianceSection from './components/ComplianceSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Trust & Security - ShieldxSSL ',
  description: 'Discover ShieldxSSL\'s security certifications, compliance standards, third-party audits, and commitment to protecting your digital assets with enterprise-grade security solutions.',
};

export default function TrustSecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CertificationGrid />
        <SecurityAudits />
        <TestimonialsSection />
        <CompanyMilestones />
        <PartnerLogos />
        <SecurityIncidentReport />
        <ComplianceSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
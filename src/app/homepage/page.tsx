import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import WhySSLSection from './components/WhySSLSection';
import PlanComparisonSection from './components/PlanComparisonSection';
import HowItWorksSection from './components/HowItWorksSection';
import TrustBadgesSection from './components/TrustBadgesSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'ShieldxSSL - SSL Security Made Simple',
  description: 'Protect your website with enterprise-grade SSL certificates. Trusted by 5000+ websites worldwide. Get instant issuance, 24/7 support, and 30-day money-back guarantee.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <WhySSLSection />
        <PlanComparisonSection />
        <HowItWorksSection />
        <TrustBadgesSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
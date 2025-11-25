import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import SupportCenterInteractive from './components/SupportCenterInteractive';
import FooterSection from './components/FooterSection';

export const metadata: Metadata = {
  title: 'Support Center - ShieldxSSL ',
  description: 'Get comprehensive support for your SSL certificates with our knowledge base, FAQs, troubleshooting guides, and multiple contact methods including live chat, email, and phone support.',
};

export default function SupportCenterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SupportCenterInteractive />
      </main>
      <FooterSection />
    </div>
  );
}
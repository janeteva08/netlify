import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import CheckSSLStatusInteractive from './components/CheckSSLStatusInteractive';

export const metadata: Metadata = {
  title: 'Check SSL Status - ShieldxSSL',
  description: 'Track your SSL certificate order in real-time with detailed progress indicators, next-step guidance, and comprehensive support options. Monitor validation, generation, and delivery status.',
};

export default function CheckSSLStatusPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="w-full px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <CheckSSLStatusInteractive />
        </div>
      </div>

      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SSL ShieldxSSL. All rights reserved.
            </p>
           
          </div>
        </div>
      </footer>
    </main>
  );
}
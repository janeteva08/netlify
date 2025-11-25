import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import AdminDashboardInteractive from './components/AdminDashboardInteractive';

export const metadata: Metadata = {
  title: 'Admin Dashboard - SHIeLdxssl',
  description: 'Comprehensive administrative control center for SHIeLdxssl staff with complete oversight of certificate operations, customer management, and system monitoring.',
};

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="w-full px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <AdminDashboardInteractive />
        </div>
      </div>

      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SHIeLdxssl. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="/support-center" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Support Center
              </a>
              <a href="/ssl-plans-pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                SSL Plans & Pricing
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
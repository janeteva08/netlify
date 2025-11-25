import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function FooterSection() {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: 'SSL Plans', href: '/ssl-plans-pricing' },
      { label: 'Order Certificate', href: '/order-ssl-certificate' },
      { label: 'Check Status', href: '/check-ssl-status' }
    ],
    support: [
      { label: 'Support Center', href: '/support-center' },
      { label: 'Contact Us', href: '/support-center' }
    ],
    
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/homepage" className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <svg
                  className="w-6 h-6 text-primary-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-foreground">ShieldxSSL</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted partner for SSL certificate solutions. Security made simple.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <Icon name="EnvelopeIcon" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <Icon name="PhoneIcon" size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link) => (
                <li key={link?.href}>
                  <Link
                    href={link?.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link) => (
                <li key={link?.href}>
                  <Link
                    href={link?.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.href}>
                  <Link
                    href={link?.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} ShieldxSSL. All rights reserved.
            </p>
           
          </div>
        </div>
      </div>
    </footer>
  );
}
import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    products: [
      { label: 'SSL Plans & Pricing', href: '/ssl-plans-pricing' },
      { label: 'Order Certificate', href: '/order-ssl-certificate' },
      { label: 'Check Status', href: '/check-ssl-status' }
    ],
    company: [
      { label: 'Trust & Security', href: '/trust-security' },
      { label: 'Support Center', href: '/support-center' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' }
    ]
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
              <span className="text-xl font-bold text-foreground">SHIeLdxssl</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Enterprise-grade SSL certificates made simple. Protecting businesses worldwide since 2018.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                aria-label="Twitter"
              >
                <Icon name="AtSymbolIcon" size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Icon name="BuildingOfficeIcon" size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                aria-label="GitHub"
              >
                <Icon name="CodeBracketIcon" size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks?.products?.map((link) => (
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
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Company
            </h3>
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

          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link) => (
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} SHIeLdxssl. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Icon name="ShieldCheckIcon" size={16} className="text-success" variant="solid" />
                <span className="text-xs text-muted-foreground">256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckBadgeIcon" size={16} className="text-primary" variant="solid" />
                <span className="text-xs text-muted-foreground">ISO 27001 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
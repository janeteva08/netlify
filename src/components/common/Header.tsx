'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const primaryNavItems = [
    { label: 'Home', href: '/homepage' },
    { label: 'SSL Plans', href: '/ssl-plans-pricing' },
    { label: 'Order Certificate', href: '/order-ssl-certificate' },
    { label: 'Check Status', href: '/check-ssl-status' },
  ];

  // More menu removed completely → no secondaryNavItems needed

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`bg-card border-b border-border sticky top-0 z-50 ${className}`}>
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          <Link href="/homepage" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300">
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
            <span className="text-xl font-bold text-foreground hidden sm:block">ShieldxSSL</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-all duration-300 ease-out"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/check-ssl-status"
              className="px-4 py-2 text-sm font-semibold text-secondary hover:text-secondary/80 transition-colors duration-300"
            >
              Check Status
            </Link>
            <Link
              href="/order-ssl-certificate"
              className="px-6 py-2 text-sm font-semibold bg-conversion-orange text-conversion-orange-foreground rounded-lg hover:bg-conversion-orange/90 hover:shadow-md transition-all duration-300 ease-out transform hover:-translate-y-0.5"
            >
              Get Protected
            </Link>
          </div>

          {/* Mobile Hamburg Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-all duration-300"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card animate-slide-in-right">
            <nav className="px-4 py-4 space-y-1">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-all duration-300"
                >
                  {item.label}
                </Link>
              ))}

              {/* CTA Buttons in Mobile */}
              <div className="pt-4 space-y-2">
                <Link
                  href="/check-ssl-status"
                  onClick={closeMobileMenu}
                  className="block w-full px-4 py-3 text-center text-base font-semibold text-secondary border border-secondary rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                >
                  Check Status
                </Link>
                <Link
                  href="/order-ssl-certificate"
                  onClick={closeMobileMenu}
                  className="block w-full px-4 py-3 text-center text-base font-semibold bg-conversion-orange text-conversion-orange-foreground rounded-lg hover:bg-conversion-orange/90 transition-all duration-300"
                >
                  Get Protected
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

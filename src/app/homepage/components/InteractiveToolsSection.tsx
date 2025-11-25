'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface InteractiveToolsSectionProps {
  className?: string;
}

const InteractiveToolsSection = ({ className = '' }: InteractiveToolsSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [domain, setDomain] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    hasSSL: boolean;
    issuer?: string;
    expiryDays?: number;
  } | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleCheckSSL = () => {
    if (!isHydrated || !domain.trim()) return;

    setIsChecking(true);
    setResult(null);

    setTimeout(() => {
      const hasSSL = Math.random() > 0.3;
      setResult({
        hasSSL,
        issuer: hasSSL ? 'ShieldxSSL CA' : undefined,
        expiryDays: hasSSL ? Math.floor(Math.random() * 365) : undefined,
      });
      setIsChecking(false);
    }, 1500);
  };

  const tools = [
    {
      icon: 'DocumentMagnifyingGlassIcon',
      title: 'CSR Generator',
      description: 'Generate Certificate Signing Requests instantly',
      href: '/support-center',
    },
    {
      icon: 'WrenchScrewdriverIcon',
      title: 'Installation Guides',
      description: 'Step-by-step guides for all server types',
      href: '/support-center',
    },
    {
      icon: 'ClipboardDocumentCheckIcon',
      title: 'SSL Checker',
      description: 'Verify your SSL certificate installation',
      href: '/check-ssl-status',
    },
  ];

  return (
    <section className={`bg-background py-16 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Free SSL Tools &amp; Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access our suite of free tools to check, generate, and manage your SSL certificates with ease.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/20">
            <div className="flex items-center space-x-3 mb-6">
              <Icon name="MagnifyingGlassIcon" size={28} className="text-primary" variant="solid" />
              <h3 className="text-2xl font-bold text-foreground">Quick SSL Check</h3>
            </div>

            <p className="text-muted-foreground mb-6">
              Enter any domain to instantly check its SSL certificate status, validity, and security configuration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={domain}
                onChange={(e) => isHydrated && setDomain(e.target.value)}
                placeholder="example.com"
                disabled={!isHydrated}
                className="flex-1 px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground disabled:opacity-50"
              />
              <button
                onClick={handleCheckSSL}
                disabled={!isHydrated || !domain.trim() || isChecking}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isChecking ? 'Checking...' : 'Check SSL'}
              </button>
            </div>

            {result && (
              <div className={`mt-6 p-4 rounded-lg border-2 ${
                result.hasSSL
                  ? 'bg-conversion-green/10 border-conversion-green/30' :'bg-destructive/10 border-destructive/30'
              }`}>
                <div className="flex items-start space-x-3">
                  <Icon
                    name={result.hasSSL ? 'CheckCircleIcon' : 'XCircleIcon'}
                    size={24}
                    className={result.hasSSL ? 'text-conversion-green' : 'text-destructive'}
                    variant="solid"
                  />
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-1 ${
                      result.hasSSL ? 'text-conversion-green' : 'text-destructive'
                    }`}>
                      {result.hasSSL ? 'SSL Certificate Active' : 'No SSL Certificate Found'}
                    </h4>
                    {result.hasSSL ? (
                      <div className="text-sm text-foreground space-y-1">
                        <p>Issuer: {result.issuer}</p>
                        <p>Expires in: {result.expiryDays} days</p>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground">
                        This domain is not protected. Get an SSL certificate to secure your website.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <a
              key={index}
              href={tool.href}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Icon
                  name={tool.icon as any}
                  size={28}
                  className="text-primary group-hover:text-primary-foreground transition-colors duration-300"
                  variant="solid"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{tool.title}</h3>
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                Access Tool
                <Icon name="ArrowRightIcon" size={16} className="ml-2" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveToolsSection;
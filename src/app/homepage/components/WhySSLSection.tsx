import Icon from '@/components/ui/AppIcon';

interface WhySSLSectionProps {
  className?: string;
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

const WhySSLSection = ({ className = '' }: WhySSLSectionProps) => {
  const benefits: Benefit[] = [
    {
      icon: 'ShieldCheckIcon',
      title: 'Data Protection',
      description: 'Encrypt sensitive information like passwords, credit cards, and personal data with military-grade 256-bit encryption.',
    },
    {
      icon: 'UserGroupIcon',
      title: 'Build Customer Trust',
      description: 'Display the padlock icon and HTTPS in your URL to show visitors their data is safe, increasing conversion rates by up to 30%.',
    },
    {
      icon: 'MagnifyingGlassIcon',
      title: 'Boost SEO Rankings',
      description: 'Google prioritizes HTTPS websites in search results. SSL certificates are a confirmed ranking factor for better visibility.',
    },
    {
      icon: 'ExclamationTriangleIcon',
      title: 'Avoid Browser Warnings',
      description: 'Prevent "Not Secure" warnings that scare away visitors. Modern browsers flag non-HTTPS sites as unsafe.',
    },
    {
      icon: 'DocumentCheckIcon',
      title: 'Compliance Requirements',
      description: 'Meet PCI DSS, GDPR, and other regulatory standards that mandate SSL encryption for handling customer data.',
    },
    {
      icon: 'CheckBadgeIcon',
      title: 'Verify Your Identity',
      description: 'Prove your business legitimacy with validated SSL certificates that authenticate your organization to customers.',
    },
  ];

  return (
    <section className={`bg-surface py-16 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Your Website Needs SSL
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SSL certificates are no longer optional. They&apos;re essential for security, trust, and business success in today&apos;s digital landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg mb-4">
                <Icon
                  name={benefit.icon as any}
                  size={28}
                  className="text-primary"
                  variant="solid"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Icon name="InformationCircleIcon" size={32} className="text-primary" variant="solid" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Did You Know?
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            84% of users will abandon a purchase if they see their data is being sent over an unsecured connection. Don&apos;t lose customers to security concerns—protect your site today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhySSLSection;
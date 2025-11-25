import Icon from '@/components/ui/AppIcon';

interface TrustBadgesSectionProps {
  className?: string;
}

interface Badge {
  icon: string;
  title: string;
  description: string;
}

const TrustBadgesSection = ({ className = '' }: TrustBadgesSectionProps) => {
  const badges: Badge[] = [
    {
      icon: 'ShieldCheckIcon',
      title: 'Industry Certified',
      description: 'WebTrust & ISO 27001 compliant',
    },
    {
      icon: 'LockClosedIcon',
      title: '256-bit Encryption',
      description: 'Military-grade security standard',
    },
    {
      icon: 'ClockIcon',
      title: '99.9% Uptime',
      description: 'Guaranteed availability SLA',
    },
    {
      icon: 'CurrencyDollarIcon',
      title: 'Big Discount',
      description: 'Upto 40% Discount',
    },
    {
      icon: 'ChatBubbleLeftRightIcon',
      title: '24/7 Support',
      description: 'Expert assistance anytime',
    },
    {
      icon: 'GlobeAltIcon',
      title: 'Global Trust',
      description: '99.9% browser compatibility',
    },
  ];

  return (
    <section className={`bg-surface py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <Icon
                  name={badge.icon as any}
                  size={24}
                  className="text-primary"
                  variant="solid"
                />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">{badge.title}</h3>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
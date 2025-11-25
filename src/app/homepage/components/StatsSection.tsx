interface StatsSectionProps {
  className?: string;
}

interface Stat {
  value: string;
  label: string;
  icon: string;
}

const StatsSection = ({ className = '' }: StatsSectionProps) => {
  const stats: Stat[] = [
    {
      value: '5000+',
      label: 'Websites Protected',
      icon: 'GlobeAltIcon',
    },
    {
      value: '99.9%',
      label: 'Uptime Guarantee',
      icon: 'BoltIcon',
    },
    {
      value: '24/7',
      label: 'Expert Support',
      icon: 'ChatBubbleLeftRightIcon',
    },
    {
      value: '45 Min',
      label: 'Average Issuance',
      icon: 'ClockIcon',
    },
  ];

  return (
    <section className={`bg-surface py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
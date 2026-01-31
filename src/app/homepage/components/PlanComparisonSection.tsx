import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface PlanComparisonSectionProps {
  className?: string;
}

interface Plan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
  cta: string;
  href: string;
}

const PlanComparisonSection = ({ className = '' }: PlanComparisonSectionProps) => {
  const plans: Plan[] = [
    {
      name: 'Single Domain',
      description: 'Perfect for individual websites and blogs',
      price: '$24',
      period: 'per year',
      features: [
        'Protects 1 domain',
        '256-bit encryption',
		'Domain Validation (DV)',
        'Standard Trust Level',
        '99.9% Browser compatibility',
        'Email support/ Free Installation',
        'Free reissuance',
		

      ],
      cta: 'Get Started',
      href: '/order-ssl-certificate',
    },
    {
      name: 'Multi-Domain',
      description: 'Ideal for multiple websites under one certificate',
      price: '$45',
      period: 'per year',
      features: [
        'Protects up to 3 domains',
        '256-bit encryption',
        'Domain Validation (DV)',
		'Standard Trust Level',
        '99.9% Browser compatibility',
        'Priority email support/Free Installation',
        'Free reissuance',
        
      ],
      recommended: true,
      cta: 'Most Popular',
      href: '/order-ssl-certificate',
    },
    {
      name: 'Wildcard',
      description: 'Secure unlimited subdomains with one certificate',
      price: '$90',
      period: 'per year',
      features: [
        'Single Domain and All Sub-domains',
        '256-bit encryption',
		'Domain Validation (DV)',
        'Standard Trust Level',
        '99.9% Browser compatibility',
        '24/7 priority support/Free Installation',
        'Free reissuance',
      ],
      cta: 'Enterprise Choice',
      href: '/order-ssl-certificate',
    },
  ];

  return (
    <section className={`bg-background py-16 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Protection Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent pricing with no hidden fees. All plans include our industry leading support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                plan.recommended
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </div>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                </div>

                <Link
                  href={plan.href}
                  className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 mb-6 ${
                    plan.recommended
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                  }`}
                >
                  {plan.cta}
                </Link>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Icon
                        name="CheckCircleIcon"
                        size={20}
                        className="text-conversion-green flex-shrink-0 mt-0.5"
                        variant="solid"
                      />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/ssl-plans-pricing"
            className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors duration-300"
          >
            Compare all features in detail
            <Icon name="ArrowRightIcon" size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PlanComparisonSection;
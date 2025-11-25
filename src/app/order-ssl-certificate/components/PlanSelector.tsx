import Icon from '@/components/ui/AppIcon';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

interface PlanSelectorProps {
  selectedPlan: string;
  onPlanSelect: (planId: string) => void;
}

const plans: Plan[] = [
  {
    id: 'single',
    name: 'Single Domain SSL',
    description: 'Perfect for one website or subdomain',
    price: 24,
    features: [
      'Secures one domain',
      '256-bit encryption',
      '99.9% Browser compatibility',
      '24/7 support',
      'Issued in 30 minutes'
    ]
  },
  {
    id: 'wildcard',
    name: 'Wildcard SSL',
    description: 'Secure unlimited subdomains',
    price: 90,
    features: [
      'Unlimited subdomains',
      '256-bit encryption',
      '99.9% Browser compatibility',
      'Priority support',
      'Free Installation'
    ],
    recommended: true
  },
  {
    id: 'multi',
    name: 'Multi-Domain SSL',
    description: 'Protects up to 3 domains',
    price: 45,
    features: [
      'Protects up to 3 domains',
      '256-bit encryption',
      '99.9% Browser compatibility',
      'Dedicated support',
      'Free Installation'
    ]
  }
];

export default function PlanSelector({ selectedPlan, onPlanSelect }: PlanSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground mb-4">Select Your SSL Certificate</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => onPlanSelect(plan.id)}
            className={`relative p-6 rounded-lg border-2 transition-all duration-300 text-left hover:shadow-lg ${
              selectedPlan === plan.id
                ? 'border-primary bg-trust-light' :'border-border bg-card hover:border-primary/50'
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-conversion-orange text-conversion-orange-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Recommended
                </span>
              </div>
            )}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              {selectedPlan === plan.id && (
                <Icon name="CheckCircleIcon" variant="solid" size={24} className="text-primary" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
            <div className="mb-4">
              <span className="text-3xl font-bold text-foreground">${plan.price}</span>
              <span className="text-sm text-muted-foreground">/year</span>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm text-foreground">
                  <Icon name="CheckIcon" size={16} className="text-conversion-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>
    </div>
  );
}
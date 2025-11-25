import Icon from '@/components/ui/AppIcon';

interface HowItWorksSectionProps {
  className?: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const HowItWorksSection = ({ className = '' }: HowItWorksSectionProps) => {
  const steps: Step[] = [
    {
      number: '01',
      title: 'Choose Your Plan',
      description: 'Select the SSL certificate type that matches your needs—Single Domain, Multi-Domain, or Wildcard.',
      icon: 'CursorArrowRaysIcon',
    },
    {
      number: '02',
      title: 'Complete Order Form',
      description: 'Provide your domain details and choose your preferred validation method. Our system guides you through each step.',
      icon: 'DocumentTextIcon',
    },
    {
      number: '03',
      title: 'Verify Your Domain',
      description: 'Complete simple domain verification via email, DNS, or file upload. We provide clear instructions for each method.',
      icon: 'ShieldCheckIcon',
    },
    {
      number: '04',
      title: 'Get Protected',
      description: 'Receive your SSL certificate within minutes. Install it with our step-by-step guides or request free installation assistance.',
      icon: 'CheckBadgeIcon',
    },
  ];

  return (
    <section className={`bg-background py-16 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Get Protected in 4 Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process makes SSL certificate installation quick and painless. Most customers are fully protected within 30 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-x-1/2 z-0" />
              )}
              
              <div className="relative bg-card rounded-xl p-6 border border-border hover:border-primary hover:shadow-lg transition-all duration-300 z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Icon
                      name={step.icon as any}
                      size={24}
                      className="text-primary"
                      variant="solid"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Need help? Our support team is available 24/7 to guide you through the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/order-ssl-certificate"
              className="inline-flex items-center justify-center px-8 py-3 bg-conversion-orange text-white rounded-lg font-semibold hover:bg-conversion-orange/90 hover:shadow-md transition-all duration-300"
            >
              Start Your Order
              <Icon name="ArrowRightIcon" size={20} className="ml-2" />
            </a>
            <a
              href="/support-center"
              className="inline-flex items-center justify-center px-8 py-3 bg-card text-foreground border-2 border-border rounded-lg font-semibold hover:border-primary hover:shadow-md transition-all duration-300"
            >
              Contact Support
              <Icon name="ChatBubbleLeftRightIcon" size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
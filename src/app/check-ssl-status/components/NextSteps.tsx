import Icon from '@/components/ui/AppIcon';

interface NextStep {
  id: number;
  title: string;
  description: string;
  action?: string;
  actionLink?: string;
}

interface NextStepsProps {
  steps: NextStep[];
}

const NextSteps = ({ steps }: NextStepsProps) => {
  return (
    <div className="bg-trust-light rounded-lg border border-trust-blue/20 p-6 lg:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex-shrink-0 w-10 h-10 bg-trust-blue rounded-full flex items-center justify-center">
          <Icon name="LightBulbIcon" size={20} className="text-trust-blue-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-trust-blue">What's Next?</h2>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-trust-blue/10 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-trust-blue">{step.id}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                {step.action && step.actionLink && (
                  <a
                    href={step.actionLink}
                    className="inline-flex items-center space-x-2 text-sm font-semibold text-trust-blue hover:text-trust-blue/80 transition-colors duration-300"
                  >
                    <span>{step.action}</span>
                    <Icon name="ArrowRightIcon" size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextSteps;
import Icon from '@/components/ui/AppIcon';

interface UseCaseCardProps {
  icon: string;
  title: string;
  description: string;
  recommendedPlan: string;
  examples: string[];
}

export default function UseCaseCard({
  icon,
  title,
  description,
  recommendedPlan,
  examples
}: UseCaseCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon as any} size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="inline-flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
          <Icon name="CheckBadgeIcon" variant="solid" size={16} />
          Recommended: {recommendedPlan}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-foreground">Perfect for:</p>
        <ul className="space-y-1">
          {examples.map((example, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Icon name="ArrowRightIcon" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span>{example}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
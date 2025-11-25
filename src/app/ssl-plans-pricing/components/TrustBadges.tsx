import Icon from '@/components/ui/AppIcon';

interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

interface TrustBadgesProps {
  badges: TrustBadge[];
}

export default function TrustBadges({ badges }: TrustBadgesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Icon name={badge.icon as any} size={32} className="text-primary" />
          </div>
          <h4 className="font-bold text-foreground mb-2">{badge.title}</h4>
          <p className="text-sm text-muted-foreground">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}
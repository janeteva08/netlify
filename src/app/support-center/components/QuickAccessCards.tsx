import Icon from '@/components/ui/AppIcon';

interface QuickAccessCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  action: string;
}

interface QuickAccessCardsProps {
  cards: QuickAccessCard[];
  onCardClick: (action: string) => void;
}

export default function QuickAccessCards({ cards, onCardClick }: QuickAccessCardsProps) {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Quick Access
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => onCardClick(card.action)}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary transition-all duration-300 transform hover:-translate-y-1 text-left"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                <Icon name={card.icon as any} size={24} className="text-primary" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {card.title}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
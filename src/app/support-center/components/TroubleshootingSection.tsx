import Icon from '@/components/ui/AppIcon';

interface TroubleshootingGuide {
  id: number;
  title: string;
  description: string;
  icon: string;
  steps: number;
}

interface TroubleshootingSectionProps {
  guides: TroubleshootingGuide[];
  onGuideClick: (guideId: number) => void;
}

export default function TroubleshootingSection({ guides, onGuideClick }: TroubleshootingSectionProps) {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Troubleshooting Guides
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Step-by-step solutions to common SSL certificate issues and installation problems
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => onGuideClick(guide.id)}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary transition-all duration-300 text-left group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-14 h-14 bg-warning/10 rounded-lg flex-shrink-0 group-hover:bg-warning/20 transition-colors duration-300">
                  <Icon name={guide.icon as any} size={28} className="text-warning" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {guide.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {guide.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-sm text-secondary">
                    <Icon name="DocumentTextIcon" size={16} />
                    <span>{guide.steps} steps</span>
                  </div>
                </div>
                
                <Icon name="ChevronRightIcon" size={20} className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
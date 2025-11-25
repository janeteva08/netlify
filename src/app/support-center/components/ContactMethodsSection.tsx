import Icon from '@/components/ui/AppIcon';

interface ContactMethod {
  id: number;
  title: string;
  description: string;
  icon: string;
  availability: string;
  action: string;
  buttonText: string;
}

interface ContactMethodsSectionProps {
  methods: ContactMethod[];
  onMethodClick: (action: string) => void;
}

export default function ContactMethodsSection({ methods, onMethodClick }: ContactMethodsSectionProps) {
  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {methods.map((method) => (
            <div
              key={method.id}
              className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Icon name={method.icon as any} size={32} className="text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {method.title}
              </h3>
              
              <p className="text-muted-foreground mb-4">
                {method.description}
              </p>
              
              <div className="flex items-center space-x-2 text-sm text-success mb-6">
                <Icon name="ClockIcon" size={16} />
                <span>{method.availability}</span>
              </div>
              
              <button
                onClick={() => onMethodClick(method.action)}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
              >
                {method.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
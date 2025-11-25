import Icon from '@/components/ui/AppIcon';

interface KnowledgeBaseCategory {
  id: number;
  title: string;
  description: string;
  icon: string;
  articleCount: number;
}

interface KnowledgeBaseSectionProps {
  categories: KnowledgeBaseCategory[];
  onCategoryClick: (categoryId: number) => void;
}

export default function KnowledgeBaseSection({ categories, onCategoryClick }: KnowledgeBaseSectionProps) {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Knowledge Base
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive library of guides, tutorials, and documentation to find answers to your questions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary transition-all duration-300 text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors duration-300">
                  <Icon name={category.icon as any} size={24} className="text-secondary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {category.articleCount} articles
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {category.title}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
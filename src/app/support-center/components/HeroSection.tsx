import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  onSearchClick: () => void;
}

export default function HeroSection({ onSearchClick }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-primary via-secondary to-primary py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <Icon name="LifebuoyIcon" size={40} className="text-white" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            How Can We Help You Today?
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get instant answers, expert guidance, and comprehensive support for all your SSL certificate needs
          </p>
          
          
        </div>
      </div>
    </section>
  );
}
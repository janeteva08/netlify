import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CTASectionProps {
  className?: string;
}

const CTASection = ({ className = '' }: CTASectionProps) => {
  return (
    <section className={`bg-gradient-to-br from-primary via-primary/95 to-secondary py-16 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Secure Your Website?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 5000+ websites protected by ShieldxSSL. Get your certificate in minutes and start building customer trust today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/order-ssl-certificate"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold bg-conversion-orange text-white rounded-lg hover:bg-conversion-orange/90 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Your SSL Certificate
              <Icon name="ArrowRightIcon" size={20} className="ml-2" />
            </Link>

            <Link
              href="/ssl-plans-pricing"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              Compare Plans
              <Icon name="DocumentTextIcon" size={20} className="ml-2" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircleIcon" size={20} variant="solid" />
              <span className="text-sm">Instant issuance</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircleIcon" size={20} variant="solid" />
              <span className="text-sm">Free Installation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircleIcon" size={20} variant="solid" />
              <span className="text-sm">24/7 expert support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
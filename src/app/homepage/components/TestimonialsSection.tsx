'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface TestimonialsSectionProps {
  className?: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  alt: string;
  rating: number;
  text: string;
}

const TestimonialsSection = ({ className = '' }: TestimonialsSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    role: 'E-commerce Director',
    company: 'TechStyle Boutique',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ffde516e-1763293580273.png",
    alt: 'Professional woman with brown hair in navy blazer smiling at camera in modern office',
    rating: 5,
    text: 'ShieldxSSL made the entire process incredibly simple. What I thought would take days was completed in under 20 minutes. Their support team answered all my questions promptly, and our conversion rate increased by 28% after installing the SSL certificate.'
  },
  {
    name: 'Michael Chen',
    role: 'Founder & CEO',
    company: 'Digital Innovations Inc',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1015e0af9-1763298612934.png",
    alt: 'Asian businessman in white shirt smiling confidently in bright office setting',
    rating: 5,
    text: 'As a startup, we needed enterprise-level security without the enterprise price tag. SHIeLdxssl delivered exactly that. The wildcard certificate covers all our subdomains, and the installation guides were crystal clear. Highly recommended!'
  },
  {
    name: 'Jennifer Rodriguez',
    role: 'Marketing Manager',
    company: 'Creative Solutions Agency',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f225624a-1763293838525.png",
    alt: 'Hispanic woman with long dark hair in professional attire smiling warmly',
    rating: 5,
    text: 'We manage SSL certificates for 15+ client websites, and SHIeLdxssl has been a game-changer. The bulk management features save us hours every month, and clients love the transparent status tracking. Best decision we made this year.'
  },
  {
    name: 'David Thompson',
    role: 'IT Director',
    company: 'HealthCare Plus',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1470707f6-1763296407830.png",
    alt: 'Middle-aged man with glasses in business suit smiling professionally',
    rating: 5,
    text: 'HIPAA compliance requires top-tier security, and SHIeLdxssl exceeded our expectations. The validation process was thorough yet efficient, and their 24/7 support team has been invaluable. Our patients trust us more knowing we take their data security seriously.'
  }];


  const handlePrevious = () => {
    if (!isHydrated) return;
    setCurrentIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1);
  };

  const handleNext = () => {
    if (!isHydrated) return;
    setCurrentIndex((prev) => prev === testimonials.length - 1 ? 0 : prev + 1);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className={`bg-surface py-16 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who chose SHIeLdxssl for their website security needs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl border border-border shadow-lg p-8 lg:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                  <AppImage
                    src={currentTestimonial.image}
                    alt={currentTestimonial.alt}
                    className="w-full h-full object-cover" />

                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, index) =>
                  <Icon
                    key={index}
                    name="StarIcon"
                    size={20}
                    className="text-conversion-orange"
                    variant="solid" />

                  )}
                </div>

                <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                  &quot;{currentTestimonial.text}&quot;
                </blockquote>

                <div>
                  <div className="font-bold text-foreground text-lg">{currentTestimonial.name}</div>
                  <div className="text-muted-foreground">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
              <button
                onClick={handlePrevious}
                disabled={!isHydrated}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50"
                aria-label="Previous testimonial">

                <Icon name="ChevronLeftIcon" size={20} />
              </button>

              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) =>
                <button
                  key={index}
                  onClick={() => isHydrated && setCurrentIndex(index)}
                  disabled={!isHydrated}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-muted'}`
                  }
                  aria-label={`Go to testimonial ${index + 1}`} />

                )}
              </div>

              <button
                onClick={handleNext}
                disabled={!isHydrated}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50"
                aria-label="Next testimonial">

                <Icon name="ChevronRightIcon" size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
            <div className="text-muted-foreground">Customer Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;
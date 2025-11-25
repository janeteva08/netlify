import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  alt: string;
  rating: number;
  quote: string;
  impact: string;
}

const testimonials: Testimonial[] = [
{
  id: 1,
  name: "Sarah Mitchell",
  role: "CTO",
  company: "TechVenture Solutions",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ffde516e-1763293580273.png",
  alt: "Professional woman with shoulder-length brown hair wearing navy blazer smiling confidently in modern office",
  rating: 5,
  quote: "SHIeLdxssl transformed our security infrastructure. The implementation was seamless, and their support team guided us through every step. Our customers now trust our platform more than ever.",
  impact: "40% increase in customer trust scores"
},
{
  id: 2,
  name: "Michael Chen",
  role: "Head of IT Security",
  company: "GlobalCommerce Inc.",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a0203c69-1763294964268.png",
  alt: "Asian businessman in dark suit with glasses smiling professionally in corporate office setting",
  rating: 5,
  quote: "We manage over 50 domains, and SHIeLdxssl's multi-domain certificates have simplified our operations dramatically. The status tracking system keeps our entire team informed in real-time.",
  impact: "60% reduction in certificate management time"
},
{
  id: 3,
  name: "Emily Rodriguez",
  role: "E-commerce Director",
  company: "StyleHub Retail",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0f48e8d-1763295027844.png",
  alt: "Hispanic woman with long dark hair in professional attire smiling warmly in bright retail office",
  rating: 5,
  quote: "As an e-commerce business, security is paramount. SHIeLdxssl not only provided top-tier certificates but also educated our team on best practices. Our conversion rates improved significantly after implementation.",
  impact: "25% increase in checkout completion rates"
},
{
  id: 4,
  name: "David Thompson",
  role: "Founder & CEO",
  company: "StartupLaunch Platform",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14646b0d7-1763300433747.png",
  alt: "Young entrepreneur with short blonde hair in casual business attire smiling in modern startup office",
  rating: 5,
  quote: "For a startup, every dollar counts. SHIeLdxssl offered enterprise-level security at a price point that made sense for us. Their transparent pricing and excellent support made the decision easy.",
  impact: "Achieved SOC 2 compliance 3 months ahead of schedule"
},
{
  id: 5,
  name: "Jennifer Park",
  role: "Web Development Manager",
  company: "Digital Agency Pro",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_171517b36-1763295397686.png",
  alt: "Professional Asian woman with short black hair wearing white blouse smiling in creative agency workspace",
  rating: 5,
  quote: "Managing SSL certificates for multiple clients used to be a nightmare. SHIeLdxssl's streamlined ordering process and clear documentation have made our workflow incredibly efficient.",
  impact: "Reduced client onboarding time by 50%"
},
{
  id: 6,
  name: "Robert Anderson",
  role: "VP of Operations",
  company: "FinanceSecure Corp",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17964526e-1763293984400.png",
  alt: "Senior executive with gray hair in formal business suit smiling confidently in financial institution office",
  rating: 5,
  quote: "In the finance industry, security isn't optional—it's mandatory. SHIeLdxssl's compliance certifications and audit transparency gave us the confidence we needed. Their service is impeccable.",
  impact: "Zero security incidents in 18 months"
}];


const TestimonialsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Customer Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how businesses like yours have strengthened their security and built customer trust with SHIeLdxssl.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) =>
          <div
            key={testimonial.id}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">

              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                  src={testimonial.image}
                  alt={testimonial.alt}
                  className="w-full h-full object-cover" />

                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground truncate">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {testimonial.role}
                  </p>
                  <p className="text-sm font-semibold text-primary truncate">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, index) =>
              <Icon
                key={index}
                name="StarIcon"
                size={18}
                className="text-accent"
                variant="solid" />

              )}
              </div>

              <blockquote className="text-sm text-foreground mb-4 flex-1 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div className="pt-4 border-t border-border">
                <div className="flex items-start gap-2">
                  <Icon name="ChartBarIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-success">
                    {testimonial.impact}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-muted rounded-full">
            <Icon name="UserGroupIcon" size={20} className="text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Join 5000+ satisfied customers protecting their digital assets
            </span>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;
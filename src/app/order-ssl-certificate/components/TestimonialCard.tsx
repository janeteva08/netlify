import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  alt: string;
}

const testimonials: Testimonial[] = [
{
  id: 1,
  name: 'Sarah Mitchell',
  role: 'IT Director',
  company: 'TechStart Solutions',
  content: 'The ordering process was incredibly smooth. We had our SSL certificate installed within 10 minutes. The validation was straightforward and support was excellent.',
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ffde516e-1763293580273.png",
  alt: 'Professional woman with brown hair in business attire smiling at camera in modern office'
},
{
  id: 2,
  name: 'Michael Chen',
  role: 'E-commerce Owner',
  company: 'Urban Marketplace',
  content: 'ShieldxSSL made securing our online store effortless. Clear instructions, fast issuance, and great pricing. Our customers now see the trust seal at checkout.',
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d8aed28d-1763294966598.png",
  alt: 'Asian man in casual blue shirt smiling confidently in bright office environment'
}];


export default function TestimonialCard() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Icon name="ChatBubbleLeftRightIcon" size={24} className="text-primary mr-2" />
        <h3 className="text-lg font-semibold text-foreground">What Our Customers Say</h3>
      </div>
      
      <div className="space-y-4">
        {testimonials.map((testimonial) =>
        <div key={testimonial.id} className="bg-muted rounded-lg p-4">
            <div className="flex items-start mb-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                <AppImage
                src={testimonial.image}
                alt={testimonial.alt}
                className="w-full h-full object-cover" />

              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                <div className="flex items-center mt-1">
                  {[...Array(testimonial.rating)].map((_, i) =>
                <Icon key={i} name="StarIcon" variant="solid" size={14} className="text-warning" />
                )}
                </div>
              </div>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{testimonial.content}</p>
          </div>
        )}
      </div>
    </div>);

}
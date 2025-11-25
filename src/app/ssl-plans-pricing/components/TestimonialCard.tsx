import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  image: string;
  alt: string;
  rating: number;
  text: string;
}

export default function TestimonialCard({
  name,
  role,
  company,
  image,
  alt,
  rating,
  text
}: TestimonialCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <AppImage
            src={image}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-foreground">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
          <p className="text-xs text-muted-foreground">{company}</p>
        </div>
      </div>

      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, index) => (
          <Icon
            key={index}
            name="StarIcon"
            variant="solid"
            size={16}
            className={index < rating ? 'text-accent' : 'text-muted-foreground'}
          />
        ))}
      </div>

      <p className="text-sm text-foreground leading-relaxed">{text}</p>
    </div>
  );
}